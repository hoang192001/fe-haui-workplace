import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Input from '~/components/input/Input'
import '../login/login.scss'
// import required modules
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { CiLock } from 'react-icons/ci'
import { HiOutlineQrcode } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import { changePassword, sendCodeMail } from '~/apis/auth/auth.api'
import { Button } from '~/components/button/Button'
import { schemaForgotPassword } from './schemaForgot'

const ForgotPassword = () => {
  let navigate = useNavigate()
  const imageLink = [
    require('~/assets/images/img1.png'),
    require('~/assets/images/img2.png'),
    require('~/assets/images/img3.png'),
  ]

  const [step, setStep] = useState(0)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForgotPassword(step)),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  })

  const onSubmit = (valueLogin) => {
    if (step === 0) {
      sendCodeMail(valueLogin).then(
        (res) => {
          if (res) {
            toast.success('Đã gửi mã xác thức về cho email')
            setStep(1)
          }
        },
        (err) => {
          toast.error(err.response.data)
        },
      )
    } else {
      changePassword(valueLogin).then(
        (res) => {
          if (res) {
            toast.success('Đổi mật khẩu thành công')
            navigate('/login')
          }
        },
        (err) => {
          toast.error(err.response.data)
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login">
        <div className="login__left">
          <div className="login__left_header">
            <img src="https://www.haui.edu.vn//media/73/t73821.jpg" alt="" />
            <div className="logo_text">HaUI Connection</div>
          </div>
          <div className="login__left_main">
            <div className="main_header">QUÊN MẬT KHẨU</div>
            <div className="main_input">
              {step === 1 ? (
                <>
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
                    name="confirmCode"
                    render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
                      <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        className="mb-4"
                        placeholder="Mã xác thực"
                        isIcon
                        iconLeft={<HiOutlineQrcode />}
                        control={control}
                        ref={ref}
                        name="confirmCode"
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
                </>
              ) : (
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
                      className="mb-4"
                      placeholder="Email"
                      isIcon
                      iconLeft={<AiOutlineMail />}
                      control={control}
                      ref={ref}
                      name="email"
                      errors={errors}
                    />
                  )}
                />
              )}

              <Button type="submit">{step === 0 ? 'Lấy mã xác thực' : 'Đổi mật khẩu'}</Button>
              <Link to={'/login'}>
                <div className="footer-auth">
                  Chưa có tài khoản? <strong>Đăng nhập</strong>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="login__right">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            effect={'fade'}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            speed={1000}
            navigation={true}
            modules={[EffectFade, Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {imageLink.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} alt="slides" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword
