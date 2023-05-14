/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Divider } from 'antd'
import { ReactComponent as IconHome } from '~/assets/icons/icon-home.svg'
import { HiUsers } from 'react-icons/hi'
import { FaTasks } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BsClipboardCheck } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllGroup } from '~/apis/group/group.api'

export const ContentLeft = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const listBoard = useSelector((state) => state.task.boards)
  const [listGroup, setListGroup] = useState([])
  useEffect(() => {
    getAllGroup().then((res) => {
      if (res) {
        setListGroup(res.data)
      }
    })
  }, [])

  const handleScrollTop = () => {
    const headerElement = document.getElementById('createPost')
    headerElement.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div css={cssLeft}>
      <div className="content-info">
        <Divider orientation="left">Trang chủ</Divider>
        <div className="item-content" onClick={handleScrollTop}>
          <div className="menu-item">
            <IconHome />
            <span>Home page</span>
          </div>
        </div>
        <div className="item-content">
          <Link to={'/profile/' + userInfo?._id} className="menu-item">
            <img
              src={process.env.REACT_APP_LINK_IMAGES + userInfo?.avatar}
              alt=""
              className="avatar"
            />
            <span>{userInfo?.fullName}</span>
          </Link>
        </div>
        <Divider orientation="left">Quản lý công việc</Divider>
        <div className="item-content">
          <div className="menu-item">
            <FaTasks />
            <span>All task</span>
          </div>
          {listBoard?.map((itemBoard) => (
            <Link to={`/task/${itemBoard._id}`} className="menu-item" key={itemBoard._id}>
              <div className="icon">
                <BsClipboardCheck />
              </div>
              <div className="ml-4">{itemBoard?.title}</div>
            </Link>
          ))}
        </div>
        <Divider orientation="left">Nhóm của bạn</Divider>
        <div className="item-content">
          {listGroup?.map((itemGroup) => (
            <Link to={`/group/${itemGroup._id}`} className="menu-item" key={itemGroup._id}>
              <img
                src={process.env.REACT_APP_LINK_IMAGES + itemGroup.avatarGroup}
                alt=""
                className="avatar"
              />
              <span>{itemGroup?.nameGroup}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const cssLeft = css`
  .item-content {
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: var(--color-white);

    .menu-item {
      display: flex;
      align-items: center;
      padding: 20px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      color: var(--color-gray);
      transition: all 0.3s ease;

      span {
        margin-left: 10px;
      }

      svg path {
        fill: var(--color-gray);
      }

      &:hover {
        background-color: var(--color-active-message);
        color: var(--color-blue-blur);

        svg path {
          fill: var(--color-blue-blur);
        }
      }

      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
`
