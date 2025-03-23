# Real-Time Alert Server

A Node.js/Express server with WebSocket integration for sending real-time alerts to specific rooms.

## Features
- REST API for receiving alert requests
- WebSocket integration for real-time notifications
- Request validation system
- Room-based message targeting

## Installation
```bash
npm install
```

## Environment Variables
Create a `.env` file with:
```env
PORT=3000
ACCEPT=application/json
SECRET_KEY=your_secret_here
```

## Usage
```javascript
// Start server
npm start
```

## API Reference

### POST /alert
Send a message to a specific room:
```json
{
    "message": "Server going down!",
    "roomId": "server-room",
    "secretKey": "your_secret_here"
}
```

Headers:
