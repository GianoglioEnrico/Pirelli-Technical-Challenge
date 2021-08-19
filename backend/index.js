const express = require("express");
const http = require("http");
const csv = require("csv-parser");
const port = process.env.PORT || 4001;
const cors = require("cors");
// const index = require("./routes/index");
const fs = require("fs");

const app = express();
app.use(cors());
// app.use(index);
app.use(express.json());
let measurement = [];
const data = [
  { id: 0, Press: "bomba0", car: "fiat" },
  { id: 1, Press: "bomba1", car: "fiat" },
  { id: 2, Press: "bomba2", car: "bmw" },
  { id: 3, Press: "bomba3", car: "bmw" },
  { id: 4, Press: "bomba4", car: "bmw" },
  { id: 5, Press: "bomba5", car: "mercedes" },
  { id: 6, Press: "bomba6", car: "mercedes" },
];
let i = 0;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let interval;
fs.createReadStream("./mycsv.csv")
  .pipe(csv())
  .on("data", (data) => {
    measurement.push(data);
  });
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 2000);

  socket.on("disconnect", () => {
    i = 0;
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
let response;
const getApiAndEmit = (socket) => {
  response = measurement[i++];

  if (response && Number(response.Omega) > 0 && Number(response.Press) > 0) {
    socket.emit("FromAPI", response);
  }
  // Emitting a new message. It will be consumed by the client
};
app.get("/filter", (req, res) => {
  const filters = req.query;

  const filteredCar = measurement.filter((measure) => {
    return filters.car.includes(measure.Car_id);
  });

  res.json(filteredCar);
});
server.listen(port, () => console.log(`Listening on port ${port}`));
