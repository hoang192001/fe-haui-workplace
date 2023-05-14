/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, Divider } from 'antd'
import { RxDotFilled } from 'react-icons/rx'
import { SiRedux } from 'react-icons/si'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ButtonSquare from '~/components/button/ButtonSquare'
import { useEffect, useState } from 'react'
import { getAllUser } from '~/apis/user/user.api'
import { getAllGroup } from '~/apis/group/group.api'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAllConversation } from '~/store/message-reducer/messageSlice'

export const RightHome = () => {
  let dispatch = useDispatch()
  const userIdLocal = localStorage.getItem('userId')
  const [listUser, setListUser] = useState([])
  const [listGroup, setListGroup] = useState([])
  const listConversation = useSelector((state) => state.chat.allConversation)

  useEffect(() => {
    getAllUser().then((res) => {
      if (res) {
        const dataFilter = res.data.filter((item) => item._id !== userIdLocal)
        setListUser(dataFilter)
      }
    })
    dispatch(fetchAllConversation(userIdLocal))
  }, [])

  return (
    <div css={rightHomeCss}>
      <Divider orientation="left">Contacts</Divider>
      <div className="contacts">
        <Link to="/bot-chat" className="flex justify-center mb-2">
          <ButtonSquare className="flex items-center">
            <SiRedux className="mr-2" />
            <span>Bot Chat AI</span>
          </ButtonSquare>
        </Link>
        {listUser?.map((itemUser) => (
          <Link to={`/profile/${itemUser._id}`} className="menu-item" key={itemUser._id}>
            <Avatar size={45} src={process.env.REACT_APP_LINK_IMAGES + itemUser.avatar} />
            <span>{itemUser?.fullName}</span>
            <div className="active-online">
              <RxDotFilled />
            </div>
          </Link>
        ))}
      </div>
      <Divider orientation="left">Groups</Divider>
      <div className="contacts">
        {listConversation.filter(item => item.typeConversation === 'group')?.map((itemGroup) => (
          <Link to={`/chat/${itemGroup._id}`} className="menu-item" key={itemGroup._id}>
            <Avatar size={45} src={process.env.REACT_APP_LINK_IMAGES + itemGroup.avatarGroup} />
            <span>{itemGroup?.nameGroup}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

const rightHomeCss = css`
  .menu-item {
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 10px;
    transition: all 0.3s ease;

    .active-online {
      margin-left: auto;
      font-size: 20px;
    }

    span {
      margin-left: 10px;
    }

    svg path {
      color: var(--color-active);
    }

    &:hover,
    &:hover svg path {
      background-color: var(--color-active-message);
    }
  }
`
