import React from "react";
import { palette } from "../../assets/Palette";
import { professions } from "../../assets/fields";
import ProfessionDropdown from "../drop_downs/ProfessionDropdown";




function Step1({ profile, setProfile }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#022F56] mb-2"
        >
          Phone *
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          required
          placeholder="ex: +212 000000000"
          className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
        />
      </div>



      <div>
        <ProfessionDropdown
          value={profile.profession}
          onChange={(val) =>
            setProfile((prev) => ({ ...prev, profession: val }))
          }
          options={professions}
        />
      </div>
            <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-[#022F56] mb-2"
        >
          Birth Date *
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={profile.birthDate || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}

export default Step1;
