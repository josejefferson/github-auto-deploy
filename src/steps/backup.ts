import fs from 'fs'
import { mkdirp } from 'fs-extra'
import path from 'path'
import rimraf from 'rimraf'
import variables from '../config/variables'
import { log, run } from '../helpers/helpers'

const MAX_BACKUPS = 10

/**
 * Faz um backup do servidor
 * @param broken Servidor está com problemas?
 */
export async function backupServer(broken = false) {
  log('INFO', `Fazendo backup do servidor${broken ? ' com problemas' : ''}`)

  const backupFolderName = path.basename(variables.folderPath) + '-backups'
  const backupFolder = path.join(variables.folderPath, '..', backupFolderName)
  const backupFileName = `backup${broken ? '-broken' : ''}-${new Date().toISOString()}.tar.gz`
  const backupFile = path.join(backupFolder, backupFileName)
  await mkdirp(backupFolder) // Cria a pasta dos backups se não existe

  // Faz o backup
  const { error } = await run(`tar -czf "${backupFile}" .`)
  if (error) throw error

  log('SUCCESS', 'Backup concluído')

  // Remove backups antigos
  removeOldBackups()
}

/**
 * Faz um backup do servidor com problemas
 */
export async function backupFailedServer() {
  return backupServer(true)
}

/**
 * Restaura um backup
 */
export async function restoreLastBackup() {
  await backupFailedServer()

  log('INFO', 'Restaurando último backup funcionando')

  const backups = await listBackups()
  if (!backups.length) throw new Error('Não há backups para restaurar')

  log('INFO', 'Apagando servidor')
  await new Promise<void>((resolve, reject) => {
    rimraf(variables.folderPath, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })

  log('INFO', 'Extraindo backup')
  const backupFolderName = path.basename(variables.folderPath) + '-backups'
  const backupFolder = path.join(variables.folderPath, '..', backupFolderName)
  const backupFileName = backups[backups.length - 1]
  const backupFile = path.join(backupFolder, backupFileName)
  await mkdirp(variables.folderPath) // Cria a pasta do servidor, caso não exista

  log('INFO', `Restaurando backup "${backupFileName}"`)
  const { error } = await run(`tar -xf "${backupFile}" -C "${variables.folderPath}"`)
  if (error) throw error

  log('SUCCESS', 'Backup restaurado com sucesso')
}

/**
 * Lista os arquivos de backup
 */
async function listBackups() {
  const backupFolderName = path.basename(variables.folderPath) + '-backups'
  const backupFolder = path.join(variables.folderPath, '..', backupFolderName)

  const files = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(backupFolder, (err, files) => {
      if (err) return reject(err)
      resolve(files)
    })
  })

  const backups = files
    .filter((file) => {
      return (
        file.startsWith('backup-') && !file.startsWith('backup-broken-') && file.endsWith('.tar.gz')
      )
    })
    .sort()

  return backups
}

/**
 * Remove backups antigos
 */
async function removeOldBackups() {
  if (!isFinite(MAX_BACKUPS)) return

  const backupFolderName = path.basename(variables.folderPath) + '-backups'
  const backupFolder = path.join(variables.folderPath, '..', backupFolderName)
  const backups = await listBackups()

  if (backups.length > MAX_BACKUPS) {
    const overflow = backups.length - MAX_BACKUPS // Backups em excesso
    const backupFileNamesToDelete = backups.slice(0, overflow) // Nomes dos arquivos para apagar
    const pathsToDelete = backupFileNamesToDelete.map((fileName) => {
      return path.join(backupFolder, fileName)
    })

    // Apaga os backups antigos
    for (const pathName of pathsToDelete) {
      fs.rm(pathName, (err) => {
        if (err) console.error(err)
      })
    }
  }
}
