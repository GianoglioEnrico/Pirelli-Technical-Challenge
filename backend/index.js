// Import Statements
const express = require("express");
const http = require("http");
const csv = require("csv-parser");
const cors = require("cors");
const fs = require("fs");

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
let cars;
let filteredCar = [];

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

const port = process.env.PORT || 4001;

// Reading CSV file with stream and saving data on measurements variable
fs.createReadStream("./data_measurements_finals.csv")
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
  // Get sensors measurements
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  // Filter By car name
  socket.on("FilterApi", (data) => {
    cars = data;

    setInterval(() => {
      filteredCar = carFilter.filter((measure) => {
        if (measure) return cars.includes(measure.Car_id);
      });
      if (filteredCar) socket.emit("FilterApi", filteredCar.reverse());
    }, 1000);
  });

  socket.on("disconnect", () => {
    i = 0;
    filteredCar = [];
    carFilter = [];
    response = {};
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
let carFilter = [];
// Function to send chunks of data to the Client
const getApiAndEmit = (socket) => {
  response = measurements[i++];
  carFilter.push(response);
  if (response) {
    // Emitting a new message. It will be consumed by the client
    socket.emit("FromAPI", response);
  }
};

// Server Started
server.listen(port, () => console.log(`Listening on port ${port}`));
