let io;

module.exports = {
  init: (server) => {
     io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  }
};