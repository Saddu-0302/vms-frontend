import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { visitorApi } from "./visitorApi";


const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [visitorApi.reducerPath]: visitorApi.reducer,
    },
    middleware: def => def().concat(userApi.middleware, visitorApi.middleware)
})

export default reduxStore