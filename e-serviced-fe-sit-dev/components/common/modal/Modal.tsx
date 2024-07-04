import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import {IModalFormProps} from '@/Interfaces/propsInterface'
export default function ModalForm({
  isOpen,
  onOpenChange,
  pathImmage = [],
  title,
}: IModalFormProps) {
  return (
    <><Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="5xl"
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-[24px] text-[var(--clr-indigo)]">
                {title}
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center h-[306px] gap-12 max-md:flex-col max-md:h-[702px]">
                  {pathImmage.length > 1 ? (
                    <>
                      <div className="w-[354px] h-[305px] bg-[#e8ebee] p-[10px]">
                        <Image
                          className="object-contain w-[354px] h-[305px]"
                          alt="NextUI hero Image"
                          src={pathImmage[0]}
                        />
                      </div>
                      <div className="w-[456px] h-[306px] bg-[#e8ebee]">
                        <Image
                          className="object-contain w-[456px] h-[306px]"
                          alt="NextUI hero Image"
                          src={pathImmage[1]}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="w-[860px] h-[306px] bg-[#e8ebee]">
                      <Image
                        className="object-contain w-[860px] h-[306px]"
                        alt="NextUI hero Image"
                        src={pathImmage[0]}
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="justify-center">
                <div className="w-[117px] h-[48px]">
                  <Button
                    className="text-button bg-[var(--clr-indigo)]"
                    onPress={onClose}
                  >
                    ปิดหน้าต่างนี้
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
