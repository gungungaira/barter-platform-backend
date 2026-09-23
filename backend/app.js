// require("dotenv").config();
// console.log("JWT_SECRET loaded as:", process.env.JWT_SECRET); 
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require('./Routes/authRoutes');
// const profileRoutes = require('./Routes/authProfileRoute'); 
// const myProfile =require('./Routes/myProfile')
// const findMatch =require('./Routes/findMatchRoute')
// const uploadFile =require('./Routes/uploadProfile')
// const messageRoutes = require('./Routes/messageRoutes');

// const app = express();
// app.use(express.json());
// app.use(cors());
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("mongodb is successfully connected"))
//   .catch((error) => console.log(error));

// app.use('/',authRoutes);
// app.use('/',profileRoutes); 
// app.use('/',myProfile); 
// app.use('/',findMatch)
// app.use('/',uploadFile)
// app.use('/uploads', express.static('uploads'));
// app.use('/',messageRoutes)


// app.listen(process.env.PORT||5000, () => {
//   console.log(`server is running in port ${process.env.PORT||5000}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");


const authRoutes = require('./Routes/authRoutes');
const profileRoutes = require('./Routes/authProfileRoute');
const myProfile = require('./Routes/myProfile');
const findMatch = require('./Routes/findMatchRoute');
const uploadFile = require('./Routes/uploadProfile');
const messageRoutes = require('./Routes/messageRoutes');
const Message = require('./models/Message'); 

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb is successfully connected"))
  .catch((error) => console.log(error));

app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', myProfile);
app.use('/', findMatch);
app.use('/', uploadFile);
app.use('/uploads', express.static('uploads'));
app.use('/', messageRoutes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.join(userId);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    try {
      const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        text,
      });
      io.to(receiverId).emit("newMessage", newMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) onlineUsers.delete(userId);
    }
  });
});

const PORT = process.env.PORT || 4040;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});