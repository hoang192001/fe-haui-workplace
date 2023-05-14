import { axiosPrivate } from "../configHttp";

export const getAllCommentPost = async (postId) => {
  return await axiosPrivate.get("/comments/" + postId);
};

export const commentPost = async (postId, data) => {
  return await axiosPrivate.post("/comments/" + postId, data);
};

export const deleteComment = async (postId, commentId) => {
  return await axiosPrivate.delete("/comments/" + postId, {
    data: {
      commentId
    },
  });
};
