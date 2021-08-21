import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

// Component Styling
const useStyles = makeStyles((theme) => ({
  circularLoaderContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  circularLoader: {
    color: "#000",
  },
}));

const LoadProgress = () => {
  const classes = useStyles();
  return (
    <div className={classes.circularLoaderContainer}>
      <CircularProgress className={classes.circularLoader} />
      <Typography>Loading Data...</Typography>
    </div>
  );
};

export default LoadProgress;
