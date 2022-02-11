import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

import './Input.scss'


const Label = styled('label')`
  font-family: "IBM Plex Sans", "Arial", 'sans-serif';
  font-weight: 400;
  color: #1A1A1B;
  line-height: 22px;
  font-size: 16px;
`;

const InputWrapper = styled('div')`
display: flex;
flex-direction: column;
max-width: 258px;
position: relative;

  & input {
    border: 1px solid #C9C1E3;
    border-radius: 10px;
    height: 46px;
    margin-top: 8px;
    color: $text-color;
    font-family: "IBM Plex Sans", "arial", sans-serif;
    line-height: 130%;
    font-size: 16px;
    font-style: italic;
    padding-left: 15px;
    background-color: #fff;
    &::placeholder {
        color: #B8B8B8;;
        font-family: "IBM Plex Sans", "arial", sans-serif;;
        line-height: 21px;
        font-size: 16px;
        font-style: italic;
    }
    &:focus {
        border: 1px solid #1A1A1B;
        outline: none;
    }
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div { ...props }>
    <span>{ label }</span>
    <CloseIcon onClick={ onDelete } />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  top: 80px;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #B8B8B8;
    font-weight: 600;

    & svg {
      color: #543D93;
    }
  }

  & li[data-focus='true'] {
    background-color: #C9C1E3;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

export default function MultiplySelectInput({ label, inputName, values, onChange, breeds, classNameLabel, classNameInput, customClass, placeholder, onBlur, tip }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: breeds,
    getOptionLabel: (option) => option,
    onChange: onChange,
    name: inputName,
  });

  return (
    <NoSsr>
      <div className={ `input-container ${customClass}` }>
        <div { ...getRootProps() }>
          <Label { ...getInputLabelProps() } className={ classNameLabel }>{ label } { tip }</Label>
          <InputWrapper ref={ setAnchorEl } className={ focused ? 'focused' : '' } >
            <input className={ classNameInput } { ...getInputProps() } placeholder={ placeholder } />
          </InputWrapper>
          <div className='input-multiply_tags'>
            { value.map((option, index) => (
              <Tag label={ option } { ...getTagProps({ index }) } />
            )) }
          </div>
        </div>
        { groupedOptions.length > 0 ? (
          <Listbox { ...getListboxProps() }>
            { groupedOptions.map((option, index) => (
              <li { ...getOptionProps({ option, index }) }>
                <span>{ option }</span>
                <CheckIcon fontSize="small" />
              </li>
            )) }
          </Listbox>
        ) : null }
      </div>
    </NoSsr>
  );
}