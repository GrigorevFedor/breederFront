import React from "react";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";
import './ArticlesContainer.scss'

const ArticlesContainer = ({ articles }) => {

    return (
        <section className='articles__container'>
            { articles.map(article => {
                return <ArticleCard article={ article } key={ article.id } />
            }) }
        </section>
    )
}

export default ArticlesContainer;