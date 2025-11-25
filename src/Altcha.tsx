import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Importing altcha package will introduce a new element <altcha-widget>
import 'altcha'

interface AltchaProps {
  auto?: AltchaWidgetOptions['auto']
  onStateChange?: (ev: Event | CustomEvent) => void
  style?: AltchaWidgetCSSProperties
  hidefooter?: boolean
  hidelogo?: boolean
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ auto, onStateChange, style , hidefooter, hidelogo}, ref) => {
  const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(null)
  const [value, setValue] = useState<string | null>(null)

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return value
      }
    }
  }, [value])

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        setValue(ev.detail.payload || null)
        onStateChange?.(ev)
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange])

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  */
  return (
    <altcha-widget
      challengeurl="http://localhost:8081/altcha"
      verifyurl="http://localhost:8081/verify"
      ref={widgetRef}
      // style={style}
      debug
      delay={1000}
      hidefooter={hidefooter}
      hidelogo={hidelogo}
      // test
    ></altcha-widget>
  )
})

export default Altcha
