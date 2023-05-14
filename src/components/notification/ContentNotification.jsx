/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import { getAllNotification, seeAllNotifi } from '~/apis/notification/notification.api'
import ReactTimeAgo from 'react-time-ago'
import { Link } from 'react-router-dom'
import { BiComment } from 'react-icons/bi'
import { IoMdHeart } from 'react-icons/io'
import { BsClipboardCheck } from 'react-icons/bs'

const ContentNotification = ({ showNotifi }) => {
  const [listNotification, setListNotification] = useState([])
  useEffect(() => {
    getAllNotification().then((res) => {
      if (res) {
        setListNotification(res.data)
      }
    })
  }, [showNotifi])

  const iconType = (itemNotifi) => {
    let icon = <div></div>
    switch (itemNotifi?.type) {
      case 'LIKE':
        // eslint-disable-next-line no-const-assign
        icon = (
          <div className="icon icon--like">
            <IoMdHeart />
          </div>
        )
        break

      case 'COMMENT':
        // eslint-disable-next-line no-const-assign
        icon = (
          <div className="icon icon--comment">
            <BiComment />
          </div>
        )
        break

      case 'TASK':
        // eslint-disable-next-line no-const-assign
        icon = (
          <div className="icon icon--task">
            <BsClipboardCheck />
          </div>
        )
        break

      default:
        break
    }
    return icon
  }

  const seeAllNotificaiton = () => {
    seeAllNotifi().then((res) => res)
  }

  return (
    <div css={cssNotifi}>
      <div className="heading">
        <h1>THÔNG BÁO</h1>
        <div className="see-all" onClick={seeAllNotificaiton}>
          Đọc tất cả
        </div>
      </div>
      <div className="list-notification">
        {listNotification?.map((itemNoti) => (
          <a href={itemNoti.link} className="item-notifi" key={itemNoti._id}>
            <div className="avatar">
              <Avatar size={60} src={process.env.REACT_APP_LINK_IMAGES + itemNoti.from?.avatar} />
              {iconType(itemNoti)}
            </div>
            <div className="content-notifi">
              <div className="body-notifi">
                <strong>{itemNoti.from.fullName}</strong> {itemNoti.body}
              </div>
              <div className="date-notifi">
                <ReactTimeAgo date={new Date(itemNoti.createdAt)} locale="en-US" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ContentNotification

const cssNotifi = css`
  width: 300px;
  max-height: 600px;
  display: flex;
  flex-direction: column;

  .heading {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;

    h1 {
      font-weight: 700;
      font-size: 20px;
    }

    .see-all {
      cursor: pointer;
    }
  }

  .list-notification {
    overflow-y: auto;
    flex: 1;
    .item-notifi {
      padding: 10px;
      display: flex;
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-gray-cloud);
      }

      .avatar {
        position: relative;
        .icon {
          position: absolute;
          top: 65%;
          right: 0;
          padding: 5px;
          color: white;
          border-radius: 50px;

          &--like {
            background-color: var(--color-menu-main);
          }

          &--comment {
            background-color: var(--color-active-200);
          }

          &--task {
            background-color: var(--color-black);
          }
        }
      }

      .content-notifi {
        margin-left: 8px;
        .body-notifi {
        }

        .date-notifi {
          margin-top: 5px;
          font-size: 12px;
          color: var(--color-gray);
        }
      }
    }
  }
`
