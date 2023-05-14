import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/store/user-reducer/userSlice";
import socketReducer from "~/store/socket-reducer/socketSlice";
import postReducer from "~/store/post-reducer/postSlice";
import messageSlice from "./message-reducer/messageSlice";
import taskSlice from "./task-reducer/taskSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    post: postReducer,
    chat: messageSlice,
    task: taskSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
