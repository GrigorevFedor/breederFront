import React, { useEffect } from "react";
import './ArticlesPage.scss'
import Header from '../../Containers/Header/Header';
import ArticlesContainer from "../../Containers/ArticlesContainer/ArticlesContainer";
import { useSelector, useDispatch } from 'react-redux';
import { getArticles } from "../../store/actions";
import { Helmet } from "react-helmet";

const ArticlesPage = () => {

    const isLogged = useSelector(state => state.login.isLogged);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    }, []);
    const articles = useSelector(state => state.articles)
    console.log(articles);

    return (
        <>
            <Helmet>
                <title>Блог Breeder - полезные статьи по уходу за щенком</title>
                <meta name="description"
                        content="В нашем блоге мы собрали полезные статьи по выбору породы собаки и покупки щенка, все, что нужно знать про уход и кормление щенка и взрослой собаки, а также о всех трудностях, с которыми можно столкнуться при покупке щенка и уходе за ним" />
            </Helmet>
            <Header isMain={ false } isAuth={ isLogged } />
            <main className='article-page'>
                <h2 className='article-page__title'>Полезная информация</h2>
                <p className='article-page__text'>Здесь вы можете найти информацию о том, как выбрать щенка, особенностях содержания и воспитания, и всему, что может пригодиться любителю домашних животных.</p>
                <ArticlesContainer articles={ articles } />
            </main>
        </>
    )
}

export default ArticlesPage;