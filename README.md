# Markdown Live Preview App

A simple, fast Markdown editor with live preview and syntax checking built with Node.js and markdown-it.

## Features

- Real-time Markdown preview as you type
- Syntax highlighting in the editor using CodeMirror
- Syntax checking to catch errors
- Responsive design that works on desktop and mobile
- Modern, clean interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or pnpm

### Installation

1. Clone this repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

or if using pnpm:

```bash
pnpm install
```

### Running the Application

Start the server:

```bash
npm start
```

For development with automatic reloading:

```bash
npm run dev
```

Then open your browser and navigate to `http://localhost:3000`

## How to Use

1. The editor is on the left side, and the preview is on the right
2. Start typing in the editor, and the preview will update in real-time
3. Any syntax errors will be displayed below the editor

## Technologies Used

- Node.js
- Express
- Socket.io - For real-time communication
- markdown-it - For Markdown parsing and rendering
- CodeMirror - For the code editor with syntax highlighting

## License


## Author

Huy Bui
