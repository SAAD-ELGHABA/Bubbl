import React from "react";
import CreatableSelect from "react-select/creatable";

function ProfessionFilterDropDown({ value, onChange, options }) {
  const professionOptions = options?.map((prof) => ({
    value: prof,
    label: prof,
  }));
  return (
    <div >
      <CreatableSelect
        isClearable
        onChange={(newValue) => onChange(newValue?.value || "")}
        options={professionOptions}
        placeholder="Select or type your profession"
        className="w-full text-[#02182E] z-20"
        classNamePrefix="react-select"
        value={value ? { value, label: value } : null}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#488DB4" : "#adb5bd",
            boxShadow: "none",
            backgroundColor: "transparent",
            "&:hover": { borderColor: "#488DB4" },
            paddingTop:"4px",
            paddingBottom:"4px",
          }),
          input: (base) => ({
            ...base,
            color: "#02182E",
            backgroundColor: "transparent", 
          }),
          singleValue: (base) => ({
            ...base,
            color: "#02182E",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0.5rem",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#488DB4" : "white",
            color: state.isFocused ? "white" : "#02182E",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#6c757d",
          }),
        }}
      />
    </div>
  );
}

export default ProfessionFilterDropDown;
