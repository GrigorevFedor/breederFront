import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import SingleAdCard from '../../Components/SingleAdCard/SingleAdCard';
import Header from '../../Containers/Header/Header';
import './SingleAdPage.scss';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

function SingleAdPage(props) {
    const { match } = props;
    const id = match.params.id;

    const isLogged = useSelector(state => state.login.isLogged);

    const [brood, setBrood] = useState({})
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getBrood() {
            try {
                await fetch(`/api/v2/announcements/${id}/`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setBrood(data.records);
                        setIsLoaded(true);
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getBrood();
    }, [])

    return (
        <>
            { isLoaded &&
                <Helmet>
                    <title>{ `Купить щенка породы ${brood.breed.toLowerCase()} в Москве в проверенном питомнике` }</title>

                    <meta name="description"
                        content={ `Объявления о продаже породистых щенков породы ${brood.breed.toLowerCase()} ${brood.with_documents ? "с документами" : "без документов"} в Москве ${brood.is_transportable && "с доставкой в регионы России"}. Цена щенка ${brood.price} р.` } />
                </Helmet>
            }
            <Header isMain={ false } isAuth={ isLogged } />

            <div className="single-ad__container container">
                { isLoaded &&
                    <SingleAdCard
                        isLogged={ isLogged }
                        id={ id }
                        brood={ brood }
                    />
                }

            </div>

        </>
    )
}

export default withRouter(SingleAdPage);
