import React, { useState, useEffect } from 'react';
import AdCard from '../../Components/AdCard/AdCard';
import Button from '../../Components/UI/button/Button';
import './AdSlider.scss';
import InfiniteCarousel from 'react-leaf-carousel';

function AdSlider() {
    const [broods, setBroods] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getBroods = async () => {
            try {
                await fetch(`/api/v2/announcements/`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const lastBroods = data.records.reverse().filter((brood, i) => i < 4);
                        setBroods(lastBroods);
                        setLoaded(true);
                    })
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getBroods();
    }, []);

    return (
        <section className="slider">
            <h2 className="slider__heading">Последние объявления</h2>
            { loaded && <InfiniteCarousel
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
                { broods.map(brood => {
                    return <AdCard key={ brood.id } brood={ brood } broodClass="alladspage_brood-card slider_broodcard" />
                }) }
            </InfiniteCarousel> }
            <Button
                btnClass='slider__btn pr-outlined-btn'
                text='Смотреть все объявления'
                isLink={ true }
                type='button'
                path='/obyavleniya'
            />
        </section>
    )
}

export default AdSlider
