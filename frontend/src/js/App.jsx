import React from 'react';
import Router from './Router/router';
import Footer from './Containers/Footer/Footer';
import TagManager from 'react-gtm-module'
import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBreeds } from '../js/store/actions';
import { Helmet } from 'react-helmet';


function App() {
    const tagManagerArgs = {
        gtmId: 'GTM-NZQK92H',
    }
    TagManager.initialize(tagManagerArgs)

    ReactGA.initialize('UA-204363852-2', {
        debug: false,
        titleCase: false,
        gaOptions: {
            siteSpeedSampleRate: 100
        }
    });

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBreeds())
    }, []);

    return (
        <div>
            <Helmet>
                <title>Breeder — платформа по продаже породистых щенков в Москве с проверенными документами</title>

                <meta name="description"
                    content="Ищете где купить щенка? Объявления о продаже породистых щенков только от проверенных питомников. Мы проверим за вас подлинность документов. Полная информация как выбрать щенка и статьи по уходу за собакой" />
            </Helmet>
            <Router />
            <Footer />
        </div>
    )
}

export default App;