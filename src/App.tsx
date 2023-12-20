import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import { db } from "./data/DB";
import Bool from "./data/Types";

function App() {
  const tasks = useLiveQuery(() =>
    db.tasks.where("completed").equals(Bool.FALSE).toArray()
  );

  const [description, setDescription] = useState<string>("");

  const handleSubmit = (event: any) => {
    if (event.type === "keydown" && event.key !== "Enter") return;

    const id = db.tasks.add({
      type: "SHORT_TERM",
      description,
      completed: Bool.FALSE,
      updated: new Date(),
    });

    setDescription("");
  };

  const handleComplete = (id?: number) => {
    if (!id) return;
    db.tasks.update(id, { completed: Bool.TRUE, updated: new Date() });
  };

  return (
    <>
      <input
        onKeyDown={handleSubmit}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      {tasks?.map((task) => (
        <div
          key={String(task.id)}
          onClick={() => handleComplete(task.id)}
          className="cursor-pointer"
        >
          {task.description}
        </div>
      ))}
    </>
  );
}

export default App;
