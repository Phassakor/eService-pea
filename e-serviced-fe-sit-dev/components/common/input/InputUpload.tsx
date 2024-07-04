import React, { useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import cloudUpload from "@/app/asset/images/svg/cloudUpload.svg";
import { RiDeleteBinFill } from "react-icons/ri";
import { IInputUploadProps } from '@/Interfaces/propsInterface'
import { IoCloseCircle } from "react-icons/io5";

export default function InputUpload({
  onChange,
  fileName,
  onDelete,
  setFile,
  errorMsg
}: IInputUploadProps) {
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Open modal if there's an error message
  React.useEffect(() => {
    if (errorMsg) {
      onOpen();
    }
  }, [errorMsg, onOpen]);

  return (
    <>
      <div
        className="col-span-full h-[229px]"
        onDragOver={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(true);
        }}
        onDragEnter={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(true);
        }}
        onDragLeave={(e) => {
          preventDefaultHandler(e);
          setShouldHighlight(false);
        }}
        onDrop={(e) => {
          preventDefaultHandler(e);
          const files = Array.from(e.dataTransfer.files);
          setFile(e);
          setShouldHighlight(false);
        }}
      >
        <div className="h-[229px] mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 ">
          <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600 gap-4">
            <Image
              src={cloudUpload}
              width={55}
              height={55}
              alt="Picture of the upload"
            />
            <div className="flex gap-3">
              {fileName?.name ? (
                <>
                  <p className="w-full text font-bold text-black bg-slate-200 p-[0.2rem_0.5rem] rounded">
                    {fileName?.name}
                  </p>
                  <RiDeleteBinFill
                    className="text-[25px] cursor-pointer text-red-600 hover:text-red-500"
                    onClick={onDelete}
                  />
                </>
              ) : (
                <>
                  <p className="w-full text font-normal p-[0.2rem_0.5rem] text-center">
                    {" "}
                      เลือกไฟล์ที่ต้องการแนบ หรือ ลากไฟล์รูปภาพมาวางตรงนี้ได้เลย<br />
                    {" "}
                    ประเภทไฟล์ PNG, JPEG, PDF ขนาดไฟล์ไม่เกิน 25 MB
                  </p>
                </>
              )}
            </div>
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <div className="flex justify-center items-center h-[48px] w-[150px] bg-[var(--clr-indigo)] rounded-lg p-[10px_20px] text-[#ffffff] hover:bg-[#a30278]">
                เลือกไฟล์
              </div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".jpg,.png,.pdf,.jpeg"
                hidden
                className="sr-only"
                onChange={(e) => { onChange(e); e.target.value = "" }}
              />
            </label>
          </div>
        </div>
      </div>
      <Modal
        placement="top-center"
        size="sm"
        isOpen={isOpen}
        hideCloseButton={true}
        className="shadow-sm shadow-white"
      >
        <ModalContent>
          <ModalHeader className="mt-2 -mb-4 flex flex-col gap-1 font-NotoSansThai text-center font-extrabold text-2xl">
            <div className="text-center">
              <IoCloseCircle
                className="text-[#FE7373] w-full mb-2"
                size={100}
              />
              <div className="text-[#8E0369]">
                {errorMsg}
              </div>
            </div>
          </ModalHeader>
          <ModalFooter className="flex justify-center mb-2">
            <Button
              className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
              onPress={onClose}
            >
              <div className="font-NotoSansThai font-semibold text-lg px-4">
                ปิด
              </div>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


// components/FileUpload.tsx
// "use client";
// import React, { useRef, useState } from "react";

// import classNames from "classnames";
// const FileUpload = () => {
//   const [fileList, setFileList] = useState<File[] | null>(null);
//   const [shouldHighlight, setShouldHighlight] = useState(false);

//   const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };
//   return (
//     <div
//       className={classNames({
//         "w-full h-96": true,
//         "p-4 grid place-content-center cursor-pointer": true,
//         "text-violet-500 rounded-lg": true,
//         "border-4 border-dashed ": true,
//         "transition-colors": true,
//         "border-violet-500 bg-violet-100": shouldHighlight,
//         "border-violet-100 bg-violet-50": !shouldHighlight,
//       })}
//       onDragOver={(e) => {
//         preventDefaultHandler(e);
//         setShouldHighlight(true);
//       }}
//       onDragEnter={(e) => {
//         preventDefaultHandler(e);
//         setShouldHighlight(true);
//       }}
//       onDragLeave={(e) => {
//         preventDefaultHandler(e);
//         setShouldHighlight(false);
//       }}
//       onDrop={(e) => {
//         preventDefaultHandler(e);
//         const files = Array.from(e.dataTransfer.files);
//         setFileList(files);
//         setShouldHighlight(false);
//       }}
//     >
//       {/* <div className="flex flex-col items-center">
//         {!fileList ? (
//           <>
//             <span>
//               <span>Choose a File</span> or drag it here
//             </span>
//           </>
//         ) : (
//           <>
//             <p>Files to Upload</p>
//             {fileList.map((file, i) => {
//               return <span key={i}>{file.name}</span>;
//             })}
//             <div className="flex gap-2 mt-2">
//               <button className="bg-violet-500 text-violet-50 px-2 py-1 rounded-md">
//                 Upload
//               </button>
//               <button
//                 className="border border-violet-500 px-2 py-1 rounded-md"
//                 onClick={() => {
//                   setFileList(null);
//                 }}
//               >
//                 Clear
//               </button>
//             </div>
//           </>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default FileUpload;
