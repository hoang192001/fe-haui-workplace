import { Avatar } from 'antd'
import { format } from 'date-fns'
import React, { Fragment } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { Link, useParams } from 'react-router-dom'

const ItemConversation = ({ itemConver, handleSelectConversation, indexConver }) => {
  const userIdLocal = localStorage.getItem('userId')
  const { chatId } = useParams()

  return (
    <Link
      to={`/chat/${itemConver._id}`}
      className={`item-conversation ${chatId === itemConver._id && 'activeChat'}`}
      onClick={() => handleSelectConversation(itemConver, indexConver)}
    >
      <div className="avatar">
        {itemConver.typeConversation === 'group' ? (
          <Avatar size={50} src={process.env.REACT_APP_LINK_IMAGES + itemConver?.avatarGroup} />
        ) : (
          <Avatar
            size={50}
            src={
              process.env.REACT_APP_LINK_IMAGES +
              itemConver?.members?.find((item) => item._id !== userIdLocal).avatar
            }
          />
        )}
      </div>
      <div className="content">
        <div className="info-conversation">
          <div className="name flex">
            {itemConver.typeConversation === 'group'
              ? itemConver.nameGroup
              : itemConver?.members?.find((item) => item._id !== userIdLocal)?.fullName}
            {itemConver?.members?.find((item) => item._id !== userIdLocal)?.isOnline && (
              <span className="flex items-center text-green-500">
                <RxDotFilled className="text-sm" />
              </span>
            )}
          </div>
          <div className="date-update">{format(new Date(itemConver.updatedAt), 'dd/MM/yyyy')}</div>
        </div>
        <div className="new-message">
          {itemConver?.newMessage && (
            <Fragment>
              {itemConver?.newMessage?.author?._id === userIdLocal
                ? 'Bạn: '
                : `${itemConver?.newMessage?.author?.fullName}: `}

              {itemConver?.newMessage?.payload?.type === 'text'
                ? itemConver?.newMessage?.payload?.body
                : 'Đã gửi 1 ảnh'}
            </Fragment>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ItemConversation
