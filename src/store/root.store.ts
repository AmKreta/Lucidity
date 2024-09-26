import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import inventoryStore from './inventory/inventory.store';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userStore from './user/user.store';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    inventory: inventoryStore,
    user: userStore
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    middleware:(getDefaultMiddleware)=>{
        const middlewareList = [...getDefaultMiddleware({serializableCheck:false})];
        if (process.env.NODE_ENV !== 'production') {
            middlewareList.push(logger);
        }
        return new Tuple(...middlewareList);
    },
    reducer: persistedReducer,
    devTools:true
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;