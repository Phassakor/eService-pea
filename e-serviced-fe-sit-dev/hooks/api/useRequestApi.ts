import { useState, ChangeEvent, DragEvent, useEffect } from "react";
import { IAddress, IMasterData,IServiceData } from "@/Interfaces/formInterface";
import { provinces, districts, subDistricts, businessType, equipmentType, equipment, renewableType, transformerBrand, transformerPhase, transformerType ,requestService,requestServiceType,ServicesLists, transformerSize, transformerVoltage} from "@/api/apiServiceForm";

export const useProvinces = () => {
  const [provincesList, setProvincesList] = useState<IAddress[] | null>(null);
  useEffect(() => {
    const fetchProvinces = async () => {
      const result = await provinces();
      if (result.status) {
        const excludedIds = new Set<string>(["10", "12", "11"]);
        const filteredData = result.data.filter((item: IAddress) => {
          // Exclude specific IDs
          if (excludedIds.has(item.ics_id)) {
            return false;
          }

          return true; // Keep the item if all conditions are met
        });

        setProvincesList(filteredData);
      }
    };

    fetchProvinces();
  }, []);

  return { provincesList };
};
export const useDistricts = (provinceId: number | string | null) => {
  const [districtsList, setDistrictsList] = useState<IAddress[] | null>(null);

  useEffect(() => {
    if (!provinceId) return setDistrictsList([]);

    const fetchDistricts = async () => {
      const result = await districts(provinceId);
      if (result.status) {
        setDistrictsList(result.data);
      }
    };
    fetchDistricts();
  }, [provinceId]);

  return { districtsList };
};
export const useSubDistrictList = (districtId: number | string | null) => {
  const [subDistrictList, setSubDistrictList] = useState<IAddress[] | null>(
    null
  );

  useEffect(() => {
    if (!districtId) return setSubDistrictList([]);

    const fetchSubDistrictList = async () => {
      const result = await subDistricts(districtId);
      if (result.status) {
        setSubDistrictList(result.data);
      }
    };
    fetchSubDistrictList();
  }, [districtId]);

  return { subDistrictList };
};
export const useBusinessType = () => {
  const [businessTypeList, setBusinessTypeList] = useState<IAddress[] | null>(null);
  useEffect(() => {
    const fetchSubDistrictList = async () => {
      const result = await businessType();
      if (result.status) {
        setBusinessTypeList(result.data);
      } else {
      }
    };
    fetchSubDistrictList();
  }, []);

  return { businessTypeList };
};
export const useEquipmentType = (servicesId: string) => {
  const [equipmentTypeList, setEquipmentTypeList] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const result = await equipmentType(servicesId); 
          setEquipmentTypeList(result.data);
        } catch (error) {
          console.error('Failed to fetch equipment type:', error);
        }
      
    };
    if (servicesId) {
      fetchData();
    }
   
  }, [servicesId]);
  return equipmentTypeList;
};
export const useEquipments = (servicesId:string) => {
  const [equipmentList, setEquipmentist] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await equipment(servicesId);
      if (result.status) {
        setEquipmentist(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { equipmentList };
};
export const useRenewableType = (servicesId:string) => {
  const [renewableTypeList, setRenewableTypeist] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await renewableType(servicesId);
      if (result.status) {
        setRenewableTypeist(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { renewableTypeList };
};
export const useTransformerBrand = (servicesId:string) => {
  const [transformerBrandList, setTransformerBrandList] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await transformerBrand(servicesId);
      if (result.status) {
        setTransformerBrandList(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { transformerBrandList };
};
export const useTransformerPhase = (servicesId:string) => {
  const [transformerPhaseList, setTransformerPhaseist] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await transformerPhase(servicesId);
      if (result.status) {
        setTransformerPhaseist(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { transformerPhaseList };
};
export const useTransformerSize = (servicesId:string) => {
  const [transformerSizeList, setTransformerSizeist] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await transformerSize(servicesId);
      if (result.status) {
        setTransformerSizeist(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { transformerSizeList };
};

export const useTransformerVoltage = (servicesId:string) => {
  const [transformerVoltageList, setTransformerVoltageist] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await transformerVoltage(servicesId);
      if (result.status) {
        setTransformerVoltageist(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { transformerVoltageList };
};

export const usetransformerType = (servicesId:string) => {
  const [transformerTypeList, setTransformerTypeList] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await transformerType(servicesId);
      if (result.status) {
        setTransformerTypeList(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { transformerTypeList };
};
export const useRequestServiceType = (servicesId:string) => {
  const [requestServiceTypeList, setRequestServiceTypeList] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await requestServiceType(servicesId);
      if (result.status) {
        setRequestServiceTypeList(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { requestServiceTypeList };
};
export const useRequestService = (servicesId:string) => {
  const [requestServiceList, setRequestServiceList] = useState<IMasterData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await requestService(servicesId);
      if (result.status) {
        setRequestServiceList(result.data);
      } else {
      }
    };
    if (servicesId) {
      fetchData();
    }
  }, [servicesId]);

  return { requestServiceList };
};
export const useServiceFormList = (formId:string) => {
  const [serviceFormId, setServiceFormId] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await ServicesLists();
      if (result.status) {
        console.log("fetchData",result.data,"formId",formId)
        const requestCode = result.data.find((x:IServiceData) => x.request_code === formId.toLocaleUpperCase())?.ics_id
        setServiceFormId(requestCode);
      } else {
      }
    };
    fetchData();
  }, []);
  return serviceFormId;
};