const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app); //node js server

// socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`connected ${socket.id}`);
  socket.on("send-message", (message) => {
    // bordocast  mesage
    io.emit("recived-message", message);
  });
  socket.on("disconnect", () => console.log(`disconnected:${socket.id}`));
});

server.listen(5000, () => console.log("server running on 5000 port"));
