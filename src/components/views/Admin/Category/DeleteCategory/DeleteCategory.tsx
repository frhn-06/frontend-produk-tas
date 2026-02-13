import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import useDeleteCategory from "./useDeleteCategory";
import React, { useEffect } from "react";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string | null;
  refetch: () => void;
  setIdCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const DeleteCategory = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      categoryId,
      refetch,
      setIdCategory
    } = props;

    const {
      handleDeleteCategory,
      isPendingDeleteCategory,
      isSuccessDeleteCategory,
    } = useDeleteCategory(`${categoryId}`);

    useEffect(() => {
      if(isSuccessDeleteCategory) {
        onClose();
        setIdCategory(null);
        refetch();
      }
    }, [isSuccessDeleteCategory])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="my-auto">
          <ModalContent>
            <ModalHeader>
              Delete Category
            </ModalHeader>
            <ModalBody>
              Do you sure for delete this category?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose} disabled={isPendingDeleteCategory}>
                Cancel
              </Button>
              <Button color="danger" variant="solid" disabled={isPendingDeleteCategory} onPress={handleDeleteCategory}>
                {isPendingDeleteCategory ? <Spinner color="default" size="sm" /> : "Delete" }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteCategory;