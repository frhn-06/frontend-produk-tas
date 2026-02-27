import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@heroui/react";
import useModalReview from "./useModalReview";
import { Controller } from "react-hook-form";
import InputRating from "@/components/ui/InputRating";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | undefined;
  refetch: () => void;
}

const ModalReview = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      productId,
      refetch
    } = props;

    const {
      handleSubmitReview,
      controleReview,
      errors,
      reset,

      onReview,
      isSuccessReview,
      isPendingReview
    } = useModalReview(`${productId as string}`);

    const session = useSession();

    const handleClose = (close: () => void) => {
      reset();
      close();
    }

    useEffect(() => {
      if(isSuccessReview) {
        onClose();
        refetch();
      };
    }, [isSuccessReview])

    return (
        <Modal isOpen={isOpen} placement="center" onClose={() => handleClose(onClose)}>
          <ModalContent>
            <ModalHeader>
              Add Review
            </ModalHeader>
            <form onSubmit={handleSubmitReview(onReview)}>
              <ModalBody>
                
                <Controller control={controleReview} name="stars" render={({field}) => (
                  <InputRating 
                    {...field}
                    name={field.name}
                    onChange={field.onChange}
                    isInvalid={errors?.stars !== undefined}
                    errorMessage={errors?.stars?.message}
                    isPendingReview={isPendingReview}
                  />
                )} />

                <Controller control={controleReview} name="comment" render={({field}) => (
                  <Textarea {...field} label={(<p className="text-default-700 font-semibold">Comment</p>)} variant="bordered" labelPlacement="outside" isInvalid={errors?.comment !== undefined} errorMessage={errors?.comment?.message} />
                )} />

              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={() => handleClose(onClose)} disabled={isPendingReview}>
                  Cancel
                </Button>
                <Button color="primary" variant="solid" type="submit" disabled={isPendingReview} isDisabled={session.status !== "authenticated"}>
                  {isPendingReview ? (
                    <Spinner size="sm" color="default" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
    )
}

export default ModalReview;