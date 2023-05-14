import React, { createContext, useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import { socket } from '~/App'

const VideoContext = createContext()

const ContextProvider = ({ children }) => {
  const [showMedia, setShowMedia] = useState(false)

  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [stream, setStream] = useState()
  const [name, setName] = useState('')
  const [call, setCall] = useState({})
  const [me, setMe] = useState('')
  const [userName, setUserName] = useState('')
  const [otherUser, setOtherUser] = useState('')
  const [myVdoStatus, setMyVdoStatus] = useState(true)
  const [userVdoStatus, setUserVdoStatus] = useState()
  const [myMicStatus, setMyMicStatus] = useState(true)
  const [userMicStatus, setUserMicStatus] = useState()
  // const [screenShare, setScreenShare] = useState(false)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  // const screenTrackRef = useRef()

  useEffect(() => {
    if (showMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      })
    }

    // socket.on('me', (id) => {
    //   console.log(id)
    //   setMe(id)
    // })

    socket.on('callUser', ({ signal }) => {
      setCall({ isReceivingCall: true, signal })
    })

    socket.on('endCall', () => {
      window.location.reload()
    })

    // socket.on('updateUserMedia', ({ type, currentMediaStatus }) => {
    //   if (currentMediaStatus !== null || currentMediaStatus !== []) {
    //     switch (type) {
    //       case 'video':
    //         setUserVdoStatus(currentMediaStatus)
    //         break
    //       case 'mic':
    //         setUserMicStatus(currentMediaStatus)
    //         break
    //       default:
    //         setUserMicStatus(currentMediaStatus[0])
    //         setUserVdoStatus(currentMediaStatus[1])
    //         break
    //     }
    //   }
    // })
  }, [showMedia])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('answerCall', {
        signal: data,
      })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const userLocal = localStorage.getItem('userId')

  const callUser = (toUserId) => {
    socket.emit('showMedia', {
      fromCall: userLocal,
      toCall: toUserId,
      showIncoming: true,
    })
    setShowMedia(true)

    const peer = new Peer({ initiator: true, trickle: false, stream })
    // setOtherUser(id)
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        signalData: data,
      })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.on('callAccepted', ({ signal }) => {
      setCallAccepted(true)
      peer.signal(signal)
      // socket.emit('updateMyMedia', {
      //   type: 'both',
      //   currentMediaStatus: [myMicStatus, myVdoStatus],
      // })
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current.destroy()
    socket.emit('endCall', { id: otherUser })
    window.location.reload()
  }

  const leaveCall1 = () => {
    socket.emit('endCall', { id: otherUser })
  }

  const updateVideo = () => {
    setMyVdoStatus((currentStatus) => {
      socket.emit('updateMyMedia', {
        type: 'video',
        currentMediaStatus: !currentStatus,
      })
      stream.getVideoTracks()[0].enabled = !currentStatus
      return !currentStatus
    })
  }

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit('updateMyMedia', {
        type: 'mic',
        currentMediaStatus: !currentStatus,
      })
      stream.getAudioTracks()[0].enabled = !currentStatus
      return !currentStatus
    })
  }

  return (
    <VideoContext.Provider
      value={{
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
        setOtherUser,
        leaveCall1,
        userName,
        myVdoStatus,
        setMyVdoStatus,
        userVdoStatus,
        setUserVdoStatus,
        updateVideo,
        myMicStatus,
        userMicStatus,
        updateMic,
        // screenShare,
        // handleScreenSharing,
        // fullScreen,
        showMedia,
        setShowMedia,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}

export { ContextProvider, VideoContext }
