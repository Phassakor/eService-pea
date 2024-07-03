import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { RiCheckboxCircleFill } from "react-icons/ri";

const StepProgressBarVertical = (props) => {
  const statusTracking = props.statusTracking;

  const dateComplete = (dateTime: string) => {
    let dateComplete = new Date(dateTime);
    return dateComplete.toLocaleDateString("th-TH");
  };

  const timeComplete = (dateTime: string) => {
    let timeComplete = new Date(dateTime);
    return timeComplete.toLocaleTimeString("th-TH");
  };

  const dateComplete2 = (dateTime: string) => {
    let dateComplete = new Date(dateTime);
    return dateComplete.toLocaleDateString("th-TH");
  };

  const timeComplete2 = (dateTime: string) => {};
  var countComplete = 0;
  const percentCalculate = () => {
    statusTracking.map((data) => {
      if (data.success === true) {
        countComplete += 1;
      }
    });
    // return Number((countComplete * 100) / 6) + 1;
    if (countComplete == 0) {
      return 0;
    }
    if (countComplete == 1) {
      return 0;
    }
    if (countComplete == 2) {
      return 22;
    }
    if (countComplete == 3) {
      return 40;
    }
    if (countComplete == 4) {
      return 62;
    }
    if (countComplete == 5) {
      return 82;
    }
    if (countComplete == 6) {
      return 100;
    }
  };

  return (
    <>
      <div className="absolute -mt-40 ml-[120px] -rotate-90  lg:bottom-[720px] mb-16">
        {statusTracking[0] && statusTracking[0].success !== false ? (
          <div className="mt-20 mb-7 font-NotoSansThai">
            <div className="">
              {dateComplete(statusTracking[0].complete_date)}
            </div>
            <div>{timeComplete(statusTracking[0].complete_date)}</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[1] && statusTracking[1].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="">
              {dateComplete(statusTracking[1].complete_date)}
            </div>
            <div>{timeComplete(statusTracking[1].complete_date)}</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[2] && statusTracking[2].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="">
              {dateComplete(statusTracking[2].complete_date)}
            </div>
            <div>{timeComplete(statusTracking[2].complete_date)}</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[3] && statusTracking[3].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="">
              {dateComplete(statusTracking[3].complete_date)}
            </div>
            <div>{timeComplete(statusTracking[3].complete_date)}</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[4] && statusTracking[4].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="">
              {dateComplete(statusTracking[4].complete_date)}
            </div>
            <div>{timeComplete(statusTracking[4].complete_date)}</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[5] && statusTracking[5].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="">
              {dateComplete(statusTracking[5].complete_date)}
            </div>
            <div>{timeComplete(statusTracking[5].complete_date)}</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible">text</div>
            <div className="invisible">text</div>
          </div>
        )}
      </div>
      <ProgressBar
        className=""
        percent={percentCalculate()}
        // percent={34}
        filledBackground="#8e0369"
        // filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                countComplete
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              <RiCheckboxCircleFill
                className={`indexedStep ${
                  countComplete
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full -rotate-90"
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                accomplished
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              <RiCheckboxCircleFill
                className={`indexedStep ${
                  accomplished
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full -rotate-90"
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                accomplished
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              <RiCheckboxCircleFill
                className={`indexedStep ${
                  accomplished
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full -rotate-90"
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                accomplished
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              <RiCheckboxCircleFill
                className={`indexedStep ${
                  accomplished
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full -rotate-90"
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                accomplished
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              <RiCheckboxCircleFill
                className={`indexedStep ${
                  accomplished
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full -rotate-90"
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                accomplished
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              <RiCheckboxCircleFill
                className={`indexedStep ${
                  accomplished
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full -rotate-90"
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
            </div>
          )}
        </Step>
      </ProgressBar>
      <div className="absolute -mt-[360px] ml-[96px] -rotate-90  lg:bottom-[720px] mb-16">
        {statusTracking[0] && statusTracking[0].success !== false ? (
          <div className="mt-20 mb-7 font-NotoSansThai">
            <div className="font-bold text-[16px]">รับคำร้อง</div>
            <div className="invisible">text</div>
          </div>
        ) : (
          <div className=" mt-20 mb-7 font-NotoSansThai">
            <div className="invisible font-bold text-[16px]">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[1] && statusTracking[1].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            {/* <div className="font-bold text-[18px]">สำรวจ/ประมาณค่าใช้จ่าย</div> */}
            <div className="font-bold text-[16px]">
              <div>สำรวจ/ประมาณ</div>
              <div>ค่าใช้จ่าย</div>
            </div>
            {/* <div className="invisible">text</div> */}
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            {/* <div className="font-bold text-[18px]">สำรวจ/ประมาณค่าใช้จ่าย</div> */}
            <div className="font-bold text-[16px]">
              <div className="invisible">สำรวจ/ประมาณ</div>
              <div className="invisible">ค่าใช้จ่าย</div>
            </div>
            {/* <div className="invisible">text</div> */}
          </div>
        )}
        {statusTracking[2] && statusTracking[2].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="font-bold text-[16px]">รอชำระเงิน</div>

            <div className="invisible">text</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible font-bold text-[16px]">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[3] && statusTracking[3].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="font-bold text-[16px]">ชำระเงินแล้ว</div>
            <div className="invisible">text</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible font-bold text-[16px]">text</div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[4] && statusTracking[4].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="font-bold text-[16px]">อยู่ระหว่างดำเนินการ</div>
            <div className="invisible">text</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible font-bold text-[16px]">
              อยู่ระหว่างดำเนินการ
            </div>
            <div className="invisible">text</div>
          </div>
        )}
        {statusTracking[5] && statusTracking[5].success !== false ? (
          <div className=" mb-7 font-NotoSansThai">
            <div className="font-bold text-[16px]">ยกเลิก</div>
            <div className="invisible">text</div>
          </div>
        ) : (
          <div className=" mb-7 font-NotoSansThai">
            <div className="invisible font-bold text-[16px]">ยกเลิก</div>
            <div className="invisible">text</div>
          </div>
        )}
      </div>
    </>
  );
};

export default StepProgressBarVertical;
