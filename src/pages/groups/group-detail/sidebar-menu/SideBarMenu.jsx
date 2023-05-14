/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Input } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { FaGlobeAmericas } from 'react-icons/fa'

const SideBarMenu = ({ groupDetail }) => {
  return (
    <div css={cssSideBarGroup}>
      <div className="cover">
        <img src={process.env.REACT_APP_LINK_IMAGES + groupDetail?.avatarGroup} alt="" />
      </div>
      <div className="heading">
        <div className="name-group">WAA TV - HAUI</div>
        <div className="title">
          <FaGlobeAmericas />
          <div className="ml-2">Nhóm công khai</div>
          <BsDot />
          <div className="">2 thành viên</div>
        </div>
        <div className="py-4">
            <Input prefix={<AiOutlineSearch />} placeholder='Tìm kiếm' />
        </div>
        <div className="list-menu">
            <div className="item-menu">
                Thảo luận
            </div>
        </div>
      </div>
    </div>
  )
}

export default SideBarMenu

const cssSideBarGroup = css`
  height: 100%;
  width: 100%;
  padding: 10px;

  .cover {
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .heading {
    padding: 5px;

    .name-group {
      padding: 8px 0;
      font-weight: 700;
      font-size: 24px;
    }

    .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        width: 100%;
    }
  }

  .list-menu {
    width: 100%;
    .item-menu {
        border-radius: 5px;
        font-size: 16px;
        padding: 8px 16px;
        background-color: var(--color-active-message);
        color: var(--color-blue-blur);
    }

  }
`
