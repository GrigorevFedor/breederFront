import React from 'react'
import AdsContainer from '../../Containers/AdsContainer/AdsContainer'
import Footer from '../../Containers/Footer/Footer'
import './AllAdsPage.scss';
import '../../../scss/App.scss';
import Header from '../../Containers/Header/Header';
import { Helmet } from 'react-helmet';

function AllAdsPage({isAuth, isMain}) {

    return (
        <>
            <Helmet>
                <title>Купить породистого щенка в Москве – Объявления о продаже щенков из проверенных питомников с ценами</title>
                <meta name="description"
                        content="Объявления купить щенков любых пород с документами и без документов в Москве и с доставкой в регионы России. Вам остается только выбрать щенка для покупки, а документы и добросовестность заводчиков мы проверили за вас" />
            </Helmet>
            <Header isMain={ isMain } isAuth={isAuth} />
            <main className="container">
                <div className="broods-page__container">
                    <h1 className="broods_heading">Объявления о продаже щенков</h1>
                    <AdsContainer />
                </div>
            </main>
        </>
    )
}

export default AllAdsPage
