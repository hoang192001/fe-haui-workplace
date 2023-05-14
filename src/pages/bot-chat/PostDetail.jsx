/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const PostDetail = () => {
  return (
    <div css={cssPostDetail}>
      <iframe src="https://chatbot.theb.ai/#/chat" className='full-screen'></iframe>
    </div>
  )
}

export default PostDetail

const cssPostDetail = css`
.full-screen {
  margin-top: 60px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`
