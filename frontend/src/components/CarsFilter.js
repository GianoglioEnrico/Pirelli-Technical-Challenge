import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

// Component Styling
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const CarsFilter = (props) => {
  const classes = useStyles();
  let { cars, handleCarFiltering } = props;
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">Cars Filter</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={cars}
        onChange={(e) => {
          handleCarFiltering(e);
        }}
        input={<Input value={cars} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={{
          getContentAnchorEl: () => null,
          style: { marginTop: 40 },
        }}
      >
        <MenuItem value={"Volvo V40"}>
          <Checkbox checked={cars.indexOf("Volvo V40") > -1} />
          <ListItemText primary={"Volvo V40"} />
        </MenuItem>
        <MenuItem value={"Audi A6"}>
          <Checkbox checked={cars.indexOf("Audi A6") > -1} />
          <ListItemText primary={"Audi A6"} />
        </MenuItem>
        <MenuItem value={"Porsche 911"}>
          <Checkbox checked={cars.indexOf("Porsche 911") > -1} />
          <ListItemText primary={"Porsche 911"} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default CarsFilter;
