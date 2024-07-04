import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";

import { updateOTPStatus } from "@/redux/Reducer";

export default function Timer({ expiryTimestamp }) {
  let count = useSelector((state) => state.Reducer.value2.count);

  const dispatch = useDispatch();
  const [expiredText, setExpiredText] = useState("");
  const {
    seconds = 16,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setExpiredText("รหัส OTP หมดอายุแล้ว");
    },
  });

  useEffect(() => {
    const newTimeStamp = new Date(Date.now() + 299 * 1000);
    setExpiredText("");
    restart(newTimeStamp);
    setExpiredText("");
  }, [count]);

  useEffect(() => {
    dispatch(updateOTPStatus(expiredText));
  }, [expiredText]);

  return (
    <div>
      <div className="text-[#AAAAAA] font-light text-sm -mt-2">
        {expiredText != "" ? (
          <>{expiredText}</>
        ) : (
          <>
            <span>
              รหัส OTP จะหมดอายุภายใน {String(minutes).padStart(1, "0")}:
              {String(seconds).padStart(2, "0")} นาที
            </span>
          </>
        )}
      </div>
    </div>
  );
}
