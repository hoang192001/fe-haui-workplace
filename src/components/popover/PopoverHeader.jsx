/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Popover } from 'antd'
import { FiLogOut } from 'react-icons/fi'
import { BiUser } from 'react-icons/bi'
import { TfiExchangeVertical } from 'react-icons/tfi'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const PopoverHeader = ({ trigger = 'click', children }) => {
  return (
    <Popover
      placement="bottomRight"
      content={<ContentPopover/>}
      arrow={true}
      trigger={trigger}
    >
      {children}
    </Popover>
  )
}

const ContentPopover = () => {
  const userSystem = JSON.parse(localStorage.getItem('userInfo'))
  let navigate = useNavigate()
  const handleLogoutSystem = () => {
    navigate('/login')
    localStorage.clear()
  }

  return (
    <div css={cssConent} >
      <Link to={'/profile/' + userSystem?._id} className="item">
        <BiUser />
        <span>Xem trang cá nhân</span>
      </Link>
      <Link to={'/setting-profile'} className="item">
        <TfiExchangeVertical />
        <span>Cài đặt tài khoản</span>
      </Link>

      <div className="item" onClick={handleLogoutSystem}>
        <FiLogOut />
        <span>Đăng Xuất</span>
      </div>
    </div>
  )
}

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
`
