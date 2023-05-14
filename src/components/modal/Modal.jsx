/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Modal } from "antd";

export const ModalComponent = ({
  width = 1000,
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title = "Name modal",
  nameButtonConfirm = "Ok",
  footer,
  confirmLoading = false,
}) => {
  return (
    <>
      <Modal
        width={width}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        css={cssModal}
        okText={nameButtonConfirm}
        footer={footer}
        style={{ top: 20 }}
        confirmLoading={confirmLoading}
      >
        {children}
      </Modal>
    </>
  );
};

const cssModal = css`
  .ant-btn-primary {
    background-color: var(--color-menu-main);
  }
`;
