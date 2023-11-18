"use client";

import { useState } from "react";

import Toggle from "../Toggle";
import { rulesDefault, rulesDescriptors } from "@/_lib/constants";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const [on, setOn] = useState<{ [key: string]: boolean }>({ ...rulesDefault });

  const handleClick = (name: string): void => {
    setOn((prev) => ({ ...prev, [name]: !on[name] }));
  };

  const handleSubmit = (): void => {
    console.log(on);
  };

  return (
    <div className={styled.settings_modal}>
      <h3>Rules</h3>
      {Object.entries(on).map(([name, value], ind) => (
        <div key={ind} className={styled.rule}>
          <span>{rulesDescriptors[name as keyof typeof rulesDescriptors]}</span>
          <Toggle state={value} setState={() => handleClick(name)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <span className={styled.warning}>
        Pressing submit will start a new game under the given rules.
      </span>
    </div>
  );
};
