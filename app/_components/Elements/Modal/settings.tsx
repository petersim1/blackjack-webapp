"use client";

import { useEffect, useState } from "react";

import Toggle from "../Toggle";
import Input from "../Input";
import { rulesDescriptors, deckDescriptors, rulesDefault, deckDefault } from "@/_lib/constants";
import { RulesI, DeckI, Stores } from "@/_lib/types";
import { useLocalStorage, useModalContext, useWsDataContext } from "@/_lib/hooks";
import styled from "../styled.module.css";

export default (): JSX.Element => {
  const { setOpen } = useModalContext();
  const { ws } = useWsDataContext();
  const { storeData, updateStore } = useLocalStorage();
  const [rulesTemp, setRulesTemp] = useState<RulesI>({ ...storeData.rules });
  const [deckTemp, setDeckTemp] = useState<DeckI>({ ...storeData.deck });

  useEffect(() => {
    setRulesTemp({ ...storeData.rules });
    setDeckTemp({ ...storeData.deck });
  }, [storeData]);

  const handleRules = (name: string): void => {
    setRulesTemp((prev) => ({ ...prev, [name]: !rulesTemp[name as keyof RulesI] }));
  };

  const handleDeck = (name: string, value: boolean): void => {
    setDeckTemp((prev) => ({ ...prev, [name]: !value }));
  };

  const handleDeckVal = (name: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setDeckTemp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    updateStore({ type: Stores.RULES, data: { ...rulesTemp } });
    updateStore({ type: Stores.DECK, data: { ...deckTemp } });
    setOpen(false);
    if (!ws) return;
    ws.send(JSON.stringify({ code: "init", rules: rulesTemp, deck: deckTemp }));
  };

  const handleUndo = (event: React.FormEvent): void => {
    event.preventDefault();
    setDeckTemp({ ...storeData.deck });
    setRulesTemp({ ...storeData.rules });
  };

  const handleSetToDefault = (event: React.FormEvent): void => {
    event.preventDefault();
    setDeckTemp({ ...deckDefault });
    setRulesTemp({ ...rulesDefault });
  };

  return (
    <div className={styled.settings_modal}>
      <form onSubmit={handleSubmit}>
        <h3>Rules</h3>
        {Object.entries(rulesTemp).map(([name, value], ind) => (
          <div key={ind} className={styled.rule}>
            <span>{rulesDescriptors[name as keyof typeof rulesDescriptors]}</span>
            <Toggle state={value} setState={() => handleRules(name)} />
          </div>
        ))}
        <hr style={{ width: "100%" }} />
        <h3>Deck Info</h3>
        {Object.entries(deckTemp).map(([name, value], ind) => (
          <div key={ind} className={styled.rule}>
            <span>{deckDescriptors[name as keyof typeof deckDescriptors]}</span>
            {typeof value === "boolean" ? (
              <Toggle state={value} setState={() => handleDeck(name, value)} />
            ) : (
              <Input
                state={value}
                setState={(event) => handleDeckVal(name, event)}
                min={name == "n_decks" ? 1 : 0.1}
                max={name == "n_decks" ? 10 : 1}
                step={name == "n_decks" ? 1 : 0.0001}
              />
            )}
          </div>
        ))}
        <div className={styled.button_holder}>
          <button type="submit">Submit</button>
          <button onClick={handleUndo}>Undo Changes</button>
          <button onClick={handleSetToDefault}>Reset to Default</button>
        </div>
      </form>
      <span className={styled.warning}>
        Pressing submit will start a new game under the given rules.
      </span>
    </div>
  );
};
