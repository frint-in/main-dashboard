
import React from "react";
import CreatableSelect from "react-select/creatable";
import { Badge } from "@/components/ui/badge"; // Adjust path as needed
import { customStyles } from "@/utils/customStyles"; // Adjust path as needed

export function FancyMultiSelect({
  options = [],
  value = [], // Managed by react-hook-form
  placeholder = "Select...",
  onChange, // Managed by react-hook-form
}) {
  const handleChange = (newValue) => {
    const newSelected = newValue
      ? newValue.map((option) => ({
          value: option.value,
          label: option.label,
        }))
      : [];

    if (onChange) {
      const selectedValues = newSelected.map((category) => category.value);
      onChange(selectedValues); // Updates the form's state
    }
  };

  // Combine options with dynamically created values
  const combinedOptions = [...options, ...value.map(val => ({
    value: val,
    label: val,
  }))];

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2 mb-2">
        <CreatableSelect
          isMulti
          value={value.map(val => ({
            value: val,
            label: val,
          }))}
          onChange={handleChange}
          options={combinedOptions}
          className="basic-multi-select text-black"
          classNamePrefix="select"
          placeholder={placeholder}
          isClearable
          formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
          styles={customStyles}
        />
        <div className="flex flex-wrap">
          {value.map((val) => (
            <Badge key={val} variant="default">
              {val}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
