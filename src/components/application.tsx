import { Box, Card, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdCalendar, IoMdGitBranch } from 'react-icons/io'
import {
  MdAccessTime,
  MdBackup,
  MdCircle,
  MdCleaningServices,
  MdDone,
  MdEdit,
  MdInfo,
  MdInstallDesktop,
  MdOutlineError,
  MdOutlineFileDownload,
  MdOutlineFolder,
  MdOutlineTimelapse,
  MdPlayArrow,
  MdRestore,
  MdSettings,
  MdStop,
  MdUndo
} from 'react-icons/md'
import { IAppState } from '../../server/types'
import Ellipsis from '../components/ellipsis'
import ErrorModal from './error-modal'
import InfoModal from './info-modal'
import { LogsMenu } from './logs-menu'

export const GLOBAL_STATUSES: Record<string, [number, string, string, any, boolean, number]> = {
  stop: [0, 'Parando aplicação', 'blue', MdStop, true, 0],
  backup: [5, 'Fazendo backup', 'blue', MdBackup, true, 0],
  reset: [20, 'Resetando códigos', 'blue', MdCleaningServices, true, 0],
  clean: [23, 'Limpando arquivos extras', 'blue', MdCleaningServices, true, 0],
  pull: [26, 'Baixando versão mais recente', 'blue', MdOutlineFileDownload, true, 0],
  install: [35, 'Instalando dependências', 'blue', MdInstallDesktop, true, 0],
  build: [70, 'Fazendo build', 'blue', MdSettings, true, 0],
  start: [95, 'Iniciando aplicação', 'blue', MdPlayArrow, true, 0],
  undo: [0, 'Desfazendo alterações', 'orange', MdUndo, true, 0],
  error: [100, 'Erro ao fazer deploy', 'red', MdOutlineError, false, 2],
  restored: [100, 'Deploy restaurado', 'orange', MdRestore, false, 2],
  success: [100, 'Deploy finalizado com sucesso', 'green', MdDone, false, 2],
  none: [0, 'Aguardando deployments', 'gray', MdCircle, false, 3],
  queue: [0, 'Em fila', 'gray', MdOutlineTimelapse, false, 1]
}

export default function Application({ app }: { app: IAppState }) {
  const status = app.pendingDeploy && !GLOBAL_STATUSES[app.status][4] ? 'queue' : app.status
  const [progress, text, color, Icon, loading] = GLOBAL_STATUSES[status]
  return (
    <Card
      p={3}
      color={color + '.500'}
      position="relative"
      transition=".3s ease"
      mb={5}
      style={{ clear: 'both' }}
    >
      <Flex gap={3}>
        <Flex align="center" display={['none', 'flex']}>
          <Box p={4} borderColor={color + '.500'} borderWidth={2} borderRadius="full">
            <Icon size={40} />
          </Box>
        </Flex>
        <Box flex="1">
          <Text fontSize="2xl" display="flex" alignItems="center" flexWrap="wrap">
            {app.displayName}
            <IoMdGitBranch style={{ marginLeft: '10px', marginRight: '4px' }} />
            <Text fontWeight={500}>{app.gitBranch}</Text>
          </Text>
          <Text display="flex" alignItems="center">
            <MdOutlineFolder style={{ marginRight: '4px' }} />
            {app.folderAbsolutePath}
          </Text>
          <Text display="flex" alignItems="center" hidden={!app.deployStartTime}>
            <IoMdCalendar style={{ marginRight: '4px' }} />
            {new Date(app.deployStartTime).toLocaleString()}
          </Text>
          <Text display="flex" alignItems="center" hidden={!app.deployTime}>
            <MdAccessTime style={{ marginRight: '4px' }} />
            Tempo: {app.deployTime} segundos
          </Text>
          <Text
            display="flex"
            alignItems="center"
            hidden={status === 'queue' || !app.pendingDeploy}
          >
            <MdOutlineTimelapse style={{ marginRight: '4px' }} />
            Outro deploy em fila
          </Text>
          <Text fontSize="md" fontWeight={200}>
            {text}
            {loading && <Ellipsis />}
          </Text>
        </Box>
        <Flex align="center" direction={['column', 'row']}>
          <ErrorBtn app={app} />
          <LogsMenu logs={app.logs} />
          <Tooltip label="Editar">
            <IconButton aria-label="Editar" variant="ghost" ml={2} color="inherit">
              <MdEdit size={24} />
            </IconButton>
          </Tooltip>
          <Info app={app} />
        </Flex>
      </Flex>
      <Box
        position="absolute"
        left="0"
        top="0"
        bg={color + '.100'}
        opacity={0.3}
        w={progress + '%'}
        h="full"
        zIndex={0}
        pointerEvents="none"
        transition="all .3s ease, width 2s ease"
        borderRadius="var(--card-radius)"
      />
    </Card>
  )
}

export function ErrorBtn({ app }: { app: IAppState }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Tooltip label="Log de erro">
        <IconButton
          aria-label="Log de erro"
          variant="ghost"
          ml={2}
          color="red.500"
          onClick={() => setOpen(true)}
          hidden={!app.deployError}
        >
          <MdOutlineError size={24} />
        </IconButton>
      </Tooltip>
      <ErrorModal app={app} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export function Info({ app }: { app: IAppState }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Tooltip label="Informações">
        <IconButton
          aria-label="Informações"
          variant="ghost"
          ml={2}
          color="inherit"
          onClick={() => setOpen(true)}
        >
          <MdInfo size={24} />
        </IconButton>
      </Tooltip>
      <InfoModal app={app} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
