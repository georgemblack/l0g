import { useState } from "react";

import { db } from "./data/DB";

function MeetingComposer() {
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (description === "") return;

    const id = db.meetings.add({
      description,
      tags: [],
      created: new Date(),
    });

    setDescription("");
  };

  return (
    <>
      <textarea
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        className="px-4 py-3 w-full rounded-xl text-lg resize-none"
        onChange={(event) => setDescription(event.target.value)}
        autoFocus={true}
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-sm text-white opacity-50 px-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default MeetingComposer;
