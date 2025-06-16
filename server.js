import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import markdownIt from 'markdown-it';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// Initialize Express app
const app = express();
const server = createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize markdown-it with options for syntax checking
const md = new markdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: function (str, lang) {
		// You can add syntax highlighting here if needed
		return str;
	},
});

// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));

// Socket.io connection handling
io.on('connection', (socket) => {
	console.log('A user connected');

	// Listen for markdown updates from client
	socket.on('markdown-update', (markdown) => {
		try {
			// Parse markdown and check syntax
			const html = md.render(markdown);
			// Send the HTML back to the client
			socket.emit('preview-update', html);
		} catch (error) {
			// If there's a syntax error, send it to the client
			socket.emit('syntax-error', error.message);
		}
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

// Serve the main page
app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
