import { useState, ChangeEvent, DragEvent, useEffect } from "react";
import { validateFileType } from "@/utils/utils";
import { IDropdown } from "@/Interfaces/interface";
import useRedirect from '@/hooks/useRedirect'
import {
  useProvinces,
  useDistricts,
  useSubDistrictList
} from "./api/useRequestApi";
import {uploadFileForm,createRequestForm,sendSms} from '@/api/apiServiceForm'
import { IElectricTransformers ,IFormService ,IAlertMsg} from '@/Interfaces/formInterface';
import { useDisclosure } from "@nextui-org/react";
export interface FileHook {
  file: File | null;
  selectFile: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteFile: () => void;
  setFileDrag: (event: DragEvent<HTMLElement>) => void;
  uploadFile: () => Promise<ApiResponse | null>;
  filePath?: string;
  error?: string | null;
}
type ApiResponse = {
  msg?: string;
  path?: string;
  result?: boolean;
};

type SubmitFunction = (...args: any[]) => Promise<void>;
interface UseSubmitHandlerReturn {
  handleSubmit: (...args: any[]) => Promise<void>;
  isSubmitting: boolean;
  errorMessage: string | null;
}

export function useFileUpload(initialValue: File | null = null): FileHook {
  const [file, setFile] = useState<File | null>(initialValue);
  const [filePath, setFilePath] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop() || "";
      if (!validateFileType(fileType)) {
        // setError("ประเภทไฟล์ PNG, JPEG, PDF");
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("ขนาดไฟล์ไม่เกิน 25 MB");
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const uploadFile = async (): Promise<ApiResponse | null> => {
    if (!file) {
      console.log('No file selected');
      return null;
    }
    try {
      const response = await uploadFileForm(file);
      if (!response.data.result) {
        throw new Error('File upload failed');
      }
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  };

  const deleteFile = () => {
    setFile(null);
    setError(null);
  };

  const setFileDrag = (e: DragEvent<HTMLElement>) => {
    const draggedFile = e.dataTransfer.files?.[0];
    if (draggedFile) {
      const fileType = draggedFile.name.split(".").pop() || "";
      if (!validateFileType(fileType)) {
        // setError("ประเภทไฟล์ PNG, JPEG, PDF");
        return;
      }
      if (draggedFile.size > MAX_FILE_SIZE) {
        setError("ขนาดไฟล์ไม่เกิน 25 MB");
        return;
      }
      setError(null);
      setFile(draggedFile);
    }
  };

  return { file, selectFile, deleteFile, setFileDrag, uploadFile, filePath, error };
}

interface AddressData {
  province: IDropdown[];
  districtList: IDropdown[];
  subDistrictList: IDropdown[];
  postCode: string | undefined;
  onChangAddress: (name: string, value: string | undefined) => void;
}

export const useAddressData = (): AddressData => {
  const { provincesList } = useProvinces();
  const [selectedProvince, setSelectedProvince] = useState<
    number | string | null
  >(null);
  const { districtsList } = useDistricts(selectedProvince);
  const [selectedDistrict, setSelectedDistrict] = useState<
    number | string | null
  >(null);
  const { subDistrictList } = useSubDistrictList(selectedDistrict);
  const province: IDropdown[] = [
    { label: "เลือกจังหวัด", value: "" },
    ...(provincesList || []).map((x) => ({ label: x.name, value: x.ics_id })),
  ];

  const districtList: IDropdown[] = [
    { label: "เลือกเขต/อำเภอ", value: "" },
    ...(districtsList || []).map((x) => ({ label: x.name, value: x.ics_id })),
  ];

  const subDistrictListDropdown: IDropdown[] = [
    { label: "เลือกแขวง/ตำบล", value: "" },
    ...(subDistrictList || []).map((x) => ({ label: x.name, value: x.ics_id })),
  ];
  const [postCode, setPostCode] = useState<string | undefined>(undefined);
  const onChangAddress = (name: string, value: string | undefined) => {
    if (name === "address_province") {
      setSelectedProvince(value || "");
      setSelectedDistrict("");
      setPostCode("");
    } else if (name === "address_city"){
      setSelectedDistrict(value || "");
      setPostCode("");
    } else if (name === "address_district") {
      const selectedSubDistrict = subDistrictList?.find(
        (x) => x.ics_id === value
      );
      setPostCode(selectedSubDistrict?.postcode);
    }
  };
  return {
    province,
    districtList,
    subDistrictList: subDistrictListDropdown,
    postCode,
    onChangAddress,
  };
};
export const useSubmitHandler = (submitFunction: SubmitFunction): UseSubmitHandlerReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = async (...args: any[]): Promise<void> => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await submitFunction(...args);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
     
    }
  };

  return { handleSubmit, isSubmitting, errorMessage };
};
export const useElectricTransformers = (initialTransformers: IElectricTransformers[]) => {
  const [electricTransformers, setElectricTransformers] = useState<IElectricTransformers[]>(initialTransformers);
  const addTransformer = () => {
    const newId = Math.max(...electricTransformers.map(t => t.id)) + 1;
    setElectricTransformers([...electricTransformers, {
        id: newId,
        status: "N",
        transformer_brand: "",
        transformer_phase: "",
        transformer_type: "",
        transformer_serial: "",
        transformer_size: "",
        transformer_voltage: "",
    }]);
  };
  const removeTransformer = (id: number) => {
    setElectricTransformers(electricTransformers.filter(t => t.id !== id));
  };
  const updateTransformer = (id: number, name: string, value: any) => {
    setElectricTransformers(electricTransformers.map(t => t.id === id ? { ...t, [name]: value } : t));
  };
  return { electricTransformers, addTransformer, removeTransformer, updateTransformer };
};
export const useRequestForm  = () => {
  const redirectTo = useRedirect();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalAlert, setModalAlert] = useState<IAlertMsg>({ type: "", open: false, msg: "" });
  const onSubmit = async (dataInsert:IFormService) => {
    try {
      const request = await createRequestForm(dataInsert);
      const resultY3 = request?.data
      if (request.status && resultY3?.result) {
        //const onSendSms = await sendSms(result.phoneNumber,)
        redirectTo();
      } else {
        setModalAlert({
          type: "E",
          open: true,
          msg: !request.status ? request.message : resultY3.msg,
        });
        onOpen();
      }
    } catch (error) {console.log("error",error)  }
  };
  return {
    onSubmit,
    modalAlert,
    setModalAlert,
    isOpen,
    onOpenChange
  };
};
// Define the types for the response and error
interface SendSmsResponse {
  success: boolean;
  message: string;
}

interface UseSendSmsReturn {
  onSendSms: (mobileNo: string, message: string) => Promise<void>;
  response: SendSmsResponse | null;
  loading: boolean;
  error: string | null;
}

// Custom hook to send SMS
const useSendSms = (): UseSendSmsReturn => {
  const [response, setResponse] = useState<SendSmsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSendSms = async (mobileNo: string, message: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sendSms(mobileNo,message)
      setResponse(response);
    } catch (err) {
      setError('Failed to send SMS');
    } finally {
      setLoading(false);
    }
  };

  return { onSendSms, response, loading, error };
};

export default useSendSms;
