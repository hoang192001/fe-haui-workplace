import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'

const ImageChat = ({ src, selectedFile, setSelectedFile }) => {
  const [preview, setPreview] = useState(null)
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  return (
    <div className="relative max-w-max">
      <img src={preview ? preview : src} alt="" />
      <div className="absolute flex items-center top-1 right-1 bg-white cursor-pointer" onClick={() => setSelectedFile(null)}>
        <CloseOutlined />
      </div>
    </div>
  )
}

export default ImageChat
