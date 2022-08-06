import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import songReducer from '@/features/Song/SongSlice';
import authReducer from '@/features/Authen/AuthSlice';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const songPersistConfig = {
    ...persistCommonConfig,
    key: 'song',
    whitelist: ['index', 'playlist', 'linkSong', 'recentSongs', 'isRepeat', 'isRandom'],
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfor'],
};

export const store = configureStore({
    reducer: {
        song: persistReducer(songPersistConfig, songReducer),
        user: persistReducer(userPersistConfig, authReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST],
            },
        }).concat(thunk),
});

export const persistor = persistStore(store);
