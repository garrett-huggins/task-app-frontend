import { TaskColor } from "@/types/task";

export const ColorSelect = ({
  color,
  selectedColor,
  setSelectedColor,
  currentTask,
}: {
  color: TaskColor;
  selectedColor: TaskColor | undefined;
  setSelectedColor: (color: TaskColor) => void;
  currentTask?: { color: TaskColor };
}) => {
  return (
    <label
      key={color}
      className={`cursor-pointer p-2 border-2 rounded-full ${
        selectedColor === color ? "border-white" : "border-transparent"
      }`}
      style={{
        backgroundColor: `var(--tag-${color})`,
        width: "50px",
        height: "50px",
      }}
    >
      <input
        key={color}
        type="radio"
        name="color"
        defaultChecked={currentTask ? currentTask.color === color : false}
        value={color}
        onChange={() => setSelectedColor(color)}
        className="hidden"
      />
    </label>
  );
};
