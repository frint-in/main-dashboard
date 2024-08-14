

import React from "react";
import CreatableSelect from "react-select/creatable";

import { Badge } from "@/components/ui/badge";// Adjust path as needed
import { customStyles } from "@/utils/customStyles"; // Adjust path as needed

export function FancyMultiSelect({
  options = [],
  initialSelected = [],
  placeholder = "Select...",
  onChange,
}) {
  const [selected, setSelected] = React.useState(initialSelected);

  const handleChange = (newValue, actionMeta) => {
    const newSelected = newValue.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    setSelected(newSelected);
    if (onChange) {
      const selectedValues = newSelected.map((category) => category.value);
      onChange(selectedValues);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-2 mb-2">
        <CreatableSelect
          isMulti
          value={selected}
          onChange={handleChange}
          options={options}
          className="basic-multi-select text-black"
          classNamePrefix="select"
          placeholder={placeholder}
          isClearable
          formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
          styles={customStyles}
        />
        <div className="flex flex-wrap">
          {selected.map((framework) => (
            <Badge key={framework.value} variant="default">
              {framework.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
