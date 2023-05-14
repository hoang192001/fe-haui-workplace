/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { arrayMoveImmutable } from 'array-move'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskBoard from '~/components/task-board/TaskBoard'
// import { data } from '../main'
import { AntDesignOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Avatar, Button, Popover, Rate, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsEmojiSmile, BsPencilFill } from 'react-icons/bs'
import { RxTriangleDown } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteBoard, getDetailBoard, updateBoard } from '~/apis/task-work/board.api'
import { createSection, updatePositionSection } from '~/apis/task-work/section.api'
import {
  createTaskSection,
  deleteTask,
  updatePositionTask,
  updateTaskWork,
} from '~/apis/task-work/task.api'
import ModalDelete from '~/components/modal-confirm-delete/ModalDeleteChat'
import { fetchAllBoard } from '~/store/task-reducer/taskSlice'
import { reorderQuoteMap } from '~/utils/move-array'
import ModalTaskWork from './ModalTaskWork'
import ModalInviteBoard from '~/components/modal-invite-board/ModalInviteBoard'

const AllListWork = () => {
  const { boardId } = useParams()
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const userLocal = localStorage.getItem('userId')
  const [columns, setColumns] = useState([])
  const [listTask, setListTask] = useState({})
  const [sections, setSections] = useState([])
  const [isOpenModalTask, setIsOpenModalTask] = useState(false)
  const [dataTask, setDataTask] = useState({
    title: '',
    timeDeadline: '',
    priority: '',
    progress: 0,
    description: '',
  })
  const [board, setBoard] = useState({})
  const [titleBoard, setTitleBoard] = useState('')
  const [activeChangeTitle, setActiveChangeTitle] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalInvite, setOpenModalInvite] = useState(false)

  const callBackBoardDetail = useCallback(() => {
    getDetailBoard(boardId).then(
      (res) => {
        setBoard(res.data)
        setTitleBoard(res.data?.title)
        setSections(res.data.sections)
        const arrayKey = res.data.sections.flatMap((item) => item.title)
        setColumns(arrayKey)

        const arrayListTask = res.data.sections.reduce((cur, acc) => {
          return { ...cur, [acc.title]: acc.tasks }
        }, {})
        setListTask(arrayListTask)
      },
      (err) => {
        toast.error(err.response.data)
      },
    )
  }, [boardId])

  useEffect(() => {
    callBackBoardDetail()
  }, [callBackBoardDetail])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const source = result.source
    const destination = result.destination

    if (result.type === 'COLUMN') {
      const dataRequest = {
        sourceId: source.index,
        destinationId: destination.index,
        boardId,
      }
      updatePositionSection(boardId, dataRequest).then((res) => {
        if (res) {
          toast.success('Đã cập nhật vị trí')
          callBackBoardDetail()
        }
      })
      const reorderedorder = arrayMoveImmutable(columns, source.index, destination.index)

      setColumns(reorderedorder)
      return
    }

    const data = reorderQuoteMap({
      quoteMap: listTask,
      source,
      destination,
    })

    const dataRequest = {
      resourceList: [...data[source.droppableId]],
      destinationList: [...data[destination.droppableId]],
      resourceSectionName: source.droppableId,
      destinationSectionName: destination.droppableId,
    }

    updatePositionTask(boardId, dataRequest).then((res) => {
      if (res) {
        toast.success('Đã cập nhật vị trí')
        callBackBoardDetail()
      }
    })

    setListTask(data.quoteMap)
  }

  const handleAddColumn = () => {
    createSection(boardId).then((res) => {
      if (res) {
        callBackBoardDetail()
      }
    })
  }

  const handleAddTask = (sectionId) => {
    createTaskSection(sectionId).then((res) => {
      if (res) {
        callBackBoardDetail()
      }
    })
  }

  const selectTaskDetail = (task) => {
    setIsOpenModalTask(true)
    setDataTask((prev) => ({
      ...prev,
      ...task,
    }))
  }

  const handleSaveChangeTask = () => {
    updateTaskWork(dataTask._id, dataTask).then((res) => {
      if (res) {
        toast.success('Đã lưu lại thành công')
        callBackBoardDetail()
        setIsOpenModalTask(false)
      }
    })
  }

  const handleSaveChangeTitleBoard = (type, value) => {
    if (type === 'title') {
      updateBoard(board._id, { title: titleBoard }).then((res) => {
        if (res) {
          setActiveChangeTitle(false)
          toast.success('Cập nhật thành công')
          callBackBoardDetail()
          dispatch(fetchAllBoard())
        }
      })
    } else {
      updateBoard(board._id, { favourite: value }).then((res) => {
        if (res) {
          setActiveChangeTitle(false)
          toast.success('Cập nhật thành công')
          callBackBoardDetail()
          dispatch(fetchAllBoard())
        }
      })
    }
  }

  const handleDeleteTask = () => {
    deleteTask(dataTask._id).then((res) => {
      if (res) {
        setIsOpenModalTask(false)
        callBackBoardDetail()
      }
    })
  }

  const handleSubmitDelete = () => {
    deleteBoard(board._id).then((res) => {
      toast.info('Đã xóa mục')
      setOpenModalDelete(false)
      navigate('/task')
      dispatch(fetchAllBoard())
    })
  }

  return (
    <div css={cssBoard}>
      <Helmet>
        <title>{`Task work | ${board?.title}`}</title>
      </Helmet>
      <div className="nav-header">
        <div className="flex items-center">
          <Popover content={<Picker data={data} />} title="Biểu tượng cảm xúc" trigger="click">
            <div className="item-action-emoji flex items-center">
              <BsEmojiSmile />
              <RxTriangleDown />
            </div>
          </Popover>
          <input
            className={`title-board ${activeChangeTitle ? 'bg-slate-200' : ''}`}
            value={titleBoard}
            readOnly={!activeChangeTitle}
            onChange={(e) => setTitleBoard(e.target.value)}
          />
          <div className="favourite">
            <Rate
              count={1}
              value={board?.favourite}
              onChange={(value) => handleSaveChangeTitleBoard('star', value)}
            />
          </div>
          {activeChangeTitle ? (
            <Button
              type="primary"
              className="ml-2 bg-green-500"
              onClick={() => handleSaveChangeTitleBoard('title')}
            >
              Lưu
            </Button>
          ) : (
            <div className="ml-4 cursor-pointer" onClick={() => setActiveChangeTitle(true)}>
              <BsPencilFill />
            </div>
          )}
          <div className="flex items-center ml-4">
            <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {board?.members?.map((itemUser) => (
                <Avatar
                  src={process.env.REACT_APP_LINK_IMAGES + itemUser?.avatar}
                  key={itemUser._id}
                />
              ))}
            </Avatar.Group>
            {board.user === userLocal && (
              <Button type="primary" className="ml-2" onClick={() => setOpenModalInvite(true)}>
                + Thêm
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="item-setting text-red-500" onClick={() => setOpenModalDelete(true)}>
            <DeleteOutlined />
          </div>
          <div className="button-add-section" onClick={handleAddColumn}>
            <div className="item-action">
              <AiOutlinePlus />
            </div>
            Thêm cột công việc
          </div>
        </div>
      </div>
      <div className="list-task">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided) => (
              <div css={cssListBoard} ref={provided.innerRef} {...provided.droppableProps}>
                {columns.map((item, index) => (
                  <TaskBoard
                    key={item}
                    itemBoard={item}
                    index={index}
                    listTask={listTask[item]}
                    handleAddTask={handleAddTask}
                    section={sections[index]}
                    setIsOpenModalTask={setIsOpenModalTask}
                    selectTaskDetail={selectTaskDetail}
                    callBackBoardDetail={callBackBoardDetail}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <ModalTaskWork
        setIsOpenModalTask={setIsOpenModalTask}
        isOpenModalTask={isOpenModalTask}
        setDataTask={setDataTask}
        dataTask={dataTask}
        handleSaveChangeTask={handleSaveChangeTask}
        handleDeleteTask={handleDeleteTask}
        board={board}
      />
      <ModalDelete
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
      <ModalInviteBoard
        setOpenModalInvite={setOpenModalInvite}
        openModalInvite={openModalInvite}
        boardId={boardId}
        callBack={callBackBoardDetail}
      />
    </div>
  )
}

export default AllListWork

const cssListBoard = css`
  display: flex;
`

const cssBoard = css`
  height: 100%;
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 16px;
    background-color: var(--color-white);
    border-radius: 10px;

    .title-board {
      border-radius: 5px;
      padding: 5px;
      font-weight: 700;
      margin-left: 16px;
      font-size: 18px;
      width: 200px;
    }

    .favourite {
      margin-left: 10px;
    }

    .item-action-emoji {
      padding: 5px;
      transition: all 0.5s ease;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-gray-cloud);
      }
    }

    .item-setting {
      display: flex;
      align-items: center;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: var(--color-gray-cloud);
      }
    }

    .button-add-section {
      display: flex;
      align-items: center;
      padding: 5px 16px;
      border: 1px solid var(--color-menu-main);
      color: var(--color-blue-blur);
      border-radius: 5px;
      margin-left: 20px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.5s ease;
      font-weight: 500;

      .item-action {
        margin-right: 10px;
      }

      &:hover {
        background-color: var(--color-active-message);
      }
    }
  }

  .list-task {
    flex: 1;
    overflow-x: auto;
    padding-bottom: 20px;
    height: 100%;
  }
`
