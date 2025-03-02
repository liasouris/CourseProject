import { useState } from "react";
import { Column } from "./Column";
import { AddColumn } from "./AddColumn";

export const Board = () => {
  const [columns, setColumns] = useState<{ id: string; title: string }[]>([]);
  const [cards, setCards] = useState<{ id: string; title: string; column: string; color?: string }[]>([]);

  const addColumn = (title: string) => {
    const newColumn = { id: Math.random().toString(), title };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter(column => column.id !== id));
    setCards(cards.filter(card => card.column !== id));
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          cards={cards.filter(card => card.column === column.id)}
          setCards={setCards}
          removeColumn={removeColumn}
        />
      ))}
      <AddColumn addColumn={addColumn} />
    </div>
  );
};