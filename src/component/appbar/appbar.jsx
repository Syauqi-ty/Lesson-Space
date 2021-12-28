import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RedoIcon from "@material-ui/icons/Redo";
import DeleteIcon from "@material-ui/icons/Delete";

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
}));

export function ButtonAppBar(boardval, length) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lesson Space
          </Typography>
          <IconButton
            onClick={() => {
              boardval.undo();
            }}
            edge="start"
            color="inherit"
            aria-label="menu"
            disabled={length === 0}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              boardval.redo();
            }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <RedoIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              boardval.clear();
            }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
