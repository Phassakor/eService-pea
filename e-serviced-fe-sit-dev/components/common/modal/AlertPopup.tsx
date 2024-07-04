import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { SlQuestion } from "react-icons/sl";
interface Props {
  type?: string;
  isOpen?: boolean;
  onOpenChange?: () => void;
  msg?: string;
  onConfirm?: any;
  isShowBtnConfirm?: boolean;
}
export default function ModalAlert({
  type,
  isOpen,
  onOpenChange,
  msg,
  onConfirm = ()=>{},
  isShowBtnConfirm,
}: Props) {
  const IconModal = () => {
    return type === "E" ? (
      <IoIosCloseCircleOutline fontSize={"4rem"} color="red" />
    ) : type === "S" ? (
      <IoIosCheckmarkCircleOutline fontSize={"4rem"} color="green" />
    ) : type === "Q" ? (<SlQuestion fontSize={"4rem"} color="rgb(181, 142, 56)" />) : "";
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}  isDismissable={false}>
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                <IconModal />
              </ModalHeader>
              <ModalBody className="items-center">{msg}</ModalBody>
              <ModalFooter className="items-center justify-center">
                <>
                  {isShowBtnConfirm && (<Button color="default" onPress={closeModal}>
                    Cancel
                  </Button>)}

                  <Button
                    color="secondary"
                    onPress={() => {
                      onConfirm();
                      closeModal();
                    }}
                  >
                    OK
                  </Button>
                </>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
