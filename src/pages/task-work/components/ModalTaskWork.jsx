/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Col, DatePicker, Input, Modal, Row, Select, Slider, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { DeleteOutlined } from '@ant-design/icons'
const { Text } = Typography
const ModalTaskWork = ({
  setIsOpenModalTask,
  isOpenModalTask,
  setDataTask,
  dataTask,
  handleSaveChangeTask,
  handleDeleteTask,
  board,
}) => {
  return (
    <Modal
      open={isOpenModalTask}
      onOk={handleSaveChangeTask}
      //   confirmLoading={confirmLoading}
      onCancel={() => {
        setIsOpenModalTask(false)
      }}
      width={600}
      okText={'Lưu thay đổi'}
      title={
        <div className="flex items-center" css={cssHeadingModal}>
          Chi tiết công việc{' '}
          <div className="item-setting text-red-500" onClick={handleDeleteTask}>
            <DeleteOutlined />
          </div>
        </div>
      }
    >
      <div css={cssModalTask}>
        <Row gutter={[16, 20]}>
          <Col span={24}>
            <Text level={3}>Người thực hiện</Text>
            <Select
              mode="multiple"
              placeholder="Tìm người thực hiện"
              value={dataTask?.members}
              onChange={(value) => setDataTask((prev) => ({ ...prev, members: value }))}
              style={{
                width: '100%',
              }}
              options={board?.members?.map((item) => ({
                value: item._id,
                label: item.fullName,
              }))}
            />
          </Col>
          <Col span={24}>
            <Text level={3}>Tiêu đề</Text>
            <Input
              size="large"
              placeholder="Tiêu đề công việc"
              value={dataTask.title}
              onChange={(e) =>
                setDataTask((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </Col>
          <Col span={24}>
            <Text level={3}>Nội dung</Text>
            <TextArea
              rows={4}
              placeholder="Nhập nội dung sự kiện"
              value={dataTask.description}
              onChange={(e) =>
                setDataTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </Col>
          <Col span={24}>
            <div className="flex items-center">
              <Col span={12}>
                <Text level={3}>Thời gian</Text>
                <DatePicker
                  showTime={true}
                  value={dataTask.timeDeadline ? dayjs(dataTask.timeDeadline) : null}
                  onChange={(value) =>
                    setDataTask((prev) => ({
                      ...prev,
                      timeDeadline: dayjs(value.$d),
                    }))
                  }
                  format={`DD-MM-YYYY HH:mm`}
                />
              </Col>
              <Col span={12}>
                <Text level={3}>Độ ưu tiên</Text>
                <Select
                  placeholder="Chọn độ ưu tiên"
                  value={dataTask?.priority}
                  onChange={(value) => setDataTask((prev) => ({ ...prev, priority: value }))}
                  style={{
                    width: '100%',
                  }}
                  options={[
                    { value: 'LOW', label: 'Thấp' },
                    { value: 'MEDIUM', label: 'Trung Bình' },
                    { value: 'HIGH', label: 'Cao' },
                    { value: 'HOTFIX', label: 'Nghiêm trọng' },
                  ]}
                />
              </Col>
            </div>
          </Col>
          <Col span={24}>
            <Text level={3}>Tiến độ %</Text>
            <Slider
              value={dataTask.progress}
              onChange={(value) =>
                setDataTask((prev) => ({
                  ...prev,
                  progress: value,
                }))
              }
            />
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default ModalTaskWork

const cssModalTask = css``
const cssHeadingModal = css`
  .item-setting {
    margin-left: 10px;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-gray-cloud);
    }
  }
`
