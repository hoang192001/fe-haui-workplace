/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Progress, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { Fragment } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const TaskWork = ({ itemBoard, itemTaskWork, index, setIsOpenModalTask, selectTaskDetail }) => {
  const showTahPriority = (type) => {
    let element = <></>
    switch (type) {
      case 'LOW':
        element = <Tag color="green">Thấp</Tag>
        break
      case 'MEDIUM':
        element = <Tag color="yellow">Trung Bình</Tag>
        break
      case 'HIGH':
        element = <Tag color="red">Cao</Tag>
        break
      case 'HOTFIX':
        element = <Tag color="red">Nghiêm trọng</Tag>
        break
      default:
        break
    }

    return element
  }

  return (
    <Draggable draggableId={itemTaskWork?._id} index={index}>
      {(provided, snapshot) => (
        <div
          css={cssItemTask}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => selectTaskDetail(itemTaskWork)}
        >
          <div className="setting-tag">
            {itemTaskWork.priority ? (
              showTahPriority(itemTaskWork.priority)
            ) : (
              <Fragment>
                <Tag color="green">Development</Tag>
                <Tag color="cyan">Business</Tag>
                <Tag color="blue">Marketing</Tag>
              </Fragment>
            )}
          </div>
          <div className="heading">{itemTaskWork?.title}</div>
          <div className="description">{itemTaskWork?.description}</div>
          <div className="time-task">
            {!itemTaskWork?.timeDeadline
              ? 'Chưa xét timeline'
              : dayjs(itemTaskWork?.timeDeadline).format('DD/MM/YYYY HH:mm')}
          </div>
          <div className="progress">
            <Progress
              percent={itemTaskWork?.progress}
              // strokeColor={{
              //   '0%': '#4096ff',
              //   '60%': '#ffec3d',
              //   '100%': '#73d13d',
              // }}
            />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskWork

const cssItemTask = css`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--color-gray-100);
  border-radius: 10px;
  background-color: var(--color-white);

  .setting-tag {
    display: flex;
    align-items: center;

    .item-tag {
      color: var(--color-gray-rain);
      font-size: 14px;
      margin-right: 5px;
      padding: 5px 10px;
      border-radius: 50px;
      border: 1px solid var(--color-gray-200);
    }
  }

  .heading {
    margin: 10px 0;
    font-weight: 700;
    font-size: 18px;
  }

  .description {
    margin-bottom: 10px;
    color: var(--color-gray-rain);
    font-size: 14px;
  }

  .time-task {
    font-weight: 500;
    width: max-content;
    background-color: var(--color-gray-cloud);
    font-size: 14px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 5px 10px;
  }
`
