import React from "react";
import './SingleArticleCard.scss'
import parse from 'html-react-parser';

const SingleArticleCard = ({ article }) => {

    return (
        <div className='single-article'>
            <h1 className='single-article__title single-article__title-main'>{ article.title }</h1>

            <div className='single-article-container'>
                <img src={ article.main_image ? article.main_image : './img/article_placeholder.jpg' } alt='как купить здорового щенка и не попасть на мошенников' className='single-article__image' height='414' width='810' />
                { parse(`<div class='single-article__text-container'>${article.content}</div>`) }
            </div>
            <div className='single-article__information'>
                <div>
                    <span className='single-article__information_author'>{ article.author }</span>
                    <span>{ new Date(article.created_at).toLocaleDateString() }</span>
                </div>
                <div className='single-article__media-buttons'></div>
            </div>
        </div>
    )
}

export default SingleArticleCard;