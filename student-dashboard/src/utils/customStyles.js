// customStyles.js

import { PaddingIcon } from "@radix-ui/react-icons";



export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#72C1FA' : provided.borderColor,
    '&:hover': {
      borderColor: state.isFocused ? '#72C1FA' : provided.borderColor,
    },
    boxShadow: state.isFocused ? '0 0 0 1px #72C1FA' : provided.boxShadow,
    borderRadius: '0.375rem', // Adjust border radius
    width: '100%', // Make the width full
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#72C1FA',
    color: 'white',
    borderRadius: '0.375rem',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    ':hover': {
      backgroundColor: '#72C1FA',
      color: 'white',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#BBB',
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0.375rem',
    width: '100%', // Ensure the menu is full width
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: 10,
    backgroundColor: state.isSelected ? '#72C1FA' : state.isFocused ? '#CEE9FD' : provided.backgroundColor,
    color: state.isSelected ? 'white' : provided.color,
    ':hover': {
      backgroundColor: state.isSelected ? '#72C1FA' : '#CEE9FD',
      color: state.isSelected ? 'white' : provided.color,
    },
  }),
};
