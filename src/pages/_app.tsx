import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { EventSourceProvider } from 'react-sse-hooks'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <EventSourceProvider eventSource={global.EventSource || (class {} as any)}>
        <Component {...pageProps} />
      </EventSourceProvider>
    </ChakraProvider>
  )
}
