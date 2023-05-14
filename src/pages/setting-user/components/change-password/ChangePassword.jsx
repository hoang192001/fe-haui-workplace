import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { schemaChangePassword } from '../../schemaChangePassword'
import { changePassword } from '~/apis/auth/auth.api'
import { toast } from 'react-toastify'
import Input from '~/components/input/Input'
import { AiOutlineUser } from 'react-icons/ai'
import { CiLock } from 'react-icons/ci'
import ButtonSquare from '~/components/button/ButtonSquare'

const ChangePassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaChangePassword()),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      newPassword: '',
    },
  })

  const onSubmit = (valueLogin) => {
    changePassword(valueLogin).then(
      (res) => {
        if (res) {
          //
          toast.success('Thay đổi mật khẩu thành công')
        }
      },
      (err) => {
        toast.error(err.response.data)
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            className="mb-4"
            placeholder="Username"
            isIcon
            iconLeft={<AiOutlineUser />}
            control={control}
            ref={ref}
            name="username"
            errors={errors}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            className="mb-4"
            placeholder="Mật khẩu cũ"
            isIcon
            iconLeft={<CiLock />}
            control={control}
            ref={ref}
            name="password"
            errors={errors}
          />
        )}
      />
      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            className="mb-4"
            placeholder="Mật khẩu mới"
            isIcon
            iconLeft={<CiLock />}
            control={control}
            ref={ref}
            name="newPassword"
            errors={errors}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmNewPassword"
        render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
          <Input
            onChange={onChange}
            onBlur={onBlur}
            className="mb-4"
            placeholder="Nhập lại khẩu mới"
            isIcon
            iconLeft={<CiLock />}
            control={control}
            ref={ref}
            name="confirmNewPassword"
            errors={errors}
          />
        )}
      />
      <ButtonSquare type="submit">Xác nhận đổi mật khẩu</ButtonSquare>
    </form>
  )
}

export default ChangePassword
