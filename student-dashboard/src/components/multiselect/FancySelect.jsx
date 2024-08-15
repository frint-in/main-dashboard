import React from "react";
import Select from "react-select";
import { Badge } from "@/components/ui/badge"; // Adjust path as needed
import { customStyles } from "@/utils/customStyles"; // Adjust path as needed

export function FancySelect({
  options = [],
  value = [], // Managed by react-hook-form
  placeholder = "Select...",
  onChange, // Managed by react-hook-form
}) {
  const handleChange = (newValue) => {
    const newSelected = newValue ? newValue.map((item) => item.value) : [];
    if (onChange) {
      onChange(newSelected); // Updates the form's state
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2">
        <Select
          isMulti
          value={options.filter((option) => value.includes(option.value))} // Filters selected options
          onChange={handleChange}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder={placeholder}
          isClearable
          styles={customStyles}
        />
        <div className="flex flex-wrap gap-1">
          {value.map((val) => {
            const label = options.find((option) => option.value === val)?.label || val;
            return (
              <Badge key={val} variant="default">
                {label}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
