/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Input, Popover } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlineSetting, AiOutlineSearch } from 'react-icons/ai'
import { HiUserGroup } from 'react-icons/hi'
import { BiMessageAdd } from 'react-icons/bi'
import { HiOutlineSquaresPlus } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllConversation } from '~/apis/chat/chat.api'
import { fetchAllMessageChat, selectConversation } from '~/store/message-reducer/messageSlice'
import ItemConversation from '../item-conversation/ItemConversation'
import ModalCreateChat from '~/containers/detail-chat/modal-create-chat/ModalCreateChat'

const ListConversation = () => {
  let dispatch = useDispatch()
  const { chatId } = useParams()
  const [openPopover, setOpenPopover] = useState(false)
  // const userIdLocal = localStorage.getItem('userId')
  // const [listConversation, setListConversation] = useState([])
  const listConversation = useSelector((state) => state.chat.allConversation)

  const [typeCreateChat, setTypeCreateChat] = useState('')
  const [openModal, setOpenModal] = useState(false)

  // const callBackAllChat = useCallback(() => {
  //   getAllConversation(userIdLocal).then((res) => {
  //     setListConversation(res.data)
  //   })
  // }, [userIdLocal])
  // useEffect(() => {
  //   callBackAllChat()
  // }, [callBackAllChat])

  useEffect(() => {
    if (chatId) {
      dispatch(fetchAllMessageChat(chatId))
    }
  }, [chatId, dispatch])

  const handleSelectConversation = (itemConver, indexConver) => {
    dispatch(selectConversation(listConversation[indexConver]))
  }

  const Content = () => (
    <div css={popOverCss}>
      <div
        className="item-popover"
        onClick={() => {
          setOpenPopover(false), setTypeCreateChat('CHAT_GROUP'), setOpenModal(true)
        }}
      >
        <div className="icon">
          <HiUserGroup />
        </div>
        <div className="title">Tạo nhóm chat</div>
      </div>
      <div
        className="item-popover"
        onClick={() => {
          setOpenPopover(false), setTypeCreateChat('CHAT_PRIVATE'), setOpenModal(true)
        }}
      >
        <div className="icon">
          <BiMessageAdd />
        </div>
        <div className="title">Tin nhắn riêng</div>
      </div>
    </div>
  )

  return (
    <div css={cssListConversation}>
      <div className="search-conversation">
        <Input
          className="input-conver"
          size="large"
          placeholder="Tìm kiếm cuộc trò chuyện"
          prefix={<AiOutlineSearch />}
        />
        <div className="setting-conversation">
          <div className="item-set">
            <AiOutlineSetting />
          </div>
          <Popover
            content={<Content />}
            title={null}
            placement="bottomLeft"
            trigger="click"
            open={openPopover}
            onOpenChange={(newOpen) => setOpenPopover(newOpen)}
          >
            <div className="item-set">
              <HiOutlineSquaresPlus />
            </div>
          </Popover>
        </div>
      </div>
      <div className="main-conversation">
        {listConversation?.map((itemConver, indexConver) => (
          <ItemConversation
            itemConver={itemConver}
            key={itemConver._id}
            handleSelectConversation={handleSelectConversation}
            indexConver={indexConver}
          />
        ))}
      </div>
      <ModalCreateChat
        typeCreateChat={typeCreateChat}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </div>
  )
}

export default ListConversation

const cssListConversation = css`
  .search-conversation {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-gray-cloud);

    .input-conver {
      flex: 1;
    }

    .setting-conversation {
      display: flex;
      align-items: center;
      height: 100%;

      .item-set {
        margin-left: 10px;
        padding: 10px;
        display: block;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.3s ease;

        &:hover {
          background-color: var(--color-gray-cloud);
        }
      }
    }
  }

  .main-conversation {
    padding: 10px;
    height: calc(100vh - 130px);
    overflow: auto;

    .item-conversation {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background 0.3s ease;
      border-radius: 10px;

      &:hover {
        background-color: var(--color-gray-cloud);
      }

      &.activeChat {
        background-color: var(--color-active-message);
      }

      .content {
        margin-left: 10px;

        .info-conversation {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .name {
            font-size: 16px;
            font-weight: 700;
          }

          .date-update {
            font-size: 14px;
          }
        }

        .new-message {
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 290px;
        }
      }
    }
  }
`

const popOverCss = css`
  .item-popover {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.5s ease;

    &:hover {
      background-color: var(--color-gray-cloud);
    }

    .icon {
      font-size: 20px;
      color: var(--color-menu-main-hover);
    }

    .title {
      margin-left: 10px;
      font-size: 16px;
    }
  }
`
