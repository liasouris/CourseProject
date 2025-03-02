import { useState } from "react";
import { ChromePicker } from "react-color";

export const Card = ({
  card,
  removeCard,
}: {
  card: { id: string; title: string; column: string; color?: string };
  removeCard: (id: string) => void;
}) => {
  const [color, setColor] = useState(card.color || "#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="rounded border border-neutral-700 bg-neutral-800 p-3" style={{ backgroundColor: color }}>
      <p>{card.title}</p>
      <button onClick={() => removeCard(card.id)}>Remove</button>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>
        Change Color
      </button>
      {showColorPicker && (
        <ChromePicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      )}
    </div>
  );
};