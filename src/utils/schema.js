import * as yup from 'yup'
import { REGEX_EMAIL } from '~/constants/validate-const'

export const schema = (tab, type) =>
  yup
    .object()
    .shape({
      username:
        (tab === 0 || type === 'register') && yup.string().required('Hãy nhập tên đăng nhập'),
      email:
        (tab === 1 || type === 'register') &&
        yup
          .string()
          .required('Hãy nhập địa chỉ email')
          .matches(REGEX_EMAIL, 'Chưa đúng chuẩn email'),
      password: yup.string().required('Hãy nhập mật khẩu').min(6, 'Tối thiểu 6 ký tự'),
      confirmPassword:
        type === 'register' &&
        yup
          .string()
          .required('Hãy nhập lại mật khẩu')
          .oneOf([yup.ref('password'), null], 'Chưa khớp với mật khẩu'),
    })
    .required()
