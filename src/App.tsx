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
    if (description === "") return;

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
        style={{backgroundColor: "rgba(255,255,255,0.5)"}}
        className="px-4 py-3 w-full rounded-xl text-lg"
        onKeyDown={handleSubmit}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      {tasks?.map((task) => (
        <p
          key={String(task.id)}
          onClick={() => handleComplete(task.id)}
          className="cursor-pointer mt-4 leading-5 text-lg"
        >
          {task.description}
        </p>
      ))}
    </>
  );
}

export default App;
