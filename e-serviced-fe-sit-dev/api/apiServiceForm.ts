import apiInstance from "../service/interceptor";
import apiForm from "../service/interceptorApiForm";
import { IForm, IFormService } from "@/Interfaces/formInterface";
import { convertToFormData } from "@/utils/utils";
interface ConfigResponse {
  status: boolean;
  data: any | null;
  message: string;
}

export const createRequestForm = async (data: IFormService) => {
  let response = await apiInstance
    .post("FrontEnd/ICSY3Request", data)
    .then((res) => res.data)
    .catch((error) => {
      console.log("createRequestForm", error);
      return {
        result: false,
        msg: error?.response?.data?.msg || error.message,
      };
    });
  return response;
};

//api-external/requests
export const uploadFileForm = async (file: File) => {
  let headers = {
    "Content-Type": "multipart/form-data",
    apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  };
  const formData = new FormData();
  formData.append("imageFile", file);
  let response = await apiInstance
    .post("FrontEnd/ICSY3Upload", formData, { headers })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return response;
};
export const sendSms = async (phoneNumber: string, message: string) => {
  let response = await apiInstance
    .get(`FrontEnd/SendSms`, {
      params: {
        phoneNumber: phoneNumber,
        message: message,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        result: false,
        msg: error?.response?.data?.msg || error.message,
      };
    });
  return response;
};
export const provinces = async () => {
  let res = await apiInstance
    .get("FrontEnd/Master/Provinces")
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};
export const districts = async (provinceId?: number | string | null) => {
  let res = await apiInstance
    .get("FrontEnd/Master/Districts", {
      params: {
        provinceId: provinceId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};
export const subDistricts = async (districtId?: number | string | null) => {
  let res = await apiInstance
    .get("FrontEnd/Master/Postcodes", {
      params: {
        districtId: districtId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};
export const businessType = async () => {
  let res = await apiInstance
    .get("FrontEnd/Master/MBusinessType")
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

export const equipmentType = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/EquipmentType", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

//ประเภทคำร้อง
export const requestServiceType = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/RequestServiceType", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

//ประเภทการบริการ
export const requestService = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/RequestService", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

export const transformerBrand = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/TransformerBrand", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

export const transformerPhase = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/TransformerPhase", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

export const transformerSize = async (servicesId: string) => {
  let res = await apiInstance
    // .get("FrontEnd/Master/TransformerSize", {
    .get("FrontEnd/Master/ServicesItems", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

export const transformerVoltage = async (servicesId: string) => {
  let res = await apiInstance
    // .get("FrontEnd/Master/TransformerVoltage", {
    .get("FrontEnd/Master/ServicesItems", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

export const transformerType = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/TransformerType", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

//เลือกอุปกรณ์
export const equipment = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/Equipment", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};
//ประเภทความต้องการใบรับรองพลังงานหมุนเวียน
export const renewableType = async (servicesId: string) => {
  let res = await apiInstance
    .get("FrontEnd/Master/renewableType", {
      params: {
        services_id: servicesId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};

//pic328-1.png
//pic328-2.png
export const getImageMiniO = async (imageName: string) => {
  let res = await apiInstance
    .get("MiniO/ShowImage", {
      params: {
        path: imageName,
      },
      responseType: "blob",
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        result: false,
        msg: error?.response?.data?.msg || error.message,
      };
    });

  return res;
};

export const ServicesLists = async (service_group_id?: string) => {
  let res = await apiInstance
    .get(`FrontEnd/Master/ServicesLists`)
    .then((res) => res.data)
    .catch((error) => {
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    });
  return res;
};
