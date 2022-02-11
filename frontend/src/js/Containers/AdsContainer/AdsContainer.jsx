
import React, { useEffect, useState, useMemo } from 'react'
import AdCard from '../../Components/AdCard/AdCard';
import './AdsContainer.scss';
import '../../Components/AdCard/AdCard.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getBroods } from '../../store/actions/getBroods';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Filter } from '../../Components/AdsFilter/AdsFilter'



function AdsContainer() {
    console.log('AdsContainer render')
    const dispatch = useDispatch()
    // const [broods, setBroods] = useState([]);
    const [loaded, setLoaded] = useState(true);
    // const [page, setPage] = useState(1)
    // const [filteredBroods, setFilteredBroods] = useState([])
    const filteredBroods = useSelector(state => state.broods);


    // const getQueryParams = () => {
    //     let queryString = ''
    //     Object.keys(filterParams).forEach((key) => {
    //         if (filterParams[key].fetchServer) {
    //             if (filterParams[key].type == 'array') {
    //                 if (filterParams[key].value.length > 0) {
    //                     queryString += '&'
    //                     queryString += `${key}=`
    //                     filterParams[key].value.forEach((valueItem) => {
    //                         queryString += (valueItem + '%')
    //                     })
    //                     queryString = queryString.slice(0, -1)
    //                 }
    //             }
    //             if (filterParams[key].type == 'boolean') {
    //                 if (filterParams[key].value == true) {
    //                     queryString += '&'
    //                     queryString += (key + '=true')
    //                 }
    //             }
    //         }
    //     })
    //     return `?page=${page}${queryString}`
    // }


    // const getBroods = async () => {
    //     try {
    //         await fetch(`/api/v2/announcements/?page=1`)
    //             .then((response) => {
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 console.log('getBroods called')
    //                 setBroods([...data.records]);
    //                 setLoaded(true);
    //                 setFilteredBroods([...data.records])
    //                 // return [...data.records]
    //             })
    //     } catch (error) {
    //         console.log('NO DATA');
    //         console.error('Error:', error);
    //     }
    // }

    // const getFilteredBroods = async () => {
    //     try {
    //         await fetch(`/api/v2/announcements/` + getQueryParams())
    //             .then((response) => {
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 setFilteredBroods([...data.records]);
    //                 setLoaded(true);
    //             })
    //     } catch (error) {
    //         console.log('NO DATA');
    //         console.error('Error:', error);
    //     }
    // }




    useEffect(() => {
        dispatch(getBroods())
    }, [])

    // useEffect(() => {
    //     const nextState = { ...filterParams }
    //     Object.keys(filterParams).forEach((key) => {
    //         if (filterParams[key].fetchServer) {
    //             nextState[key].items = filterParams[key].getItems(broods)
    //         }
    //     })

    //     setFilterParams(nextState)
    // }, [broods])




    return (
        <div className='broods__wrp'>
            <Filter />
            <section className="broods__container">
                {!loaded && <CircularProgress />}

                {loaded &&
                    filteredBroods.map(brood => {
                        return <AdCard key={brood.id} getBroods={getBroods} brood={brood} broodClass="alladspage_brood-card" />
                    })}
            </section>
        </div>
    )
}

export default AdsContainer