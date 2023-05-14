import { Button, Col, Input, Row, Typography, Upload } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { ModalComponent } from '~/components/modal/Modal'
import { createGroupNew } from '~/apis/group/group.api'
import { toast } from 'react-toastify'
const { Text } = Typography
const ModalCreateGroup = ({ open, setOpen, callBackGroups }) => {
  const userLocal = JSON.parse(localStorage.getItem('userInfo'))
  const [fileList, setFileList] = useState([])
  const [nameGroup, setNameGroup] = useState('')
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

  const handleSubmitCreateGroup = () => {
    const dataRequest = {
      nameGroup,
      file: fileList.length > 0 ? fileList[0].originFileObj : '',
      userId: userLocal._id,
    }

    createGroupNew(dataRequest).then(
      (res) => {
        if (res) {
          toast.success('Tạo group mới thành công')
          setOpen(false)
          callBackGroups()
        }
      },
      () => {
        toast.error('Có lỗi hệ thống')
      },
    )
  }

  return (
    <ModalComponent
      isModalOpen={open}
      title="Tạp nhóm mới"
      nameButtonConfirm="Submit tạo"
      handleOk={handleSubmitCreateGroup}
      handleCancel={() => setOpen(false)}
    >
      <Row gutter={[16, 20]}>
        <Col span={24}>
          <Text level={3}>Tên group</Text>
          <Input
            size="large"
            placeholder="Nhập tên group"
            prefix={<UserOutlined />}
            onChange={(e) => setNameGroup(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Text level={3}>Avatar group</Text>
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
      </Row>
    </ModalComponent>
  )
}

export default ModalCreateGroup
