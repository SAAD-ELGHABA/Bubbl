import React from "react";
import CreatableSelect from "react-select/creatable";

const ProfessionDropdown = ({ value, onChange, options }) => {
  // Transform the options array to React Select format
  const professionOptions = options.map((prof) => ({
    value: prof,
    label: prof,
  }));

  return (
    <div className="mb-4">
      <label
        htmlFor="profession"
        className="block text-sm font-medium text-[#022F56] mb-2"
      >
        Profession *
      </label>
      <CreatableSelect
        isClearable
        onChange={(newValue) => onChange(newValue?.value || "")}
        options={professionOptions}
        value={value ? { value, label: value } : null}
        placeholder="Select or type your profession"
        className="w-full text-[#02182E] z-20"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: "#85C4E4",
            padding: "2px",
            boxShadow: "none",
            "&:hover": { borderColor: "#488DB4" },
          }),
          input: (base) => ({ ...base, color: "#02182E" }),
          singleValue: (base) => ({ ...base, color: "#02182E" }),
          menu: (base) => ({ ...base, borderRadius: "0.5rem" }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#488DB4" : "white",
            color: state.isFocused ? "white" : "#02182E",
          }),
        }}
      />
    </div>
  );
};

export default ProfessionDropdown;
