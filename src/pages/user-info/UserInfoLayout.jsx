/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Button } from '~/components/button/Button'
import { BsFillCameraFill, BsTelephoneFill, BsGlobe } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { MdWork } from 'react-icons/md'
import { CreatePost } from '~/containers/create-post/CreatePost'
import { Link, Outlet, useParams } from 'react-router-dom'
import { changeInfoUser, followUser, getUserById } from '~/apis/user/user.api'
import Post from '~/components/post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPostUser } from '~/store/post-reducer/postSlice'
import { Helmet } from 'react-helmet'
import { QRCode } from 'antd'
import ButtonSquare from '~/components/button/ButtonSquare'
import { toast } from 'react-toastify'

export const UserInfoLayout = () => {
  let dispatch = useDispatch()
  const userInfoLocal = JSON.parse(localStorage.getItem('userInfo'))
  const { userId } = useParams()
  const [infoUser, setInfoUser] = useState({})
  const posts = useSelector((state) => state.post.postUser)

  const getPostUser = useCallback(() => {
    dispatch(getAllPostUser(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInfoUser = useCallback(() => {
    getUserById(userId).then((res) => {
      setInfoUser(res.data)
    })
  }, [userId])

  useEffect(() => {
    getInfoUser()
    getPostUser()
  }, [getPostUser, getInfoUser])

  const handleChangeImgCover = (files) => {
    const elementImgCover = document.querySelector('.img-cover')
    if (files) {
      elementImgCover.src = URL.createObjectURL(files)
    }
  }

  const handleFollowUser = (userId) => {
    const dataRequestFollow = {
      userId,
      userFollow: userInfoLocal._id,
    }
    followUser(dataRequestFollow).then((res) => {
      if (res) {
        getUserById(userId).then((res) => {
          setInfoUser(res.data)
        })
      }
    })
  }
  const [selectedFile, setSelectedFile] = useState()
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

  const handleSaveCoverImg = () => {
    const dataRequest = {
      cover: selectedFile,
    }
    changeInfoUser(infoUser._id, dataRequest).then(
      (res) => {
        getInfoUser()
        setPreview(null)
        toast.success('Cập nhật ảnh bìa thành công')
      },
      (err) => {
        toast.error('Có lỗi xảy ra')
      },
    )
  }

  return (
    <Fragment>
      <Helmet>
        <title>{`Profile | ${infoUser?.fullName}`}</title>
      </Helmet>
      <div css={cssUserInfo}>
        <div className="user-cover">
          <img
            src={preview ? preview : process.env.REACT_APP_LINK_IMAGES + infoUser.avatarCover}
            alt="#"
            id="img-cover"
          />
          {userInfoLocal._id === userId && (
            <input
              className="btn-edit-cover"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          )}
          {preview && (
            <div className="btn-change">
              <Button className="btn-save-cover" onClick={() => setPreview(null)}>
                Hủy chỉnh sửa
              </Button>
              <ButtonSquare className="btn-save-cover ml-3" onClick={handleSaveCoverImg}>
                Lưu lại
              </ButtonSquare>
            </div>
          )}
        </div>
        <div className="user-content-main">
          <div className="avatar-user">
            <img src={process.env.REACT_APP_LINK_IMAGES + infoUser.avatar} alt="#" />
            <div className="icon">
              <BsFillCameraFill className="item-plus" />
            </div>
          </div>
          <div className="info-user">
            <div className="head">
              <div className="name">{infoUser?.fullName}</div>
              {userInfoLocal._id !== infoUser._id && (
                <Button className="btn-follow" onClick={() => handleFollowUser(infoUser._id)}>
                  {infoUser?.followers?.flatMap((item) => item._id).includes(userInfoLocal._id)
                    ? 'Ngừng theo dõi'
                    : 'Theo dõi'}
                </Button>
              )}
            </div>
            <div className="body">
              <div className="item-info">{posts?.length} posts</div>
              <div className="item-info">{infoUser?.followers?.length} Followers</div>
              <div className="item-info">{infoUser?.following?.length} Following</div>
            </div>
            <div className="bio">{infoUser?.bio}</div>
          </div>
        </div>
        <div className="post-user">
          {userInfoLocal._id === infoUser._id && <CreatePost getAllPostCallBack={getPostUser} />}

          <div className="detail-info">
            <div className="detail-content">
              <div className="detail-qrcode">
                <QRCode value={window.location.origin + '/profile/' + infoUser._id} />
                <div className="qr-name">QR Code của {infoUser.fullName}</div>
              </div>
              <div className="detail-intro">
                <div className="head">Intro</div>
                <div className="list-item-detail">
                  <div className="item-intro">
                    <GoLocation className="icon-intro" />
                    <span>{infoUser.location}</span>
                  </div>
                  <div className="item-intro">
                    <MdWork className="icon-intro" />
                    <span>{infoUser.email}</span>
                  </div>
                  <div className="item-intro">
                    <BsGlobe className="icon-intro" />
                    <span>
                      <a href={infoUser.website}>{infoUser.website}</a>
                    </span>
                  </div>
                  <div className="item-intro">
                    <BsTelephoneFill className="icon-intro" />
                    <span>{infoUser.phoneNumber}</span>
                  </div>
                </div>
              </div>
              <div className="detail-friends">
                <div className="head">
                  Friends <span>({infoUser?.followers?.length} followers)</span>
                </div>

                <div className="list-images">
                  {infoUser?.followers?.map((item) => (
                    <Link to={`/profile/${item._id}`} className="item-friend" key={item._id}>
                      <img src={process.env.REACT_APP_LINK_IMAGES + item.avatar} alt="" />
                      <div className="name-friend">{item.fullName}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="detail-post">
              {posts?.map((itemPostUser) => (
                <div key={itemPostUser._id}>
                  <Post itemPost={itemPostUser} callBackPosts={getPostUser} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </Fragment>
  )
}

const cssUserInfo = css`
  .user-cover {
    height: 450px;
    width: 100%;
    background-color: var(--color-gray-rain);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-change {
      position: absolute;
      top: 86%;
      right: 13%;
      display: flex;
      align-items: center;
      width: 300px;
    }

    .btn-save-cover {
      width: 200px;
    }

    .btn-edit-cover {
      position: absolute;
      right: 20px !important;
      bottom: 20px !important;
      width: 200px;
      /* background-color: var(--color-white); */
      color: var(--color-gray);

      &:hover {
        color: var(--color-gray-black);
      }
    }
    .btn-edit-cover::-webkit-file-upload-button {
      visibility: hidden;
    }
    .btn-edit-cover::before {
      content: 'Chỉnh sửa ảnh bìa';
      display: inline-block;
      background-color: var(--color-white);
      border: 1px solid #999;
      border-radius: 3px;
      padding: 10px 25px;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      cursor: pointer;
      text-shadow: 1px 1px #fff;
      font-weight: 700;
      font-size: 10pt;
    }
    .btn-edit-cover:hover::before {
      border-color: black;
    }
    .btn-edit-cover:active::before {
      background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
  }
  .user-content-main {
    display: flex;
    margin: 0 350px;
    .avatar-user {
      padding-right: 100px;
      position: relative;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
        transform: translateY(-50%);
        border: 5px solid var(--color-white);
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--color-second);
        position: absolute;
        top: 50px;
        left: 150px;
        cursor: pointer;
        transition: all 0.5s ease;
        &:hover {
          box-shadow: 0 14px 26px -12px rgba(65, 214, 195, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(65, 214, 195, 0.2) !important;
        }
      }
      .item-plus {
        color: var(--color-white);
      }
    }

    .info-user {
      flex: 1;

      .head {
        padding-top: 20px;
        display: flex;
        align-items: center;

        .name {
          font-weight: 700;
          font-size: 24px;
        }

        .btn-follow {
          width: 200px;
          background-color: var(--color-second);
          color: var(--color-white);
          margin-left: auto;

          &:hover {
            box-shadow: 0 14px 26px -12px rgba(65, 214, 195, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12),
              0 8px 10px -5px rgba(65, 214, 195, 0.2) !important;
          }
        }
      }
    }

    .body {
      padding: 10px 0;
      display: flex;
      align-items: center;

      .item-info {
        color: var(--color-gray-rain);
        margin-right: 20px;
        font-size: 18px;
      }
    }

    .bio {
      margin-top: 10px;
      max-width: 600px;
      font-size: 18px;
      color: var(--color-blue);
    }
  }

  .post-user {
    margin: 0 350px;
    margin-top: 20px;

    .detail-info {
      display: flex;

      .detail-content {
        width: 500px;
        margin-top: 10px;
        border-radius: 10px;

        .detail-qrcode {
          width: 100%;
          margin-bottom: 20px;
          padding: 16px;
          background-color: var(--color-white);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .qr-name {
            margin: 10px;
            font-weight: 700;
            font-size: 18px;
            color: var(--color-menu-main-hover);
          }
        }

        .detail-intro {
          width: 100%;
          margin-bottom: 20px;
          padding: 16px;
          background-color: var(--color-white);
          border-radius: 10px;

          .list-item-detail {
            .item-intro {
              display: flex;
              align-items: center;
              color: var(--color-gray);
              margin-bottom: 20px;

              .icon-intro {
                font-size: 24px;
              }

              span {
                margin-left: 10px;
              }
            }
          }
        }

        .detail-friends {
          width: 100%;
          margin-bottom: 20px;
          padding: 16px;
          background-color: var(--color-white);
          border-radius: 10px;

          .list-images {
            display: grid;
            grid-template-columns: auto auto auto;
            gap: 10px;
            .item-friend {
              cursor: pointer;

              img {
                border-radius: 10px;
                height: 150px;
                width: 150px;
                object-fit: cover;
              }

              .name-friend {
                margin-top: 5px;
                font-size: 16px;
                font-weight: 400;
              }
            }
          }
        }

        .head {
          font-weight: 700;
          font-size: 30px;
          vertical-align: middle;
          margin-bottom: 10px;
          span {
            color: var(--color-gray);
            font-size: 14px;
          }
        }
      }

      .detail-post {
        flex: 1;
        margin-right: -10px;
      }
    }
  }
`
