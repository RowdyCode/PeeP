const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();

// Serve everything in the current folder (HTML, MP3, MPEG)
app.use(express.static(__dirname));

// Serve PeerJS from node_modules to avoid Tracking Prevention issues
app.get('/peerjs.min.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules/peerjs/dist/peerjs.min.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp'
});

app.use('/peerjs', peerServer);