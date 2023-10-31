'use client'
import {
  type FC,
  type PropsWithChildren,
  use,
  useEffect,
  useState
} from 'react'

let importAppPromise: Promise<typeof import('@refine/core/app')>
if (typeof window !== 'undefined') {
  importAppPromise = import('@refine/core/app')
} else {
  importAppPromise = Promise.resolve({
    App: () => <></>
  })
}

const NoSsr: FC<PropsWithChildren> = ({
  children
}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      {mounted ? children : null}
    </>
  )
}

export default function Home () {
  const { App } = use(importAppPromise)
  return (
    <main>
      <NoSsr>
        <App className=''/>
      </NoSsr>
    </main>
  )
}