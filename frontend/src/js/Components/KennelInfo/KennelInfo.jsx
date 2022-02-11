import React from 'react';
import { useState, useEffect } from 'react';
import AdCard from '../AdCard/AdCard';
import './KennelInfo.scss'

const KennelInfo = ({ id }) => {
    const [kennelInfo, setkennelInfo] = useState(null);
    const [hasError, setHasError] = useState(false);
    // const [kennelPhoto, setKennelPhoto] = useState("./img/kennel_placeholder.png");
    const [isLoaded, setIsLoaded] = useState(false);
    const [kennelBroods, setKennelBroods] = useState([]);
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        const getKennelBroods = async () => {
            try {
                await fetch(`/api/v2/announcements/?kennel=${id}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setKennelBroods(data.records);
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getKennelBroods();
    }, []);

    const formatBreeds = () => {
        const breeds = [];
        kennelInfo.breeds.map(breed => {
            breeds.push(breed.breed);
        });
        setBreeds(breeds);
    }

    useEffect(() => {
        const getKennel = async () => {
            try {
                await fetch(`/api/v2/kennel/${id}`, {
                    method: 'GET',
                    headers: {
                        "accepts": "application/json",
                        'Content-Type': 'application/json; charset="utf-8"',
                    }
                })
                    .then(response => {
                        return (
                            response.json()
                        )
                    })
                    .then(data => {
                        setkennelInfo({ ...data });
                        setIsLoaded(true);
                        formatBreeds();
                    })
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getKennel();
    }, []);

    return (
        <div className='kennel-info-container'>
            { isLoaded && <div>
                <div class="kennel-info-title_container">
                    <h2 className='kennel-info-title'>{ kennelInfo.title }</h2>

                    <span className="kennel-approve">Питомник на проверке</span>
                </div>
                <div className="kennel-infoblock">
                    <div className="kennel-img-container">
                        <img src={ kennelInfo.photo ? kennelInfo.photo : "/img/kennel_placeholder.png" } alt="kennel avatar" className="kennel-avatar" />

                    </div>
                    <div className="kennels-about">
                        <h3 className='kennel-info-subtitle'>Породы в питомнике</h3>
                        <ul className="params-list">
                            { breeds.map((item, i) => {
                                return (
                                    <li key={ i }>{ item }</li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div className="kennels-about">
                        <h3 className='kennel-info-subtitle'>Контакты</h3>
                        <ul className="params-list">
                            <li>{ kennelInfo.owner_name }</li>
                            <li>{ kennelInfo.phone }</li>
                            <li>{ kennelInfo.email }</li>
                        </ul>
                    </div>
                </div>
                { (kennelInfo.description !== null) && <div className="description-block">

                    <h3 className='kennel-info-subtitle'>Описание питомника</h3>
                    <p className="kennel-description">
                        { kennelInfo.description }
                    </p>
                </div>
                }
                <div className="kennel-ads-block">
                    <h3 className='kennel-info-subtitle'>Объявления питомника</h3>
                    <div className="broods-container">
                        { kennelBroods.map((broodCard, i) => {
                            return (
                                <AdCard
                                    brood={ broodCard }
                                    key={ i }
                                    broodClass="kennel_brood-card"

                                />
                            )
                        }) }

                    </div>
                </div>

            </div> }

        </div>
    )
}

export default KennelInfo;