/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Outlet, useParams } from 'react-router-dom'
import { getGroupDetailById } from '~/apis/group/group.api'
import MainGroup from './main-group/MainGroup'
import SideBarMenu from './sidebar-menu/SideBarMenu'

const GroupDetail = () => {
  const { groupId } = useParams()
  const [groupDetail, setGroupDetail] = useState({})

  const callBackGroup = useCallback(() => {
    getGroupDetailById(groupId).then((res) => {
      if (res) {
        setGroupDetail(res?.data)
      }
    })
  }, [groupId])

  useEffect(() => {
    callBackGroup()
  }, [callBackGroup])

  return (
    <div css={cssGroup}>
      <Helmet>
        <title>{`Group | ${groupDetail.nameGroup}`}</title>
      </Helmet>
      <div className="sidebar-menu">
        <SideBarMenu groupDetail={groupDetail} />
      </div>
      <div className="main-selection">
        <div className="settings">
          <MainGroup groupDetail={groupDetail} callBackGroup={callBackGroup} />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default GroupDetail

const cssGroup = css`
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
  .main-selection {
    position: relative;
    margin-left: 400px;
    width: calc(100% - 450px);

    .settings {
      max-width: 1340px;
      margin: 0 auto;

      .top-bar {
        display: flex;
        align-items: center;
        padding: 10px 0;
        span {
          margin-left: 10px;
        }
      }

      .setting-wrapper {
        margin: 20px 0;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
      }
    }
  }
`
