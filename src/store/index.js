import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/auth";
import articleReducer from "../slice/article";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    article: articleReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
