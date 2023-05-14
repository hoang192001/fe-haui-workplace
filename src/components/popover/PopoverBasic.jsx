/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Popover } from "antd";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";
import { deleteComment } from "~/apis/comment/comment.api";

export const PopoverBasic = ({
  trigger = "click",
  itemComment,
  callBackComment,
  children,
}) => {
  return (
    <Popover
      placement="rightTop"
      content={
        <ContentPopover
          itemComment={itemComment}
          callBackComment={callBackComment}
        />
      }
      arrow={true}
      trigger={trigger}
    >
      {children}
    </Popover>
  );
};

const ContentPopover = ({ itemComment, callBackComment }) => {
  const handleDeleteComment = () => {
    deleteComment(itemComment.postId, itemComment._id).then((res) => {
      if (res) {
        callBackComment();
      }
    });
  };
  return (
    <div css={cssConent}>
      <div className="item">
        <BsFillPencilFill />
        <span>Chỉnh sửa</span>
      </div>
      <div className="item" onClick={handleDeleteComment}>
        <BsXLg />
        <span>Xóa</span>
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
