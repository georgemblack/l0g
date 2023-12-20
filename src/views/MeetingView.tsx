import { useLiveQuery } from "dexie-react-hooks";

import Meeting from "../components/Meeting";
import MeetingComposer from "../components/MeetingComposer";
import { db } from "../data/DB";

function MeetingView() {
  const meetings = useLiveQuery(() => db.meetings.toArray());

  return (
    <>
      <MeetingComposer />
      {meetings?.map((meeting) => (
        <Meeting key={String(meeting.id)} meeting={meeting} />
      ))}
    </>
  );
}
export default MeetingView;
