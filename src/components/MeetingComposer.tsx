import { useState } from "react";

import { db } from "../data/DB";

const availableTags = [
  "Team",
  "Standup",
  "One-One",
  "Rodo",
  "Janice",
  "Francis",
  "Avery",
  "Emmett",
];

function MeetingComposer() {
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = () => {
    if (description === "") return;

    db.meetings.add({
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
        className="px-4 py-3 w-full rounded-xl text-lg resize-none h-36"
        onChange={(event) => setDescription(event.target.value)}
        autoFocus={true}
      ></textarea>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2 mt-2">
          {availableTags.map((tag) => (
            <span
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              className="text-xs text-white py-1 px-2 rounded cursor-pointer"
              onClick={() => setTags([...tags, tag])}
            >
              {tag}
            </span>
          ))}
        </div>

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
