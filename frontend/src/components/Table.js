import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

import socketIOClient from "socket.io-client";

const ENDPOINT = "/";
const socket = socketIOClient(ENDPOINT);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 650,
  },
  formControl: {
    minWidth: 120,
  },
  circularLoaderContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circularLoader: {
    color: "#000",
  },
});

export default function DataTable() {
  const classes = useStyles();
  const [measurements, setmeasurements] = useState([]);

  const [filtering, setFiltering] = useState(false);
  const [car, setCar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleFiltering = (e) => {
    setCar(e.target.value);
    if (e.target.value === "showAllCars") setFiltering(false);
    else {
      fetch(`/filter?car=${car}`)
        .then((res) => res.json())
        .then((response) => {
          setFiltering(true);
        });
    }
  };

  let fi = measurements.filter((f) => f.Car_id === car);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Car</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={car}
          onChange={(e) => {
            handleFiltering(e);
            fi = [];
          }}
        >
          <MenuItem value={"showAllCars"}>
            <em>Show All Cars</em>
          </MenuItem>
          <MenuItem value={"Volvo V40"}>Volvo V40</MenuItem>
          <MenuItem value={"Audi A6"}>Audi A6</MenuItem>
          <MenuItem value={"Porsche 911"}>Porsche 911</MenuItem>
        </Select>
      </FormControl>

      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Car</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Omega</TableCell>
              <TableCell align="right">Speed</TableCell>
              <TableCell align="right">Pressure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {!filtering &&
              measurements.length > 0 &&
              measurements.map((measure, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {measure.Car_id}
                  </TableCell>
                  <TableCell align="right">{measure.Position}</TableCell>
                  <TableCell align="right">{measure.Temp}</TableCell>
                  <TableCell align="right">{measure.Omega}</TableCell>
                  <TableCell align="right">{measure.Speed}</TableCell>
                  <TableCell align="right">{measure.Press}</TableCell>
                </TableRow>
              ))}

            {filtering &&
              fi.length > 0 &&
              fi.map((fil, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {fil.Car_id}
                  </TableCell>
                  <TableCell align="right">{fil.Position}</TableCell>
                  <TableCell align="right">{fil.Temp}</TableCell>
                  <TableCell align="right">{fil.Omega}</TableCell>
                  <TableCell align="right">{fil.Speed}</TableCell>
                  <TableCell align="right">{fil.Press}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!errorMessage && measurements.length < 1 && (
        <div className={classes.circularLoaderContainer}>
          <CircularProgress className={classes.circularLoader} />
        </div>
      )}
      {errorMessage && <h1 style={{ color: "red" }}>{errorMessage}</h1>}
    </div>
  );
}
