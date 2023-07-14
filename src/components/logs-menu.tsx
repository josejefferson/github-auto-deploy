import { IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { MdTextSnippet } from 'react-icons/md'
import { IAppState } from '../../server/types'
import LogsModal from './logs-modal'

export function LogsMenu({ logs }: { logs: IAppState['logs'] }) {
  const [openLog, setOpenLog] = useState('')
  return (
    <Menu isLazy>
      <Tooltip label="Logs">
        <MenuButton>
          <IconButton aria-label="Logs" variant="ghost" ml={2} color="inherit">
            <MdTextSnippet size={24} />
          </IconButton>
        </MenuButton>
      </Tooltip>
      <MenuList zIndex="2">
        <MenuItem icon={<MdTextSnippet />} onClick={() => setOpenLog('reset')}>
          Reset logs ({Math.max(0, logs.reset.split('\n').length - 1)})
        </MenuItem>
        <MenuItem icon={<MdTextSnippet />} onClick={() => setOpenLog('clean')}>
          Clean logs ({Math.max(0, logs.clean.split('\n').length - 1)})
        </MenuItem>
        <MenuItem icon={<MdTextSnippet />} onClick={() => setOpenLog('pull')}>
          Pull logs ({Math.max(0, logs.pull.split('\n').length - 1)})
        </MenuItem>
        <MenuItem icon={<MdTextSnippet />} onClick={() => setOpenLog('install')}>
          Install logs ({Math.max(0, logs.install.split('\n').length - 1)})
        </MenuItem>
        <MenuItem icon={<MdTextSnippet />} onClick={() => setOpenLog('build')}>
          Build logs ({Math.max(0, logs.build.split('\n').length - 1)})
        </MenuItem>
      </MenuList>

      <LogsModal open={openLog === 'reset'} log={logs.reset} onClose={() => setOpenLog('')} />
      <LogsModal open={openLog === 'clean'} log={logs.clean} onClose={() => setOpenLog('')} />
      <LogsModal open={openLog === 'pull'} log={logs.pull} onClose={() => setOpenLog('')} />
      <LogsModal open={openLog === 'install'} log={logs.install} onClose={() => setOpenLog('')} />
      <LogsModal open={openLog === 'build'} log={logs.build} onClose={() => setOpenLog('')} />
    </Menu>
  )
}
