/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from 'antd'
import { AiOutlineLink, AiOutlineTag } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCoversation } from '~/apis/chat/chat.api'
import { joinGroup } from '~/apis/group/group.api'
import ButtonSquare from '~/components/button/ButtonSquare'
import Post from '~/components/post/Post'
import { CreatePost } from '~/containers/create-post/CreatePost'
import { formatDateTime } from '~/utils/formatDateTime'

const MainGroup = ({ groupDetail, callBackGroup }) => {
  const userIdLocal = localStorage.getItem('userId')
  const { groupId } = useParams()

  const handleCreateChatGroup = () => {
    const dataRequest = {
      typeConversation: 'group',
      from: userIdLocal,
      members: groupDetail.userGroup.flatMap((itemUser) => itemUser._id),
      nameGroup: groupDetail.nameGroup,
    }

    createCoversation(dataRequest).then((res) => {
      if (res) {
        if (res.status === 201) {
          toast.info('Cuộc trò chuyện đã tồn tại')
        } else {
          window.location.href = '/chat'
        }
      }
    })
  }

  const handleOutGroup = () => {
    joinGroup(groupId).then((res) => {
      if (res) {
        window.location.href = `/group`
      }
    })
  }

  return (
    <div css={cssMainGroup}>
      <div className="cover__group">
        <img src={process.env.REACT_APP_LINK_IMAGES + groupDetail?.avatarGroup} alt="" />
      </div>
      <div className="heading__group">
        <div className="title__group">{groupDetail?.nameGroup}</div>
        <Button type="primary">Mời thành viên</Button>
      </div>
      <div className="menu-group-main">
        <div className="menu-group">
          <div className="item-menu active">Bài viết</div>
          <div className="item-menu">Ảnh</div>
          <div className="item-menu">File</div>
          <div className="item-menu">Thành viên</div>
        </div>
        {groupDetail?.userCreate?._id === userIdLocal ? (
          <ButtonSquare onClick={handleCreateChatGroup}>Tạo nhóm chat cho group</ButtonSquare>
        ) : (
          <ButtonSquare onClick={handleOutGroup}>Rời khỏi nhóm</ButtonSquare>
        )}
      </div>
      <div className="">
        <CreatePost getAllPostCallBack={callBackGroup} isPostGroup groupId={groupId} />
      </div>
      <div className="main-feed__group">
        <div className="feed-post">
          {groupDetail?.postGroup?.map((itemPostGroup, index) => (
            <div className="" key={itemPostGroup._id}>
              <Post
                // isDetail
                itemPost={itemPostGroup}
                callBackPosts={callBackGroup}
              />
            </div>
          ))}
        </div>
        <div className="feed-trending">
          <div className="item-trending">
            <div className="heading">
              <AiOutlineTag />
              <span className="ml-2">Giới thiệu</span>
            </div>
            <div className="desc">
              Hãy thêm mô tả để giúp mọi người hiểu hơn về nhóm của bạn nhé!
            </div>
            <div className="create-date">
              Ngày lập nhóm - {formatDateTime(groupDetail.createdAt)}
            </div>
          </div>
          <div className="item-trending">
            <div className="heading">
              <AiOutlineLink />
              <span className="ml-2">Đa phương tiện chia sẻ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainGroup

const cssMainGroup = css`
  .cover__group {
    height: 450px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .heading__group {
    padding: 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title__group {
      font-size: 28px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .ant-btn-primary {
    background-color: var(--color-menu-main);
  }

  .menu-group-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu-group {
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--color-gray-rain);

    .item-menu {
      padding: 16px 30px;
      cursor: pointer;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.5s ease;
      margin-left: 5px;

      &.active {
        color: white;
        background-color: var(--color-menu-main);
      }

      &:hover {
        color: white;
        background-color: var(--color-menu-main-hover);
      }
    }
  }

  .main-feed__group {
    display: flex;

    .feed-post {
      flex: 1;
      margin-left: -10px;
    }

    .feed-trending {
      width: 600px;
      position: sticky;
      top: 60px;
      height: 700px;

      .item-trending {
        background-color: white;
        border-radius: 10px;
        margin-top: 10px;
        padding: 24px 26px;

        .heading {
          display: flex;
          padding: 16px 0;
          font-size: 24px;
          align-items: center;
          font-weight: 600;
        }

        .desc {
          font-size: 18px;
          padding: 16px 0;
          color: var(--color-gray-rain);
        }

        .create-date {
          padding-top: 10px;
          border-top: 1px solid var(--color-gray-rain);
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
  }
`
