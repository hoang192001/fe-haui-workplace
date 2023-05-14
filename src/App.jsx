import React, { Fragment, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import io from 'socket.io-client'
import { PostComponentDetail } from './components/post/PostComponentDetail'
import Spinner from './components/spinner/Spinner'
import LayoutMain from './layout/layout-main/LayoutMain'
import RequireAuth from './layout/require-auth/RequireAuth'
import PostDetail from './pages/bot-chat/PostDetail'
import BigCalendar from './pages/calendar/BigCalendar'
import Confirm from './pages/confirm/Confirm'
import GroupDetail from './pages/groups/group-detail/GroupDetail'
import LandingPage from './pages/landing-page/LandingPage'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import SettingUser from './pages/setting-user/SettingUser'
import TaskPage from './pages/task-work/TaskPage'
import AllListWork from './pages/task-work/components/AllListWork'
import { UserInfoLayout } from './pages/user-info/UserInfoLayout'
import { setSocket } from './store/socket-reducer/socketSlice'
import ForgotPassword from './pages/auth/forgot-password/ForgotPassword'

const HomePage = React.lazy(() => import('./pages/home/Home'))

const ChatPage = React.lazy(() => import('./pages/chat/Chat'))
const ChatDetailPage = React.lazy(() => import('./containers/detail-chat/DetailChat'))

const GroupPage = React.lazy(() => import('./pages/groups/list-group/GroupComponent'))
const MeetingGroupPage = React.lazy(() => import('./containers/meeting-group/MeetingGroup'))

export const socket = io(process.env.REACT_APP_API_SOCKET)
const App = () => {
  let dispatch = useDispatch()
  const userId = localStorage.getItem('userId')
  //connect socket
  useEffect(() => {
    dispatch(setSocket(socket))

    socket.emit('client-check-online', userId)
  }, [dispatch, userId])

  let routes = [
    { path: '/landing-page', element: <LandingPage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    {
      path: '/',
      element: (
        <RequireAuth>
          <LayoutMain />
        </RequireAuth>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          ),
          children: [
            {
              path: 'post/:postId',
              element: <PostComponentDetail />,
            },
          ],
        },
        {
          path: 'bot-chat',
          element: <PostDetail />,
        },
        {
          path: 'chat',
          element: (
            <Suspense fallback={<Spinner />}>
              <ChatPage />
            </Suspense>
          ),
          children: [
            {
              path: ':chatId',
              element: (
                <Suspense fallback={<Spinner />}>
                  <ChatDetailPage socket={socket} />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: 'meeting-group/:meetingId',
          element: (
            <Suspense fallback={<Spinner />}>
              <MeetingGroupPage />
            </Suspense>
          ),
        },
        {
          path: 'group',
          element: (
            <Suspense fallback={<Spinner />}>
              <GroupPage />{' '}
            </Suspense>
          ),
        },
        {
          path: 'group/:groupId',
          element: <GroupDetail />,
          children: [
            {
              path: 'post/:postId',
              element: <PostComponentDetail />,
            },
          ],
        },
        {
          path: 'task',
          element: <TaskPage />,
          children: [
            {
              path: ':boardId',
              element: <AllListWork socket={socket} />,
            },
          ],
        },
        {
          path: '/profile/:userId',
          element: <UserInfoLayout />,
          children: [
            {
              path: 'post/:postId',
              element: <PostComponentDetail />,
            },
          ],
        },
        {
          path: '/setting-profile',
          element: <SettingUser />,
        },
        {
          path: '/calendar',
          element: <BigCalendar />,
        },
      ],
    },

    { path: '*', element: <LayoutMain /> },
  ]

  let element = useRoutes(routes)
  return <Fragment>{element}</Fragment>
}

export default App
