document.addEventListener('DOMContentLoaded', () => {
	// Initialize CodeMirror editor
	const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
		mode: 'markdown',
		theme: 'monokai',
		lineNumbers: true,
		lineWrapping: true,
		autofocus: true,
		indentWithTabs: false,
		tabSize: 2,
		extraKeys: {
			Enter: 'newlineAndIndentContinueMarkdownList',
		},
	});

	// Get preview element
	const previewElement = document.getElementById('preview');
	const syntaxErrorElement = document.getElementById('syntax-error');

	// Connect to Socket.io
	const socket = io();

	// Sample markdown to start with
	const sampleMarkdown = `# Welcome to Markdown Live Preview

## Features
- **Real-time preview** as you type
- **Syntax highlighting** in the editor
- **Syntax checking** to catch errors

## Basic Markdown Guide

### Headers
# H1
## H2
### H3

### Emphasis
*italic* or _italic_
**bold** or __bold__
**_bold and italic_**

### Lists
1. Ordered list item 1
2. Ordered list item 2

- Unordered list item
- Another item

### Links
[Link text](https://example.com)

### Images
![Alt text](https://via.placeholder.com/150)

### Code
Inline \`code\` has back-ticks around it.

\`\`\`javascript
// Code block
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Blockquotes
> This is a blockquote
> It can span multiple lines

### Tables
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

Start typing to see your changes live!`;

	// Set initial content
	editor.setValue(sampleMarkdown);

	// Send the initial markdown for rendering
	socket.emit('markdown-update', sampleMarkdown);

	// Update preview when editor changes
	let debounceTimer;
	editor.on('change', () => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			const markdown = editor.getValue();
			socket.emit('markdown-update', markdown);
		}, 300); // Debounce to avoid sending too many requests
	});

	// Listen for preview updates from server
	socket.on('preview-update', (html) => {
		previewElement.innerHTML = html;
		syntaxErrorElement.style.display = 'none';
	});

	// Listen for syntax errors from server
	socket.on('syntax-error', (errorMessage) => {
		syntaxErrorElement.textContent = `Syntax Error: ${errorMessage}`;
		syntaxErrorElement.style.display = 'block';
	});

	// Handle socket connection errors
	socket.on('connect_error', (error) => {
		console.error('Connection error:', error);
		previewElement.innerHTML =
			'<p style="color: red;">Connection error. Please refresh the page.</p>';
	});
});
