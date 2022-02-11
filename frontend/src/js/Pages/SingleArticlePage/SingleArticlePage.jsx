import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router';
import './SingleArticlePage.scss'
import Header from '../../Containers/Header/Header';
import SingleArticleCard from '../../Components/SingleArticleCard/SingleArticleCard'
import ArticlesSlider from "../../Containers/ArticlesSlider/ArticlesSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getArticles } from "../../store/actions";
import { Helmet } from "react-helmet";


const SingleArticlePage = (props) => {

    const isLogged = useSelector(state => state.login.isLogged);

    const id = props.match.params.id;

    const dispatch = useDispatch()
    useEffect(() => {
        updateArticles()
    }, []);


    const updateArticles = () => {
        if (articles.length === 0) {
            dispatch(getArticles())
        } else {
            return articles
        }
    }

    const articles = useSelector(state => state.articles)

    const [article, setArticle] = useState([]);
    useEffect(() => {
        console.log('here');
        const getSingleArticle = async () => {
            console.log('here');
            try {
                await fetch(`/api/v2/articles/${id}`, {
                    headers: {
                        'Content-Type': 'application/json; charset="utf-8"'
                    }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        setArticle(data.records);
                    });
            } catch (e) {
                console.log(e);
            }
        }

        getSingleArticle();
    }, []);

    return (
        <>
            <Helmet>
                <title>{ `${article.meta_title}` }</title>

                <meta name="description"
                    content={ `${article.meta_description}` } />
            </Helmet>
            <Header isMain={ false } isAuth={ isLogged } />
            <main className='single-article__container container'>
                <SingleArticleCard article={ article } />
                {/* <ArticlesSlider articles={ articles } /> */ }
            </main>
        </>
    )
}

export default withRouter(SingleArticlePage);