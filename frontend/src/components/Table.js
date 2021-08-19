import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4001";
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
});

export default function DataTable() {
  const classes = useStyles();
  const [measurements, setmeasurements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [car, setCar] = useState("");
  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setmeasurements((prev) => [data, ...prev]);
    });
    return () => socket.disconnect();
  }, []);

  return (
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
          {measurements.length > 0 &&
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
