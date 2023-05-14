import { Avatar, Button } from 'antd'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import ModalDelete from '~/components/modal-confirm-delete/ModalDeleteChat'
import ListMemberGroup from '../list-members-group/ListMemberGroup'
import { DeleteOutlined, UsergroupAddOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { changeConversation, deleteConversation } from '~/apis/chat/chat.api'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchAllConversation } from '~/store/message-reducer/messageSlice'
import AvatarInput from '~/components/avatar/Avatar'
import { useCheckAdmin } from '~/hooks/useCheckAdmin'
import { useAdminGroup } from '~/hooks/useAdminGroup'

const SettingChat = ({ conversation, callBackCoversation, showLayoutSetting }) => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const { chatId } = useParams()
  const userIdLocal = localStorage.getItem('userId')
  const [changeInput, setChangeInput] = useState(true)
  const [nameGroup, setNameGroup] = useState(conversation.nameGroup ?? '')

  const [selectedFile, setSelectedFile] = useState(null)

  //Modal add user
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleSubmitDelete = () => {
    deleteConversation(chatId).then((res) => {
      if (res) {
        toast.info('Đã xóa cuộc trò chuyện')
        navigate('/chat')
        dispatch(fetchAllConversation(userIdLocal))
      }
    })
  }

  useEffect(() => {
    setNameGroup(conversation.nameGroup)
  }, [conversation.nameGroup])

  const ref = useRef()
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setChangeInput(true)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const handleSaveChangeConversation = () => {
    changeConversation(chatId, { nameGroup, selectedFile }).then((res) => {
      if (res) {
        toast.success('Cập nhật thành công')
        dispatch(fetchAllConversation(userIdLocal))
        setChangeInput(true)
      }
    })
  }

  const onChangeAvatarGroup = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
    setChangeInput(false)
  }

  const { userClient } = useCheckAdmin(conversation?.members)
  const { isAdminGroup } = useAdminGroup(conversation)
  
  return (
    <div className={`setting-layout ${showLayoutSetting && 'active-width-show'}`} ref={ref}>
      <div className="heading-profile">
        <div className="avatar-profile">
          {conversation.typeConversation === 'group' ? (
            <AvatarInput
              src={process.env.REACT_APP_LINK_IMAGES + conversation?.avatarGroup}
              onChange={onChangeAvatarGroup}
              selectedFile={selectedFile}
            />
          ) : (
            <Avatar size={100} src={process.env.REACT_APP_LINK_IMAGES + userClient?.avatar} />
          )}
        </div>

        <div className="name-profile">
          <input
            type="text"
            className={`w-full ${!changeInput ? 'bg-slate-200 py-3 rounded-lg' : ''}`}
            value={
              conversation.typeConversation === 'group'
                ? nameGroup || ''
                : userClient?.fullName || ''
            }
            readOnly={changeInput}
            autoFocus={true}
            onChange={(e) => setNameGroup(e.target.value)}
          />
        </div>
        {!changeInput && (
          <Fragment>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setChangeInput(true), setNameGroup(conversation.nameGroup)
                }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                className="ml-2 bg-blue-500"
                onClick={handleSaveChangeConversation}
              >
                Lưu
              </Button>
            </div>
          </Fragment>
        )}
      </div>
      <div className="content-setting">
        {conversation?.typeConversation === 'group' ? (
          <Fragment>
            <div className="item-setting" onClick={() => setChangeInput(!changeInput)}>
              <SettingOutlined />
              <span>Đổi tên nhóm</span>
            </div>
            <div className="item-setting" onClick={() => setIsOpenModalAdd(true)}>
              <UsergroupAddOutlined />
              <span>Thêm thành viên</span>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="item-setting" onClick={() => setIsOpenModalAdd(true)}>
            <SyncOutlined />
              <span>Đặt biệt danh</span>
            </div>
          </Fragment>
        )}
        {isAdminGroup && (
          <div className="item-setting text-red-500" onClick={() => setOpenModal(true)}>
            <DeleteOutlined />
            <span>Xóa cuộc trò chuyện</span>
          </div>
        )}
      </div>
      {conversation.typeConversation === 'group' && (
        <ListMemberGroup
          conversation={conversation}
          setIsOpenModalAdd={setIsOpenModalAdd}
          isOpenModalAdd={isOpenModalAdd}
          callBackCoversation={callBackCoversation}
        />
      )}
      <ModalDelete
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitDelete={handleSubmitDelete}
      />
    </div>
  )
}

export default SettingChat
