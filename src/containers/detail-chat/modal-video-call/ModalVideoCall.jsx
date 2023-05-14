/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, Modal } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsCameraVideo, BsMic } from 'react-icons/bs'
import { ImPhoneHangUp } from 'react-icons/im'
import ReactPlayer from 'react-player'
import { UserOutlined } from '@ant-design/icons'
import { VideoContext } from '~/context/videoContext'
import { socket } from '~/App'

const ModalVideoCall = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
    userName,
    myVdoStatus,
    screenShare,
    fullScreen,
    handleScreenSharing,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
    showMedia,
    setShowMedia,
  } = useContext(VideoContext)

  const [checkFromUser, setCheckFromUser] = useState('')

  useEffect(() => {
    socket.on("server-showmedia", (data) => {
      setCheckFromUser(data.fromCall);
    })
  }, [])

  return (
    <Modal
      title={'Meeting'}
      open={showMedia && checkFromUser === localStorage.getItem('userId')}
      // onOk={handleCreateConversation}
      // confirmLoading={confirmLoading}
      onCancel={() => {
        setShowMedia(false)
      }}
      width={1000}
      okText={null}
      footer={null}
      css={() => `
        .ant-modal-content, .ant-modal-title {
          background-color: var(--color-gray-cloud);
        }
      `}
    >
      <div css={cssModalVideoCall}>
        <div className="body">
          <div className="video">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{
                opacity: `${myVdoStatus ? '1' : '0'}`,
              }}
            />
            <Avatar
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#116',
                position: 'absolute',
                opacity: `${myVdoStatus ? '-1' : '2'}`,
              }}
              size={98}
              icon={!name && <UserOutlined />}
            >
              {name}
            </Avatar>
          </div>
          {callAccepted && !callEnded && userVideo && (
            <div className="video">
              <video
                playsInline
                muted
                ref={userVideo}
                autoPlay
                style={{
                  opacity: `${userVdoStatus ? '1' : '0'}`,
                }}
              />
              <Avatar
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#116',
                  position: 'absolute',
                  opacity: `${userVdoStatus ? '-1' : '2'}`,
                }}
                size={98}
                icon={<UserOutlined />}
              >
                {name}
              </Avatar>
            </div>
          )}
          {/* <div className="video">
            <video playsInline muted ref={myVideo} autoPlay />
          </div> */}
        </div>
        <div className="footer">
          <div className="item-footer" onClick={() => updateMic()}>
            <BsMic />
          </div>
          <div className="item-footer" onClick={() => updateVideo()}>
            <BsCameraVideo />
          </div>
          <div className="item-footer active">
            <ImPhoneHangUp />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalVideoCall

const cssModalVideoCall = css`
  .body {
    /* height: 500px; */
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    margin-bottom: 14px;
    transition: all 0.5s ease;
    justify-content: center;

    .video {
      position: relative;
      height: 100%;
      width: 100%;
      border-radius: 10px;
      background-color: var(--color-gray-rain);
    }
  }

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    border-radius: 8px;
    box-shadow: 0 5px 25px 0 rgb(0 0 0 / 9%);
    background-color: var(--color-white);

    .item-footer {
      margin: 0 24px;
      padding: 14px;
      background-color: var(--color-gray);
      font-size: 20px;
      border-radius: 50px;
      color: var(--color-white);
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &.active {
        background-color: var(--color-danger);
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
