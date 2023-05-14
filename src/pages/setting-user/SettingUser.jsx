/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Divider } from 'antd'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { MdArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
import ContentSetting from './components/content/Content'
import SideBarSetting from './components/side-bar/SideBarSetting'
import { FaUserFriends, FaImages, FaExchangeAlt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdSettings } from 'react-icons/io'
import ChangePassword from './components/change-password/ChangePassword'

const SettingUser = () => {
  const [dataInfoUser, setDataInfoUser] = useState({})
  const arrMenuUser = [
    {
      id: 1,
      icon: <IoMdSettings />,
      title: 'Sửa thông tin cá nhân',
      type: 'SETTING',
    },
    {
      id: 2,
      icon: <FaExchangeAlt />,
      title: 'Đổi mật khẩu',
      type: 'CHANGE_PASSWORD',
    },
    {
      id: 3,
      icon: <FaUserFriends />,
      title: 'Danh sách bạn bè',
      type: 'FRIENDS',
    },
    { id: 4, icon: <HiUserGroup />, title: 'Danh sách nhóm', type: 'GROUPS' },
    { id: 5, icon: <FaImages />, title: 'Thư viện ảnh', type: 'IMAGES' },
  ]

  const [menuItem, setMenuItem] = useState(arrMenuUser[0])

  const handleClickMenu = (idMenu) => {
    const element = arrMenuUser.find((item) => item.id === idMenu)
    setMenuItem(element)
  }

  return (
    <div css={cssSettingProfile}>
      <Helmet>
        <title>Setting Profile</title>
      </Helmet>
      <div className="sidebar-menu">
        <SideBarSetting
          dataInfoUser={dataInfoUser}
          arrMenuUser={arrMenuUser}
          handleClickMenu={handleClickMenu}
          menuItem={menuItem}
        />
      </div>
      <div className="main-selection">
        <div className="settings">
          <Link to={'/'} className="top-bar">
            <MdArrowBackIosNew />
            <span>Quay về trang chủ</span>
          </Link>
          <div className="setting-wrapper">
            <Divider style={{ fontSize: 20 }} orientation="left">
              Thông tin cá nhân
            </Divider>
            {menuItem.type === 'SETTING' && <ContentSetting setDataInfoUser={setDataInfoUser} />}
            {menuItem.type === 'CHANGE_PASSWORD' && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingUser

const cssSettingProfile = css`
  .sidebar-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 280px;
    background: #fff;
    border-right: 1px solid #e3e3e3;
    box-shadow: 0 5px 25px 0 rgb(0 0 0 / 9%);
    z-index: 10;
    transition: transform 0.3s;
  }
  .main-selection {
    position: relative;
    margin-left: 280px;
    width: calc(100% - 280px);
    padding-top: 1.5rem;

    .settings {
      max-width: 1040px;
      margin: 0 auto;

      .top-bar {
        display: flex;
        align-items: center;
        padding: 10px 0;
        span {
          margin-left: 10px;
        }
      }

      .setting-wrapper {
        margin: 20px 0;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
      }
    }
  }
`
