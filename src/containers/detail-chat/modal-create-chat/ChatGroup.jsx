/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, Checkbox, Input } from 'antd'
import { SearchOutlined, UsergroupAddOutlined, CloseOutlined } from '@ant-design/icons'
export const ChatGroup = ({
  handleSelectGroupUser,
  selectListUserGroup,
  listUser,
  setNameGroup,
}) => {
  return (
    <div css={cssChatGroup}>
      <div className="left">
        <div css={cssChatPrivate}>
          <Input size="large" placeholder="Tìm kiếm bạn bè" prefix={<SearchOutlined />} />
          <div className="heading-private">Danh sách bạn bè</div>
          <div className="list-friend">
            {listUser?.map((itemUser) => (
              <div
                className="item-friend"
                key={itemUser._id}
                onClick={() => handleSelectGroupUser(itemUser)}
              >
                <Avatar size={45} src={process.env.REACT_APP_LINK_IMAGES + itemUser.avatar} />
                <div className="title">
                  <div className="name">{itemUser?.fullName}</div>
                  <div className="email">{itemUser?.email}</div>
                </div>
                <div className="checkbox">
                  <Checkbox checked={selectListUserGroup.indexOf(itemUser) > -1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="between"></div>
      <div className="right">
        <div css={cssChatPrivate}>
          <Input
            size="large"
            placeholder="Nhập tên group"
            prefix={<UsergroupAddOutlined />}
            onChange={(e) => setNameGroup(e.target.value)}
          />
          <div className="heading-private">Thành viên group chat</div>
          <div className="list-friend">
            {selectListUserGroup?.map((itemUser) => (
              <div
                className="item-friend"
                key={itemUser._id}
                onClick={() => handleSelectGroupUser(itemUser)}
              >
                <Avatar size={45} src={process.env.REACT_APP_LINK_IMAGES + itemUser.avatar} />
                <div className="title">
                  <div className="name">{itemUser?.fullName}</div>
                  <div className="email">{itemUser?.email}</div>
                </div>
                <div className="checkbox">
                  <CloseOutlined />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const cssChatPrivate = css`
  .heading-private {
    margin: 10px 0;
    font-weight: 700;
    font-size: 18px;
    width: 300px;
  }

  .list-friend {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
    .item-friend {
      min-width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 10px;
      border-bottom: 1px solid var(--color-gray-cloud);

      .title {
        margin-left: 12px;
        width: 200px;

        .name {
          font-size: 16px;
          font-weight: 600;
        }

        .email {
          font-size: 12px;
        }
      }

      .checkbox {
        margin-right: auto;
      }

      &:hover {
        background-color: var(--color-gray-cloud);
      }

      &.activeSelect {
        background-color: var(--color-active-message);
      }
    }
  }
`

const cssChatGroup = css`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .between {
    height: 488px;
    width: 2px;
    background-color: var(--color-gray-cloud);
  }
`
