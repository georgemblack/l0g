import { format } from "date-fns";

function Time({ date }: { date: Date }) {
  return <>{format(date, "LLL d, h:mm a")}</>;
}

export default Time;
