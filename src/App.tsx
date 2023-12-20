import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import { db } from "./data/DB";
import Bool from "./data/Types";
import MeetingView from "./views/MeetingView";
import TaskView from "./views/TaskView";

enum Selection {
  TASK = "TASK",
  MEETING = "MEETING",
}

function App() {
  const [selected, setSelected] = useState<Selection.TASK | Selection.MEETING>(
    Selection.TASK
  );

  const toggleSelection = () => {
    setSelected(
      selected === Selection.TASK ? Selection.MEETING : Selection.TASK
    );
  };

  return (
    <>
      <p onClick={toggleSelection} className="cursor-pointer">
        {selected === Selection.TASK ? <span>✏️</span> : <span>📃</span>}
      </p>
      <div className="mt-2">
        {selected === Selection.TASK ? <TaskView /> : <MeetingView />}
      </div>
    </>
  );
}

export default App;
