const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
const uri = "mongodb://localhost:27017";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/players', require('./routes/players'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/fields', require('./routes/fields'));
app.use('/api/spirit-scores', require('./routes/spiritScores'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/can-play', require('./routes/canPlay'));
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/announcements', require('./routes/announcements')(io));
app.use('/api/media', require('./routes/media'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
