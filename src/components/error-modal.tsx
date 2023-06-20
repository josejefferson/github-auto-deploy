import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { IAppState } from '../../server/types'

export default function ErrorModal({
  app,
  open,
  onClose
}: {
  app: IAppState
  open: boolean
  onClose: () => any
}) {
  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log de erro</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} overflow="auto">
            <pre>{app.deployError}</pre>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
