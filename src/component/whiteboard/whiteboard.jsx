import { Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { SketchField, Tools } from "react-sketch2";
import { ButtonAppBar } from "../appbar/appbar.jsx";
import { Toolbar } from "../toolbar/maintool.jsx";
import { Newtool } from "../toolbar/newtool.jsx";
import Botbar from "../appbar/bottomnav.jsx";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

export function Sketch() {
  const username = "user" + parseInt(Math.random() * 10);
  const socket = useRef();
  const myVideo = useRef(null);
  const connectionRef = useRef();
  const peersRef = useRef([]);
  const [stream, setstream] = useState();
  const [boardtools, setboardtools] = useState({
    tools: Tools.Pencil,
    color: "#000000",
    tebel: 4,
    fillcolor: "",
  });
  const [boardval, setboardval] = useState({});
  const [initialize, setinitialize] = useState(true);
  const alat = [
    "Pencil",
    "Line",
    "Rectangle",
    "Circle",
    "Select",
    "Pan",
    "Trash",
  ];
  const [update, setupdate] = useState(false);
  const [alluser, setalluser] = useState([]);
  const [peers, setpeers] = useState([]);
  const [panjangobject, setpanjangobject] = useState(0);
  const [Username, setUsername] = useState("");
  const [buffertools, setbuffertools] = useState({
    tools: Tools.Pencil,
    color: "#000000",
    tebel: 4,
    fillcolor: "",
  });

  useEffect(() => {
    socket.current = io.connect("http://localhost:4000");
    setUsername(username);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        setstream(stream);
        socket.current.emit("join", username);
        socket.current.on("new user", (user) => {
          setalluser(user);
          const peers = [];
          user.forEach((id) => {
            const peer = createPeer(id, socket.current.id, stream);
            peersRef.current.push({
              peerID: id,
              peer,
            });
            peers.push(peer);
          });
          setpeers(peers);
        });
        socket.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setpeers((users) => [...users, peer]);
        });
        socket.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  useEffect(() => {
    socket.current = io.connect("http://localhost:4000");
    if (!initialize) {
      // console.log(
      //   boardval.toJSON().objects[boardval.toJSON().objects.length - 1]
      // );
      socket.current.on("boardval", (objectval) => {
        let hehe = boardval.toJSON().objects;
        hehe.push(objectval.value);
        let data = {
          version: "3.6.3",
          objects: hehe,
        };
        // console.log(boardval.toJSON());
        // console.log(hehe, boardval);
        // setboardval(hehe);
        boardval.fromJSON(data);
      });
    }
    setinitialize(false);
    return () => socket.current.disconnect();
  }, [update, boardtools.tebel, boardtools.color, boardtools.fillcolor]);
  const broadcastBoard = () => {
    var value = boardval.toJSON().objects[boardval.toJSON().objects.length - 1];
    socket.current.emit("boardval", { value });
  };
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  return (
    <div>
      <Container>
        <StyledVideo muted ref={myVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
          console.log(peers);
          return <Video key={index} peer={peer} />;
        })}
      </Container>
      {ButtonAppBar(boardval, panjangobject)}
      {Botbar(Username)}
      <SketchField
        // value={boardval}
        // isDrawingMode={true}
        // defaultvalue={boardval}
        tool={boardtools.tools}
        lineColor={boardtools.color}
        lineWidth={boardtools.tebel}
        fillColor={boardtools.fillcolor}
        onObjectAdded={(e) => {
          if (e) {
            broadcastBoard();
          }
        }}
        ref={(c) => {
          setboardval(c);
        }}
        onChange={(e) => {
          if (panjangobject === boardval.toJSON().objects.length) {
            // nothing
          } else {
            setpanjangobject(boardval.toJSON().objects.length);
            setupdate(!update);
            console.log(boardval);
            console.log(alluser);
          }
        }}
      />
      <Grid container justifyContent={"center"}>
        {Toolbar(
          alat,
          boardval,
          Tools,
          setboardtools,
          boardtools,
          setbuffertools,
          buffertools
        )}
      </Grid>
      {Newtool(setboardtools, boardtools, buffertools, setbuffertools)}
    </div>
  );
}
