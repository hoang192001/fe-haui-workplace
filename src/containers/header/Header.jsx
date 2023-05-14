import React, { Fragment, useEffect, useState } from 'react'
import './header.scss'
import { ReactComponent as IconHome } from '~/assets/icons/icon-home.svg'
import { ReactComponent as IconGroup } from '~/assets/icons/icon-group.svg'
import { ReactComponent as IconChat } from '~/assets/icons/icon-chat.svg'
import { ReactComponent as IconCalendar } from '~/assets/icons/icon-calendar.svg'
import { ReactComponent as IconTask } from '~/assets/icons/icon-task.svg'
import iconSearch from '../../assets/icons/icon-search.svg'
import { ReactComponent as IconKeng } from '~/assets/icons/icon-keng.svg'
import iconArrow from '../../assets/icons/icon-arrow-bottom.svg'
import { Link, useLocation } from 'react-router-dom'
import { PopoverHeader } from '~/components/popover/PopoverHeader'
import { Badge, Popover } from 'antd'
import ContentNotification from '~/components/notification/ContentNotification'
import { getCountNotification } from '~/apis/notification/notification.api'
import ModalSearch from '~/components/modal-search/ModalSearch'
const Header = () => {
  const arrGroupLink = [
    {
      icon: <IconHome />,
      path: '/',
    },
    {
      icon: <IconGroup />,
      path: '/group',
    },
    {
      icon: <IconChat />,
      path: '/chat',
    },
    {
      icon: <IconCalendar />,
      path: '/calendar',
    },
    {
      icon: <IconTask />,
      path: '/task',
    },
  ]

  const { pathname } = useLocation()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [showNotifi, setShowNotifi] = useState(false)
  const [count, setCount] = useState(0)
  const [openModalSearch, setOpenModalSearch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      getCountNotification().then((res) => {
        if (res) {
          setCount(res.data.count)
        }
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="header" id="headerMain">
      <div className="header__content">
        <div className="header__brand">
          <div className="switch-workspace">
            <div className="content">
              <div className="box-logo">
                <img src="https://www.haui.edu.vn//media/73/t73821.jpg" alt="" />
              </div>
              <div className="info">
                <span className="workspace-name">HaUI Workplace</span>
                <span className="role">Quản trị viên</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="header__menu">
          {arrGroupLink.map((item, index) => (
            <Fragment key={index}>
              <Link
                className={`icon ${
                  (window.location.pathname !== '/' &&
                    item.path.includes(window.location.pathname.split('/')[1])) ||
                  item.path === pathname
                    ? 'active'
                    : ''
                }`}
                to={item.path}
              >
                {item.icon}
              </Link>
            </Fragment>
          ))}
        </div>

        <div className="header__nav">
          <div className="hide-mobile mr-2">
            <div className="search-box__input" onClick={() => setOpenModalSearch(true)}>
              <img src={iconSearch} alt="" />
              <input type="text" placeholder="Search ...." />
            </div>
          </div>
          <div className="hide-mobile">
            <Popover
              placement="bottomRight"
              content={<ContentNotification showNotifi={showNotifi} />}
              arrow={true}
              trigger="click"
            >
              <Badge count={count}>
                <IconKeng
                  className="cursor-pointer icon-notification"
                  onClick={() => setShowNotifi(!showNotifi)}
                />
              </Badge>
            </Popover>
          </div>
          <div className="hide-mobile ml-2">
            <PopoverHeader>
              <div className="avatar-link mx-2">
                <img
                  src={process.env.REACT_APP_LINK_IMAGES + userInfo?.avatar}
                  alt=""
                  className="avatar"
                />
                <img src={iconArrow} alt="" className="icon-arrow" />
              </div>
            </PopoverHeader>
          </div>
        </div>
      </div>
      <ModalSearch openModalSearch={openModalSearch} setOpenModalSearch={setOpenModalSearch} />
    </div>
  )
}

export default Header
