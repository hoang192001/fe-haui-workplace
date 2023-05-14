/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar } from 'antd'
import Linkify from 'react-linkify'

const MessageChat = ({ itemChat, listMessageChat, indexMessage, isUserSender = false }) => {
  return (
    <div css={cssMessageChat(isUserSender)}>
      <div className="sender-avatar">
        {/* {listMessageChat.length - 1 === indexMessage && !isUserSender && (
          <Avatar size={30} src={process.env.REACT_APP_LINK_IMAGES + itemChat?.author.avatar} />
        )} */}
        <Avatar size={30} src={process.env.REACT_APP_LINK_IMAGES + itemChat?.author.avatar} />
      </div>
      <Linkify
        properties={{ target: '_blank', style: { color: 'red !important', fontWeight: 'bold' } }}
      >
        <div className="body">
          <div className="body-name">{itemChat?.author.fullName}</div>
          {itemChat.payload.type === 'image' ? (
            <img src={process.env.REACT_APP_LINK_IMAGES + itemChat.payload.body} alt="#" />
          ) : (
            <div className="body-text">{itemChat.payload.body}</div>
          )}
        </div>
      </Linkify>
    </div>
  )
}

export default MessageChat

const cssMessageChat = (isUserSender) => css`
  display: flex;
  ${isUserSender ? 'justify-content: flex-end;' : ''}

  margin-top: 5px;

  .sender-avatar {
    display: flex;
    align-items: flex-end;
    ${isUserSender ? 'width: 0px;' : ' width: 30px;'}
  }

  .body {
    img {
      width: 200px;
      
      ${isUserSender ? 'margin-right: 10px;' : ' margin-left: 10px;'}
    }
    .body-name {
      font-size: 14px;
      font-weight: 700;
      ${isUserSender ? 'display:none;' : 'margin-left: 10px;'}
    }

    .body-text {
      font-size: 18px;
      border-radius: 30px;
      padding: 0.5rem 0.7rem;
      ${isUserSender
        ? 'background-color: var(--color-active-message);  margin-right: 8px;'
        : 'background-color: var(--color-white);  margin-left: 8px;'}
    }
  }
`
