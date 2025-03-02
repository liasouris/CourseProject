import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";

interface CardProps {
  card: { id: string; title: string; color?: string };
  removeCard: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, removeCard }) => {
  return (
    // Paper component acts as the card container 
    <Paper
      style={{ backgroundColor: card.color || "#ffffff" }}
      elevation={3}
      sx={{ padding: 2, borderRadius: 2 }}
    >
      <Typography variant="body1">{card.title}</Typography>
      <Box mt={2} display="flex" gap={1}>
        <Button
          variant="contained"
          color="error"
          onClick={() => removeCard(card.id)}
        >
          Remove
        </Button>
      </Box>
    </Paper>
  );
};