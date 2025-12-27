// Configuration file for the Murmure app

// Backend server address
// For local development, use your machine's IP address or localhost
// For production, update this to your deployed backend URL

// ANCIENNE VERSION (ne fonctionne pas avec Expo Web sur Render)
// const isDev = process.env.NODE_ENV === 'development' || !process.env.EXPO_PUBLIC_BACKEND_URL;
// export const BACKEND_ADDRESS = isDev
//   ? "http://192.168.1.139:3000"
//   : process.env.EXPO_PUBLIC_BACKEND_URL;

// NOUVELLE VERSION : Détection automatique de l'environnement
const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('onrender.com');

export const BACKEND_ADDRESS = isProduction
  ? "https://murmure-backend-0ya7.onrender.com"
  : "http://192.168.1.139:3000";
