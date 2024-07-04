import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import PackageContent from "./PackageContent";

interface PackageModalProps {
  onClose: () => void;
  ModalOpen: boolean;
}

const PackageModal: React.FC<PackageModalProps> = ({ onClose, ModalOpen }) => {
  return (
    <Modal
      placement="top-center"
      size="3xl"
      hideCloseButton={true}
      className="shadow-sm shadow-white"
      isOpen={ModalOpen}
    >
      <ModalContent>
        <ModalHeader className="mt-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
          รายละเอียด Package
        </ModalHeader>
        <ModalBody className="font-NotoSansThai">
          <PackageContent />
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
            onClick={onClose}
          >
            <div className="font-NotoSansThai font-semibold text-lg px-4">
              ตกลง
            </div>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PackageModal;
