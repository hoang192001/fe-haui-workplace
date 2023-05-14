/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Modal } from 'antd'

const ModalDelete = ({ handleSubmitDelete, openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      title={null}
        onOk={handleSubmitDelete}
      //   // confirmLoading={confirmLoading}
      onCancel={() => setOpenModal(false)}
      //   width={700}
      okText={'Xác nhận'}
      css={() => `
          .ant-btn-primary {
            background-color: var(--color-danger);
          }
        `}
    >
      <div
        css={() => css`
          font-weight: 700;
          font-size: 24px;
          text-align: center;
          padding: 20px 0;
        `}
      >
        Bạn chắc chắn muốn xóa ?
      </div>
    </Modal>
  )
}

export default ModalDelete
