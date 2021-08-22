import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";

// Component Styling
const useStyles = makeStyles(() => ({
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 650,
  },
  flexStyling: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cardContainer: {
    marginTop: "40px",
    borderRadius: "10px",
  },
}));

const CarTables = (props) => {
  const classes = useStyles();
  const { car, carsFiltered, handleCloseTable } = props;
  const tyrePosition = ["Front Left", "Rear Left", "Front Rigth", "Rear Rigth"];

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Typography>
          Car:{" "}
          <Chip
            label={car}
            onDelete={() => handleCloseTable(car)}
            color="secondary"
          />
          {/* <button onClick={() => handleCloseTable(car)}>Close Car</button> */}
        </Typography>
        <TableContainer className={classes.container} component={Paper}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell align="right">Temperature(Last Detected)</TableCell>
                <TableCell align="right">
                  Angular Velocity(Last Detected)
                </TableCell>
                <TableCell align="right">Speed(Last Detected)</TableCell>
                <TableCell align="right">Pressure(Last Detected)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tyrePosition.map((tyre, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <b>{tyre}</b>
                    </TableCell>
                    {carsFiltered.length > 0 &&
                    carsFiltered.filter(
                      (carFiltered) =>
                        carFiltered.Car_id === car &&
                        carFiltered.Position === tyre
                    )[0] ? (
                      <>
                        <TableCell align="right">
                          {
                            carsFiltered.filter(
                              (carFiltered) =>
                                carFiltered.Car_id === car &&
                                carFiltered.Position === tyre
                            )[0].Temp
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            carsFiltered.filter(
                              (carFiltered) =>
                                carFiltered.Car_id === car &&
                                carFiltered.Position === tyre
                            )[0].Omega
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            carsFiltered.filter(
                              (carFiltered) =>
                                carFiltered.Car_id === car &&
                                carFiltered.Position === tyre
                            )[0].Speed
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            carsFiltered.filter(
                              (carFiltered) =>
                                carFiltered.Car_id === car &&
                                carFiltered.Position === tyre
                            )[0].Press
                          }
                        </TableCell>
                      </>
                    ) : (
                      <TableCell align="right"> No Data Available</TableCell>
                    )}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.flexStyling}>
          <TableContainer
            className={classes.container}
            style={{
              marginTop: "20px",
              maxHeight: "190px",
              width: "80%",
            }}
            component={Paper}
          >
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Temperature</TableCell>
                  <TableCell align="right">Angular Velocity</TableCell>
                  <TableCell align="right">Speed</TableCell>
                  <TableCell align="right">Pressure</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carsFiltered.length > 0 &&
                  carsFiltered.map(
                    (carFiltered, index) =>
                      carFiltered.Car_id === car && (
                        <TableRow key={index}>
                          <TableCell align="right">
                            {carFiltered.Position}
                          </TableCell>
                          <TableCell align="right">
                            {carFiltered.Temp}
                          </TableCell>
                          <TableCell align="right">
                            {carFiltered.Omega}
                          </TableCell>
                          <TableCell align="right">
                            {carFiltered.Speed}
                          </TableCell>
                          <TableCell align="right">
                            {carFiltered.Press}
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarTables;
