import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectInput from '../../Components/UI/input/SelectInput';
import Button from '../../Components/UI/button/Button';
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredBroods, initFilterItems, setFilterValue, cancelFilter, dafaultPage } from '../../store/actions/broods'
import { REQUEST_STATUS } from "../../constants";

const FilterItem = ({ filterKey, filterObj }) => {
    const dispatch = useDispatch();
    const broods = useSelector(state => state.broods.broodsItems)

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilterValue(name, value))
    };

    useEffect(() => {
        dispatch(initFilterItems(filterKey))
    }, [broods])

    if (filterObj.type == 'array') {
        return (
            <>
                <div className='broods__filter__item'>
                    <SelectInput
                        label={filterObj.label}
                        propValue={filterObj.value}
                        items={filterObj.items}
                        inputName={filterKey}
                        onChange={handleChange}
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
                <FormControlLabel control={<Checkbox name={filterKey} checked={filterObj.value} value={filterObj.value} onChange={(e) => { dispatch(setFilterValue(filterKey, !filterObj.value)) }} />} label={filterObj.label} />
            </>
        )
    }
    return (
        <>
        </>
    )
}


export const Filter = () => {

    const dispatch = useDispatch();
    const filterParams = useSelector(state => state.broods.filterParams)
    const currentFilterParams = useSelector(state => state.broods.currentFilterParams)
    const requestStatus = useSelector(state => state.broods.request.status)

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(dafaultPage())
        dispatch(getFilteredBroods())
    }

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

            {requestStatus == REQUEST_STATUS.SUCCESS && Object.keys(currentFilterParams).map(itemKey => (
                <FilterCancel filterObj={currentFilterParams[itemKey]} key={itemKey} filterKey={itemKey} />
            ))}
        </>
    )
}

export const FilterCancel = ({ filterKey, filterObj }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const initPlaceholder = (filterKey, filterObj) => {
        if (filterObj.type == 'array') {
            return filterObj.value.join(', ')
        }
        if (filterObj.type == 'boolean') {
            return filterObj.label
        }
    }

    const setVisibility = () => {
        debugger
        switch (filterObj.type) {
            case 'array':
                setVisible(filterObj.value.length > 0)
                break
            case 'boolean':
                setVisible(filterObj.value)
                break
            default:
                return setVisible(false)
        }
    }

    useEffect(() => {
        setVisibility()
    })

    const handlerClick = () => {
        dispatch(cancelFilter(filterKey))
        dispatch(getFilteredBroods())
    }

    return (
        <>
            {visible &&
                <div>
                    <span>{initPlaceholder(filterKey, filterObj)}</span>
                    <span onClick={handlerClick}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00061 5L8.93286 8.93225M1.06836 8.93225L5.00061 5L1.06836 8.93225ZM8.93286 1.06775L4.99986 5L8.93286 1.06775ZM4.99986 5L1.06836 1.06775L4.99986 5Z" stroke="#543D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>}

        </>
    )
}