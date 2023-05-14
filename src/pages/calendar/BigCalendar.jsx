/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { Calendar as BigCalendarLib, Views, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import vi from 'date-fns/locale/vi'
import { Calendar } from 'antd'
import ModalCreateEvent from './components/modal-create-event/ModalCreateEvent'
import dayjs from 'dayjs'
import { changeEvent, createEvent, deleteEvent, getAllEvents } from '~/apis/calendar/calendar.api'
import { toast } from 'react-toastify'
import { BsCalendar4Event, BsPlusCircle } from 'react-icons/bs'
import ButtonSquare from '~/components/button/ButtonSquare'

const locales = {
  vi,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export const eventDefault = {
  title: '',
  desc: '',
  allDay: true,
  members: [],
  start: '',
  end: '',
}

const BigCalendar = () => {
  const lang = {
    week: 'Tuần',
    // eslint-disable-next-line camelcase
    work_week: 'Tuần làm việc',
    day: 'Ngày',
    month: 'Tháng',
    previous: '<',
    next: '>',
    today: 'Hôm nay',
    agenda: 'Nhật ký',

    showMore: (total) => `+${total} xem thêm`,
  }
  const { components, defaultDate, views } = useMemo(
    () => ({
      //   components: {
      //     timeSlotWrapper: ColoredDateCellWrapper,
      //   },
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    [],
  )

  const userIdLocal = localStorage.getItem('userId')

  //State
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState(eventDefault)
  const [isSwitch, setIsSwitch] = useState(true)
  const [activeChange, setActiveChange] = useState(false)

  const callBackEvents = useCallback(() => {
    getAllEvents(userIdLocal).then((res) => {
      const mapArr = res.data.map((item) => {
        return {
          ...item,
          start: dayjs(item.start).$d,
          end: dayjs(item.end).$d,
        }
      })
      setEvents(mapArr)
    })
  }, [userIdLocal])

  useEffect(() => {
    callBackEvents()
  }, [callBackEvents])

  const handleChangeSwitch = (value) => {
    setIsSwitch(value)
    setEvent((prev) => ({
      ...prev,
      allDay: value,
    }))
  }

  const onSelectSlot = (value) => {
    setIsOpenModal(true)
    if (!isSwitch) {
      setEvent((prev) => ({
        ...prev,
        start: dayjs(value.start.setHours(-1)).$d,
        end: dayjs(value.end.setHours(-1)).$d,
      }))
    } else {
      setEvent((prev) => ({
        ...prev,
        start: dayjs(value.start).startOf('day').$d,
        end: dayjs(value.end).second(-1).$d,
      }))
    }
  }

  const onSelectEvent = (value) => {
    setEvent(value)
    setIsOpenModal(true)
    setActiveChange(true)
  }

  const handleAddEvent = () => {
    setIsOpenModal(true)
    if (!isSwitch) {
      setEvent((prev) => ({
        ...prev,
        start: dayjs(new Date().setHours(1)).$d,
        end: dayjs(new Date().setHours(-1)).$d,
      }))
    } else {
      setEvent((prev) => ({
        ...prev,
        start: dayjs(new Date()).startOf('day').$d,
        end: dayjs(new Date()).second(-1).$d,
      }))
    }
  }

  const onChangeDateStart = (value, isTime) => {
    setEvent((prev) => ({
      ...prev,
      start: !isTime ? value.$d : dayjs(value.$d).startOf('day').$d,
    }))
  }

  const onChangeDateEnd = (value, isTime) => {
    setEvent((prev) => ({
      ...prev,
      end: !isTime ? value.$d : dayjs(value.$d).second(-1).$d,
    }))
  }

  const handleCreateEvent = () => {
    if (!activeChange) {
      createEvent({
        ...event,
        title: event.title ? event.title : 'Sự kiện 1',
        userIdCreate: userIdLocal,
        members: [userIdLocal],
      }).then((res) => {
        if (res) {
          toast.success('Đã thêm sự kiện')
          callBackEvents()
          setEvent(eventDefault)
          setIsOpenModal(false)
        }
      })
    } else {
      //
      changeEvent(event._id, event).then((res) => {
        if (res) {
          //
          toast.info('Đã sửa lại sự kiện')
          callBackEvents()
          setEvent(eventDefault)
          setIsOpenModal(false)
          setActiveChange(false)
        }
      })
    }
  }

  const handleDeleteEvent = () => {
    deleteEvent(event._id).then((res) => {
      if (res) {
        toast.success('Đã xóa sự kiện')
        callBackEvents()
        setEvent(eventDefault)
        setIsOpenModal(false)
        setActiveChange(false)
      }
    })
  }
  const [date, setDate] = useState(new Date())
  const onNavigate = (itemEvent) => setDate(itemEvent.start)

  return (
    <div css={cssCalendar}>
      {' '}
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      <div className="sidebar-menu">
        <ButtonSquare className="add-new-event">
          <div className="icon">
            <BsPlusCircle />
          </div>
          <div className="title" onClick={handleAddEvent}>
            Tạo sự kiện
          </div>
        </ButtonSquare>
        <div className="p-2">
          <Calendar fullscreen={false} />
        </div>
        <div className="p-2" css={cssListEvent}>
          <div className="heading">Danh sách sự kiện</div>
          <div className="list-event">
            {events?.map((itemEvent) => (
              <div className="item-event" key={itemEvent._id} onClick={() => onNavigate(itemEvent)}>
                <div className="">
                  <div className="title">{itemEvent.title}</div>
                  <div className="time">{`${dayjs(itemEvent.start).format(
                    'DD/MM/YYYY HH:mm',
                  )} ~ ${dayjs(itemEvent.end).format('DD/MM/YYYY HH:mm')}`}</div>
                </div>
                <div className="icon">
                  <BsCalendar4Event />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="detail-calendar">
        {' '}
        <div className="p-4 h-[800px]">
          <BigCalendarLib
            date={date}
            components={components}
            defaultDate={defaultDate}
            events={events}
            localizer={localizer}
            selectable={true}
            showMultiDayTimes
            step={60}
            views={views}
            messages={lang}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
            onNavigate={(newDate) => setDate(newDate)}
          />
        </div>
        <ModalCreateEvent
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
          startDate={event.start}
          endDate={event.end}
          onChangeDateStart={onChangeDateStart}
          onChangeDateEnd={onChangeDateEnd}
          handleCreateEvent={handleCreateEvent}
          handleChangeSwitch={handleChangeSwitch}
          event={event}
          setEvent={setEvent}
          activeChange={activeChange}
          setActiveChange={setActiveChange}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  )
}

export default BigCalendar

const cssCalendar = css`
  .sidebar-menu {
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

    .add-new-event {
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-top: 10px;
      cursor: pointer;
      .icon {
      }

      .title {
        margin-left: 10px;
      }
    }
  }

  .detail-calendar {
    padding-left: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .rbc-month-view {
      border: none;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
    }

    .rbc-header {
      padding: 10px;
      font-size: 14px;
      border: none;
      color: var(--color-black);
    }

    .rbc-active:focus {
      background-color: var(--color-menu-main);
      color: var(--color-white);
      border: none;
    }

    .rbc-active {
      background-color: var(--color-menu-main);
      color: var(--color-white);
      border: none;
    }

    .rbc-btn-group {
      font-weight: 700;

      button {
        transition: all 0.3s ease;
      }

      & > button:hover {
        background-color: var(--color-menu-main);
        color: var(--color-white);
      }
    }

    .rbc-event {
      background-color: var(--color-active-message);
      color: var(--color-blue-blur);
      font-size: 14px;
      font-weight: 500;
    }

    .rbc-date-cell {
      font-size: 16px;
      text-align: center;
      padding: 5px;
    }

    .rbc-current {
      button {
        padding: 5px;
        background-color: var(--color-active-message);
        color: var(--color-menu-main-hover);
        border-radius: 5px;
      }
    }

    .rbc-toolbar-label {
      font-weight: 600;
      font-size: 20px;
      color: var(--color-blue-blur);
    }

    .rbc-row-segment {
      padding: 5px;
    }

    .rbc-today {
      background-color: transparent;
    }

    .rbc-show-more {
      font-size: 14px;
    }

    /* .rbc-day-bg:hover {
      background-color: var(--color-active-message);
    } */
  }
`

const cssListEvent = css`
  .heading {
    font-size: 16px;
    font-weight: 500;
  }

  .list-event {
    margin-top: 10px;
    flex-grow: 1;
    overflow-y: auto;
    height: 400px;

    .item-event {
      border: 1px solid var(--color-active-message);
      border-radius: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-right: 10px;
      transition: background 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: var(--color-active-message);
      }

      .icon {
        margin-left: auto;
      }

      .title {
        font-weight: 500;
        font-size: 18px;
      }

      .time {
        font-size: 14px;
      }
    }
  }
`
