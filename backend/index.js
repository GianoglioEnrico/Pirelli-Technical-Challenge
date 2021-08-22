// Import Statements
const express = require("express");
const http = require("http");
const csv = require("csv-parser");
const cors = require("cors");
const fs = require("fs");
const filterApi = require("./routes/index.js");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let measurements = [];
let i = 0;
let interval;
let response;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  "/filter",
  function (req, res, next) {
    req.measurements = measurements;

    next();
  },
  filterApi
);
const port = process.env.PORT || 4001;

// Reading CSV file with stream and saving data on measurements variable
fs.createReadStream("./mycsv.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (Number(data.Press) > 0 && Number(data.Omega)) {
      measurements.push(data);
    }
  });

// Socket Connection
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

// Function to send chunks of data to the Client
const getApiAndEmit = (socket) => {
  response = measurements[i++];
  if (response) {
    // Emitting a new message. It will be consumed by the client
    socket.emit("FromAPI", response);
  }
};

// Server Started
server.listen(port, () => console.log(`Listening on port ${port}`));
