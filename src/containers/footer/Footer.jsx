/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './footer.scss'
import { ModalComponent } from '~/components/modal/Modal'
import { Fragment, useContext, useEffect, useState } from 'react'
import { PostContext } from '~/context/postContext'
import ButtonSquare from '~/components/button/ButtonSquare'
import { Button, Dropdown, Space } from 'antd'
import { AiFillLock } from 'react-icons/ai'
import { FaGlobeAmericas } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { GrClose } from 'react-icons/gr'
import { BsCardImage } from 'react-icons/bs'
import { changePost } from '~/apis/post/post.api'
import { fetchAllPost } from '~/store/post-reducer/postSlice'
import { useDispatch } from 'react-redux'

const Footer = () => {
  const { postDetail, setPostDetail } = useContext(PostContext)
  const [preview, setPreview] = useState()
  const [contentPost, setContentPost] = useState('')
  const [selectedFile, setSelectedFile] = useState()
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

  useEffect(() => {
    setContentPost(postDetail?.content)
    if (postDetail?.images.length > 0) {
      setPreview(process.env.REACT_APP_LINK_IMAGES + postDetail?.images[0])
    }
  }, [postDetail])

  const handleMenuClick = (e) => {
    console.log('click', e)
  }
  const items = [
    {
      label: 'Công khai',
      key: '1',
      icon: <FaGlobeAmericas />,
    },
    {
      label: 'Riêng tư',
      key: '2',
      icon: <AiFillLock />,
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }
  let dispatch = useDispatch()

  const handleSubmitChange = () => {
    const dataRequest = {
      file: selectedFile,
      content: contentPost,
    }
    changePost(postDetail?._id, dataRequest).then((res) => {
      if (res) {
        setPostDetail(undefined)
        dispatch(fetchAllPost())
      }
    })
  }

  return (
    <ModalComponent
      isModalOpen={postDetail}
      handleCancel={() => setPostDetail(undefined)}
      title={`Chỉnh sửa bài viết`}
      footer={<ButtonSquare onClick={handleSubmitChange}>Lưu lại chỉnh sửa</ButtonSquare>}
      width={700}
    >
      <div
        style={{
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {postDetail && (
          <Fragment>
            <div className="my-2">
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    <FaGlobeAmericas />
                    Công khai
                    <IoIosArrowDown />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div className="my-2">
              <textarea
                type="text"
                value={contentPost}
                className="bg-slate-200 py-2 w-full rounded-md pl-4 border-none"
                onChange={(e) => setContentPost(e.target.value)}
              />
            </div>
            <div css={cssImage} className="relative max-w-max bg-green-300 hover:bg-slate-400">
              {preview && <img src={preview || ''} alt="#" />}
              <div
                className="absolute text-lg flex items-center top-1 right-1 hover:text-white cursor-pointer z-10"
                onClick={() => setSelectedFile(null)}
              >
                <GrClose className="hover:text-white" />
              </div>
            </div>
            <label className="mt-3">
              <div className="flex items-center py-2 px-4 bg-gray-300 max-w-max mt-3 rounded-md cursor-pointer">
                <BsCardImage className="mr-2" />
                Chọn ảnh khác
              </div>
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>
          </Fragment>
        )}
      </div>
    </ModalComponent>
  )
}

export default Footer

const cssImage = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  &:hover {
    &::after {
      background-color: var(--color-black);
    }
  }
`
