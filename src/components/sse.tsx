import { Dispatch, SetStateAction } from 'react'
import { useEventSource, useEventSourceListener } from 'react-sse-hooks'
import { IState } from '../../server/types'

export default function SSE({
  setData
}: {
  setData: Dispatch<SetStateAction<IState | undefined>>
}) {
  const update = ({ data: rawData }: any) => {
    const { id, data: keys } = rawData as { id: string; data: [string, any][] }
    for (const key of keys) {
      const [keyName, value] = key
      setData((data) => {
        if (!data) return data
        const apps = data.apps.map((app: any) => {
          if (app?.id !== id) return app
          if (keyName.startsWith('logs.')) {
            app.logs[keyName.slice(5)] = value
            app.logs = { ...app.logs }
          } else {
            app[keyName] = value
          }
          return { ...app }
        })
        return { ...data, apps: [...apps] }
      })
    }
  }

  const source = useEventSource({
    source: 'realtime',
    options: {
      withCredentials: true
    }
  })

  useEventSourceListener<any>(
    {
      source: source,
      startOnInit: true,
      event: {
        name: 'update',
        listener: update
      }
    },
    [source]
  )

  return null
}
