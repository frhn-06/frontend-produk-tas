import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  setSyaratLogin: (syaratLogin: {isOpen: boolean; type: string}) => void;
  type: string;
}

const SyaratLogin = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      setSyaratLogin,
      type
    } = props;

    const handleClose = (set: (syaratLogin: {isOpen: boolean; type: string}) => void, onClose: () => void) => {
      set({
        isOpen: false,
        type: ""
      });
      onClose();
    }

    return (

        <Modal isOpen={isOpen} onClose={() => handleClose(setSyaratLogin, onClose)} placement="center">
          <ModalContent>
            <ModalHeader>
              Masuk atau daftar akun
            </ModalHeader>
            <ModalBody>
              Kamu harus login atau registrasi akun terlebih dahulu untuk melakukan {type}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={() => handleClose(setSyaratLogin, onClose)}>
                Cancel
              </Button>
              <Button color="primary" variant="solid" as={Link} href="/auth/login">
                Login
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default SyaratLogin