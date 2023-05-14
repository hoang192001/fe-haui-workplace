/* @jsxImportSource @emotion/react */
import { Button, Col, Input, Row, Space, Typography, Upload } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  LinkOutlined,
  PhoneOutlined,
  HomeOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { changeInfoUser, getUserById } from '~/apis/user/user.api'
import { toast } from 'react-toastify'
const { TextArea } = Input
const { Text } = Typography
const ContentSetting = ({ setDataInfoUser }) => {
  const userLocal = JSON.parse(localStorage.getItem('userInfo'))
  const [fileList, setFileList] = useState([])
  const [infoUser, setInfoUser] = useState({
    ...userLocal,
  })

  useEffect(() => {
    getUserById(userLocal._id).then((res) => {
      setInfoUser(res.data)
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      setDataInfoUser(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  const handleSubmitSave = () => {
    const dataRequest = {
      ...infoUser,
      avatar: fileList.length > 0 ? fileList[0].originFileObj : infoUser.avatar
    }
    changeInfoUser(infoUser._id, dataRequest).then((res) => {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      setDataInfoUser(res.data)
      toast.success('Cập nhật thông tin thành công')
    }, err => {
      toast.error('Có lỗi xảy ra')
    })
  }

  const handleResetChange = () => {
    setInfoUser({
      ...userLocal,
    })
  }

  return (
    <div css={cssContentSetting}>
      <Row gutter={[16, 40]}>
        <Col span={12}>
          <Text level={5}>Tên đầy đủ</Text>
          <Input
            size="large"
            value={infoUser.fullName}
            placeholder="FullName"
            prefix={<UserOutlined />}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                fullName: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <Text level={5}>Email</Text>
          <Input
            value={infoUser.email}
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                email: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <Text level={5}>Link website</Text>
          <Input
            value={infoUser.website}
            size="large"
            placeholder="Website"
            prefix={<LinkOutlined />}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                website: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <Text level={5}>Số điện thoại</Text>
          <Input
            value={infoUser.phoneNumber}
            size="large"
            placeholder="Phone number"
            prefix={<PhoneOutlined />}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                phoneNumber: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <Text level={5}>Địa chỉ</Text>
          <Input
            value={infoUser.location}
            size="large"
            placeholder="location"
            prefix={<HomeOutlined />}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                location: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <Text level={5}>Avatar</Text>
          <div className="">
            <Upload
              multiple={false}
              beforeUpload={() => false}
              name="file"
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              accept="image/png, image/gif, image/jpeg"
            >
              <Button disabled={fileList.length > 0} icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
          </div>
        </Col>

        <Col span={24}>
          <Text level={5}>Bio cá nhân</Text>
          <TextArea
            value={infoUser.bio}
            showCount
            maxLength={1000}
            style={{ height: 120, marginBottom: 24 }}
            placeholder="Nhập ở đây"
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                bio: e.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <Space wrap>
            <Button type="primary" onClick={handleSubmitSave}>
              Lưu thay đổi
            </Button>
            <Button onClick={handleResetChange}>Reset</Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ContentSetting

const cssContentSetting = css`
  .ant-btn-primary {
    background-color: var(--color-menu-main);
  }
`
