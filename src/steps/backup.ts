import variables from '../config/variables'
import { run } from '../helpers/helpers'
import path from 'path'
import { mkdirp } from 'fs-extra'
import rimraf from 'rimraf'
import fs from 'fs'

const MAX_BACKUPS = 10

/**
 * Faz um backup do servidor
 * @param broken Servidor está com problemas?
 */
export async function backupServer(broken = false) {
  console.log(`[INFO] Fazendo backup do servidor${broken ? ' com problemas' : ''}`)

  const backupFolderName = path.basename(variables.pathName) + '-backups'
  const backupFolder = path.join(variables.pathName, '..', backupFolderName)
  const backupFileName = `backup${broken ? '-broken' : ''}-${new Date().toISOString()}.tar.gz`
  const backupFile = path.join(backupFolder, backupFileName)
  await mkdirp(backupFolder) // Cria a pasta dos backups se não existe

  // Faz o backup
  const { error } = await run(`tar -czf "${backupFile}" .`)
  if (error) throw error

  console.log('[SUCCESS] Backup concluído')

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

  console.log('[INFO] Restaurando backup')

  const backups = await listBackups()
  if (!backups.length) throw new Error('Não há backups para restaurar')

  console.log('[INFO] Apagando servidor')
  await new Promise<void>((resolve, reject) => {
    rimraf(variables.pathName, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })

  console.log('[INFO] Extraindo backup')
  const backupFolderName = path.basename(variables.pathName) + '-backups'
  const backupFolder = path.join(variables.pathName, '..', backupFolderName)
  const backupFileName = backups[backups.length - 1]
  const backupFile = path.join(backupFolder, backupFileName)

  const { error } = await run(`tar -xf "${backupFile}" -C "${variables.pathName}"`)
  if (error) throw error

  console.log('[SUCCESS] Backup restaurado com sucesso')
}

/**
 * Lista os arquivos de backup
 */
async function listBackups() {
  const files = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(variables.pathName, (err, files) => {
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

  const backupFolderName = path.basename(variables.pathName) + '-backups'
  const backupFolder = path.join(variables.pathName, '..', backupFolderName)
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
