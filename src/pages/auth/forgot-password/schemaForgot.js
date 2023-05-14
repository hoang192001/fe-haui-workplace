import * as yup from 'yup'
import { REGEX_EMAIL } from '~/constants/validate-const'

export const schemaForgotPassword = (step) =>
  yup
    .object()
    .shape({
      username: step === 1 && yup.string().required('Hãy nhập tên đăng nhập'),
      email:
        step === 0 &&
        yup
          .string()
          .required('Hãy nhập địa chỉ email')
          .matches(REGEX_EMAIL, 'Chưa đúng chuẩn email'),
      confirmCode:
        step === 1 && yup.string().required('Hãy nhập mã xác thực').min(6, 'Tối thiểu 6 ký tự'),
      newPassword:
        step === 1 && yup.string().required('Hãy nhập mật khẩu').min(6, 'Tối thiểu 6 ký tự'),
    })
    .required()
