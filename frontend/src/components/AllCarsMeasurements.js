import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// Component Styling
const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 650,
  },
  root: {
    marginTop: "10px",
    boxShadow:
      "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)",
  },
}));

const AllCarsMeasurements = (props) => {
  const classes = useStyles();
  const { measurements } = props;
  return (
    <div className={classes.root}>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Car</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Angular Velocity</TableCell>
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
    </div>
  );
};

export default AllCarsMeasurements;
