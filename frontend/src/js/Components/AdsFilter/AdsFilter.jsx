import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectInput from '../../Components/UI/input/SelectInput';
import Button from '../../Components/UI/button/Button';
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { InitialState } from './AdsFilterInitialState'

const FilterItem = ({ filterKey, filterObj }) => {

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     const nextState = { ...filterParams }

    //     nextState[name].value = value
    //     setFilterParams(nextState)
    // };

    if (filterObj.type == 'array') {
        return (
            <>
                <div className='broods__filter__item'>
                    <SelectInput
                        label={filterObj.label}
                        propValue={filterObj.value}
                        items={filterObj.items}
                        inputName={filterKey}
                        // onChange={handleChange}
                        customClass='card-input'
                        customLabel='card-label'
                        classNameInput='long-select'
                        placeholder={filterObj.placeholder}
                        multiple={true}
                    />
                </div>
            </>
        )
    }
    if (filterObj.type == 'boolean') {
        return (
            <>
                <FormControlLabel control={<Checkbox value={filterObj.value} />} label={filterObj.label} />
            </>
        )
    }
    return (
        <>
        </>
    )
}


export const Filter = ({ filterKey }) => {

    const broods = useSelector(state => state.broods)
    const [filterParams, setFilterParams] = useState(InitialState);

    function handleSubmit(e) {
        // e.preventDefault()
        // setLoaded(false)
        // getFilteredBroods()
        // debugger
        // let nextState = [...broods]
        // Object.keys(filterParams).forEach((key) => {
        //     if (!filterParams[key].fetchServer) {
        //         nextState = filterParams[key].filterCallback(nextState)
        //     }
        // })

        // setFilteredBroods(nextState)
    }

    useEffect(() => {
        const nextState = { ...filterParams }
        Object.keys(filterParams).forEach((key) => {
            if (filterParams[key].fetchServer) {
                nextState[key].items = filterParams[key].getItems()(broods)
            }
        })

        setFilterParams(nextState)
    }, [broods])

    return (
        <>
            <form
                action="#"
                method="post"
                className="broods__filter"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h2>Параметры</h2>
                {Object.keys(filterParams).map((itemKey) => (
                    <FilterItem key={itemKey} filterKey={itemKey} filterObj={filterParams[itemKey]} />
                ))}

                <Button
                    isLink={false}
                    btnClass='sec-outlined-btn img-btn'
                    text='Применить'
                    type='submit'
                />
            </form>

            {/* {Object.keys(filterParams).map(item => (
                <FilterCancel filterObj={filterParams[item]} key={item} />
            ))} */}
        </>
    )
}

export const FilterCancel = ({ filterKey, filterObj }) => {
    const [visible, setVisible] = useState(false)
    const initPlaceholder = (filterKey, filterObj) => {
        // if (filterKey == 'city' || filterKey == 'breed' || filterKey == 'sex') {
        //     return filterValue.join(', ')
        // }
        // if (filterKey == 'withDocs') {
        //     return 'Только с документами'
        if (filterObj.type == 'array') {
            if (filterObj.value.length > 0) {
                return filterObj.value.join(', ')
            }

            if (filterObj.type == 'boolean') {
                return filterObj.label
            }
        }
    }
    // useEffect(() => {

    //     if ((filterKey == 'city' || filterKey == 'breed' || filterKey == 'sex') && filterValue.length > 0) {
    //         setVisible(true)
    //     }
    //     if (filterKey == 'withDocs' && filterValue) {
    //         setVisible(true)
    //     }
    //     setVisible(false)
    // }, [])

    return (
        <>
            {visible &&
                <div>
                    <span>{initPlaceholder(filterKey, filterObj)}</span>
                    <span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00061 5L8.93286 8.93225M1.06836 8.93225L5.00061 5L1.06836 8.93225ZM8.93286 1.06775L4.99986 5L8.93286 1.06775ZM4.99986 5L1.06836 1.06775L4.99986 5Z" stroke="#543D93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>}

        </>
    )
}