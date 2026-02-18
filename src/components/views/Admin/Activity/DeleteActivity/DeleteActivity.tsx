import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import React, { useEffect } from "react";
import useDeleteActivity from "./useDeleteActivity";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string | null;
  refetch: () => void;
  setIdActivity: React.Dispatch<React.SetStateAction<string | null>>
}

const DeleteActivity = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      categoryId,
      refetch,
      setIdActivity
    } = props;

    const {
      handleDeleteActivity,
      isPendingDeleteActivity,
      isSuccessDeleteActivity,
    } = useDeleteActivity(`${categoryId}`);

    useEffect(() => {
      if(isSuccessDeleteActivity) {
        onClose();
        setIdActivity(null);
        refetch();
      }
    }, [isSuccessDeleteActivity])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="my-auto">
          <ModalContent>
            <ModalHeader>
              Delete Activity
            </ModalHeader>
            <ModalBody>
              Do you sure for delete this activity?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose} disabled={isPendingDeleteActivity}>
                Cancel
              </Button>
              <Button color="danger" variant="solid" disabled={isPendingDeleteActivity} onPress={handleDeleteActivity}>
                {isPendingDeleteActivity ? <Spinner color="default" size="sm" /> : "Delete" }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteActivity;