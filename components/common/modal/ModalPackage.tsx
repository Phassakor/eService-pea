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
import { IModalFormProps } from '@/Interfaces/propsInterface'

function ModalPackage({
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
            size="xl"
            hideCloseButton={true}
        >
            <ModalContent >
                {(onClose) => (
                    <>
                        <ModalHeader className="text-[24px] text-[var(--clr-indigo)]">
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex justify-center items-center h-[600px] gap-12  max-md:h-[702px]">
                                <Image
                                    className="object-contain w-full h-[600px]"
                                    alt="NextUI hero Image"
                                    src={pathImmage[0]}
                                />
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
export default ModalPackage