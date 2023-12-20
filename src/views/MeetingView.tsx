import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import Meeting from "../components/Meeting";
import MeetingComposer from "../components/MeetingComposer";
import TagSelector from "../components/TagSelector";
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

function MeetingView() {
  const meetings = useLiveQuery(() => db.meetings.toArray());

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <>
      <MeetingComposer selectedTags={selectedTags} />
      <div className="mt-2">
        <TagSelector
          tags={availableTags}
          selectedTags={selectedTags}
          onChange={setSelectedTags}
        />
      </div>
      {meetings?.map((meeting) => (
        <Meeting key={String(meeting.id)} meeting={meeting} />
      ))}
    </>
  );
}
export default MeetingView;
