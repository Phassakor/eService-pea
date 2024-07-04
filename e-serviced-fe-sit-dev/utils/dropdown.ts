import { IDropdown } from "@/Interfaces/interface";

interface PropsDdl {
  dataList?: Record<string, any>[];
  propsNameLabel: string;
  propsNamevalue: string;
  propsSubId?: string;
}

const handleBindDataDdl = ({
  dataList = [],
  propsNameLabel,
  propsNamevalue,
  propsSubId,
}: PropsDdl): IDropdown[] => {
  return dataList.map((item) => {
    const dropdownItem: IDropdown = {
      label: item[propsNameLabel],
      value: item[propsNamevalue],
    };

    if (propsSubId && item[propsSubId] !== undefined) {
      dropdownItem.sub_id = item[propsSubId];
    }

    return dropdownItem;
  });
};

export { handleBindDataDdl };
