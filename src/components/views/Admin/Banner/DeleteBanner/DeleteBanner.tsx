import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import React, { useEffect } from "react";
import useDeleteBanner from "./useDeleteBanner";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  bannerId: string | null;
  refetch: () => void;
  setIdBanner: React.Dispatch<React.SetStateAction<string | null>>
}

const DeleteBanner = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      bannerId,
      refetch,
      setIdBanner
    } = props;

    const {
      handleDeleteBanner,
      isPendingDeleteBanner,
      isSuccessDeleteBanner,
    } = useDeleteBanner(`${bannerId}`);

    useEffect(() => {
      if(isSuccessDeleteBanner) {
        onClose();
        setIdBanner(null);
        refetch();
      }
    }, [isSuccessDeleteBanner])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="my-auto">
          <ModalContent>
            <ModalHeader>
              Delete Banner
            </ModalHeader>
            <ModalBody>
              Do you sure for delete this banner?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose} disabled={isPendingDeleteBanner}>
                Cancel
              </Button>
              <Button color="danger" variant="solid" disabled={isPendingDeleteBanner} onPress={handleDeleteBanner}>
                {isPendingDeleteBanner ? <Spinner color="default" size="sm" /> : "Delete" }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteBanner;