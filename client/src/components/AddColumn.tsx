import React, { useState } from "react";

export const AddColumn = ({
  addColumn,
}: {
  addColumn: (title: string) => void;
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addColumn(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new column..."
      />
      <button type="submit">Add Column</button>
    </form>
  );
};