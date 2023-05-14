/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Modal } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { ImPhoneHangUp } from 'react-icons/im'
import { socket } from '~/App'
import { VideoContext } from '~/context/videoContext'

const ModalIncomingCall = () => {

  const { answerCall } = useContext(VideoContext)
  const [showIncoming, setShowIncoming] = useState(false)
  const [userIdTo, setUserIdTo] = useState('')

  useEffect(() => {
    socket.on("server-showmedia", (data) => {
      setShowIncoming(data.showIncoming);
      console.log(data.toCall);
      setUserIdTo(data.toCall)
    })
  }, [])

  return (
    <Modal
      title={'Incoming Video Call'}
      open={showIncoming && userIdTo === localStorage.getItem('userId')}
      // onOk={handleCreateConversation}
      // confirmLoading={confirmLoading}
      //   onCancel={() => {
      //     setShowMedia(false)
      //   }}
      width={500}
      okText={null}
      footer={null}
      css={() => `
        .ant-modal-content, .ant-modal-title {
          background-color: var(--color-gray-cloud);
        }
      `}
    >
      <div css={feedBackCall}>
        <div className="body-background">
          <div className="img-cover">
            <div className="background-filter"></div>
            <img
              src="https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="cover"
            />
          </div>
          <div className="img-avt">
            <img
              src="https://lh6.googleusercontent.com/-B3AYKH-PCgY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckyggzgJd-2OLwLGEJWCmV6vLQV-g/photo.jpg"
              alt="avt"
            />
          </div>
        </div>
        <div className="footer">
          <div className="item-footer bg-green-500" onClick={() => answerCall()}>
            <BsTelephoneFill />
          </div>
          <div className="item-footer bg-red-500">
            <ImPhoneHangUp />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalIncomingCall

const feedBackCall = css`
  .body-background {
    height: 350px;
    position: relative;

    .img-cover {
      height: 100%;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      .background-filter {
        inset: 0;
        position: absolute;
        background-color: #00000061;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .img-avt {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 2px solid var(--color-white);
      overflow: hidden;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .footer {
    margin-top: 10px;
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
      font-size: 20px;
      border-radius: 50px;
      color: var(--color-white);
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`
