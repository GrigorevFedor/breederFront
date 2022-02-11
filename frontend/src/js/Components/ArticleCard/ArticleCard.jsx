import React from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom'
import './ArticleCard.scss'
import translit from '../../utils/translit';

const ArticleCard = ({ article, sliderClass, isSlider, imgPath }) => {
    const { title, subtitle, id, text } = article;
    const history = useHistory();

    const main_img = article.main_image ? article.main_image : '/public/img/article_placeholder.jpg';

    return (
        <div className={ `article-card allarticle-card ${sliderClass}` }>
            <Link
                to={ `/blog/${translit(title)}/${id}` }
                onClick={ () => history.push(`/blog/${translit(title)}/${id}`) }
                id={ id }

            >
                <img className="article-card__img" alt={ title } src={ isSlider ? imgPath : main_img } height='240' width='360' />
                <div className="article-card__info">
                    <h5 className="article-card__title" >{ title }</h5>
                    <p className="article-card__subtitle">{ subtitle }</p>
                </div>
            </Link>
        </div>
    )
}

export default withRouter(ArticleCard);