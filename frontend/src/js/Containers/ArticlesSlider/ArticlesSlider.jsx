import React from 'react';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';
import Button from '../../Components/UI/button/Button';
import './ArticlesSlider.scss';
import InfiniteCarousel from 'react-leaf-carousel';

function ArticlesSlider({ articles }) {

    return (
        <section className="articles-slider">
            <div className="articles-slider__heading_container">
                <h2 className="articles-slider__heading">Последние статьи</h2>
                <Button
                    btnClass='articles-slider__btn sec-outlined-btn'
                    text='Смотреть все статьи'
                    isLink={ true }
                    type='button'
                    path='/blog'
                />
            </div>
            <InfiniteCarousel
                breakpoints={ [
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            sideSize: 0,
                            arrows: false,
                            dots: true,
                            scrollOnDevice: true
                        },
                    },
                    {
                        breakpoint: 730,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            sideSize: .2,
                            arrows: false,
                            dots: true,
                            scrollOnDevice: true
                        },
                    },
                    {
                        breakpoint: 860,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            sideSize: .5,
                            arrows: true,
                            scrollOnDevice: true
                        },
                    },
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            sideSize: .1,
                            arrows: true
                        },
                    },
                ] }
                dots={ false }
                arrows={ true }
                lazyLoad={ true }
                animationDuration={ 3000 }
                autoCycle={ true }
                cycleInterval={ 10000 }
                showSides={ true }
                sidesOpacity={ .4 }
                slidesSpacing={ 10 }
                sideSize={ .1 }
                slidesToScroll={ 1 }
                slidesToShow={ 3 }
                scrollOnDevice={ false }
                pauseOnHover={ true }
            >
                { articles.map(article => {
                    return <ArticleCard article={ article } key={ article.id } sliderClass='article-card__slider' imgPath={ article.main_image ? article.main_image : '../img/article_placeholder.jpg' } isSlider={ true } />
                }) }
            </InfiniteCarousel>
        </section>
    )
}

export default ArticlesSlider
