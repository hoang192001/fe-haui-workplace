/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import { Avatar, Input, Popover } from 'antd'
import { Helmet } from 'react-helmet'
import { IoSend } from 'react-icons/io5'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { BsEmojiSmile, BsImage } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { RiListSettingsLine } from 'react-icons/ri'
import { FcCallback } from 'react-icons/fc'
import MessageChat from '~/components/message/MessageChat'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllConversation, sendMessageChat } from '~/store/message-reducer/messageSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getConversationById } from '~/apis/chat/chat.api'
import LoadingTyping from '~/components/loading-typing/LoadingTyping'
import SettingChat from './setting-chat/SettingChat'
import { useCheckAdmin } from '~/hooks/useCheckAdmin'
import ModalVideoCall from './modal-video-call/ModalVideoCall'
import { VideoContext } from '~/context/videoContext'
import ModalIncomingCall from './modal-incoming-call/ModalIncomingCall'
import ButtonSquare from '~/components/button/ButtonSquare'
import { v1 as uuid } from 'uuid'
import ImageChat from '~/components/preview-image-chat/ImageChat'

const DetailChat = ({ socket }) => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const { chatId } = useParams()
  const [showLayoutSetting, setShowLayoutSetting] = useState(true)
  const userIdLocal = localStorage.getItem('userId')
  const listMessageChat = useSelector((state) => state.chat.messageChat)
  const [conversation, setConversation] = useState({})
  const [typing, setTyping] = useState(false)

  // const socket = useSelector((state) => state.socket.value)

  const [messageChat, setMessageChat] = useState('')
  const messagesEndRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState()

  const { callUser, setShowMedia } = useContext(VideoContext)

  const handleTypingChat = (e) => {
    setMessageChat(e.target.value)
    socket.emit('client-typing', e.target.value.trim() !== '' ? true : false)
  }

  const callBackCoversation = useCallback(() => {
    getConversationById(chatId).then((res) => {
      setConversation(res.data)
      setSelectedFile(null)
    })
  }, [chatId])

  const enterSendMessage = (e) => {
    const dataEmit = {
      fromUserId: userIdLocal,
      conversationId: conversation._id,
      message: messageChat,
    }
    if (e.keyCode === 13 && messageChat !== '') {
      socket.emit('client-send-message', dataEmit)
      //
      setMessageChat('')
      socket.emit('client-typing', false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(scrollToBottom, [listMessageChat])
  useEffect(() => {
    socket.emit('client-join-room', chatId)
    callBackCoversation()
  }, [chatId, socket, callBackCoversation])

  useEffect(() => {
    socket.on('server-send-message', (dataMessage) => {
      dispatch(sendMessageChat(dataMessage))
      dispatch(fetchAllConversation(userIdLocal))
    })

    return () => socket.off('server-send-message')
  }, [dispatch, socket, userIdLocal])

  useEffect(() => {
    socket.on('server-response', (typingBoolean) => {
      setTyping(typingBoolean)
    })
    return () => socket.off('server-response')
  }, [socket])

  useEffect(() => {
    socket.on('callUser', (data) => {
      if (data) {
        setShowMedia(true)
      }
    })
    return () => socket.off('callUser')
  }, [socket])

  const { userClient } = useCheckAdmin(conversation?.members)

  const handleJoinMeetingGroup = () => {
    const id = uuid()
    navigate(`/meeting-group/${id}`)
  }
  const handleSendMessage = () => {
    const dataEmit = {
      fromUserId: userIdLocal,
      conversationId: conversation._id,
      file: selectedFile,
      fileName: selectedFile.name
    }
    if (selectedFile) {
      socket.emit('client-send-file', dataEmit)
      setSelectedFile(null)
    }
  }

  return (
    <div css={cssDetailChat}>
      <Helmet>
        <title>{`Chat | ${
          conversation.nameGroup ? conversation.nameGroup : userClient?.fullName
        }`}</title>
      </Helmet>
      <div className="content">
        <div className="heading-chat">
          <div className="heading-left">
            {conversation.typeConversation === 'group' ? (
              <Avatar
                size={50}
                src={process.env.REACT_APP_LINK_IMAGES + conversation?.avatarGroup}
              />
            ) : (
              <Avatar size={50} src={process.env.REACT_APP_LINK_IMAGES + userClient?.avatar} />
            )}

            <div className="title">
              <h3>
                {conversation.typeConversation === 'group'
                  ? conversation.nameGroup
                  : userClient?.fullName}
              </h3>
              <p>
                {userClient?.isOnline ? (
                  <span className="flex items-center text-green-500">
                    Online <RxDotFilled className="text-sm" />
                  </span>
                ) : (
                  'Offline'
                )}
              </p>
            </div>
          </div>
          <div className="setting-chat">
            {conversation.typeConversation === 'group' ? (
              <ButtonSquare className="mr-4" onClick={handleJoinMeetingGroup}>
                Tạo meeting group
              </ButtonSquare>
            ) : (
              <div className="icon-chat" onClick={() => callUser(conversation.to)}>
                <FcCallback />
              </div>
            )}
            <div className="icon-chat" onClick={() => setShowLayoutSetting(!showLayoutSetting)}>
              <RiListSettingsLine />
            </div>
          </div>
        </div>
        <div className="message-chat">
          {listMessageChat?.map((itemChat, index) => (
            <MessageChat
              key={itemChat._id}
              itemChat={itemChat}
              indexMessage={index}
              listMessageChat={listMessageChat}
              isUserSender={userIdLocal === itemChat.author._id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="">{typing && <LoadingTyping />}</div>
        <div className="typing-chat">
          <div className="chat-action">
            <Popover content={<Picker data={data} />} title="Biểu tượng cảm xúc" trigger="click">
              <div className="item-action">
                <BsEmojiSmile />
              </div>
            </Popover>
            <label className="item-action">
              <BsImage />
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="typing-input">
            {selectedFile ? (
              <div>
                <ImageChat selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
              </div>
            ) : (
              <Input
                className="input-conver"
                size="large"
                placeholder="Reply..."
                value={messageChat}
                onChange={handleTypingChat}
                onKeyUp={enterSendMessage}
              />
            )}
          </div>
          <div className="send" onClick={handleSendMessage}>
            <IoSend />
          </div>
        </div>
      </div>
      <SettingChat conversation={conversation} callBackCoversation={callBackCoversation} />
      <ModalVideoCall />
      <ModalIncomingCall />
    </div>
  )
}

export default DetailChat

const cssDetailChat = css`
  display: flex;

  .content {
    flex: 1;
    width: auto;
    display: flex;
    height: calc(100vh - 60px);
    flex-direction: column;
    background-image: url('https://www.gapowork.vn/static/media/conversation_bg.ad3fedfb2f701f2edb93.png');
    background-position: center bottom;
    transition: all 0.5s ease;

    .heading-chat {
      background-color: var(--color-white);
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid var(--color-gray-cloud);
      display: flex;
      align-items: center;
      justify-content: space-between;

      .setting-chat {
        display: flex;
        align-items: center;

        .icon-chat {
          font-size: 20px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;

          &:hover {
            background-color: var(--color-gray-cloud);
            color: var(--color-menu-main-hover);
          }
        }
      }

      .heading-left {
        display: flex;
        align-items: center;

        .title {
          margin-left: 10px;
          h3 {
            font-weight: 700;
          }

          p {
            font-size: 14px;
          }
        }
      }
    }

    .message-chat {
      margin: 10px;
      flex: 1;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: none;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--color-gray-200);
        border-radius: 10px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: var(--color-gray-rain);
      }
    }

    .typing-chat {
      display: flex;
      align-items: center;
      margin: 10px;
      padding: 10px;
      background-color: var(--color-white);
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      .chat-action {
        margin-right: 10px;
        display: flex;
        cursor: pointer;
        color: var(--color-menu-main);

        .item-action {
          cursor: pointer;
          border-radius: 10px;
          padding: 10px;
          &:hover {
            background-color: var(--color-gray-cloud);
          }
        }
      }

      .typing-input {
        width: 100%;

        img {
          background-color: var(--color-gray-200);
          margin-bottom: 10px;
          width: 200px;
          height: 200px;
          object-fit: contain;
        }
      }

      .send {
        margin-left: 10px;
        padding: 10px;
        font-size: 20px;
        cursor: pointer;
        border-radius: 10px;
        color: var(--color-menu-main-hover);

        &:hover {
          background-color: var(--color-gray-cloud);
        }
      }
    }
  }

  .setting-layout {
    /* display: none; */
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    border-left: 1px solid var(--color-gray-cloud);
    transition: all 0.4s ease-out;
    /* display: none; */
    background-color: var(--color-white);
    width: 300px;

    /* &.active-width-show {
      display: block;
    } */

    .heading-profile {
      padding: 24px 16px 16px;
      border-bottom: 1px solid var(--color-gray-cloud);

      /* button {
        background-color: var(--color-menu-main);
      } */

      .avatar-profile {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .name-profile {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        margin-top: 16px;
        padding: 6px 0;
        text-align: center;

        input {
          text-align: center;
        }
      }
    }

    .content-setting {
      padding: 10px;

      .item-setting {
        display: flex;
        align-items: center;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: var(--color-gray-cloud);
        }

        span {
          margin-left: 10px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .list-members-group {
      flex: 1;
      overflow-y: auto;
      border-top: 1px solid var(--color-gray-cloud);
      padding: 10px;
      .heading {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .item-member {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        margin-bottom: 5px;

        .name {
          margin-left: 10px;
          font-size: 16px;
          font-weight: 600;
        }

        .icon-change {
          margin-left: auto;
          border-radius: 50%;
          padding: 5px;
          cursor: pointer;

          &:hover {
            background-color: var(--color-gray-200);
          }
        }
      }
    }
  }
`
