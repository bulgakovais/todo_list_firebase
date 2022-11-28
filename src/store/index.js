import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { todoReducer } from "./todo/reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//создаем конфигурацию, по которой будут сохраняться данные в хранилище
const config = {
    key: 'root',
    storage, // по умолчанию это localStorage в браузере
}

const persistedReducer = persistReducer(config, combineReducers({
    todos: todoReducer,
}))

// создаем store с использованием persistedReducer
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store)