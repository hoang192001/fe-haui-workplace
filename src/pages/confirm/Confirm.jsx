import React, { useState } from 'react'
import Input from '~/components/input/Input'
import './confirm.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import emailIcon from '../../assets/icons/email-icon.svg'
import lockIcon from '../../assets/icons/lock-icon.svg'
import phoneIcon from '../../assets/icons/phone-icon.svg'
// import required modules
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper'
import { Link } from 'react-router-dom'
import { Button } from '~/components/button/Button'

const Confirm = () => {
  const imageLink = [
    require('../../assets/images/img1.png'),
    require('../../assets/images/img2.png'),
    require('../../assets/images/img3.png'),
  ]
  return (
    <div className="confirm">
      <div className="confirm__left">
        <div className="confirm__left_header">
          <img src="https://www.haui.edu.vn//media/73/t73821.jpg" alt="" />
          <div className="logo_text">HaUI Connection</div>
        </div>
        <div className="confirm__left_main">
          <div className="main_header">ĐĂNG KÝ TÀI KHOẢN MỚI</div>
          <div className="main_tab">
            <div className="main_tab-info">
              <img src={phoneIcon} alt="" />
              0348825285
            </div>
            <div className="main_tab-desc">
              Nhập mã xác thực 6 số được gửi về số điện thoại của bạn
            </div>
          </div>
          <div className="main_input">
            <div className="main_input-confirm">
              <Input className="mb-4" maxLength={1} />
              <Input className="mb-4" maxLength={1} />
              <Input className="mb-4" maxLength={1} />
              <Input className="mb-4" maxLength={1} />
              <Input className="mb-4" maxLength={1} />
              <Input className="mb-4" maxLength={1} />
            </div>
            <Button className="my-4">Tiếp tục</Button>
            <div className="main_forgot">Gửi lại mã xác thực</div>
            <Link to={'/register'}>
              <div className="footer-auth">
                <strong>Dùng số điện thoại khác</strong>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="confirm__right">
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
  )
}

export default Confirm
