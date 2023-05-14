/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { Fragment, useCallback, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import ButtonSquare from '~/components/button/ButtonSquare'
import Post from '~/components/post/Post'
import { CreatePost } from '~/containers/create-post/CreatePost'
import { fetchAllPost, loadMorePost } from '~/store/post-reducer/postSlice'
import { ContentLeft } from './content-left/ContentLeft'
import { RightHome } from './content-right/RightHome'

const Home = () => {
  let dispatch = useDispatch()
  const dataAllPost = useSelector((state) => state.post.posts)
  const page = useRef(2)

  const getAllPostCallBack = useCallback(() => {
    dispatch(fetchAllPost())
  }, [dispatch])

  useEffect(() => {
    getAllPostCallBack()
  }, [getAllPostCallBack])

  const handleShowMore = () => {
    let pageNum = page.current++
    dispatch(loadMorePost(pageNum))
  }

  return (
    <Fragment>
      <Helmet>
        <title>Home | New Feed</title>
      </Helmet>
      <div className="main-home" css={cssHome}>
        <div className="content-main-left">
          <ContentLeft />
        </div>
        <div className="main-feed">
          <div className="heading-create">
            <CreatePost getAllPostCallBack={getAllPostCallBack} />
          </div>
          <div className="new-feed">
            {dataAllPost?.map((itemPost, index) => {
              return (
                <div key={itemPost?._id}>
                  <Post itemPost={itemPost} callBackPosts={getAllPostCallBack} screen="HOME" />
                </div>
              )
            })}
          </div>
          <div className="feed-footer">
            <ButtonSquare onClick={handleShowMore}>Xem thêm</ButtonSquare>
          </div>
        </div>
        <div className="content-main">
          <RightHome />
        </div>
        <Outlet />
      </div>
    </Fragment>
  )
}

export default Home

const cssHome = css`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .main-feed {
    margin: 0 300px;
    flex: 1;
    /* background-color: lavender; */
    padding: 10px;
    .heading-create {
      margin-bottom: 20px;
    }
    .new-feed {
      /* display: flex;
      flex-wrap: wrap;
      justify-content: space-between; */
      display: grid;
      /* grid-template-columns: repeat(3, 1fr); */
      gap: 10px;
      margin: 0 -10px;
    }
    .feed-footer {
      display: flex;
      justify-content: center;
      padding: 10px 0;
    }

    .loadmore-feed {
      width: 200px;
      background-color: var(--color-gray-rain);
    }
  }

  .content-main,
  .content-main-left {
    width: 300px;
    height: 100%;
    padding: 10px;
  }

  .content-main-left {
    padding-top: 60px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 60px;
    height: 100vh;
    overflow-y: auto;
    background-color: var(--color-gray-cloud);
    z-index: 10;
  }

  .content-main {
    padding-top: 60px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 60px;
    height: 100vh;
    overflow-y: auto;
    background-color: var(--color-gray-cloud);
    z-index: 10;
  }

  @media only screen and (min-width: 1200px) {
    .new-feed {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media only screen and (max-width: 1600px) {
    .new-feed {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 1200px) {
    .new-feed {
      grid-template-columns: 1fr;
    }
  }
`
