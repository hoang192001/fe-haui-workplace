/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, Button, Checkbox, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllUser } from '~/apis/user/user.api'
import { ChatPrivate } from './ChatPrivate'
import { ChatGroup } from './ChatGroup'
import { createCoversation } from '~/apis/chat/chat.api'
import { useDispatch } from 'react-redux'
import { fetchAllConversation } from '~/store/message-reducer/messageSlice'
import { toast } from 'react-toastify'

const ModalCreateChat = ({ typeCreateChat, openModal, setOpenModal }) => {
  let dispatch = useDispatch()
  const userIdLocal = localStorage.getItem('userId')
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')

  const [listUser, setListUser] = useState([])

  const [selectListUserGroup, setSelectListUserGroup] = useState([])
  const [nameGroup, setNameGroup] = useState('')

  const [selectUserPrivate, setSelectUserPrivate] = useState({})

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      //   setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  useEffect(() => {
    getAllUser().then((res) => {
      if (res) {
        const dataFilter = res.data.filter((item) => item._id !== userIdLocal)
        setListUser(dataFilter)
      }
    })
  }, [])

  const handleSelectGroupUser = (user) => {
    const temp = [...selectListUserGroup]
    if (!temp.includes(user)) {
      temp.push(user)
    } else {
      const indexUser = temp.indexOf(user)
      temp.splice(indexUser, 1)
    }
    setSelectListUserGroup(temp)
  }

  const handleSelectUserPrivate = (userPrivate) => {
    setSelectUserPrivate(userPrivate)
  }

  const handleCreateConversation = () => {
    let dataRequest
    if (typeCreateChat === 'CHAT_PRIVATE') {
      if (Object.keys(selectUserPrivate).length === 0) {
        toast.warn('Hãy chọn đối tượng để trao đổi')
        return
      }
      dataRequest = {
        typeConversation: 'private',
        from: userIdLocal,
        to: selectUserPrivate._id,
        members: [userIdLocal, selectUserPrivate._id],
      }
    } else {
      if (selectListUserGroup.length < 2 || nameGroup === '') {
        toast.warn('Hãy nhập tên nhóm và thành viên ít nhất là 3 người')
        return
      }
      dataRequest = {
        typeConversation: 'group',
        from: userIdLocal,
        members: [...selectListUserGroup.flatMap((itemUser) => itemUser._id), userIdLocal],
        nameGroup,
      }
    }
    createCoversation(dataRequest).then((res) => {
      if (res) {
        if (res.status === 201) {
          toast.info('Cuộc trò chuyện đã tồn tại')
        } else {
          dispatch(fetchAllConversation(userIdLocal))
          setOpenModal(false)
          setSelectUserPrivate({})
          setSelectListUserGroup([])
        }
      }
    })
  }

  return (
    <>
      <Modal
        title={typeCreateChat === 'CHAT_PRIVATE' ? 'Tin nhắn riêng' : 'Tin nhắn nhóm'}
        open={openModal}
        onOk={handleCreateConversation}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setOpenModal(false), setSelectUserPrivate({}), setSelectListUserGroup([])
        }}
        width={700}
        okText={typeCreateChat === 'CHAT_PRIVATE' ? 'Tạo cuộc trò chuyện' : 'Tạo nhóm chat'}
        css={() => `
        .ant-btn-primary {
          background-color: var(--color-menu-main);
        }
      `}
      >
        {typeCreateChat === 'CHAT_PRIVATE' ? (
          <ChatPrivate
            selectUserPrivate={selectUserPrivate}
            handleSelectUserPrivate={handleSelectUserPrivate}
            listUser={listUser}
          />
        ) : (
          <ChatGroup
            listUser={listUser}
            handleSelectGroupUser={handleSelectGroupUser}
            selectListUserGroup={selectListUserGroup}
            setNameGroup={setNameGroup}
          />
        )}
      </Modal>
    </>
  )
}

export default ModalCreateChat
