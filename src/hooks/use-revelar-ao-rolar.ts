import { useEffect, useRef, useState } from 'react'

export function useRevelarAoRolar<T extends Element>(margem = '0px 0px -15% 0px') {
  const ref = useRef<T>(null)
  const [revelado, setRevelado] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    const semObservador = !('IntersectionObserver' in window)
    const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!elemento || semObservador || prefereMenosMovimento) {
      setRevelado(true)
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setRevelado(true)
          observador.disconnect()
        }
      },
      { rootMargin: margem },
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [margem])

  return { ref, revelado }
}
