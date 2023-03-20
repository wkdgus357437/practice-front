import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from '../member/store/AccessToken';

export default configureStore({
    reducer: {
        authToken: tokenReducer,
    },
});