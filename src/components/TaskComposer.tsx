import { useState } from "react";

import { db } from "../data/DB";
import Bool from "../data/Types";

function TaskComposer() {
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (event: any) => {
    if (event.type === "keydown" && event.key !== "Enter") return;
    if (description === "") return;

    db.tasks.add({
      type: "SHORT_TERM",
      description,
      completed: Bool.FALSE,
      updated: new Date(),
    });

    setDescription("");
  };

  return (
    <input
      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      className="px-4 py-3 w-full rounded-xl"
      onKeyDown={handleSubmit}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      autoFocus={true}
    ></input>
  );
}
export default TaskComposer;
