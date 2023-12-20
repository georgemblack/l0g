import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import Meeting from "./Meeting";
import MeetingComposer from "./MeetingComposer";
import { db } from "./data/DB";
import Bool from "./data/Types";

function App() {
  const tasks = useLiveQuery(() =>
    db.tasks.where("completed").equals(Bool.FALSE).toArray()
  );
  const meetings = useLiveQuery(() => db.meetings.limit(5).toArray());

  enum Selection {
    TASK = "TASK",
    MEETING = "MEETING",
  }

  const [selected, setSelected] = useState<Selection.TASK | Selection.MEETING>(
    Selection.TASK
  );
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (event: any) => {
    if (event.type === "keydown" && event.key !== "Enter") return;
    if (description === "") return;
    if (description === "m") {
      setSelected(Selection.MEETING);
      setDescription("");
      return;
    }

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
      <p
        onClick={() =>
          setSelected(
            selected === Selection.TASK ? Selection.MEETING : Selection.TASK
          )
        }
      >
        Switch
      </p>
      {selected === Selection.TASK ? (
        <input
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          className="px-4 py-3 w-full rounded-xl text-lg"
          onKeyDown={handleSubmit}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      ) : (
        <MeetingComposer />
      )}
      {tasks?.map((task) => (
        <p
          key={String(task.id)}
          onClick={() => handleComplete(task.id)}
          className="cursor-pointer mt-4 leading-5 text-lg"
        >
          {task.description}
        </p>
      ))}
      {meetings?.map((meeting) => (
        <Meeting key={String(meeting.id)} meeting={meeting} />
      ))}
    </>
  );
}

export default App;
