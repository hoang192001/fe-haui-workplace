/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { getAllGroup } from '~/apis/group/group.api'
import ModalCreateGroup from './components/create-group/ModalCreateGroup'
import ItemGroup from './components/item-group/ItemGroup'
import SideBarMenuGroup from './components/sidebar-menu/SideBarMenuGroup'

const GroupComponent = () => {
  const [open, setOpen] = useState(false)
  const [listGroup, setListGroup] = useState([])
  const callBackGroups = useCallback(() => {
    getAllGroup().then((res) => {
      if (res) {
        setListGroup(res.data)
      }
    })
  }, [])

  useEffect(() => {
    callBackGroups()
  }, [callBackGroups])

  return (
    <div css={cssGroups}>
      <Helmet>
        <title>Group | List</title>
      </Helmet>
      <div className="sidebar-menu">
        <SideBarMenuGroup />
      </div>
      <div className="group_main">
        <div className="heading_group">
          <h1>Groups</h1>
          <Button type="primary" onClick={() => setOpen(true)}>
            Tạo group mới
          </Button>
          <ModalCreateGroup setOpen={setOpen} open={open} callBackGroups={callBackGroups} />
        </div>
        <div className="list-group">
          {listGroup?.map((item) => (
            <ItemGroup key={item._id} itemGroup={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupComponent

const cssGroups = css`
  .sidebar-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 350px;
    padding-top: 70px;
    background: #fff;
    border-right: 1px solid #e3e3e3;
    box-shadow: 0 5px 25px 0 rgb(0 0 0 / 9%);
    z-index: 10;
    transition: transform 0.3s;
  }
  .group_main {
    max-width: 60%;
    margin: 0 auto;

    .heading_group {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-weight: 700;
        font-size: 28px;
      }
    }

    .list-group {
      display: grid;
      grid-template-columns: auto auto auto auto;
      gap: 20px;
    }
  }
  .ant-btn-primary {
    background-color: var(--color-menu-main);
  }
`
