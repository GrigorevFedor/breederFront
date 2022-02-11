import React from 'react';
import './HeaderInfo.scss';
import Button from '../../Components/UI/button/Button';


function HeaderInfo() {
    return (
        <div className="header-info container">
            <div className="header-info__container">
                <h1 itemProp="headline" className="header-info__title">
                    Breeder - платформа по продаже <span className="header-info__title_marked">породистых</span> щенков
                </h1>
                <div className="header-info__text" itemProp="articleBody">
                    Хотите купить щенка? У нас представлены только проверенные, добросовестные заводчики. Breeder поможет подобрать щенка с учетом ваших пожеланий к породе и цене, а также проверит за вас документы на щенка.
                </div>
                <Button
                    btnClass="button header_btn pr-outlined-btn"
                    path="/obyavleniya"
                    text="Купить щенка"
                    isLink={ true }
                />
            </div>
            <div className="header-info_img-container">
                <img alt="" src="./img/img_firstscreen.png" />
            </div>
        </div>
    )
}

export default HeaderInfo
