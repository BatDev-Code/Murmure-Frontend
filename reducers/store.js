import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userConnectionReducer from './userConnection';
import chaptersReducer from './chapters';

const rootReducer = combineReducers({
  userConnection: userConnectionReducer,
  chapters: chaptersReducer,
});

// Configuration de Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userConnection', 'chapters'], // Persiste seulement userConnection
};

// Créer le reducer persisté
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurer le store avec le reducer persisté
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions de redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Créer le persistor
export const persistor = persistStore(store);
export default store;
