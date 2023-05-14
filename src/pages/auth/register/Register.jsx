import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Input from '~/components/input/Input'
import './register.scss'
// import required modules
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { CiLock } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import { Button } from '~/components/button/Button'
import { schema } from '~/utils/schema'
import { register } from '~/apis/auth/auth.api'
import { toast } from 'react-toastify'

const Register = () => {

  const imageLink = [
    require('~/assets/images/img1.png'),
    require('~/assets/images/img2.png'),
    require('~/assets/images/img3.png'),
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(null, 'register')),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  })

  const onSubmit = (data) => {
    register(data).then(
      (res) => {
        if (res) {
          localStorage.setItem('accessToken', res.data.access_token)
          localStorage.setItem('userId', res.data.user._id)
          localStorage.setItem('userInfo', JSON.stringify(res.data.user))
          window.location.href = '/'
        }
      },
      (err) => {
        toast.error('Đăng ký không thành công')
      },
    )
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
            <div className="main_header">ĐĂNG KÝ</div>
 
            <div className="main_input">
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

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    className="mb-4"
                    placeholder="Mật khẩu"
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
                name="confirmPassword"
                render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    className="mb-4"
                    placeholder="Nhập lại mật khẩu"
                    isIcon
                    iconLeft={<CiLock />}
                    control={control}
                    ref={ref}
                    name="confirmPassword"
                    errors={errors}
                  />
                )}
              />
              <Link to={'/forgot-password'}>
                <div className="main_forgot">Quên mật khẩu</div>
              </Link>
              <Button type="submit">Đăng ký tài khoản</Button>
              <Link to={'/login'}>
                <div className="footer-auth">
                  Đã tài khoản? <strong>Đăng nhập</strong>
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

export default Register
