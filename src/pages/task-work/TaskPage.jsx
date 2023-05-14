/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { AiOutlineAppstore, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import AllListWork from './components/AllListWork'
import { Link, Outlet } from 'react-router-dom'
import { createBoard, getAllBoard } from '~/apis/task-work/board.api'
import { Rate } from 'antd'
import { BsClipboardCheck } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { fetchAllBoard } from '~/store/task-reducer/taskSlice'
import { useSelector } from 'react-redux'
import ButtonSquare from '~/components/button/ButtonSquare'

const TaskPage = () => {
  let dispatch = useDispatch()
  const [tab, setTab] = useState({})
  const listBoard = useSelector((state) => state.task.boards)

  const listMenu = [
    {
      id: 0,
      icon: <AiOutlineAppstore />,
      title: 'Tất cả công việc',
      component: <AllListWork />,
    },
    {
      id: 1,
      icon: <AiOutlineLeft />,
      title: 'Giao cho tôi',
      component: '',
    },
    {
      id: 2,
      icon: <AiOutlineRight />,
      title: 'Tạo bởi',
      component: '',
    },
  ]

  const handleChangeMenu = (tab) => {
    setTab(tab)
  }

  useEffect(() => {
    dispatch(fetchAllBoard())
  }, [dispatch])

  const handleCreateBoard = () => {
    createBoard().then((res) => {
      if (res) {
        dispatch(fetchAllBoard())
      }
    })
  }
  //   return <ReactQuill theme="snow" value={value} onChange={setValue} />
  return (
    <div css={cssTaskWork}>
      <Helmet>
        <title>Task work</title>
      </Helmet>
      <div className="sidebar-menu">
        <div className="heading">Quản lý công việc</div>
        <div className="list-menu">
          {listMenu.map((itemMenu) => (
            <div
              className={`item-menu ${tab.id === itemMenu.id ? 'active' : ''}`}
              key={itemMenu.id}
              onClick={() => handleChangeMenu(itemMenu)}
            >
              <div className="icon">{itemMenu.icon}</div>
              <div className="title">{itemMenu.title}</div>
            </div>
          ))}
        </div>
        <ButtonSquare className="mt-4 ml-6" onClick={handleCreateBoard}>
          Thêm mục công việc
        </ButtonSquare>
        <div className="heading">Danh sách quan trọng</div>
        <div className="list-board">
          {listBoard?.map((itemBoard) => (
            <Link to={`/task/${itemBoard._id}`} className="item-board" key={itemBoard._id}>
              <div className="icon">
                <BsClipboardCheck />
              </div>
              <div className="title">{itemBoard?.title}</div>
              <div className="favourite">
                <Rate count={1} value={itemBoard?.favourite} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="detail-task">
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default TaskPage

const cssTaskWork = css`
  height: calc(100vh - 121px);
  .sidebar-menu {
    display: flex;
    flex-direction: column;
    padding-top: 70px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 400px;
    background: #fff;
    border-right: 1px solid #e3e3e3;
    box-shadow: 0 5px 25px 0 rgb(0 0 0 / 9%);
    z-index: 10;
    transition: transform 0.3s;

    .heading {
      font-size: 24px;
      font-weight: 700;
      padding: 20px 30px;
    }

    .list-board {
      padding: 10px 25px;
      flex: 1 1 0%;
      overflow: auto;
      .item-board {
        padding: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid var(--color-menu-main);
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;
        margin-bottom: 10px;

        &:hover {
          background-color: var(--color-active-message);
        }
      }
    }

    .list-menu {
      padding: 16px;
      border-bottom: 1px solid var(--color-gray-cloud);

      .item-menu {
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 10px 25px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 500;
        margin-bottom: 10px;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: var(--color-gray-cloud);
        }

        &.active {
          color: var(--color-blue-blur);
          background-color: var(--color-active-message);
        }

        .icon {
          font-size: 20px;
        }

        .title {
          margin-left: 10px;
        }
      }
    }
  }

  .detail-task {
    margin-left: 400px;
    height: 100%;
  }
`
