import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AddColumnProps {
  addColumn: (title: string) => void;
}

export const AddColumn: React.FC<AddColumnProps> = ({ addColumn }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    addColumn(title);
    setTitle("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={1} mt={2}>
      <TextField
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)} //updates title state
        placeholder="Add new column..."
      />
      <Button variant="contained" type="submit">
        Add Column
      </Button>
    </Box>
  );
};
