// IMPORTS
const express = require("express");
const http = require("http");
const csv = require("csv-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
const port = process.env.PORT || 4001;
let measurement = [];
let i = 0;
let interval;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

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
    // Emitting a new message. It will be consumed by the client
    socket.emit("FromAPI", response);
  }
};
app.get("/filter", (req, res) => {
  const filters = req.query;
  const filteredCar = measurement.filter((measure) => {
    return filters.car.includes(measure.Car_id);
  });

  res.json(filteredCar);
});
server.listen(port, () => console.log(`Listening on port ${port}`));
