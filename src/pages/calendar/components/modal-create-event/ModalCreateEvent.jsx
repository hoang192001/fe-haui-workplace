/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { DatePicker, Modal, Switch, TimePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai'
import { useState } from 'react'
import { eventDefault } from '../../BigCalendar'
import { DeleteOutlined } from '@ant-design/icons'

const ModalCreateEvent = ({
  isOpenModal,
  setIsOpenModal,
  startDate,
  endDate,
  onChangeDateStart,
  onChangeDateEnd,
  handleCreateEvent,
  handleChangeSwitch,
  event,
  setEvent,
  activeChange,
  setActiveChange,
  handleDeleteEvent,
}) => {
  return (
    <Modal
      open={isOpenModal}
      onOk={handleCreateEvent}
      //   confirmLoading={confirmLoading}
      onCancel={() => {
        setIsOpenModal(false), setEvent(eventDefault), setActiveChange(false)
      }}
      width={600}
      okText={activeChange ? 'Lưu thay đổi' : 'Tạo mới'}
      css={() => `
        .ant-btn-primary {
          background-color: var(--color-menu-main);
        }
      `}
    >
      <div css={cssEvent}>
        <div className="flex">
          <div className="heading-top">
            <div className="icon">
              <AiFillCalendar />
            </div>
            <div className="heading-title">Sự kiện</div>
          </div>
          {activeChange && (
            <div
              className="bg-red-200 text-red-600 ml-4 p-2 rounded-md cursor-pointer"
              onClick={handleDeleteEvent}
            >
              <div className="icon text-xs">
                <DeleteOutlined />
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          className="input-title"
          placeholder="Thêm tiêu đề cho sự kiện này"
          value={event.title}
          onChange={(e) =>
            setEvent((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <div className="setting-date-time">
          <div className="left">
            <div className="item-date">
              <AiFillClockCircle className="text-blue-400" />
              Bắt đầu
              <DatePicker
                showTime={!event.allDay}
                value={dayjs(startDate)}
                onChange={(value) => onChangeDateStart(value, event.allDay)}
                format={`${event.allDay ? 'DD-MM-YYYY' : 'DD-MM-YYYY HH:mm'}`}
              />
            </div>
            <div className="item-date">
              <AiFillClockCircle className="text-yellow-400" />
              Kết thúc
              <DatePicker
                showTime={!event.allDay}
                value={dayjs(endDate)}
                onChange={(value) => onChangeDateEnd(value, event.allDay)}
                format={`${event.allDay ? 'DD-MM-YYYY' : 'DD-MM-YYYY HH:mm'}`}
              />
            </div>
          </div>
          <div className="right">
            <Switch onChange={handleChangeSwitch} checked={event.allDay} />
            <div className="text">Cả ngày</div>
          </div>
        </div>
        <div className="content-event">
          <TextArea
            rows={4}
            placeholder="Nhập nội dung sự kiện"
            value={event.desc}
            onChange={(e) =>
              setEvent((prev) => ({
                ...prev,
                desc: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </Modal>
  )
}

export default ModalCreateEvent

const cssEvent = css`
  .heading-top {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 8px 12px;
    width: max-content;
    border-radius: 50px;
    background-color: var(--color-active-message);
    color: var(--color-blue-blur);

    .heading-title {
      margin-left: 10px;
      font-weight: 600;
    }
  }

  .input-title {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid var(--color-active-message);
  }

  .setting-date-time {
    display: flex;
    align-items: center;
    width: 100%;

    .left {
      width: 100%;
      .item-date {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .right {
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;

      .text {
        font-size: 16px;
        font-weight: 500;
        margin-left: 10px;
      }
    }
  }

  .content-event {
    margin: 10px 0;
  }
`
