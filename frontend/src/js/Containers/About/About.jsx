import React from 'react';
import Button from '../../Components/UI/button/Button';
import './About.scss'

function About({ isAuth }) {
    return (
        <section className="about-container" id="about" itemProp="articleBody">
            <h2 className="about-heading" itemProp="headline">
                О платформе
            </h2>
            <div className="about">
                <div className="about-block">
                    <p className="about-block_text">
                        Как и в реальной жизни, так и на просторах Сети достаточно часто можно наткнуться на мошенников. К сожалению, уже никого не удивят истории о покупке щенков из карликовых пород, которые впоследствии вырастали до огромных размеров. Бридер серьезно относится к проверке информации о щенке и его родословной.
                    </p>
                    <p className="about-block_text">
                        Из-за поддельной родословной и пренебрежения к учету многих факторов у щенка впоследствии появляются проблемы со здоровьем, которые существенно сокращают срок его жизни.
                    </p>
                    <p className="about-block_text">
                        С нами вы не столкнетесь с подобными проблемами. У нас только достоверная информация и проверенные заводчики.
                    </p>
                </div>

                <div className="about-block">
                    <div className="about-block__img-container">
                        <img src="./img/img_about1.png" alt="" />
                    </div>
                </div>

            </div>

            <div className="about middle-block">
                <div className="about-block">
                    <div className="about-block__img-container">
                        <img src="./img/img_about2.png" itemProp="image" alt="Породистые щенки" />
                    </div>
                </div>


                <div className="about-block">
                    <p className="about-block_text">
                        С Бридер вы можете быть уверены, что выбранный щенок принадлежит к заявленной породе. Родословная накладывает большой отпечаток на характер и многие черты у щенка определяются генетически. Некоторые из них могут проявиться вследствии скверных условий содержания, но мы не имеем дел с заводчиками, которые позволяют себе плохо обращаться с животными.
                    </p>
                    <p className="about-block_text">
                        Мы размещаем объявления питомников, которые занимаются продажей щенков в Москве и Санкт-Петербурге, а также с доставкой по всей России.
                    </p>
                    <p className="about-block_text">
                        Доставка щенка в один из регионов России обсуждается индивидуально.
                    </p>
                    <p className="about-block_text">
                        Сомневаетесь, какая порода подойдет именно вам? Мы готовы проконсультировать вас насчет особенностей каждой породы.
                    </p>

                    <Button
                        btnClass="button about-block_btn pr-outlined-btn"
                        path="/obyavleniya"
                        text="Купить щенка"
                        isLink={ true }
                    />
                </div>
            </div>

            <div className="about">
                <div className="about-block">
                    <p className="about-block_text">
                        Ищете, где можно купить собаку? Вы можете выбрать интересующий вас город или регион. Вдруг новый пушистый друг всего в двух шагах от вас?
                    </p>
                    <p className="about-block_text">
                        На нашем сайте есть доска объявлений о продаже щенков от питомников и частных заводчиков. У нас предоставлена информация о каждом из них, в том числе имеющиеся породы, родословная и цена.
                    </p>
                    <p className="about-block_text">
                        У нас можно купить щенка с документами или без документов. В любом случае щенок и его заводчик тщательно проверяются на подлинность заявленной информации.
                        И никаких сложностей, мы проверим все за вас!
                    </p>
                    <p className="about-block_text">
                        Если остались вопросы, вы всегда можете связаться с нами и заводчиком.
                    </p>

                    {!isAuth && <Button
                        btnClass="button about-block_btn pr-outlined-btn"
                        path="/signup"
                        text="Зарегистрироваться"
                        isLink={ true }
                    />}
                </div>


                <div className="about-block">
                    <div className="about-block__img-container">
                        <img itemProp="image" alt="Щенки из проверенного питомника с документами" src="./img/img_about3.png" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
