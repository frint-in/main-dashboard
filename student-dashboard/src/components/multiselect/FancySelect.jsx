

import React from "react";
import Select from "react-select";
import { Badge } from "@/components/ui/badge"; // Adjust path as needed
import { customStyles } from "@/utils/customStyles"; // Adjust path as needed

export function FancySelect({
  options = [],
  initialSelected = [],
  placeholder = "Select...",
  onChange,
}) {
  const [selected, setSelected] = React.useState(initialSelected);

  const handleChange = (newValue) => {
    const newSelected = newValue.map((item) => item.value);
    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2 my-3">
        <Select
          isMulti
          value={options.filter((option) => selected.includes(option.value))}
          onChange={handleChange}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder={placeholder}
          isClearable
          styles={customStyles}
        />
        <div className="flex flex-wrap gap-1 my-3">
          {selected.map((value) => {
            const label = options.find((option) => option.value === value)?.label || value;
            return (
              <Badge key={value} variant="default">
                {label}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
