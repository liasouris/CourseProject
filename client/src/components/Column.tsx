import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Paper, Typography, IconButton, Box, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AddCard } from "./AddCard";
import { CardType, ColumnType } from "./Board";
import { SortableCard } from "./SortableCard";

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  removeColumn: (id: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, cards, setCards, removeColumn }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // Registers column as a droppable area.
  const { setNodeRef } = useDroppable({ id: column.id });

  // Function to add a new card to this column
  const addCard = (title: string): void => {
    const newCard: CardType = { id: Math.random().toString(), title, column: column.id };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  // Function to remove a card from this column
  const removeCard = (id: string): void => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <Paper ref={setNodeRef} elevation={3} sx={{ width: 250, p: 2, borderRadius: 2 }}>
      {/* Column title and menu button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{column.title}</Typography>
        <IconButton size="small" onClick={() => setShowOptions(!showOptions)}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/*  (delete column) */}
      {showOptions && (
        <Box mb={2}>
          <Button variant="contained" color="error" onClick={() => removeColumn(column.id)}>
            Remove Column
          </Button>
        </Box>
      )}

      {/* Wrap cards in a SortableContext so that can be reordering */}
      <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <SortableCard key={card.id} card={card} removeCard={removeCard} />
        ))}
      </SortableContext>

      {/* Add new card form */}
      <AddCard addCard={addCard} />
    </Paper>
  );
};
