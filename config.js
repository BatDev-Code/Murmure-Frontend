// Configuration file for the Murmure app

// Backend server address
// For local development, use your machine's IP address or localhost
// For production, update this to your deployed backend URL
const isDev = process.env.NODE_ENV === 'development' || !process.env.EXPO_PUBLIC_BACKEND_URL;
export const BACKEND_ADDRESS = isDev
  ? "http://192.168.1.139:3000"
  : process.env.EXPO_PUBLIC_BACKEND_URL;
