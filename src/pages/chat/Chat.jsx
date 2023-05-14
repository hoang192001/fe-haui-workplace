/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { fetchAllConversation } from '~/store/message-reducer/messageSlice'
import ListConversation from './components/list-conversation/ListConversation'

const Chat = () => {
  const userIdLocal = localStorage.getItem('userId')
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllConversation(userIdLocal))
  }, [dispatch, userIdLocal])
  return (
    <div css={cssChatAll}>
      <Helmet>
        <title>List Chat</title>
      </Helmet>
      <div className="sidebar-menu">
        <ListConversation />
      </div>
      <div className="detail-conversation">
        <Outlet />
      </div>
    </div>
  )
}

export default Chat

const cssChatAll = css`
  .sidebar-menu {
    padding-top: 70px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    background: #fff;
    border-right: 1px solid #e3e3e3;
    box-shadow: 0 5px 25px 0 rgb(0 0 0 / 9%);
    z-index: 10;
    transition: transform 0.3s;
  }

  .detail-conversation {
    padding-left: 400px;
  }
`
