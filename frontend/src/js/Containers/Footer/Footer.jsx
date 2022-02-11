import React from 'react';
import './Footer.scss';

function Footer() {
    const svgStyle = {
        stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: '#ffffff', opacity: 1
    }
    return (
        <footer className="footer" id="contacts">
            <div className="footer__container container">
                <div className='footer__logo-container'>
                    <div className="footer__logo">
                        <h2 className="footer__title"><i className="fas logo fa-paw"></i>Breeder</h2>
                    </div>
                    <div className="footer__team">
                        <h4>Над Breeder работали:</h4>
                        <p>Аслан Ижаев, Иванна Федотова, Тамара Боганцева, Наталья Ковалева, Юлия Булах, Наталья Злобина, Александра Мыглан, Дария Пляскина, Нина Сизикова, Анастасия Демидова, Яна Соловьева, Юлия Юрченко, Никита Маслов, Илья Сахаров</p>
                    </div>
                </div>
                <div className="footer__contacts">
                    <div><a href="tel:+79257000336">+7 925 700 03 36</a></div>
                    <div><a href="mailto:breederas@gmail.com">
                        breederas@gmail.com</a></div>
                    <div className='footer__contacts_social-media'>
                        <a href="https://www.instagram.com/breederas.ru/">        <svg width="50" height="50" viewBox="0 0 400 400" >
                            <g transform="matrix(3.53 0 0 3.53 199.47 204.06)" id="Layer_1"  >
                                <path style={ svgStyle } transform=" translate(-28.2, -29.5)" d="M 28.2 16.7 c -7 0 -12.8 5.7 -12.8 12.8 s 5.7 12.8 12.8 12.8 S 41 36.5 41 29.5 S 35.2 16.7 28.2 16.7 z M 28.2 37.7 c -4.5 0 -8.2 -3.7 -8.2 -8.2 s 3.7 -8.2 8.2 -8.2 s 8.2 3.7 8.2 8.2 S 32.7 37.7 28.2 37.7 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(3.53 0 0 3.53 246.38 157.85)" id="Layer_1"  >
                                <circle style={ svgStyle } cx="0" cy="0" r="2.9" />
                            </g>
                            <g transform="matrix(3.53 0 0 3.53 199.47 204.41)" id="Layer_1"  >
                                <path style={ svgStyle } transform=" translate(-28.2, -29.6)" d="M 49 8.9 c -2.6 -2.7 -6.3 -4.1 -10.5 -4.1 H 17.9 c -8.7 0 -14.5 5.8 -14.5 14.5 v 20.5 c 0 4.3 1.4 8 4.2 10.7 c 2.7 2.6 6.3 3.9 10.4 3.9 h 20.4 c 4.3 0 7.9 -1.4 10.5 -3.9 c 2.7 -2.6 4.1 -6.3 4.1 -10.6 V 19.3 C 53 15.1 51.6 11.5 49 8.9 z M 48.6 39.9 c 0 3.1 -1.1 5.6 -2.9 7.3 s -4.3 2.6 -7.3 2.6 H 18 c -3 0 -5.5 -0.9 -7.3 -2.6 C 8.9 45.4 8 42.9 8 39.8 V 19.3 c 0 -3 0.9 -5.5 2.7 -7.3 c 1.7 -1.7 4.3 -2.6 7.3 -2.6 h 20.6 c 3 0 5.5 0.9 7.3 2.7 c 1.7 1.8 2.7 4.3 2.7 7.2 V 39.9 L 48.6 39.9 z" stroke-linecap="round" />
                            </g>
                        </svg></a>
                        <a href="https://vk.com/public208042290"><svg width="50" height="50" viewBox="0 0 400 400" >
                            <g transform="matrix(7.64 0 0 7.64 200 200)" id="vk_vkontakte_media_social"  >
                                <path style={ svgStyle } transform=" translate(-16.09, -16.5)" d="M 28.89 22 a 30.07 30.07 0 0 0 -4.13 -5.15 a 0.2 0.2 0 0 1 0 -0.25 a 40.66 40.66 0 0 0 3.55 -5.81 a 1.9 1.9 0 0 0 -0.08 -1.86 A 1.81 1.81 0 0 0 26.65 8 h -3 a 2 2 0 0 0 -1.79 1.19 a 35 35 0 0 1 -3.12 5.51 V 9.8 A 1.79 1.79 0 0 0 16.94 8 H 12.56 a 1.4 1.4 0 0 0 -1.12 2.21 l 0.4 0.56 a 1.84 1.84 0 0 1 0.33 1.05 v 3.84 A 26.11 26.11 0 0 1 9.05 9.35 A 2 2 0 0 0 7.16 8 H 4.71 a 1.73 1.73 0 0 0 -1.66 2.14 c 1.35 5.73 4.18 10.48 7.77 13 a 1 1 0 0 0 1.39 -0.23 a 1 1 0 0 0 -0.23 -1.4 C 8.84 19.31 6.34 15.12 5.07 10 l 2.1 0 a 26.12 26.12 0 0 0 4.1 7.75 a 1.6 1.6 0 0 0 1.8 0.52 a 1.64 1.64 0 0 0 1.1 -1.57 V 11.82 A 3.78 3.78 0 0 0 13.71 10 h 3 v 5.43 A 1.77 1.77 0 0 0 18 17.15 a 1.74 1.74 0 0 0 2 -0.69 A 36.87 36.87 0 0 0 23.62 10 h 2.8 a 39.81 39.81 0 0 1 -3.29 5.37 a 2.17 2.17 0 0 0 0.2 2.83 A 32.08 32.08 0 0 1 27.25 23 H 23.9 a 14 14 0 0 0 -4.07 -4.31 a 1.64 1.64 0 0 0 -1.73 -0.13 a 1.69 1.69 0 0 0 -0.92 1.52 v 2.38 a 0.53 0.53 0 0 1 -0.5 0.55 h -0.86 a 1 1 0 0 0 0 2 h 0.86 a 2.52 2.52 0 0 0 2.5 -2.55 V 20.69 a 11.78 11.78 0 0 1 3 3.32 a 2 2 0 0 0 1.69 1 h 3.38 a 1.92 1.92 0 0 0 1.69 -1 A 2 2 0 0 0 28.89 22 Z" stroke-linecap="round" />
                            </g>
                        </svg></a>
                    </div>
                </div>
                <div className="footer__legal">
                    <p className="footer__legal_copyright">&copy; 2021 Все права защищены </p>
                    <p className="footer__legal_info">Сайт breederas.ru является информационным ресурсом</p>
                    <a href='./documents/Политика конфиденциальности Breeder.pdf' className='pd-agreement-link footer__legal_pd-link' download> Согласие на обработку персональных данных </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
