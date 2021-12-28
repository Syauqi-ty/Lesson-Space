import { Grid, Hidden, IconButton, Typography } from "@material-ui/core";
import React from "react";
import MicIcon from "@material-ui/icons/Mic";
import VideocamIcon from "@material-ui/icons/Videocam";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PeopleIcon from "@material-ui/icons/People";
import { ResponsiveDrawer } from "../drawer/drawer";

export default function Botbar(username) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div style={{ zIndex: 1000 }}>
      {ResponsiveDrawer(
        mobileOpen,
        setMobileOpen,
        handleDrawerToggle,
        username
      )}
      <Hidden mdDown>
        <div
          style={{
            width: "94%",
            height: "7.5vh",
            backgroundColor: "rgba(237,237,237,0.6)",
            position: "fixed",
            bottom: 0,
            left: 0,
            padding: "0.75rem",
            paddingBottom: 0,
            paddingRight: "5%",
            paddingLeft: "1%",
            pointerEvents: "none",
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs>
              <Typography>yxd-qwe-www</Typography>
            </Grid>
            <Grid item xs>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs>
                  <IconButton>
                    <MicIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton>
                    <VideocamIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton>
                    <ScreenShareIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton color="secondary">
                    <CallEndIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs
              onClick={() => {
                handleDrawerToggle();
                console.log("wibu");
              }}
            >
              <button
                onClick={() => {
                  handleDrawerToggle();
                  console.log("wibu");
                }}
              >
                hohoho
              </button>
              <IconButton>
                <ChatBubbleIcon />
              </IconButton>
              <IconButton>
                <PeopleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </Hidden>
      <Hidden lgUp>
        <div
          style={{
            width: "94%",
            height: "7.5vh",
            backgroundColor: "rgba(237,237,237,0.6)",
            position: "fixed",
            bottom: 0,
            left: 0,
            padding: "0.75rem",
            paddingBottom: 0,
            paddingRight: "5%",
            paddingLeft: "1%",
            pointerEvents: "none",
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs>
              <Typography>yxd-qwe-www</Typography>
            </Grid>
            <Grid item xs>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs>
                  <IconButton>
                    <MicIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton>
                    <VideocamIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton>
                    <ScreenShareIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton color="secondary">
                    <CallEndIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs
              onClick={() => {
                handleDrawerToggle();
                console.log("wibu");
              }}
            >
              <button
                onClick={() => {
                  handleDrawerToggle();
                  console.log("wibu");
                }}
              >
                hohoho
              </button>
              <IconButton
                onClick={() => {
                  handleDrawerToggle();
                  console.log("wibu");
                }}
              >
                <ChatBubbleIcon />
              </IconButton>
              <IconButton>
                <PeopleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </Hidden>
      <button
        style={{
          marginLeft: "50vw",
        }}
        onClick={() => {
          handleDrawerToggle();
          console.log("wibu");
        }}
      >
        hohoho
      </button>
    </div>
  );
}
