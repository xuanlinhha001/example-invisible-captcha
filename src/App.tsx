import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Altcha from './Altcha'
import './App.css'

function App() {
  const altchaRef = useRef<HTMLInputElement>(null)
  const [altchaVerifying, setAltchaVerifying] = useState<boolean>(false)
  const [altchaVisible, setAltchaVisible] = useState<boolean>(false)
  const [altchaToken, setAltchaToken] = useState<string>("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Altcha payload:', altchaRef.current?.value)
    alert('Form submitted!')
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <form action="#" method='post' className='form' onSubmit={handleSubmit}>
        <fieldset>
          <label>Name:</label>
          <input type="text" name="name" />
        </fieldset>

        <fieldset>
          <label>Message:</label>
          <textarea name="message"></textarea>
        </fieldset>

        <fieldset>
          <Altcha
            auto="onload"
            style={{
              '--altcha-max-width': '100%',
              '--altcha-color-base': '#242424',
              'display': altchaVisible ? 'block' : 'none',
            }}
            onStateChange={(ev) => {
              if ('detail' in ev) {
                // Toggle indicator
                setAltchaVerifying(ev.detail.state === 'verifying')

                if (ev.detail.state === 'code') {
                  // If a code challenge is requested, show the widget
                  setAltchaVisible(true)
                }

                if (ev.detail.state === 'unverified') {
                  // Verification failed, show the widget or alert the user
                  setAltchaVisible(true)
                }

                if (ev.detail.state === 'verified') {
                  console.log("Altcha Token", ev.detail.payload)
                  setAltchaToken(ev.detail.payload)
                }
              }
            }}
          />
        </fieldset>

        <button
          type="submit"
          disabled={altchaVerifying}
        >
          {altchaVerifying ? <span>Verifying...</span> : <span>Submit</span>}
        </button>
      </form>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
