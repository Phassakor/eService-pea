import apiInstance from "../service/interceptor";
interface ConfigResponse {
  status: boolean;
  data: any | null;
  message: string;
}
export const getBanner = async () => {
  let res = await apiInstance
    .get("FrontEnd/GetBanner")
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
export const getBannerByID = async (idBanner: string) => {
  let res = await apiInstance
    .get("FrontEnd/GetBannerByID", {
      params: {
        id: idBanner,
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
export const getCarousels = async () => {
  let res = await apiInstance
    .get("FrontEnd/GetCarousels")
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
export const getCarouselsByID = async (idCarousels: string) => {
  let res = await apiInstance
    .get("FrontEnd/GetCarouselsByID", {
      params: {
        id: idCarousels,
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
export const getAllCategory = async () => {
  let res = await apiInstance
    .get("FrontEnd/GetAllCategory")
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
export const getMenuByCategoryID = async (categoryId: string) => {
  let res = await apiInstance
    .get("FrontEnd/GetMenuByCategoryID", {
      params: {
        categoryId: categoryId,
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
export const getFooter = async () => {
  let res = await apiInstance
    .get("FrontEnd/GetFooter")
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

export const getMenuService = async () => {
  let res = await apiInstance
    .get("MasterMenu/GetAll", {
      params: {
        search: "",
        status: 1,
        category: "",
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
export const getMenuServiceID = async (id: any) => {
  let res = await apiInstance
    .get("MasterMenu/Get", {
      params: {
        id: id,
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

//File
export const getFile = async (path: string) => {
  let res = await apiInstance
    .get("MiniO/ShowImage", {
      params: { path },
      responseType: "blob",
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
export const PostFile = async (type: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  let res = await apiInstance
    .post("MiniO/Upload", formData, {
      params: {
        type: type,
      },
      headers: {
        "Content-Type": "multipart/form-data",
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

export const getRequestList = async (id?: any) => {
  let res = await apiInstance
    .get("FrontEnd/ICSY3GetRequest", {
      params: {
        request_no: id,
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

export const getRequestOTP = async (phoneNumber: any) => {
  let res = await apiInstance
    .get("FrontEnd/RequestOTP", {
      params: {
        phoneNumber: phoneNumber,
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

export const getRequestByGUID = async (guid?: any) => {
  let res = await apiInstance
    .get(`FrontEnd/ICSY3GetRequestByGUID`, {
      headers: {
        Apikey: "MEvyDTsh3BQWRdjSCbFHQJmkK9WCdxCa",
      },
      params: {
        guid: guid,
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

export const verifyOTP = async (otpId: any, otp: any) => {
  let res = await apiInstance
    .get("FrontEnd/VerifyOTP", {
      params: {
        otpId: otpId,
        otp: otp,
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

//PackageService
export const getPackageService = async (id: any) => {
  let res = await apiInstance
    .get("FrontEnd/Master/PackageService", {
      params: {
        services_id: id,
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

//ServicesItems
export const getServicesItems = async (id: any) => {
  let res = await apiInstance
    .get("FrontEnd/Master/ServicesItems", {
      params: {
        services_id: id,
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