import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import { useEffect } from "react";
import useRestoreProduct from "./useRestoreProduct";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  refetch: () => void;
  setIdProduct: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModalRestoreProduct = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      productId,
      refetch,
      setIdProduct
    } = props;

    const {
        isPendingRestore,
        isSuccessRestore,
        handleRestore
    } = useRestoreProduct(`${productId}`);

    useEffect(() => {
      if(isSuccessRestore) {
        onClose();
        setIdProduct(null);
        refetch();
      }
    }, [isSuccessRestore])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="my-auto">
          <ModalContent>
            <ModalHeader>
              Restore Product
            </ModalHeader>
            <ModalBody>
              Do you sure for restore this product?
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="flat" onPress={onClose} disabled={isPendingRestore}>
                Cancel
              </Button>
              <Button color="primary" variant="solid" disabled={isPendingRestore} onPress={handleRestore}>
                {isPendingRestore ? <Spinner color="default" size="sm" /> : "Restore" }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default ModalRestoreProduct;