"use client";

import { useState } from "react";

import Toggle from "../Toggle";
import styled from "../styled.module.css";

const defaultValues = {
  dealer_hit_soft17: false,
  push_dealer22: false,
  double_after_split: true,
  hit_after_split_aces: false,
  reduced_blackjack_payout: false,
  allow_surrender: true,
  shrink_deck: true,
};

export default (): JSX.Element => {
  const [on, setOn] = useState<{ [key: string]: boolean }>({ ...defaultValues });

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
          <span>{name}</span>
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
