/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

const AvatarInput = ({ src, onChange, selectedFile }) => {
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

  return (
    <div css={cssInputAvatar}>
      <div className="personal-image">
        <label className="label">
          <input type="file" onChange={onChange} />
          <figure className="personal-figure">
            <img src={preview ? preview : src} className="personal-avatar" alt="avatar" />
            <figcaption className="personal-figcaption">
              <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
            </figcaption>
          </figure>
        </label>
      </div>
    </div>
  )
}

export default AvatarInput

const cssInputAvatar = css`
  .personal-image {
    text-align: center;
  }
  .personal-image input[type='file'] {
    display: none;
  }
  .personal-figure {
    position: relative;
    width: 120px;
    height: 120px;
  }
  .personal-avatar {
    cursor: pointer;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    border-radius: 100%;
    border: 2px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    transition: all ease-in-out 0.3s;
    object-fit: cover;
  }
  .personal-avatar:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
  .personal-figcaption {
    cursor: pointer;
    position: absolute;
    top: 0px;
    width: inherit;
    height: inherit;
    border-radius: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all ease-in-out 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .personal-figcaption:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .personal-figcaption > img {
    width: 50px;
    height: 50px;
  }
`
