import React, { useState, useEffect } from "react";

import socketIOClient from "socket.io-client";
import CarsFilter from "../components/CarsFilter";

import MainTable from "../components/MainTable";
import CarTables from "../components/CarTables";
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
      fetch(`/filter?car=${e.target.value}`)
        .then((res) => {
          if (!res.ok) {
            setErrorMessage("Filtering Error");
          } else {
            res.json();
          }
        })

        .then(() => {
          setFiltering(true);
        });
    }
  };

  let carsFiltered = measurements.filter((measurement) => {
    if (cars.length > 0) return cars.includes(measurement.Car_id);
  });

  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setmeasurements((prev) => [data, ...prev]);
      setErrorMessage("");
    });
    socket.on("connect_error", () => setErrorMessage("Connection Error"));
    socket.on("connect_failed", () => setErrorMessage("Connection Failed"));

    return () => socket.disconnect();
  }, []);

  return (
    <div className={classes.root}>
      {!errorMessage && (
        <CarsFilter
          cars={cars}
          handleCarFiltering={handleCarFiltering}
          carsFiltered={carsFiltered}
        />
      )}
      {!errorMessage && !filtering && <MainTable measurements={measurements} />}

      {filtering &&
        cars.map((car, index) => (
          <CarTables key={index} car={car} carsFiltered={carsFiltered} />
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
