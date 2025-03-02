import React, { useState } from "react";
import { Card } from "./Card";
import {AddCard} from "./AddCard"

export const Column = ({
  column,
  cards,
  setCards,
  removeColumn,
}: {
  column: { id: string; title: string };
  cards: { id: string; title: string; column: string; color?: string }[];
  setCards: React.Dispatch<React.SetStateAction<{ id: string; title: string; column: string; color?: string }[]>>;
  removeColumn: (id: string) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const addCard = (title: string) => {
    const newCard = { id: Math.random().toString(), title, column: column.id };
    setCards(prevCards => [...prevCards, newCard]);
  };

  const removeCard = (id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3>{column.title}</h3>
        <button onClick={() => setShowOptions(!showOptions)}>...</button>
        {showOptions && (
          <button onClick={() => removeColumn(column.id)}>Remove Column</button>
        )}
      </div>
      {cards.map(card => (
        <Card key={card.id} card={card} removeCard={removeCard} />
      ))}
      <AddCard addCard={addCard} />
    </div>
  );
};