/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, Input, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { getAllGroupNotJoin, joinGroup } from '~/apis/group/group.api'
import ButtonSquare from '~/components/button/ButtonSquare'
import { useDebounce } from '~/hooks/useDebounce'

const SideBarMenuGroup = () => {
  const [listGroupNotJoin, setListGroupNotJoin] = useState([])
  const [searchTerm, setsearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      getAllGroupNotJoin(searchTerm).then((res) => {
        if (res) {
          setListGroupNotJoin(res.data)
        }
      })
    } else {
      getAllGroupNotJoin().then((res) => {
        if (res) {
          setListGroupNotJoin(res.data)
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  const handleJoinGroup = (groupId) => {
    joinGroup(groupId).then((res) => {
      if (res) {
        window.location.href = `/group/${res.data._id}`
      }
    })
  }

  return (
    <div css={cssMenuGroup}>
      <div className="heading">Nhóm đề xuất</div>
      <div className="search-group">
        <Input
          placeholder="Tìm kiếm nhóm"
          className="mb-2"
          onChange={(e) => setsearchTerm(e.target.value)}
        />
      </div>
      <div className="list-group">
        {listGroupNotJoin?.map((itemGroup) => (
          <div className="item-group" key={itemGroup._id}>
            <Avatar size={60} src={process.env.REACT_APP_LINK_IMAGES + itemGroup.avatarGroup} />
            <Tooltip placement="bottomLeft" title={itemGroup.nameGroup}>
              <div className="title">{itemGroup.nameGroup}</div>
            </Tooltip>
            <ButtonSquare
              className="w-[150px] button-join"
              onClick={() => handleJoinGroup(itemGroup._id)}
            >
              Tham gia
            </ButtonSquare>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBarMenuGroup

const cssMenuGroup = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  .heading {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .list-group {
    flex: 1;
    width: 100%;

    .item-group {
      width: 100%;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      margin-bottom: 10px;

      .title {
        margin-left: 5px;
        font-size: 16px;
        font-weight: 500;
        max-width: 140px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .button-join {
        font-size: 12px;
      }

      &:hover {
        background-color: var(--color-gray-cloud);
      }
    }
  }
`
