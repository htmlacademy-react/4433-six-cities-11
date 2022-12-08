import {store} from '../store/index.js';

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;
