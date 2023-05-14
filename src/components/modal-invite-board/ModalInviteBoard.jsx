/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Modal, Spin } from 'antd'
import { Avatar, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDebounce } from '~/hooks/useDebounce'
import { getAllUser } from '~/apis/user/user.api'
import Spinner from '../spinner/Spinner'
import { inviteUserToBoard } from '~/apis/task-work/board.api'
import { toast } from 'react-toastify'

const ModalInviteBoard = ({ openModalInvite, setOpenModalInvite, boardId, callBack }) => {
  const [listUser, setListUser] = useState([])
  const [searchTerm, setsearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true)
      getAllUser(debouncedSearchTerm).then((results) => {
        setIsSearching(false)
        setListUser(results.data)
      })
    } else {
      getAllUser(debouncedSearchTerm).then((results) => {
        setIsSearching(false)
        setListUser(results.data)
      })
    }
  }, [debouncedSearchTerm])

  const handleInviteUser = (userId) => {
    inviteUserToBoard({ userId, boardId }).then((res) => {
      if (res) {
        toast.success(res.data)
        setOpenModalInvite(false)
        callBack()
      }
    })
  }

  return (
    <Modal
      title={'Tìm kiếm'}
      open={openModalInvite}
      onCancel={() => {
        setOpenModalInvite(false)
      }}
      width={700}
      footer={null}
    >
      <div css={cssChatPrivate}>
        <Input
          size="large"
          placeholder="Tìm kiếm bạn bè"
          prefix={<SearchOutlined />}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <div className="list-friend">
          {listUser?.map((itemUser) => (
            <div
              className={`item-friend`}
              key={itemUser._id}
              onClick={() => handleInviteUser(itemUser._id)}
            >
              <Avatar size={45} src={process.env.REACT_APP_LINK_IMAGES + itemUser.avatar} />
              <div className="title">
                <div className="name">{itemUser?.fullName}</div>
                <div className="email">{itemUser?.email}</div>
              </div>
            </div>
          ))}
          {isSearching && (
            <div className="absolute inset-0 flex items-center justify-center h-full">
              <Spin />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ModalInviteBoard

const cssChatPrivate = css`
  .list-friend {
    margin-top: 16px;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
    position: relative;
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
