import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import io from "socket.io-client";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../chat/chat.jsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80vw",
    height: "80vh",
    maxWidth: "500px",
    maxHeight: "700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  paper2: {
    width: "80vw",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  messagesBody: {
    width: "calc( 100% )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100%)",
  },
}));
export function ResponsiveDrawer(
  mobileOpen,
  setMobileOpen,
  handleDrawerToggle,
  username
) {
  const [message, setmessage] = useState("");
  const [chat, setchat] = useState([]);
  const socket = useRef();
  // const username = "user" + parseInt(Math.random() * 10);
  useEffect(() => {
    socket.current = io.connect("http://localhost:4000");
    socket.current.on("message", (message) => {
      setchat([...chat, message]);
    });
    return () => socket.current.disconnect();
  }, [chat]);
  const sendMessage = (e) => {
    socket.current.emit("message", { message, username });
    e.preventDefault();
    setmessage("");
  };
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <Typography>Chat</Typography>
      <Divider />
      <form
        onSubmit={sendMessage}
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          right: 0,
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setmessage(e.target.value);
          }}
        ></input>
        <button type="submit">send</button>
      </form>
      {chat.map((payload, index) => {
        return payload.username == username ? (
          <MessageRight
            message={payload.message}
            timestamp={payload.time}
            displayName={"ME"}
          />
        ) : (
          <MessageLeft
            message={payload.message}
            timestamp={payload.time}
            displayName={payload.username}
          />
        );
      })}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
