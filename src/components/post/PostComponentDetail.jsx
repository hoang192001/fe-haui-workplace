/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx'
import { commentPost, getAllCommentPost } from '~/apis/comment/comment.api'
import { ModalComponent } from '../modal/Modal'
import { PopoverBasic } from '../popover/PopoverBasic'
import Post from './Post'
import { socket } from '~/App'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '~/apis/post/post.api'
import ReactTimeAgo from 'react-time-ago'

export const PostComponentDetail = () => {
  const userId = localStorage.getItem('userId')
  const { postId } = useParams()
  let navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [itemPost, setItemPost] = useState(null)
  const [valueComment, setValueComment] = useState('')
  const callBackComment = useCallback(() => {
    getAllCommentPost(postId).then((res) => {
      setComments(res.data)
    })
  }, [postId])

  useEffect(() => {
    callBackComment()
  }, [callBackComment])

  const callBackPostDetail = useCallback(() => {
    getPostById(postId).then((res) => {
      if (res) {
        setItemPost(res.data)
      }
    })
  }, [postId])

  useEffect(() => {
    callBackPostDetail()
  }, [callBackPostDetail])

  const onKeyUpSubmitComment = (e) => {
    const dataComment = {
      userId,
      content: valueComment,
    }
    if (e.keyCode === 13) {
      socket.emit('client-commentPost', { ...dataComment, postId: itemPost._id })
      commentPost(itemPost._id, dataComment).then((res) => {
        if (res) {
          callBackComment()
          setValueComment('')
        }
      })
    }
  }

  return (
    <Fragment>
      <ModalComponent
        isModalOpen={true}
        handleCancel={() => navigate(-1)}
        title={`Bài viết của ${itemPost?.userPost?.fullName}`}
        css={cssModal}
        footer={
          <CommentBox
            valueComment={valueComment}
            setValueComment={setValueComment}
            onKeyUpSubmitComment={onKeyUpSubmitComment}
          />
        }
        width={1500}
      >
        <div
          style={{
            height: '700px',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          {itemPost && (
            <Fragment>
              <Post
                itemPost={itemPost}
                isDetail={true}
                screen="DETAIL"
                callBackPosts={callBackPostDetail}
              />
              <div css={cssListComment}>
                {comments?.map((itemComment) => (
                  <CommentUser
                    callBackComment={callBackComment}
                    key={itemComment._id}
                    itemComment={itemComment}
                  />
                ))}
              </div>
            </Fragment>
          )}
        </div>
      </ModalComponent>
    </Fragment>
  )
}

const CommentUser = ({ itemComment, callBackComment }) => {
  const userId = localStorage.getItem('userId')
  return (
    <div className="item-comment">
      <img src={process.env.REACT_APP_LINK_IMAGES + itemComment.userComment?.avatar} alt="#" />
      <div className="body-comment">
        <div className="content-comment">
          <strong>{itemComment.userComment.fullName}</strong>
          <div className="body-commnet">{itemComment.content}</div>
        </div>
        <div className="time-comment">
          <div className="mr-4">Thích</div>
          <ReactTimeAgo date={new Date(itemComment.createdAt)} locale="en-US" />
        </div>
      </div>
      <div className="drop-change">
        {userId === itemComment?.userComment._id && (
          <PopoverBasic itemComment={itemComment} callBackComment={callBackComment}>
            <RxDotsHorizontal />
          </PopoverBasic>
        )}
      </div>
    </div>
  )
}

const CommentBox = ({ valueComment, setValueComment, onKeyUpSubmitComment }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  return (
    <div css={cssComment}>
      <img src={process.env.REACT_APP_LINK_IMAGES + userInfo?.avatar} alt="#" />
      <input
        type="text"
        placeholder="Hãy bình luận gì đó..."
        value={valueComment}
        onChange={(e) => setValueComment(e.target.value)}
        onKeyUp={onKeyUpSubmitComment}
      />
    </div>
  )
}

const cssModal = css`
  .ant-modal-footer {
    display: none;
  }
`

const cssComment = css`
  display: flex;
  border-top: 1px solid var(--color-gray-cloud);
  width: 100%;
  padding: 10px 0;

  img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: 50%;
  }

  input {
    flex: 1;
    border-radius: 50px;
    margin-left: 10px;
    padding-left: 20px;
    background-color: var(--color-gray-cloud);
  }
`

const cssListComment = css`
  width: 450px;
  position: absolute;
  right: 0;
  top: 180px;
  height: 500px;
  overflow-y: auto;
  border-top: 1px solid var(--color-gray-cloud);

  .item-comment {
    margin-top: 20px;
    display: flex;
    align-items: center;

    img {
      width: 42px;
      height: 42px;
      object-fit: cover;
      border-radius: 50%;
    }
    .body-comment {
      margin-left: 10px;
      .content-comment {
        padding: 10px;
        background-color: var(--color-gray-cloud);
        border-radius: 10px;
      }

      .time-comment {
        display: flex;
        padding: 4px 0;
        font-size: 12px;
        margin-left: 10px;
        color: var(--color-gray-rain);
      }
    }

    .drop-change {
      margin-left: 10px;
      padding: 5px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
`
