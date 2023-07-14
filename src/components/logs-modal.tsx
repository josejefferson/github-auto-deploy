import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

export default function LogsModal({
  log,
  open,
  onClose
}: {
  log: string
  open: boolean
  onClose: () => any
}) {
  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="full" maxW="6xl">
          <ModalHeader>Visualizador de logs</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} overflow="auto">
            <pre>{log}</pre>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
