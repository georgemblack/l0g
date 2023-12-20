import { useLiveQuery } from "dexie-react-hooks";

import TaskComposer from "../components/TaskComposer";
import { db } from "../data/DB";
import Bool from "../data/Types";

function TaskView() {
  const tasks = useLiveQuery(() =>
    db.tasks.where("completed").equals(Bool.FALSE).toArray()
  );

  const handleComplete = (id?: number) => {
    if (!id) return;
    db.tasks.update(id, { completed: Bool.TRUE, updated: new Date() });
  };

  return (
    <>
      <TaskComposer />
      {tasks?.map((task) => (
        <p
          key={String(task.id)}
          onClick={() => handleComplete(task.id)}
          className="cursor-pointer mt-4 leading-5"
        >
          {task.description}
        </p>
      ))}
    </>
  );
}

export default TaskView;
