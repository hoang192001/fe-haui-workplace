/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { RxDotsHorizontal } from 'react-icons/rx'
import TaskWork from '../task-work/TaskWork'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Button, Popover, Tag, Tooltip } from 'antd'
import { useState } from 'react'
import { deleteSection, updateSection } from '~/apis/task-work/section.api'

const TaskBoard = ({
  itemBoard,
  listTask,
  index,
  handleAddTask,
  section,
  setIsOpenModalTask,
  selectTaskDetail,
  callBackBoardDetail,
}) => {
  const [activeChange, setActiveChange] = useState(false)
  const [sectionTitle, setSectionTitle] = useState(itemBoard)

  const handleSaveTitleSection = () => {
    updateSection(section._id, { title: sectionTitle }).then((res) => {
      setActiveChange(false)
      callBackBoardDetail()
    })
  }

  const PopupChangeMember = ({ sectionId }) => {
    const handleDeleteSection = (sectionId) => {
      deleteSection(sectionId).then((res) => {
        callBackBoardDetail()
      })
    }
    return (
      <div className="">
        <div css={cssChangeMember} onClick={() => setActiveChange(true)}>
          Chỉnh sửa
        </div>
        <div
          css={cssChangeMember}
          onClick={() => handleDeleteSection(sectionId)}
          className="text-red-500"
        >
          Xóa mục
        </div>
      </div>
    )
  }

  return (
    <Draggable draggableId={itemBoard} index={index}>
      {(provided, snapshot) => (
        <div css={cssBoard} ref={provided.innerRef} {...provided.draggableProps}>
          <div className="setup-heading" {...provided.dragHandleProps}>
            <div className="name">
              <Tooltip title={sectionTitle}>
                <input
                  className={`section-title ${
                    activeChange ? 'bg-slate-200 w-[200px]' : 'w-[150px]'
                  }`}
                  readOnly={!activeChange}
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
              </Tooltip>
              {!activeChange && (
                <Tag color="purple" className="board-count">
                  {listTask?.length}
                </Tag>
              )}
            </div>
            {activeChange ? (
              <Button type="primary" className="ml-2 bg-green-500" onClick={handleSaveTitleSection}>
                Lưu
              </Button>
            ) : (
              <div className="setting">
                <div className="plus-add" onClick={() => handleAddTask(section._id)}>
                  <AiOutlinePlus />
                </div>
                <Popover
                  content={<PopupChangeMember sectionId={section._id} />}
                  placement={'bottomLeft'}
                  trigger="click"
                >
                  <div className="dot-setting ml-2">
                    <RxDotsHorizontal />
                  </div>
                </Popover>
              </div>
            )}
          </div>
          <Droppable droppableId={itemBoard} type="TASK">
            {(provided) => (
              <div className="list-task">
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // {...provided.dragHandleProps}
                  className="h-full min-h-[200px]"
                >
                  {listTask?.map((item, index) => (
                    <TaskWork
                      key={item._id}
                      itemBoard={itemBoard}
                      itemTaskWork={item}
                      index={index}
                      setIsOpenModalTask={setIsOpenModalTask}
                      selectTaskDetail={selectTaskDetail}
                    />
                  ))}
                </div>
              </div>
            )}
          </Droppable>
          <div className="button-add" onClick={() => handleAddTask(section._id)}>
            <div className="title">Thêm mới công việc</div>
            <div className="icon ml-2">
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskBoard

const cssBoard = css`
  display: flex;
  flex-direction: column;
  height: max-content;
  min-height: 200px;
  margin-right: 20px;
  background-color: var(--color-white);
  width: 300px;
  padding: 16px;
  border-radius: 10px;
  min-width: 300px;

  .setup-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      display: flex;
      align-items: center;

      .section-title {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 5px;
        padding: 5px;
        font-size: 18px;
      }

      .board-count {
        margin-left: 10px;
      }
    }

    .setting {
      display: flex;
      align-items: center;
      cursor: pointer;

      & > * {
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s ease;
        &:hover {
          background-color: var(--color-gray-cloud);
        }
      }
    }
  }

  .list-task {
    margin: 10px 0;
    max-height: 550px;
    overflow-y: auto;
  }

  .button-add {
    margin-top: auto;
    font-size: 16px;
    border-radius: 5px;
    border: 2px dashed var(--color-gray-200);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: var(--color-menu-main);
      border: 2px dashed var(--color-menu-main);
    }
  }
`
const cssChangeMember = css`
  width: 180px;
  cursor: pointer;
  padding: 5px 10px;
`
