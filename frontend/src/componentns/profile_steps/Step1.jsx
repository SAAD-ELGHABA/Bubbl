import React from "react";
import { palette } from "../../assets/Palette";
import {professions} from '../../assets/fields'
function Step1({ profile, setProfile }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };



  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className={`w-full border rounded p-2 focus:outline-none focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}] border-[${palette.midnight_green.DEFAULT}]`}
          placeholder="ex: +212 000000000"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={profile.birthDate || ""}
          onChange={handleChange}
          className={`w-full border rounded p-2 focus:outline-none focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}] border-[${palette.midnight_green.DEFAULT}]`}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Field / Profession</label>
        <select
          name="profession"
          value={profile.profession || ""}
          onChange={handleChange}
          className={`w-full border rounded p-2 focus:outline-none focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}] border-[${palette.midnight_green.DEFAULT}]`}
        >
          <option value="">Select your field</option>
          {professions.map((prof, idx) => (
            <option key={idx} value={prof}>
              {prof}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Step1;
