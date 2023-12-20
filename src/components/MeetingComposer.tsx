import { useState } from "react";

import { db } from "../data/DB";

const availableTags = [
  "Team Meeting",
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
      tags,
      created: new Date(),
    });

    setDescription("");
  };

  //className="text-xs text-white py-1 px-2 rounded cursor-pointer"

  return (
    <>
      <textarea
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        className="px-4 py-3 w-full rounded-xl resize-none h-36"
        onChange={(event) => setDescription(event.target.value)}
        autoFocus={true}
      ></textarea>
      <div className="flex justify-between items-start mt-2">
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <span
              style={{
                backgroundColor: tags.includes(tag)
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,255,255,0.15)",
              }}
              className="text-xs text-white py-1 px-2 rounded cursor-pointer"
              onClick={() => {
                if (tags.includes(tag)) setTags(tags.filter((t) => t !== tag));
                else setTags([...tags, tag]);
              }}
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
