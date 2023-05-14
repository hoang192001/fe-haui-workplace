/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Divider, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Fragment, useState } from 'react'
import { ModalComponent } from '~/components/modal/Modal'
import { PostHeading } from './post-heading/PostHeading'
import { createPostApi } from '~/apis/post/post.api'
import { createPostGroup } from '~/apis/group/group.api'

export const CreatePost = ({ getAllPostCallBack, isPostGroup = false, groupId }) => {
  const userId = localStorage.getItem('userId')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const [content, setContent] = useState('')

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  const handleCreate = () => {
    setConfirmLoading(true)
    if (isPostGroup) {
      const dataRequest = {
        userId,
        file: fileList.flatMap((item) => item.originFileObj),
        content,
        groupId,
      }

      createPostGroup(dataRequest).then((res) => {
        if (res) {
          getAllPostCallBack()
          setConfirmLoading(false)
          setIsOpenModal(false)
        }
      })
    } else {
      const dataRequest = {
        userId,
        file: fileList.flatMap((item) => item.originFileObj),
        content,
      }
      createPostApi(dataRequest).then((res) => {
        if (res) {
          getAllPostCallBack()
          setConfirmLoading(false)
          setIsOpenModal(false)
          setFileList([])
          setContent('')
        }
      })
    }
  }

  return (
    <Fragment>
      <PostHeading setIsOpenModal={setIsOpenModal} />
      <ModalComponent
        title="Tạo bài viết của bạn"
        isModalOpen={isOpenModal}
        nameButtonConfirm="Tạo bài viết"
        confirmLoading={confirmLoading}
        handleOk={handleCreate}
        handleCancel={() => setIsOpenModal(false)}
      >
        <div css={createPost}>
          <div css={headingCreate}>
            <img src={process.env.REACT_APP_LINK_IMAGES + userInfo?.avatar} alt="" />
            <textarea
              type="text"
              placeholder="Hãy viết tâm trạng của bạn..."
              className="title"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Divider />
          <div css={cssUpload}>
            <Upload
              multiple={true}
              beforeUpload={() => false}
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              accept="image/png, image/gif, image/jpeg"
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
        </div>
      </ModalComponent>
    </Fragment>
  )
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
)

const createPost = css`
  padding: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
  border: 1px solid var(--color-gray-cloud);
`
const headingCreate = css`
  display: flex;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .title {
    padding: 15px;
    margin-left: 10px;
    width: 100%;
    height: 100px;
    background-color: var(--color-gray-cloud);
    color: var(--color-gray);
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--color-menu-main);
      color: var(--color-white);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`
const cssUpload = css`
  .anticon svg[data-icon='eye'] {
    display: none;
    visibility: hidden;
    pointer-events: none;
  }

  a[title='Preview file'] {
    display: none;
  }
`
