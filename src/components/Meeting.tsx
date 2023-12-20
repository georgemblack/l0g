import { Meeting as MeetingInterface } from "../data/DB";
import Time from "./Time";

function Meeting({ meeting }: { meeting: MeetingInterface }) {
  return (
    <>
      <p className="mt-4 text-sm opacity-20">
        <Time timestamp={meeting.created.getDate()} />
      </p>
      <p className="leading-5 text-lg">{meeting.description}</p>
    </>
  );
}

export default Meeting;
