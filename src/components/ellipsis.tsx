import { useEffect, useState } from 'react'

export default function Ellipsis() {
  const [qtd, setQtd] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setQtd((qtd) => {
        if (qtd >= 3) return 0
        return qtd + 1
      })
    }, 300)
    return () => clearInterval(timer)
  }, [])
  return <>{'.'.repeat(qtd)}</>
}
