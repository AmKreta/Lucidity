import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import inventoryStore from './inventory/inventory.store';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    inventory: inventoryStore
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