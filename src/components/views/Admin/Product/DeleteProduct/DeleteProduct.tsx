import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import { useEffect } from "react";
import useDeleteProduct from "./useDeleteProduct";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  refetch: () => void;
  setIdProduct: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeleteProduct = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      productId,
      refetch,
      setIdProduct
    } = props;

    const {
      handleDeleteProduct,
      isPendingDeleteProduct,
      isSuccessDeleteProduct
    } = useDeleteProduct(`${productId}`);

    useEffect(() => {
      if(isSuccessDeleteProduct) {
        onClose();
        setIdProduct(null);
        refetch();
      }
    }, [isSuccessDeleteProduct])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="my-auto">
          <ModalContent>
            <ModalHeader>
              Delete Product
            </ModalHeader>
            <ModalBody>
              Do you sure for delete this product?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose} disabled={isPendingDeleteProduct}>
                Cancel
              </Button>
              <Button color="danger" variant="solid" disabled={isPendingDeleteProduct} onPress={handleDeleteProduct}>
                {isPendingDeleteProduct ? <Spinner color="default" size="sm" /> : "Delete" }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteProduct;