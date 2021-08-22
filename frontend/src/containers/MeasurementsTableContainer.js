import React, { useState, useEffect } from "react";

import socketIOClient from "socket.io-client";
import CarsFilter from "../components/CarsFilter";

import MainTable from "../components/MainTable";
import FilteredCarTables from "../components/FilteredCarTables";
import LoadProgress from "../components/LoadProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const ENDPOINT = "/";
const socket = socketIOClient(ENDPOINT);

// Container Styling
const useStyles = makeStyles(() => ({
  root: {
    marginTop: "20px",
  },
  errorMessage: {
    color: "red",
  },
}));

const DataTable = () => {
  const classes = useStyles();
  const [measurements, setmeasurements] = useState([]);

  const [filtering, setFiltering] = useState(false);
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCarFiltering = (e) => {
    setCars(e.target.value);
    if (e.target.value.length === 0) setFiltering(false);
    else {
      setFiltering(true);
    }
  };

  let carsFiltered = measurements.filter((measurement) => {
    if (cars.length > 0) return cars.includes(measurement.Car_id);
    return [];
  });

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      if (data !== {}) {
        setmeasurements((prev) => [data, ...prev]);
        setErrorMessage("");
      } else {
        setErrorMessage("No data received from the sensors");
      }
    });

    socket.on("connect_error", () => setErrorMessage("Connection Error"));
    socket.on("connect_failed", () => setErrorMessage("Connection Failed"));
    socket.on("disconnect", () =>
      setErrorMessage("Disconnected from the server")
    );
    return () => socket.disconnect();
  }, []);
  const handleCloseTable = (carFilterOut) => {
    setCars(cars.filter((car) => car !== carFilterOut));

    if (cars.length === 1) {
      setFiltering(false);
    }
  };

  return (
    <div className={classes.root}>
      {!errorMessage && (
        <CarsFilter
          cars={cars}
          handleCarFiltering={handleCarFiltering}
          carsFiltered={carsFiltered}
        />
      )}
      {!errorMessage && !filtering && cars.length === 0 && (
        <MainTable measurements={measurements} />
      )}

      {filtering &&
        cars.map((car, index) => (
          <FilteredCarTables
            key={index}
            car={car}
            carsFiltered={carsFiltered}
            handleCloseTable={handleCloseTable}
          />
        ))}
      {!errorMessage && measurements.length < 1 && <LoadProgress />}
      {errorMessage && (
        <Typography variant="h4" gutterBottom className={classes.errorMessage}>
          {errorMessage}:(
        </Typography>
      )}
    </div>
  );
};

export default DataTable;