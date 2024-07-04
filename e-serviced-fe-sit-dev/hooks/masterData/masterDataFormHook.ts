import { useBusinessType, useEquipmentType, useEquipments, useRenewableType, useTransformerBrand, useTransformerPhase, usetransformerType, useRequestService, useRequestServiceType, useTransformerSize, useTransformerVoltage } from "../api/useRequestApi";
import { handleBindDataDdl } from "@/utils/dropdown"
export const useHandleBusinessType = () => {
  console.log("useHandleBusinessType")
  const { businessTypeList: businessTypeListFromApi } = useBusinessType();
  const dataList = handleBindDataDdl({
    dataList: businessTypeListFromApi || [],
    propsNameLabel: "name",
    propsNamevalue: "ics_id",
  });
  return dataList;
};
export const useHandleEquipmentType = (servicesId: string) => {
  console.log("useHandleEquipmentType", servicesId)
  const equipmentTypeList = useEquipmentType(servicesId);
  const dataList = handleBindDataDdl({
    dataList: equipmentTypeList?.sort((a, b) => a.option_title.localeCompare(b.option_title, 'th', { sensitivity: 'base', ignorePunctuation: true })) || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};
export const useHandleEquipments = (servicesId: string) => {
  console.log("useHandleEquipments")
  const { equipmentList: equipmentListFromApi } = useEquipments(servicesId);
  const dataList = handleBindDataDdl({
    dataList: equipmentListFromApi || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};
export const useHandleRenewableType = (servicesId: string) => {
  const { renewableTypeList: renewableTypeFromApi } = useRenewableType(servicesId);
  const dataList = handleBindDataDdl({
    dataList: renewableTypeFromApi || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};
export const useHandleTransformerBrand = (servicesId: string) => {
  const { transformerBrandList: transformerBrandListFromApi } = useTransformerBrand(servicesId);
  const dataList = handleBindDataDdl({
    dataList: transformerBrandListFromApi || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};
export const useHandleTransformerType = (servicesId: string) => {
  const { transformerTypeList: transformerTypeListFromApi } = usetransformerType(servicesId);
  const dataList = handleBindDataDdl({
    dataList: transformerTypeListFromApi || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
    propsSubId: "sub_id",
  });
  return dataList;
};
export const useHandleTransformerPhase = (servicesId: string) => {
  const { transformerPhaseList: transformerPhaseListFromApi } = useTransformerPhase(servicesId);
  const dataList = handleBindDataDdl({
    dataList: transformerPhaseListFromApi?.sort((a, b) => a.option_title.localeCompare(b.option_title, 'th', { sensitivity: 'base', ignorePunctuation: true })) || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};
export const useHandleTransformerSize = (servicesId: string) => {
  const { transformerSizeList: transformerSizeListFromApi } = useTransformerSize(servicesId);
  const data = transformerSizeListFromApi?.filter(type => type.item_name === "transformer_size");
  const dataList = handleBindDataDdl({
    dataList: data?.sort((a, b) => a.option_title.localeCompare(b.option_title, 'th', { sensitivity: 'base', ignorePunctuation: true })) || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};

export const useHandleTransformerVoltage = (servicesId: string) => {
  const { transformerVoltageList: transformerVoltageListFromApi } = useTransformerVoltage(servicesId);
  const data = transformerVoltageListFromApi?.filter(type => type.item_name === "transformer_voltage");
  const dataList = handleBindDataDdl({
    dataList: data?.sort((a, b) => a.option_title.localeCompare(b.option_title, 'th', { sensitivity: 'base', ignorePunctuation: true })) || [],
    propsNameLabel: "option_title",
    propsNamevalue: "option_title",
  });
  return dataList;
};

export const useHandleRequestService = (servicesId: string) => {
  const { requestServiceList: requestServiceListFromApi } = useRequestService(servicesId);
  const dataList = handleBindDataDdl({
    dataList: requestServiceListFromApi || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};

export const useHandleRequestServiceType = (servicesId: string) => {
  const { requestServiceTypeList: requestServiceTypeListFromApi } = useRequestServiceType(servicesId);
  const dataList = handleBindDataDdl({
    dataList: requestServiceTypeListFromApi || [],
    propsNameLabel: "option_title",
    propsNamevalue: "ics_id",
  });
  return dataList;
};