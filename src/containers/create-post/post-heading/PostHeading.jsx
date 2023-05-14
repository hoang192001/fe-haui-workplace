/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Divider } from "antd";
import {
  BsCamera,
  BsCardImage,
  BsCameraVideo,
  BsFillBriefcaseFill,
} from "react-icons/bs";

export const PostHeading = ({ setIsOpenModal }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  return (
    <div id="createPost" css={createPost}>
      <div css={headingCreate}>
        <img
          src={process.env.REACT_APP_LINK_IMAGES + userInfo?.avatar}
          alt="#"
        />
        <div className="title" onClick={() => setIsOpenModal(true)}>
          Bạn đang nghĩ gì?
        </div>
      </div>
      <Divider />
      <div css={footerCreate}>
        <div className="icon-create">
          <BsCamera />
        </div>
        <div className="icon-create">
          <BsCardImage />
        </div>
        <div className="icon-create">
          <BsCameraVideo />
        </div>
        <div className="icon-create">
          <BsFillBriefcaseFill />
        </div>
      </div>
    </div>
  );
};

const createPost = css`
  padding: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
  border: 1px solid var(--color-gray-cloud);
`;
const headingCreate = css`
  display: flex;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .title {
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-left: 10px;
    width: 100%;
    background-color: var(--color-gray-cloud);
    color: var(--color-gray);
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--color-menu-main);
      color: var(--color-white);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;
const footerCreate = css`
  display: flex;
  align-items: center;

  .icon-create {
    font-size: 24px;
    color: var(--color-menu-main-hover);
    margin-right: 15px;
  }
`;
