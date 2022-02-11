import React from 'react';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import About from '../../Containers/About/About';
import AdSlider from '../../Containers/AdSlider/AdSlider';
import Header from '../../Containers/Header/Header';


function MainPage({isAuth, toggleAuth, isMain}) {

    return (
        <>
            <Header isMain={true} isAuth={isAuth} toggleAuth={toggleAuth} />
            <section className="main container" itemScope itemType="http://schema.org/Article">

                <main>
                    <AdSlider />
                    <About isAuth={ isAuth } />
                    <FeedbackForm />
                </main>

            </section>
        </>
    )
}

export default MainPage;
