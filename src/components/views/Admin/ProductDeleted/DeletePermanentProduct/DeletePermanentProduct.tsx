import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import { useEffect } from "react";
import useDeletePermanentProduct from "./useDeletePermanentProduct";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  refetch: () => void;
  setIdProduct: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModalDeletePermanentProduct = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      productId,
      refetch,
      setIdProduct
    } = props;

    const {
        isPendingDeletePermanent,
        isSuccessDeletePermanent,
        handleDeletePermanent
    } = useDeletePermanentProduct(`${productId}`);

    useEffect(() => {
      if(isSuccessDeletePermanent) {
        onClose();
        setIdProduct(null);
        refetch();
      }
    }, [isSuccessDeletePermanent])

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
              <Button color="warning" variant="flat" onPress={onClose} disabled={isPendingDeletePermanent}>
                Cancel
              </Button>
              <Button color="danger" variant="solid" disabled={isPendingDeletePermanent} onPress={handleDeletePermanent}>
                {isPendingDeletePermanent ? <Spinner color="default" size="sm" /> : "Restore" }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default ModalDeletePermanentProduct;