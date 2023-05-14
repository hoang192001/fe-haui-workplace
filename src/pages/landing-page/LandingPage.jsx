/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import './assets/css/style.css'

const LandingPage = () => {
  return (
    <div
      css={css`
        ${window.location.pathname === '/landing-page' ? 'html {font-size: 10px;}' : ''}
      `}
    >
      <div id="top">
        <header className="header-landing" data-header-landing>
          <div className="container">
            <div className="overlay" data-overlay></div>

            <a href="#">
              <h1 className="logo">DreamTech</h1>
            </a>

            <nav className="navbar" data-navbar>
              <div className="navbar-top">
                <a href="#" className="logo">
                  DreamTech
                </a>

                <button className="nav-close-btn" aria-label="Close Menu" data-nav-close-btn>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

              <ul className="navbar-list">
                <li className="navbar-item">
                  <a href="#home" className="navbar-link" data-navbar-link>
                    Trang chủ
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#about" className="navbar-link" data-navbar-link>
                    Giới thiệu
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#services" className="navbar-link" data-navbar-link>
                    Dịch vụ
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#features" className="navbar-link" data-navbar-link>
                    Tính năng
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#blog" className="navbar-link" data-navbar-link>
                    Blog
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#" className="navbar-link" data-navbar-link>
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>

            <a href="/register" className="btn">
              <ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon>

              <span>Đăng ký ngay</span>
            </a>

            <button className="nav-open-btn" aria-label="Open Menu" data-nav-open-btn>
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
        </header>

        <main>
          <article>
            <section className="hero" id="home">
              <div className="container">
                <div className="hero-content">
                  <p className="hero-subtitle">Mạng xã hội công việc tổ chức</p>

                  <h2 className="h2 hero-title">
                    DreamWork - Giải pháp cho các doanh nghiệp vừa và nhỏ
                  </h2>

                  <p className="hero-text">Tập trung - Dễ Dàng - Tiện Lợi - Chí Phí Thấp</p>

                  <button className="btn">
                    <a href="/register">Tham gia</a>
                  </button>
                </div>

                <figure className="hero-banner">
                  <img
                    src={require('./assets/images/hero-banner.png')}
                    width="694"
                    height="529"
                    loading="lazy"
                    alt="hero-banner"
                    className="w-100 banner-animation"
                  />
                </figure>
              </div>
            </section>

            <section className="section about" id="about">
              <div className="container">
                <figure className="about-banner">
                  <img
                    src={require('./assets/images/about-banner.png')}
                    width="700"
                    height="532"
                    loading="lazy"
                    alt="about banner"
                    className="w-100 banner-animation"
                  />
                </figure>

                <div className="about-content">
                  <h2 className="h2 section-title-content underline">DreamTech là gì ?</h2>

                  <p className="about-text">
                    DreamTech là một doanh nghiệp công nghệ với trụ sở đặt tại thành phố Hà Nội,
                    Việt Nam. Với đội ngũ chuyên gia tài năng và giàu kinh nghiệm, DreamTech cung
                    cấp các dịch vụ phát triển phần mềm, giải pháp công nghệ thông tin và thiết kế
                    website cho nhiều khách hàng trong và ngoài nước.
                  </p>
                  <p className="about-text">
                    DreamTech luôn hướng đến mục tiêu mang lại giá trị cao nhất cho khách hàng của
                    mình bằng cách cung cấp các sản phẩm và dịch vụ chất lượng cao với mức giá hợp
                    lý.
                  </p>

                  <ul className="stats-list">
                    <li className="stats-card">
                      <p className="h3 stats-title">5</p>

                      <p className="stats-text">Năm thành lập</p>
                    </li>

                    <li className="stats-card">
                      <p className="h3 stats-title">134</p>

                      <p className="stats-text">Các dự án lớn nhỏ</p>
                    </li>

                    <li className="stats-card">
                      <p className="h3 stats-title">65</p>

                      <p className="stats-text">Khách hàng</p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section service" id="services">
              <div className="container">
                <h2 className="h2 section-title-content underline">
                  DreamWork - Mạng xã hội tổ chức
                </h2>

                <ul className="service-list">
                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <ion-icon name="telescope-outline"></ion-icon>
                      </div>

                      <h3 className="h3 title">Bảo mật nội bộ</h3>

                      <p className="text">
                        Giúp doanh nghiệp được bảo mật về thông tin trong quá trình trao đổi và lên
                        kế hoạch
                      </p>

                      <button className="card-btn" aria-label="Show More">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                      </button>
                    </div>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <ion-icon name="desktop-outline"></ion-icon>
                      </div>

                      <h3 className="h3 title">Dễ dàng trao đổi</h3>

                      <p className="text">
                        Các thành viên trong tổ chức có thể trao đổi dễ dàng với nhau thông qua các
                        chức năng của DreamWork
                      </p>

                      <button className="card-btn" aria-label="Show More">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                      </button>
                    </div>
                  </li>

                  <li>
                    <div className="service-card">
                      <div className="card-icon">
                        <ion-icon name="globe-outline"></ion-icon>
                      </div>

                      <h3 className="h3 title">Tập trung chuyên môn</h3>

                      <p className="text">
                        Mọi người làm việc với nhau một cách tập trung gắn kết hơn trong công việc
                      </p>

                      <button className="card-btn" aria-label="Show More">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="section features" id="features">
              <div className="container">
                <h2 className="h2 section-title-content underline">Các tính năng</h2>

                <ul className="features-list">
                  <li>
                    <div className="features-card">
                      <div className="icon">
                        <ion-icon name="bulb-outline"></ion-icon>
                      </div>

                      <div className="content">
                        <h3 className="h3 title">DreamSocail</h3>

                        <p className="text">
                          Trao đổi cuộc sống thông qua các bài đăng trong và ngoài nhóm
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="features-card">
                      <div className="icon">
                        <ion-icon name="color-palette-outline"></ion-icon>
                      </div>

                      <div className="content">
                        <h3 className="h3 title">DreamChat</h3>

                        <p className="text">Trao đổi trực tiếp công việc thông qua tin nhắn</p>
                      </div>
                    </div>
                  </li>
                </ul>

                <figure className="features-banner">
                  <img
                    src={require('./assets/images/feautres-banner.png')}
                    width="369"
                    height="318"
                    loading="lazy"
                    alt="Features Banner"
                    className="w-100 banner-animation"
                  />
                </figure>

                <ul className="features-list">
                  <li>
                    <div className="features-card">
                      <div className="icon">
                        <ion-icon name="code-slash-outline"></ion-icon>
                      </div>

                      <div className="content">
                        <h3 className="h3 title">DreamWork</h3>

                        <p className="text">Quản lý công việc, sự kiện trong tổ chức</p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="features-card">
                      <div className="icon">
                        <ion-icon name="rocket-outline"></ion-icon>
                      </div>

                      <div className="content">
                        <h3 className="h3 title">DreamAnalysis</h3>

                        <p className="text">Thu thập và phân tích dữ liệu cho tổ chức</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="section blog" id="blog">
              <div className="container">
                <h2 className="h2 section-title-content underline">Tin tức về DreamWork</h2>

                <ul className="blog-list">
                  <li>
                    <div className="blog-card">
                      <figure className="banner">
                        <a href="#">
                          <img
                            src={require('./assets/images/blog-1.jpg')}
                            width="750"
                            height="350"
                            loading="lazy"
                            alt="Vestibulum massa arcu, consectetu pellentesque scelerisque."
                            className="img-cover"
                          />
                        </a>
                      </figure>

                      <div className="content">
                        <h3 className="h3 title">
                          <a href="#">
                            Mạng xã hội tổ chức DreamWork đã thay đổi hoàn toàn bước đi mới cho
                            doanh nghiệp trong thời kỳ 4.0
                          </a>
                        </h3>

                        <p className="text">Trong thời kỳ 4.0 hiện này...</p>

                        <div className="meta">
                          <div className="publish-date">
                            <ion-icon name="time-outline"></ion-icon>

                            <time dateTime="2022-03-07">7 March, 2023</time>
                          </div>

                          <button className="comment" aria-label="Comment">
                            <ion-icon name="chatbubble-outline"></ion-icon>

                            <data value="15">15</data>
                          </button>

                          <button className="share" aria-label="Share">
                            <ion-icon name="share-social-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="blog-card">
                      <figure className="banner">
                        <a href="#">
                          <img
                            src={require('./assets/images/blog-2.jpg')}
                            width="750"
                            height="350"
                            loading="lazy"
                            alt="Quisque egestas iaculis felis eget placerat ut pulvinar mi."
                            className="img-cover"
                          />
                        </a>
                      </figure>

                      <div className="content">
                        <h3 className="h3 title">
                          <a href="#">Giải pháp cho doanh nghiệp startup</a>
                        </h3>

                        <p className="text">Bạn đang quan tâm đến...</p>

                        <div className="meta">
                          <div className="publish-date">
                            <ion-icon name="time-outline"></ion-icon>

                            <time dateTime="2022-03-07">7 March, 2022</time>
                          </div>

                          <button className="comment" aria-label="Comment">
                            <ion-icon name="chatbubble-outline"></ion-icon>

                            <data value="15">15</data>
                          </button>

                          <button className="share" aria-label="Share">
                            <ion-icon name="share-social-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="blog-card">
                      <figure className="banner">
                        <a href="#">
                          <img
                            src={require('./assets/images/blog-3.jpg')}
                            width="750"
                            height="350"
                            loading="lazy"
                            alt="Fusce sem ligula, imperdiet sed nisi sit amet, euismod posuere."
                            className="img-cover"
                          />
                        </a>
                      </figure>

                      <div className="content">
                        <h3 className="h3 title">
                          <a href="#">DreamWork - Bước đột phá trong ngành công nghệ thông tin</a>
                        </h3>

                        <p className="text">Sẵn sàng đối đấu cùng các ông lớn...</p>

                        <div className="meta">
                          <div className="publish-date">
                            <ion-icon name="time-outline"></ion-icon>

                            <time dateTime="2022-03-07">15 March, 2023</time>
                          </div>

                          <button className="comment" aria-label="Comment">
                            <ion-icon name="chatbubble-outline"></ion-icon>

                            <data value="15">15</data>
                          </button>

                          <button className="share" aria-label="Share">
                            <ion-icon name="share-social-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="blog-card">
                      <figure className="banner">
                        <a href="#">
                          <img
                            src={require('./assets/images/blog-4.jpg')}
                            width="750"
                            height="350"
                            loading="lazy"
                            alt="Donec feugiat mollis nisi in dignissim. Morbi sollicitudin quis."
                            className="img-cover"
                          />
                        </a>
                      </figure>

                      <div className="content">
                        <h3 className="h3 title">
                          <a href="#">
                            Sản phẩm dành cho các doanh nghiệp nhỏ hoặc những nhóm startup
                          </a>
                        </h3>

                        <p className="text">Bạn đang băn khoăn không biết nên chọn...</p>

                        <div className="meta">
                          <div className="publish-date">
                            <ion-icon name="time-outline"></ion-icon>

                            <time dateTime="2022-03-07">7 March, 2022</time>
                          </div>

                          <button className="comment" aria-label="Comment">
                            <ion-icon name="chatbubble-outline"></ion-icon>

                            <data value="15">15</data>
                          </button>

                          <button className="share" aria-label="Share">
                            <ion-icon name="share-social-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </article>
        </main>

        <footer className="footer">
          <div className="footer-top section">
            <div className="container">
              <div className="footer-brand">
                <a href="#" className="logo">
                  DreamTech
                </a>

                <p className="text">Vươn tới mọi tầm cao mới trong tương lai</p>

                <ul className="social-list">
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>

                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                  </li>

                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>
                </ul>
              </div>

              <ul className="footer-list">
                <li>
                  <p className="footer-list-title">Về chúng tôi</p>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Trang Chủ
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Thông tin
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Dịch vụ
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Công ty thành viên
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Blog
                  </a>
                </li>
              </ul>

              <ul className="footer-list">
                <li>
                  <p className="footer-list-title">Các lĩnh vực</p>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Strategy & Research
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Web Development
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Web Solution
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Digital Marketing
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    App Design
                  </a>
                </li>
              </ul>

              <ul className="footer-list">
                <li>
                  <p className="footer-list-title">Khác</p>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    FAQ
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Portfolio
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Terms & Conditions
                  </a>
                </li>

                <li>
                  <a href="#" className="footer-link">
                    Support
                  </a>
                </li>
              </ul>

              <ul className="footer-list">
                <li>
                  <p className="footer-list-title">Liên hệ</p>
                </li>

                <li className="footer-item">
                  <div className="footer-item-icon">
                    <ion-icon name="call"></ion-icon>
                  </div>

                  <div>
                    <a href="tel:+2484214313" className="footer-item-link">
                      +84-899-9999
                    </a>
                    <a href="tel:+2486871365" className="footer-item-link">
                      +84-899-8989
                    </a>
                  </div>
                </li>

                <li className="footer-item">
                  <div className="footer-item-icon">
                    <ion-icon name="mail"></ion-icon>
                  </div>

                  <div>
                    <a href="mailto:info@desinic.com" className="footer-item-link">
                      info@dreamtech.com.vn
                    </a>
                    <a href="mailto:help@desinic.com" className="footer-item-link">
                      info@dreamtech.com.vn
                    </a>
                  </div>
                </li>

                <li className="footer-item">
                  <div className="footer-item-icon">
                    <ion-icon name="location"></ion-icon>
                  </div>

                  <address className="footer-item-link">Dich Vong Hau, Cau Giay, Ha Noi</address>
                </li>
              </ul>
            </div>
          </div>
        </footer>

        <a href="#top" className="go-top  active" aria-label="Go To Top" data-go-top>
          <ion-icon name="arrow-up-outline"></ion-icon>
        </a>
      </div>
    </div>
  )
}

export default LandingPage
