import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "./Column";
import { AddColumn } from "./AddColumn";
import { Box } from "@mui/material";

export interface ColumnType {
  id: string;
  title: string;
}

export interface CardType {
  id: string;
  title: string;
  column: string;
  color?: string;
}

export const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);

  // Fetches board data 
  useEffect(() => {
    const fetchBoardState = async () => {
      try {
        const response = await fetch("http://localhost:3000/board", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authentication token
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch board state");
        }
        const board = await response.json();
        setColumns(board.columns);
        setCards(board.cards);
      } catch (error) {
        console.error("Error fetching board state:", error);
      }
    };

    fetchBoardState();
  }, []);

  // Saves the board state to the backend
  const saveBoardState = async () => {
    try {
      const response = await fetch("http://localhost:3000/board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authentication token
        },
        body: JSON.stringify({ columns, cards }),
      });

      if (!response.ok) {
        throw new Error("Failed to save board state");
      }
      console.log("Board state saved successfully");
    } catch (error) {
      console.error("Error saving board state:", error);
    }
  };

  // Add a new column
  const addColumn = async (title: string) => {
    try {
      const response = await fetch("http://localhost:3000/column", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authentication token
        },
        body: JSON.stringify({ name: title, boardId: "your-board-id" }), // Replace with actual boardId
      });

      if (!response.ok) {
        throw new Error("Failed to create column");
      }
      const newColumn = await response.json();
      setColumns([...columns, newColumn]);
      saveBoardState(); // Save board after adding column
    } catch (error) {
      console.error("Error creating column:", error);
    }
  };

  // Remove a column
  const removeColumn = async (id: string) => {
    setColumns(columns.filter((column) => column.id !== id));
    setCards(cards.filter((card) => card.column !== id));
    saveBoardState(); // Save board after removing column
  };

  // Handle card drag and drop
  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (!over) return;

    // Find the dragged card
    const activeCard = cards.find((card) => card.id === active.id);
    if (!activeCard) return;

    // Find the card that was dropped on
    const overCard = cards.find((card) => card.id === over.id);

    if (overCard) {
      if (activeCard.column === overCard.column) {
        // If moving in same column, reorder cards
        const columnCards = cards.filter((card) => card.column === activeCard.column);
        const oldIndex = columnCards.findIndex((card) => card.id === active.id);
        const newIndex = columnCards.findIndex((card) => card.id === over.id);
        const newColumnCards = arrayMove(columnCards, oldIndex, newIndex);
        const newCards = cards.map((card) =>
          card.column === activeCard.column
            ? newColumnCards.find((c) => c.id === card.id) ?? card
            : card
        );
        setCards(newCards);
      } else {
        // If moving to a different column, update card column
        setCards(
          cards.map((card) =>
            card.id === active.id ? { ...card, column: overCard.column } : card
          )
        );
      }
    } else {
      // If dropped on empty column, move card there
      if (activeCard.column !== over.id.toString()) {
        setCards(
          cards.map((card) =>
            card.id === active.id ? { ...card, column: over.id.toString() } : card
          )
        );
      }
    }
    saveBoardState(); // Save board after moving card
  };

  return (
    // Drag and drop context for the entire board
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box display="flex" gap={3} overflow="auto" p={3}>
        {/* Render columns */}
        {columns.map((column) => {
          const columnCards = cards.filter((card) => card.column === column.id);
          return (
            <Column
              key={column.id}
              column={column}
              cards={columnCards}
              setCards={setCards}
              removeColumn={removeColumn}
            />
          );
        })}
        {/* Add new column button */}
        <AddColumn addColumn={addColumn} />
      </Box>
    </DndContext>
  );
};
