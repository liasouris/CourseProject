import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardType } from "./Board";
import { Card } from "./Card";

interface SortableCardProps {
  card: CardType;
  removeCard: (id: string) => void;
}

//useSortable to allow drag and drop
export const SortableCard: React.FC<SortableCardProps> = ({ card, removeCard }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card card={card} removeCard={removeCard} />
    </div>
  );
};
