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

export const diffDate = (start: string, end: string) => {
  let diffDays: number = 0;
  try {
    let dStart = start.split("/");
    let dEnd = end.split("/");
    const date1: Date = new Date(
      parseInt(dStart[2]), // Year
      parseInt(dStart[1]) - 1, // Month (zero-based)
      parseInt(dStart[0]) // Day
    );

    const date2: Date = new Date(
      parseInt(dEnd[2]), // Year
      parseInt(dEnd[1]) - 1, // Month (zero-based)
      parseInt(dEnd[0]) // Day
    );

    const diffTime: number = Math.abs(date2.getTime() - date1.getTime());
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } catch { }

  return diffDays;
};
export const formatDateThaiFull = (date?: any) => {
  let dateNew = date;
  if (dateNew) {
    try {
      const date = new Date(dateNew);
      dateNew = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      dateNew = date;
    }
  }
  return dateNew;
};
export const formatDateTimeThaiFull = (date?: any) => {
  let dateNew = date;
  if (dateNew) {
    try {
      const date = new Date(dateNew);
      dateNew = date
        .toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        })
        .replace("เวลา", "");
    } catch {
      dateNew = date;
    }
  }
  return dateNew;
};
export const formatDateThai = (valueDate?: string, isFullDate?: boolean) => {
  let formatDate = valueDate;
  if (valueDate) {
    try {
      const month = valueDate.toString().split("/");
      const newM = months[Number(month[1])]?.[1];
      months[Number(month[1])];
      if (isFullDate) {
        formatDate = `${month[0]} ${newM} ${month[2]}`;
      } else {
        formatDate = `${month[0]} ${newM}`;
      }
    } catch { }
  }
  return formatDate;
};
export const convertDateFormat = (dateString?: string): string => {
  if (!dateString) {
    return ""
  }
  // Define the parts of the input date string
  const [datePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  // Convert to the new format "MM/DD/YYYY"
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const validateFileType = (type?: string) => {
  let isValide = false;
  const allowedTypes = ["jpg", "png", "pdf", "jpeg"];
  if (type && allowedTypes.includes(type)) isValide = true;
  return isValide;
};
export const isFormValid = (formData: Record<string, any>): boolean => {
  console.log("isFormValid", formData);
  for (const key in formData) {
    console.log("key", key, "FF", formData[key]);
    if (!formData[key]) {
      return false;
    }
  }
  return true;
};
export const validateForm = (form: HTMLFormElement | null): boolean => {
  if (!form) return false;

  const inputs = form.querySelectorAll<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >("input, select, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.required && !input.value) {
      isValid = false;
    }
  });

  return isValid;
};
export const convertToFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any, index: number) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else if (typeof data[key] === "boolean") {
      formData.append(key, String(data[key])); // Convert boolean to string
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const checkMobilePhone = (number: string): boolean => {
  // Define the regex pattern
  const pattern = /^0\d{9}$/;
  // Check if the number matches the pattern
  return pattern.test(number);
};



