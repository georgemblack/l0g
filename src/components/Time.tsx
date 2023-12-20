import { format, fromUnixTime } from "date-fns";

function Time(props: { timestamp: number }) {
  const time = fromUnixTime(props.timestamp);
  return <>{format(time, "LLL d, h:mm a")}</>;
}

export default Time;
