/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar } from 'antd'

const SideBarSetting = ({ dataInfoUser, arrMenuUser, menuItem, handleClickMenu }) => {
  return (
    <div css={cssSiderBar}>
      <div className="image-user">
        <Avatar
          size={{ xxl: 100 }}
          src={process.env.REACT_APP_LINK_IMAGES + dataInfoUser?.avatar}
        />
        <h1 className="">{dataInfoUser.fullName}</h1>
      </div>
      <div className="menu-user">
        {arrMenuUser.map((item) => (
          <div
            className={`item-menu ${menuItem.id === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => handleClickMenu(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBarSetting

const cssSiderBar = css`
  .image-user {
    padding: 12px 32px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    h1 {
      font-size: 20px;
      font-weight: 700;
      margin-top: 15px;
    }
  }

  .menu-user {
    padding: 32px 0;

    .item-menu {
      padding: 12px 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s ease;
      color: var(--color-gray);

      span {
        margin-left: 10px;
      }

      &:hover {
        background-color: var(--color-menu-main);
        color: var(--color-white);
      }

      &.active {
        color: var(--color-blue-blur);
        background: var(--color-active-message);
      }
    }
  }
`
