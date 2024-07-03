"use client";
import React, { useState, useRef } from "react";
import InputForm from "../common/input/InputForm";
import "react-multi-date-picker/styles/colors/purple.css";
import DatePicker, {
  DateObject,
  DatePickerRef,
  Value,
} from "react-multi-date-picker";
import { useScreenWidth } from "../../hooks/windowSizeHook";
import {formatDateThai,convertDateFormat} from '../../utils/utils'
import {IDatePickerMutiProps} from '@/Interfaces/propsInterface'
export default function DatePickerMuti({
  nameStartDate,
  nameEndDate,
  valueStartDate,
  valueEndDate,
  numberOfDiffDate,
  onChangeDate,
  onClearStart,
  onClearEnd,
  inputDateRight,
  isInvalid
}: IDatePickerMutiProps) {
  const datepickerRef = useRef<DatePickerRef>(null);
  const [dateOld, setDateOld] = useState<Value[]>([]);
  const [values, setValues] = useState<any>([]);
  const screenWidth = useScreenWidth();
  const months = [
    ["มกราคม", "ม.ค."],
    ["กุมภาพันธ์", "ก.พ."],
    ["มีนาคม", "มี.ค."],
    ["เมษายน", "เม.ย."],
    ["พฤษภาคม", "พ.ค."],
    ["มิถุนายน", "มิ.ย."],
    ["กรกฎาคม", "ก.ค."],
    ["สิงหาคม", "ส.ค."],
    ["กันยายน", "ก.ย."],
    ["ตุลาคม", "ต.ค."],
    ["พฤศจิกายน", "พ.ย."],
    ["ธันวาคม", "ธ.ค."],
  ];
  const weekDays = [
    ["วันอาทิตย์", "อา"],
    ["วันจันทร์", "จ"],
    ["วันอังคาร", "อ"],
    ["วันพุธ", "พ"],
    ["วันพฤหัส", "พฤ"],
    ["วันศุกร์", "ศ"],
    ["วันเสาร์", "ส"],
  ];

  const onOpenCalendar = () => {
    onClearData();
    datepickerRef.current?.openCalendar();
  };
  const onApply = () => {
    setDateOld(values);
    if (onChangeDate) {
      const formattedDates = values.map((date: DateObject) => 
        date.format("YYYY-MM-DD HH:mm:ss")
      );
      onChangeDate(formattedDates.toString());
    }
    datepickerRef.current?.closeCalendar();
  };
  const onClearData = () => {
    if (!!valueStartDate || !!valueEndDate) {
      setValues(dateOld);
    } else {
      setValues([]);
    }
  };
  const onClearInputDate = (isEnd?: boolean) => {
    let newArr = [];
    let numIndex = 1;
    if (isEnd) {
      numIndex = values.length > 1 ? 0 : 1;
    }
    newArr = values?.splice(numIndex, 1);
    setValues(newArr);
    setDateOld(newArr);
  };
  const DateInput = () => {
    return (
      <div className="flex gap-2 max-md:gap-8">
        <InputForm
          label="วันที่เริ่มต้น"
          placeholder="วันที่เริ่มต้น"
          name={nameStartDate}
          isRequired={true}
          isInvalid={isInvalid}
          onClick={onOpenCalendar}
          value={formatDateThai(convertDateFormat(valueStartDate),true)}
          isClear={!!valueStartDate}
          onClear={() => {
            onClearStart?.();
            onClearInputDate();
          }}
        />
        <InputForm
          label="วันที่สิ้นสุด"
          placeholder="วันที่สิ้นสุด"
          name={nameEndDate}
          isRequired={true}
          isInvalid={isInvalid}
          onClick={onOpenCalendar}
          value={formatDateThai(convertDateFormat(valueEndDate),true)}
          isClear={!!valueEndDate}
          onClear={() => {
            onClearEnd?.();
            onClearInputDate(true);
          }}
        />
      </div>
    );
  };
  const onClickClose = () => {
    onClearData();
    datepickerRef.current?.closeCalendar();
  };

  const handleChange = (
    date: DateObject | DateObject[] | null,
    options: {
      validatedValue: string | string[];
      input: HTMLElement;
      isTyping: boolean;
    }
  ) => {
    setValues(date);
  };
  return (
    <DatePicker
      range
      numberOfMonths={2}
      ref={datepickerRef}
      fixMainPosition={true}
      fixRelativePosition={true}
      render={<DateInput />}
      showOtherDays={false}
      onClose={() => true}
      className="purple custom-date-picker"
      onChange={handleChange}
      months={months}
      hideYear={true}
      weekDays={weekDays}
      format="DD/MM/YYYY"
      value={values}
      style={
        (screenWidth > 767 || screenWidth === 0) && !inputDateRight
          ? {}
          : {
              width: "100%",
              boxSizing: "border-box",
            }
      }
      containerStyle={
        (screenWidth > 767 || screenWidth === 0) && inputDateRight
          ? {}
          : {
              width: "100%",
            }
      }
      calendarPosition={
        (screenWidth > 767 || screenWidth === 0) && !inputDateRight
          ? undefined
          : "bottom-center"
      }
    >
      <div className="p-3 max-md:p-[0.75rem_1.5rem] w-full ">
        <div className="w-full border-t-2 border-[#e9eff6] pt-[12px] flex justify-between items-center">
          <div className="flex flex-col items-start max-sm:text-sm">
            <div>
              {formatDateThai(convertDateFormat(valueStartDate))} {convertDateFormat(valueEndDate) && convertDateFormat(valueStartDate) && "-"}{" "}
              {formatDateThai(convertDateFormat(valueEndDate))}
            </div>
            {numberOfDiffDate !== 0 && (
              <div className="text-[#777] font-500">
                {numberOfDiffDate} {numberOfDiffDate && "วัน"}
              </div>
            )}
          </div>
          <div className="flex w-auto text-right gap-2">
            <button
              className="text-white w-[65px] rounded-lg px-1 py-2 text-base leading-5 font-700 bg-[var(--clr-indigo)] cursor-pointer max-sm:text-sm"
              onClick={onClickClose}
            >
              ปิด
            </button>

            {values?.toString() && (
              <button
                className="text-white w-[65px] rounded-lg px-1 py-2 text-base leading-5 font-700 bg-[var(--clr-indigo)] cursor-pointer max-sm:text-sm"
                onClick={onApply}
              >
                เลือก
              </button>
            )}
          </div>
        </div>
      </div>
    </DatePicker>
  );
}




