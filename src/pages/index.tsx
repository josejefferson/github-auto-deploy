import { Center, Container, Heading, IconButton, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IState } from '../../server/types'
import Application, { GLOBAL_STATUSES } from '../components/application'
import SSE from '../components/sse'
import { MdRefresh } from 'react-icons/md'
import Head from 'next/head'

export default function Home() {
  const [data, setData] = useState<IState>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()

  const fetchData = () => {
    setLoading(true)
    setError(null)
    axios
      .get('state')
      .then(({ data }) => {
        setData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const apps = data?.apps
    .sort((a, b) => {
      return a.displayName.localeCompare(b.displayName)
    })
    .sort((a, b) => {
      const aStatus = a.pendingDeploy && !GLOBAL_STATUSES[a.status][4] ? 'queue' : a.status
      const bStatus = b.pendingDeploy && !GLOBAL_STATUSES[b.status][4] ? 'queue' : b.status
      return GLOBAL_STATUSES[aStatus][5] - GLOBAL_STATUSES[bStatus][5]
    })

  return (
    <>
      <Head>
        <title>Sistema de deploy automático via GitHub</title>
      </Head>
      <Container maxW="5xl" my={5}>
        <Heading fontWeight={500} mb={5}>
          <IconButton
            aria-label="Atualizar"
            onClick={fetchData}
            variant="ghost"
            float="right"
            ml={3}
          >
            <MdRefresh size={24} />
          </IconButton>
          Sistema de deploy automático via GitHub{' '}
        </Heading>

        {loading && (
          <Center my={10} style={{ clear: 'both' }}>
            <Spinner />
          </Center>
        )}
        {error && <>ERRO: {error?.response?.data?.message || error?.message}</>}
        {!loading && !error && apps?.map((app) => <Application app={app} key={app.id} />)}
        <SSE setData={setData} />
      </Container>
    </>
  )
}
