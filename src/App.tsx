import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import Meeting from "./components/Meeting";
import MeetingComposer from "./components/MeetingComposer";
import TaskComposer from "./components/TaskComposer";
import { db } from "./data/DB";
import Bool from "./data/Types";

enum Selection {
  TASK = "TASK",
  MEETING = "MEETING",
}

function App() {
  const tasks = useLiveQuery(() =>
    db.tasks.where("completed").equals(Bool.FALSE).toArray()
  );
  const meetings = useLiveQuery(() => db.meetings.toArray());

  const [selected, setSelected] = useState<Selection.TASK | Selection.MEETING>(
    Selection.TASK
  );

  const toggleSelection = () => {
    setSelected(
      selected === Selection.TASK ? Selection.MEETING : Selection.TASK
    );
  };

  const handleComplete = (id?: number) => {
    if (!id) return;
    db.tasks.update(id, { completed: Bool.TRUE, updated: new Date() });
  };

  return (
    <>
      <p onClick={toggleSelection} className="cursor-pointer">
        {selected === Selection.TASK ? <span>✏️</span> : <span>📃</span>}
      </p>
      <div className="mt-2">
        {selected === Selection.TASK ? <TaskComposer /> : <MeetingComposer />}
      </div>
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
