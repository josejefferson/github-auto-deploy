import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

export default function LogsModal({ log, setLog }: { log: string; setLog: (log: string) => any }) {
  return (
    <>
      <Modal isOpen={!!log} onClose={() => setLog('')}>
        <ModalOverlay />
        <ModalContent>
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
