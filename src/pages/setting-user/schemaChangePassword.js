import * as yup from 'yup'

export const schemaChangePassword = () =>
  yup
    .object()
    .shape({
      username: yup.string().required('Hãy nhập tên đăng nhập'),
      password: yup.string().required('Hãy nhập mật khẩu').min(6, 'Tối thiểu 6 ký tự'),
      newPassword: yup.string().required('Hãy nhập mật khẩu mới').min(6, 'Tối thiểu 6 ký tự'),
      confirmNewPassword: yup
        .string()
        .required('Hãy nhập lại mật khẩu mới')
        .oneOf([yup.ref('newPassword'), null], 'Chưa khớp với mật khẩu mới'),
    })
    .required()
