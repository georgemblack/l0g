import { db } from "./data/DB";

function MeetingComposer() {
  const handleSubmit = (event: any) => {
    const id = db.meetings.add({
      description: "test",
      tags: [],
      created: new Date(),
    });
  };

  return (
    <>
      <textarea
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        className="px-4 py-3 w-full rounded-xl text-lg resize-none"
      ></textarea>
      <div className="flex justify-end">
        <button type="submit" className="bg-white" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default MeetingComposer;
