import { useState } from "react";

import { db } from "../data/DB";

function MeetingComposer({ selectedTags }: { selectedTags: string[] }) {
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (description === "") return;

    db.meetings.add({
      description,
      tags: selectedTags,
      created: new Date(),
    });

    setDescription("");
  };

  return (
    <>
      <textarea
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        className="px-4 py-3 w-full rounded-xl resize-none h-36"
        onChange={(event) => setDescription(event.target.value)}
        autoFocus={true}
      ></textarea>
      <div className="flex justify-end text-sm text-white opacity-50 px-2">
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default MeetingComposer;
