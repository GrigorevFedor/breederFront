
import React, { useEffect } from 'react'
import AdCard from '../../Components/AdCard/AdCard';
import './AdsContainer.scss';
import '../../Components/AdCard/AdCard.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getBroods } from '../../store/actions/broods';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Filter } from '../../Components/AdsFilter/AdsFilter'
import Button from '../../Components/UI/button/Button';
import { REQUEST_STATUS } from "../../constants";
import { getFilteredBroods, incrementPage } from '../../store/actions/broods'


function AdsContainer() {

    const dispatch = useDispatch()
    const requestStatus = useSelector(state => state.broods.request.status)
    const filteredBroods = useSelector(state => state.broods.filteredBroods);

    useEffect(() => {
        dispatch(getBroods())
    }, [])

    const clickHandler = () => {
        dispatch(incrementPage())
        dispatch(getFilteredBroods())
    }

    return (
        <div className='broods__wrp'>
            <Filter />
            <section className="broods__container">
                {requestStatus == REQUEST_STATUS.PENDING && <CircularProgress />}

                {(requestStatus == REQUEST_STATUS.SUCCESS || requestStatus == REQUEST_STATUS.FAILURE) &&
                    [...filteredBroods].map(brood => {
                        return <AdCard key={brood.id} getBroods={getBroods} brood={brood} broodClass="alladspage_brood-card" />
                    })}
            </section>
            <Button
                isLink={false}
                btnClass='sec-outlined-btn img-btn'
                text='Показать еще'
                type='button'
                onClick={clickHandler}
            />
        </div>
    )
}

export default AdsContainer