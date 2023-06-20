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

export default function InfoModal({
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
          <ModalHeader>Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} overflow="auto">
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Nome
            </Text>
            <Text fontWeight={400}>{app.displayName}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              ID
            </Text>
            <Text fontWeight={400}>{app.id}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Git Branch
            </Text>
            <Text fontWeight={400}>{app.gitBranch}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Diretório
            </Text>
            <Text fontWeight={400}>{app.folderAbsolutePath}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Diretório de backups
            </Text>
            <Text fontWeight={400}>{app.backupAbsolutePath}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Nome do serviço do systemd
            </Text>
            <Text fontWeight={400}>{app.systemdServiceName}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Desfazer deploy quando falhar
            </Text>
            <Text fontWeight={400}>{app.undoWhenFailed ? 'Sim' : 'Não'}</Text>
            <Text fontSize="lg" fontWeight={700} mt={2}>
              Comandos
            </Text>
            <Text>
              <b>Parar aplicação:</b> {app.stopCommand}
            </Text>
            <Text>
              <b>Iniciar aplicação:</b> {app.startCommand}
            </Text>
            <Text>
              <b>Resetar repositório:</b> {app.resetCommand}
            </Text>
            <Text>
              <b>Limpar arquivos:</b> {app.cleanCommand}
            </Text>
            <Text>
              <b>Baixar atualizações:</b> {app.pullCommand}
            </Text>
            <Text>
              <b>Instalar dependências:</b> {app.installCommand}
            </Text>
            <Text>
              <b>Fazer o build:</b> {app.buildCommand}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
