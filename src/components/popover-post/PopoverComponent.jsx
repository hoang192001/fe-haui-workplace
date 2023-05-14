/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Popover } from "antd";
import { BsFillPencilFill, BsXLg, BsFillBookmarkFill } from "react-icons/bs";
import React, { useContext } from "react";
import { deletePost } from "~/apis/post/post.api";
import { useDispatch } from "react-redux";
import { fetchAllPost } from "~/store/post-reducer/postSlice";
import { PostContext } from "~/context/postContext";

export const PopoverComponent = ({
  trigger = "click",
  userPost,
  itemPost,
  children,
}) => {
  return (
    <Popover
      placement="rightTop"
      content={<ContentPopover userPost={userPost} itemPost={itemPost} />}
      arrow={true}
      trigger={trigger}
    >
      {children}
    </Popover>
  );
};

const ContentPopover = ({ userPost, itemPost }) => {
  let dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const { setPostDetail } = useContext(PostContext)

  const handleChangePost = () => {
    setPostDetail(itemPost)
  }

  const handleDetelePost = () => {
    deletePost(itemPost._id).then((res) => {
      if (res) {
        //
        dispatch(fetchAllPost())
      }
    });
  };

  return (
    <div css={cssConent}>
      {userPost._id === userId && (
        <>
          <div className="item" onClick={handleChangePost}>
            <BsFillPencilFill />
            <span>Chỉnh sửa bài viết</span>
          </div>
          <div className="item" onClick={handleDetelePost}>
            <BsXLg />
            <span>Xóa bài viết</span>
          </div>
        </>
      )}
      <div className="item">
        <BsFillBookmarkFill />
        <span>Lưu bài viết</span>
      </div>
    </div>
  );
};

const cssConent = css`
  .item {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-gray-cloud);
    }

    span {
      margin-left: 10px;
    }
  }
`;
