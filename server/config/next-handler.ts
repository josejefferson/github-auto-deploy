import next from 'next'
const nextApp = next({ dev: true })
nextApp.prepare().catch(console.error)
const nextHandle = nextApp.getRequestHandler()
export default nextHandle