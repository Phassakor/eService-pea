import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { RiCheckboxCircleFill } from "react-icons/ri";

const StepProgressBar = (props: any) => {
  const statusTracking = props.statusTracking;
  let guidData = props.guidData;

  console.log(guidData);

  let lengthProgressBar = 0;

  const [dataStatus, setDataStatus] = useState([]);
  const [statusTemplate, setStatusTemplate] = useState([1, 2, 3, 4, 5, 6]);

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
  const percentCalculate: any = () => {
    // var countComplete = 0;
    statusTracking.map((data: any) => {
      if (data.success === true) {
        countComplete += 1;
      }
    });
    // return Number((countComplete * 100) / 6);
    // return Math.floor((countComplete * 100) / 6);
    console.log(guidData?.requests?.status);

    if (
      guidData?.requests?.status === "D" ||
      guidData?.requests?.status === "C"
    ) {
      // console.log("t");
      if (guidData?.requests?.status === "D") lengthProgressBar = 1;
      else if (guidData?.requests?.status === "C") lengthProgressBar = 2;

      if (dataStatus?.length === 0) {
        for (let i = 0; i < lengthProgressBar; i++) {
          dataStatus.push(guidData?.all_status[i]);
        }
      }
      return 0;
    }
    if (
      guidData?.requests?.status === "I" ||
      guidData?.requests?.status === "S" ||
      guidData?.requests?.status === "Q" ||
      guidData?.requests?.status === "N"
    ) {
      // console.log("t");
      if (guidData?.requests?.status === "I") lengthProgressBar = 3;
      else if (guidData?.requests?.status === "S") lengthProgressBar = 4;
      else if (guidData?.requests?.status === "Q") lengthProgressBar = 5;
      else if (guidData?.requests?.status === "N") lengthProgressBar = 6;

      if (dataStatus?.length === 0) {
        for (let i = 0; i < lengthProgressBar; i++) {
          dataStatus.push(guidData?.all_status[i]);
        }
      }
      return 22;
    }
    if (
      guidData?.requests?.status === "A" ||
      guidData?.requests?.status === "M"
    ) {
      // console.log("t");
      if (guidData?.requests?.status === "A") lengthProgressBar = 7;
      else if (guidData?.requests?.status === "M") lengthProgressBar = 8;

      if (dataStatus?.length === 0) {
        for (let i = 0; i < lengthProgressBar; i++) {
          dataStatus.push(guidData?.all_status[i]);
        }
      }
      return 40;
    }
    if (guidData?.requests?.status === "P") {
      // console.log("t");
      if (guidData?.requests?.status === "P") lengthProgressBar = 9;

      if (dataStatus?.length === 0) {
        for (let i = 0; i < lengthProgressBar; i++) {
          dataStatus.push(guidData?.all_status[i]);
        }
      }
      return 62;
    }
    if (guidData?.requests?.status === "F") {
      // console.log("t");

      if (guidData?.requests?.status === "F") lengthProgressBar = 10;

      if (dataStatus?.length === 0) {
        for (let i = 0; i < lengthProgressBar; i++) {
          dataStatus.push(guidData?.all_status[i]);
        }
      }
      return 82;
    }
    if (
      guidData?.requests?.status === "E" ||
      guidData?.requests?.status === "R"
    ) {
      // console.log("t");
      if (guidData?.requests?.status === "E") lengthProgressBar = 11;
      else if (guidData?.requests?.status === "R") lengthProgressBar = 12;

      if (dataStatus?.length === 0) {
        for (let i = 0; i < lengthProgressBar; i++) {
          dataStatus.push(guidData?.all_status[i]);
        }
      }
      return 100;
    }

    console.log(dataStatus);

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

  // console.log(statusTracking);

  let statusName = [];
  console.log(dataStatus?.length);
  if (statusName?.length >= 0) {
    if (dataStatus?.length >= 0) {
      statusName.push("รับคำร้อง");
    }
    if (dataStatus?.length >= 3) {
      statusName.push("สำรวจ/ประมาณค่าใช้จ่าย");
    }
    if (dataStatus?.length >= 7) {
      statusName.push("รอชำระเงิน");
    }
    if (dataStatus?.length >= 9) {
      statusName.push("ชำระเงินแล้ว");
    }
    if (dataStatus?.length >= 10) {
      statusName.push("อยู่ระหว่างดำเนินการ");
    }
    if (dataStatus?.length >= 11) {
      statusName.push("ยกเลิก");
    }
    // if (dataStatus?.length === 13) {
    //   statusName.push("อยู่ระหว่างดำเนินงาน");
    // }
  }

  return (
    <div className="mt-8 mb-28 ml-24 mr-[78px]">
      {/* <ProgressBar
        // className="bg-black"
        percent={percentCalculate()}
        // percent={34}
        filledBackground="#8e0369"
        // filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={
                countComplete != 0
                  ? "bg-white w-10 h-10 border-none rounded-full"
                  : "bg-gray-200  border-none rounded-full"
              }
            >
              {countComplete == 0 ? (
                <RiCheckboxCircleFill
                  className={"text-gray-200 w-10 h-10"}
                  size={70}
                />
              ) : (
                <>
                  <RiCheckboxCircleFill
                    className={`indexedStep ${
                      accomplished
                        ? "accomplished w-10 h-10 text-[#8e0369] rounded-full "
                        : "text-gray-200 w-10 h-10"
                    }`}
                    size={70}
                  />
                  <div className="w-[100px] text-large -ml-3 font-extrabold my-1">
                    {statusTracking[0]?.cancel === true
                      ? "ยกเลิก"
                      : "รับคำร้อง"}
                  </div>
                  <div className="w-[100px] -ml-4 font-medium text-[#424957]">
                    {dateComplete(statusTracking[0].complete_date)}
                  </div>
                  <div className="w-[100px] mt-1 -ml-2 font-medium text-[#424957]">
                    {timeComplete(statusTracking[0].complete_date)}
                  </div>
                </>
              )}
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
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full  "
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
              {accomplished ? (
                <>
                  <div className="w-[200px] text-large -ml-[72px] font-extrabold my-1">
                    สำรวจ/ประมาณค่าใช้จ่าย
                  </div>
                  <div className="w-[100px]  -ml-4 font-medium text-[#424957]">
                    {dateComplete(statusTracking[1].complete_date)}
                  </div>
                  <div className="w-[100px] mt-1 -ml-2 font-medium text-[#424957]">
                    {timeComplete(statusTracking[1].complete_date)}
                  </div>
                </>
              ) : (
                ""
              )}
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
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full  "
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
              {accomplished ? (
                <>
                  <div className="w-[200px] text-large -ml-4 font-extrabold my-1">
                    รอชำระเงิน
                  </div>
                  <div className="w-[100px] -ml-4 font-medium text-[#424957]">
                    {dateComplete(statusTracking[2].complete_date)}
                  </div>
                  <div className="w-[100px] mt-1 -ml-2 font-medium text-[#424957]">
                    {timeComplete(statusTracking[2].complete_date)}
                  </div>
                </>
              ) : (
                ""
              )}
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
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full  "
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
              {accomplished ? (
                <>
                  <div className=" w-[200px] text-large -ml-7 font-extrabold my-1">
                    ชำระเงินแล้ว
                  </div>
                  <div className="w-[100px] -ml-4 font-medium text-[#424957]">
                    {dateComplete(statusTracking[3].complete_date)}
                  </div>
                  <div className="w-[100px] mt-1 -ml-2 font-medium text-[#424957]">
                    {timeComplete(statusTracking[3].complete_date)}
                  </div>
                </>
              ) : (
                ""
              )}
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
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full  "
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
              {accomplished ? (
                <>
                  <div className="w-[200px] text-large -ml-16 font-extrabold my-1">
                    อยู่ระหว่างดำเนินการ
                  </div>
                  <div className="w-[100px] -ml-4 font-medium text-[#424957]">
                    {dateComplete(statusTracking[4].complete_date)}
                  </div>
                  <div className="w-[100px] mt-1 -ml-2 font-medium text-[#424957]">
                    {timeComplete(statusTracking[4].complete_date)}
                  </div>
                </>
              ) : (
                ""
              )}
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
                    ? "accomplished w-10 h-10 text-[#8e0369] rounded-full  "
                    : "text-gray-200 w-10 h-10"
                }`}
                size={70}
              />
              {accomplished ? (
                <>
                  <div className="w-[200px] text-large -ml-1 font-extrabold my-1">
                    ยกเลิก
                  </div>
                  <div className="w-[100px] -ml-4 font-medium text-[#424957]">
                    {dateComplete(statusTracking[5].complete_date)}
                  </div>
                  <div className="w-[100px] mt-1 -ml-2 font-medium text-[#424957]">
                    {timeComplete(statusTracking[5].complete_date)}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          )}
        </Step>
      </ProgressBar> */}
      <ProgressBar
        // className="bg-black"
        percent={percentCalculate()}
        // percent={34}
        filledBackground="#8e0369"
        // filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        {statusTemplate.map((d, i) => {
          // if (dataStatus[0] && dataStat)

          return (
            <Step transition="scale">
              {({ accomplished }) => {
                return (
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
                          ? "accomplished w-10 h-10 text-[#8e0369] rounded-full  "
                          : "text-gray-200 w-10 h-10"
                      }`}
                      size={70}
                    />
                    {accomplished ? (
                      <div className="">
                        {/* <div className="w-[200px] -ml-8 text-center text-large   font-extrabold my-1"> */}
                        <div className="text-center lg:w-[210px] lg:-ml-20 font-bold my-1 lg:text-xl">
                          {/* {dataStatus[i] ? dataStatus[i * 2]?.e_service_name : ""} */}
                          {statusName[i] ? statusName[i] : ""}
                        </div>
                        <div className="text-center lg:w-[100px] lg:-ml-8 font-medium text-[#424957]">
                          {dataStatus[i]
                            ? dataStatus[i].updated_date
                              ? dateComplete(dataStatus[i].updated_date)
                              : ""
                            : ""}
                        </div>
                        <div className="lg:w-[100px] text-center  -ml-8 font-medium text-[#424957]">
                          {dataStatus[i]
                            ? dataStatus[i].updated_date
                              ? timeComplete(dataStatus[i].updated_date)
                              : ""
                            : ""}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              }}
            </Step>
          );
        })}
      </ProgressBar>
    </div>
  );
};

export default StepProgressBar;
