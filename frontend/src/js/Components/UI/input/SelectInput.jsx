import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import './Input.scss'

const SelectInput = ({ label, propValue, customClass, customLabel, classNameInput, items, inputName, onChange, placeholder, multiple = false }) => {

    return (
        <div className={`add-card-modal ${customClass}`}>
            <label htmlFor={inputName} className={`label ${customLabel}`}>{label}</label>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={propValue}
                onChange={onChange}
                name={inputName}
                className={`input ${classNameInput}`}
                disableUnderline={true}
                displayEmpty={true}
                renderValue={(selected) => {
                    if (typeof selected == 'object') {
                        return selected.join(', ')
                    } else {
                        if (selected.length === 0) {
                            return <em className='select-placeholder'>{placeholder}</em>;
                        }
                        return selected
                    }
                }}
                multiple={multiple}
            >
                {!multiple && <MenuItem value="" disabled >
                    {placeholder}
                </MenuItem>}

                {items.map((item) => (
                    <MenuItem key={item} value={item} >
                        {multiple && <Checkbox checked={propValue.indexOf(item) > -1} />}
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

export default SelectInput;