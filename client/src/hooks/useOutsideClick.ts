import { type LegacyRef, useCallback, useEffect } from 'react'

type Callback = (target: HTMLElement) => void

export const useOutsideClick = (
  ref: LegacyRef<HTMLElement>,
  cb: Callback
) => {
  const handleClickOutside = useCallback((event: Event) => {
    // @ts-expect-error
    if (ref.current && !ref.current.contains(event.target)) {
      cb(event.target as HTMLElement)
    }
  }, [cb, ref])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => { document.removeEventListener('mousedown', handleClickOutside) }
  }, [handleClickOutside])
}
