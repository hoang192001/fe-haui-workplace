/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, Modal, Popover } from 'antd'
import { useEffect, useState } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { deleteOrAddUserGroupChat } from '~/apis/chat/chat.api'
import { getAllUser } from '~/apis/user/user.api'
import { ChatPrivate } from '../modal-create-chat/ChatPrivate'
import { useAdminGroup } from '~/hooks/useAdminGroup'

const ListMemberGroup = ({
  conversation,
  setIsOpenModalAdd,
  isOpenModalAdd,
  callBackCoversation,
}) => {
  const [selectUser, setSelectUser] = useState({})
  const [listUser, setListUser] = useState([])

  const handleSelectUserPrivate = (itemUser) => {
    setSelectUser(itemUser)
  }

  useEffect(() => {
    getAllUser().then((res) => {
      if (res) {
        const dataFilter = res.data.filter(
          (item) =>
            !conversation?.members.flatMap((itemMember) => itemMember._id).includes(item._id),
        )
        setListUser(dataFilter)
      }
    })
  }, [conversation?.members])

  const handleAddOrDeleteUser = (type, userId) => {
    if (type === 'ADD') {
      const dataRequest = {
        type,
        userId: selectUser._id,
      }
      deleteOrAddUserGroupChat(conversation._id, dataRequest).then((res) => {
        if (res) {
          toast.success('Đã thêm thành viên')
          setIsOpenModalAdd(false)
          callBackCoversation()
        }
      })
    } else {
      const dataRequest = {
        type,
        userId,
      }
      deleteOrAddUserGroupChat(conversation._id, dataRequest).then((res) => {
        if (res) {
          toast.success('Đã xóa thành viên')
          callBackCoversation()
        }
      })
    }
  }

  const PopupChangeMember = ({ userId }) => {
    return (
      <div
        css={cssChangeMember}
        onClick={() => handleAddOrDeleteUser('DELETE', userId)}
        className="text-red-500"
      >
        Xóa khỏi nhóm chat
      </div>
    )
  }

  const { isAdminGroup } = useAdminGroup(conversation)

  return (
    <div className="list-members-group">
      <div className="heading">Danh sách thành viên</div>
      <div className="list">
        {conversation?.members.map((itemMember) => (
          <div className="item-member" key={itemMember._id}>
            <Avatar size={50} src={process.env.REACT_APP_LINK_IMAGES + itemMember?.avatar} />
            <div className="name">{itemMember?.fullName}</div>
            {isAdminGroup && (
              <Popover
                content={<PopupChangeMember userId={itemMember._id} />}
                placement={'bottomRight'}
                trigger="click"
              >
                <div className="icon-change">
                  <RxDotsHorizontal />
                </div>
              </Popover>
            )}
          </div>
        ))}
      </div>
      <Modal
        title={'Thêm vào nhóm chat'}
        open={isOpenModalAdd}
        onOk={() => handleAddOrDeleteUser('ADD')}
        // confirmLoading={confirmLoading}
        onCancel={() => {
          setIsOpenModalAdd(false)
        }}
        width={700}
        okText={'Thêm thành viên'}
        css={() => `
        .ant-btn-primary {
          background-color: var(--color-menu-main);
        }
      `}
      >
        <ChatPrivate
          selectUserPrivate={selectUser}
          handleSelectUserPrivate={handleSelectUserPrivate}
          listUser={listUser}
        />
      </Modal>
    </div>
  )
}

export default ListMemberGroup

const cssChangeMember = css`
  width: 180px;
  cursor: pointer;
`
