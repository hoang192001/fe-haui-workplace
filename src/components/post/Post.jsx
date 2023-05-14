/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Fragment, useEffect } from 'react'
import { RxDotsVertical } from 'react-icons/rx'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { BsCaretRightFill } from 'react-icons/bs'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { formatDateTime } from '~/utils/formatDateTime'
import { Avatar } from 'antd'
import { PopoverComponent } from '../popover-post/PopoverComponent'
import { actionLikePost } from '~/apis/post/post.api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPost, likePostHome } from '~/store/post-reducer/postSlice'
import { Link } from 'react-router-dom'

export default function Post({
  setOpenPost,
  setIndexPost,
  isDetail = false,
  itemPost,
  callBackPosts,
  screen = '',
}) {
  let dispatch = useDispatch()
  const socket = useSelector((state) => state.socket.value)
  const userId = localStorage.getItem('userId')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const handleLikePost = () => {
    const dataAction = {
      userInfo,
      postId: itemPost?._id,
    }

    // socket.emit('client-likePost', data)
    dispatch(likePostHome(dataAction))
    actionLikePost(itemPost?._id, { userId }).then((res) => {
      if (res) {
        if (screen !== 'HOME') {
          callBackPosts()
        }
      }
    })
  }

  // useEffect(() => {
  //   socket.on('server-likeToClient', () => {
  //     dispatch(fetchAllPost())
  //   })

  //   return () => socket.off('server-likeToClient')
  // }, [dispatch, socket])

  return (
    <div css={cssPost(isDetail)}>
      {!isDetail && (
        <div css={headingPost}>
          <Fragment>
            <img
              src={process.env.REACT_APP_LINK_IMAGES + itemPost?.userPost?.avatar}
              alt="#"
              className="user-image cursor-pointer"
            />
            <div className="user-info cursor-pointer">
              <div className="flex items-center">
                <Link to={'/profile/' + itemPost?.userPost?._id} className="name flex items-center">
                  {itemPost?.userPost?.fullName}
                  <span>
                    <img
                      src="https://nhanhoa.com/uploads/attach/1618816460_tich_xanh_facebook.png"
                      style={{ width: '12px', display: 'inline', marginLeft: '5px' }}
                    />
                  </span>
                </Link>
                {itemPost?.groupId && (
                  <Link
                    to={'/group/' + itemPost?.groupId?._id}
                    className="ml-2 flex items-center font-medium date-created-post hover:text-black"
                  >
                    <BsCaretRightFill />
                    {itemPost?.groupId?.nameGroup}
                  </Link>
                )}
              </div>

              <div className="date-created-post">{formatDateTime(itemPost?.createdAt)}</div>
            </div>
          </Fragment>
          <div className="drop-change">
            <PopoverComponent userPost={itemPost?.userPost} itemPost={itemPost}>
              <RxDotsVertical />
            </PopoverComponent>
          </div>
        </div>
      )}
      <div css={bodyPost(isDetail)}>
        <div className="content-post">{itemPost?.content}</div>
        {itemPost?.images.length !== 0 && (
          <Link to={`post/${itemPost?._id}`}>
            <div className="img-post">
              <img src={process.env.REACT_APP_LINK_IMAGES + itemPost?.images[0]} alt="#" />
            </div>
          </Link>
        )}
        <div className="body-action">
          <div className="action-icon" onClick={handleLikePost}>
            {itemPost?.likes.flatMap((item) => item.userLike._id).includes(userId) ? (
              <IoMdHeart />
            ) : (
              <IoMdHeartEmpty />
            )}
          </div>
          <div className="action-icon">
            <AiOutlineShareAlt />
          </div>
          <div
            className="action-icon"
            onClick={() => {
              setOpenPost(true), setIndexPost(itemPost?._id)
            }}
          >
            <FaRegComment />
          </div>
        </div>
      </div>
      <div className="detail-right">
        {isDetail && (
          <div css={headingPost}>
            <Fragment>
              <img
                src={process.env.REACT_APP_LINK_IMAGES + itemPost?.userPost?.avatar}
                alt="#"
                className="user-image cursor-pointer"
              />
              <div className="user-info cursor-pointer">
                <div className="flex items-center">
                  <Link
                    to={'/profile/' + itemPost?.userPost?._id}
                    className="name flex items-center"
                  >
                    {itemPost?.userPost?.fullName}
                    <span>
                      <img
                        src="https://nhanhoa.com/uploads/attach/1618816460_tich_xanh_facebook.png"
                        style={{ width: '12px', display: 'inline', marginLeft: '5px' }}
                      />
                    </span>
                  </Link>
                  {itemPost?.groupId && (
                    <Link
                      to={'/group/' + itemPost?.groupId?._id}
                      className="ml-2 flex items-center font-medium date-created-post hover:text-black"
                    >
                      <BsCaretRightFill />
                      {itemPost?.groupId?.nameGroup}
                    </Link>
                  )}
                </div>

                <div className="date-created-post">{formatDateTime(itemPost?.createdAt)}</div>
              </div>
            </Fragment>
            <div className="drop-change">
              <PopoverComponent userPost={itemPost?.userPost} itemPost={itemPost}>
                <RxDotsVertical />
              </PopoverComponent>
            </div>
          </div>
        )}
        <div css={footerPost}>
          <div className="group-likes">
            <Avatar.Group
              maxCount={2}
              maxPopoverTrigger="click"
              size="large"
              maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
                cursor: 'pointer',
              }}
            >
              {itemPost?.likes?.map((itemLike, index) => (
                <Avatar
                  key={itemLike._id}
                  src={process.env.REACT_APP_LINK_IMAGES + itemLike.userLike?.avatar}
                />
              ))}
            </Avatar.Group>
            <div className="title-like">
              {itemPost?.likes.length > 0 ? (
                <div>
                  <strong>
                    {itemPost?.likes[0]?.userLike.fullName}, {itemPost?.likes[1]?.userLike.fullName}
                  </strong>{' '}
                  và 69 người khác
                </div>
              ) : (
                <strong>Hãy là người bày tỏ cảm xúc đầu tiên</strong>
              )}
            </div>
          </div>
          <div className="group-icon">
            <div className="item-icon">
              <IoMdHeartEmpty />
              <span>{itemPost?.likes.length}</span>
            </div>
            <div className="item-icon">
              <AiOutlineShareAlt />
              <span>1</span>
            </div>
            <div className="item-icon">
              <FaRegComment />
              <span>{itemPost?.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const cssPost = (isDetail) => css`
  ${isDetail ? 'display: flex;' : ''}
  min-width: 400px;
  margin: 10px;
  padding: 16px;
  border-radius: 10px;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
  background-color: #ffffff;
  transform: scale(1);
  transition: all 0.3s ease-in-out;

  &:hover {
    ${!isDetail ? 'transform: scale(1.05, 1.05);' : ''}
  }

  .detail-right {
    ${isDetail ? 'width: 450px; padding: 20px;' : ''}
  }
`

const headingPost = css`
  display: flex;
  align-items: center;

  .user-image {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info {
    margin-left: 10px;
    .name {
      font-weight: 700;
      font-size: 18px;
    }
    .date-created-post {
      color: var(--color-gray-rain);
      font-size: 14px;
    }
  }

  .drop-change {
    margin-left: auto;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #f3f3f3;
    }
  }
`
const bodyPost = (isDetail) => css`
  position: relative;
  height: 100%;
  flex: 1;
  .content-post {
    padding: 10px 0;
    font-size: 18px;
  }

  .img-post {
    width: 100%;
    ${isDetail ? 'height: 600px; background-color: var(--color-gray);' : 'height: 250px;'}
    border-radius: 5px;
    cursor: pointer;
    ${isDetail && 'pointer-events: none;'}
    img {
      width: 100%;
      height: 100%;

      ${isDetail ? 'object-fit: contain;' : 'object-fit: cover;'}
      border-radius: inherit;
    }
  }

  .body-action {
    position: absolute;
    right: 0;
    bottom: -21px;
    max-height: 43px;
    display: flex;
    align-items: center;

    .action-icon {
      padding: 10px;
      background-color: var(--color-menu-main);
      color: white;
      border-radius: 50%;
      margin: 0 5px;
      transition: all 0.3s ease-in-out;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      &:hover {
        cursor: pointer;
        background-color: var(--color-menu-main-hover);
      }

      &:first-of-type {
        animation: scales 1s infinite;
      }
    }

    @keyframes scales {
      0% {
        transform: scale(1.2);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.2);
      }
    }
  }
`
const footerPost = css`
  display: flex;
  align-items: center;
  padding-top: 30px;

  .group-likes {
    display: flex;
    align-items: center;

    .title-like {
      font-size: 12px;
      margin-left: 5px;
      font-weight: 400;
      overflow: hidden;
      line-break: loose;
      max-width: 150px;
    }
  }

  .group-icon {
    display: flex;
    margin-left: auto;

    .item-icon {
      color: var(--color-gray-rain);
      margin-right: 10px;
      display: flex;
      align-items: center;

      &:last-child {
        margin-right: 0;
      }

      span {
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
`
