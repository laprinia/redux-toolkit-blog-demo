import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

interface TimeAgoProps {
  date: string;
}
const TimeAgo = (props: TimeAgoProps) => {
  let timeAgo = "";
  if (props.date) {
    const date = parseISO(props.date);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
