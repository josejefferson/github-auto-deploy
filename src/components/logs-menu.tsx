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
        <MenuButton
          hidden={!logs.reset && !logs.clean && !logs.pull && !logs.install && !logs.build}
        >
          <IconButton aria-label="Logs" variant="ghost" ml={2} color="inherit">
            <MdTextSnippet size={24} />
          </IconButton>
        </MenuButton>
      </Tooltip>
      <MenuList zIndex="2">
        <MenuItem
          hidden={!logs.reset}
          icon={<MdTextSnippet />}
          onClick={() => setOpenLog(logs.reset)}
        >
          Reset logs
        </MenuItem>
        <MenuItem
          hidden={!logs.clean}
          icon={<MdTextSnippet />}
          onClick={() => setOpenLog(logs.clean)}
        >
          Clean logs
        </MenuItem>
        <MenuItem
          hidden={!logs.pull}
          icon={<MdTextSnippet />}
          onClick={() => setOpenLog(logs.pull)}
        >
          Pull logs
        </MenuItem>
        <MenuItem
          hidden={!logs.install}
          icon={<MdTextSnippet />}
          onClick={() => setOpenLog(logs.install)}
        >
          Install logs
        </MenuItem>
        <MenuItem
          hidden={!logs.build}
          icon={<MdTextSnippet />}
          onClick={() => setOpenLog(logs.build)}
        >
          Build logs
        </MenuItem>
      </MenuList>

      <LogsModal log={openLog} setLog={setOpenLog} />
    </Menu>
  )
}
