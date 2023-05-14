/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { formatDateTime } from '~/utils/formatDateTime'

const ItemGroup = ({ itemGroup }) => {
  return (
    <Link to={`/group/${itemGroup._id}`} css={itemGroupCss}>
      <div className="image-group">
        <img src="#" alt="#" />
      </div>
      <div className="image-group-hover">
        <img src={process.env.REACT_APP_LINK_IMAGES + itemGroup.avatarGroup} alt="#" />
      </div>
      <div className="content-group">
        <div className="date-group">{formatDateTime(itemGroup?.createdAt)}</div>
        <div className="name-group">{itemGroup?.nameGroup}</div>
        <div className="footer-group">
          <div className="title-member">{itemGroup?.userGroup.length} thành viên</div>
          <div className="list-img">
            <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {itemGroup?.userGroup?.map((itemUserGroup) => (
                <Avatar
                  src={process.env.REACT_APP_LINK_IMAGES + itemUserGroup.avatar}
                  key={itemUserGroup._id}
                />
              ))}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemGroup

const itemGroupCss = css`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  position: relative;

  .image-group {
    height: 235px;
    width: 100%;
    transition: all 0.3s ease;
    visibility: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .image-group-hover {
    height: 235px;
    width: 100%;
    position: absolute;
    top: 0;
    transition: all 0.3s ease;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content-group {
    padding: 16px;

    .date-group {
      font-size: 14px;
      font-weight: 700;
      color: var(--color-gray);
    }

    .name-group {
      font-size: 18px;
      font-weight: 700;
    }

    .footer-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;

      .title-member {
        font-weight: 500;
        text-decoration: none;
        color: var(--color-menu-main);
        font-size: 14px;
      }

      .list-img {
        display: flex;
        align-items: center;
      }
    }
  }

  &:hover {
    transform: scale(1.05, 1.05);

    .image-group-hover {
      height: 100%;
      width: 100%;
      opacity: 0.2;
    }
  }
`
