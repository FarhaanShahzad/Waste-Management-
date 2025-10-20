// src/socket/socket.js
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.subscribers = new Map();
    this.reconnectionAttempts = 0;
    this.maxReconnectionAttempts = 5;
    this.reconnectionDelay = 1000; // Start with 1 second delay
    this.maxReconnectionDelay = 10000; // Max 10 seconds delay
  }

  // Initialize socket connection
  connect(token) {
    if (this.socket?.connected) return;

    this.socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: { token },
      reconnectionAttempts: this.maxReconnectionAttempts,
      reconnectionDelay: this.reconnectionDelay,
      reconnectionDelayMax: this.maxReconnectionDelay,
      autoConnect: true,
      transports: ['websocket'],
    });

    this.setupEventListeners();
  }

  // Setup socket event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.connected = true;
      this.reconnectionAttempts = 0;
      this.notifySubscribers('connection', { connected: true });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.connected = false;
      this.notifySubscribers('connection', { connected: false });
      
      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        // The disconnection was initiated by the server or the client explicitly
        // You might want to handle reconnection differently in this case
        toast.error('Disconnected from server');
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      this.handleConnectionError();
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      this.reconnectionAttempts = attempt;
      console.log(`Reconnection attempt ${attempt}/${this.maxReconnectionAttempts}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect to server');
      toast.error('Connection lost. Please refresh the page.');
    });

    // Handle custom events
    this.socket.on('request:created', (data) => {
      this.notifySubscribers('request:created', data);
      toast.success(`New request: ${data.id}`);
    });

    this.socket.on('request:updated', (data) => {
      this.notifySubscribers('request:updated', data);
    });

    this.socket.on('request:status_updated', (data) => {
      this.notifySubscribers('request:status_updated', data);
      toast.info(`Request ${data.id} status updated to ${data.status}`);
    });

    this.socket.on('collector:assigned', (data) => {
      this.notifySubscribers('collector:assigned', data);
      toast.info(`Collector assigned to request ${data.requestId}`);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error('Connection error. Please try again.');
    });
  }

  // Handle connection errors with exponential backoff
  handleConnectionError() {
    this.reconnectionAttempts++;
    if (this.reconnectionAttempts <= this.maxReconnectionAttempts) {
      const delay = Math.min(
        this.reconnectionDelay * Math.pow(2, this.reconnectionAttempts - 1),
        this.maxReconnectionDelay
      );
      console.log(`Attempting to reconnect in ${delay}ms...`);
      setTimeout(() => {
        this.socket?.connect();
      }, delay);
    }
  }

  // Subscribe to socket events
  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    const subscribers = this.subscribers.get(event);
    subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        this.subscribers.delete(event);
      }
    };
  }

  // Notify all subscribers of an event
  notifySubscribers(event, data) {
    const subscribers = this.subscribers.get(event);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} subscriber:`, error);
        }
      });
    }
  }

  // Emit events to the server
  emit(event, data, callback) {
    if (!this.connected) {
      console.warn('Socket not connected. Attempting to send:', event, data);
      // Optionally queue the event or handle offline mode
      if (callback) callback(new Error('Not connected to server'));
      return false;
    }

    return new Promise((resolve, reject) => {
      this.socket.emit(event, data, (response) => {
        if (response?.error) {
          const error = new Error(response.error.message || 'Request failed');
          error.code = response.error.code;
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Disconnect the socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      this.subscribers.clear();
    }
  }

  // Reconnect the socket
  reconnect() {
    if (this.socket && !this.connected) {
      this.socket.connect();
    }
  }

  // Get current connection status
  isConnected() {
    return this.connected;
  }
}

// Create a singleton instance
const socketService = new SocketService();

// Export the singleton instance
export default socketService;