import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  auth: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5Nzg3MzA2Zi1hODU3LTQ4YzMtOTEyNy0zMzZiNDdlZGNiYTIiLCJpYXQiOjE3NTEwOTI4NTQsImV4cCI6MTc1MTE3OTI1NH0.fT8oYBV8DOpGdKNLzE8hoMsr8I9CtKCjDJL7DnM0bzE",
    "userId": '9787306f-a857-48c3-9127-336b47edcba2',
  },
});

// Join a room / register
socket.on('connect', () => {
  console.log('✅ Connected with id:', socket.id);

  // Send message to server
  socket.emit('sendMessage', {
    senderId: 'user1-id',
    reciptientId: 'user2-id',
    message: 'Hello from user1!',
    conversationId: 'some-conv-id'
  });
});

socket.on('connect_error', (err) => {
   console.error('❌ Connection error:', err.message);
  process.exit(1);
 
});

// Listen to message
socket.on('newMessage', (data) => {
  console.log('📨 New message received:', data);
});

// Optional debug
socket.on('connect_error', console.error);
socket.on('disconnect', () => console.log('❌ Disconnected'));
