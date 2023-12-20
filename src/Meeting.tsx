import { Meeting as MeetingInterface } from "./data/DB";

function Meeting({ meeting }: { meeting: MeetingInterface }) {
  return (
    <>
      <p className="mt-4 text-sm opacity-20">{meeting.created.toISOString()}</p>
      <p className="cursor-pointer leading-5 text-lg">{meeting.description}</p>
    </>
  );
}

export default Meeting;
