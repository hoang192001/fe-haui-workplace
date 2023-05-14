import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Input from '~/components/input/Input'
import './login.scss'
// import required modules
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { CiLock } from 'react-icons/ci'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import { login } from '~/apis/auth/auth.api'
import { Button } from '~/components/button/Button'
import { setToken } from '~/store/user-reducer/userSlice'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '~/utils/schema'
import { toast } from 'react-toastify'

const Login = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const imageLink = [
    require('~/assets/images/img1.png'),
    require('~/assets/images/img2.png'),
    require('~/assets/images/img3.png'),
  ]
  const [tab, setTab] = useState(0)
  // const [valueLogin, setValueLogin] = useState({
  //   username: '',
  //   password: '',
  // })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(tab, 'login')),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  })

  const onSubmit = (valueLogin) => {
    login(valueLogin).then(
      (res) => {
        if (res) {
          dispatch(setToken(res.data.access_token))
          localStorage.setItem('accessToken', res.data.access_token)
          localStorage.setItem('userId', res.data.user._id)
          localStorage.setItem('userInfo', JSON.stringify(res.data.user))
          window.location.href = '/'
        }
      },
      (err) => {
        toast.error('Mật khẩu không chính xác')
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
            <div className="main_header">ĐĂNG NHẬP</div>
            <div className="main_tab">
              <div className={'item_tab ' + (tab === 0 ? 'active' : '')} onClick={() => setTab(0)}>
                Username
              </div>
              <div className={'item_tab ' + (tab === 1 ? 'active' : '')} onClick={() => setTab(1)}>
                Email
              </div>
            </div>
            <div className="main_input">
              {tab === 0 ? (
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
              <Link to={'/forgot-password'}>
                <div className="main_forgot">Quên mật khẩu</div>
              </Link>
              <Button type="submit">Đăng nhập</Button>
              <Link to={'/register'}>
                <div className="footer-auth">
                  Chưa có tài khoản? <strong>Đăng ký</strong>
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

export default Login
