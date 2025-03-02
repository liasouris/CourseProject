import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AddCardProps {
  addCard: (title: string) => void;
}

export const AddCard: React.FC<AddCardProps> = ({ addCard }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    addCard(title);
    setTitle("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={1} mt={2}>
      <TextField
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new card..."
      />
      <Button variant="contained" type="submit" size="small">
        Add Card
      </Button>
    </Box>
  );
};
