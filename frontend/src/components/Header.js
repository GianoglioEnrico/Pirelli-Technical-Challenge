import pirelliImg from "../assets/images/pirelli-logo.png";
// const Header = () => {
//   return (
//     <header className="App-header">
//       <img src={pirelliImg} alt="logo_pirelli" className="logo" />
//       <p>Pirelli Technical Challenge</p>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#000",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    color: "white",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.container}>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={pirelliImg} alt="logo_pirelli" className="logo" />
          </IconButton>

          <Typography color="inherit">Pirelli Technical Challenge</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
