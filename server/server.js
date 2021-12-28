const app = require("express")();
const CORS = require("cors");
app.use(CORS());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    console.log(users);
    socket.emit("new user", users);
  });
  socket.on("message", ({ message, username }) => {
    const payload = {
      message,
      username,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    io.emit("message", payload);
    // console.log(payload);
  });
  socket.on("boardval", (boardval) => {
    io.emit("boardval", boardval);
    // console.log(boardval);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
    console.log(signal);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.id !== socket.id);
    io.emit("list user", users);
  });
});

server.listen(4000, function () {
  console.log("4000 kimak");
});
