import React, { useState } from "react";

export const AddCard = ({
  addCard,
}: {
  addCard: (title: string) => void;
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addCard(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new card..."
      />
      <button type="submit">Add Card</button>
    </form>
  );
};