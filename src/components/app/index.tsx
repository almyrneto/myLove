import random from 'random'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMouseMove(e: { clientX: number; clientY: number }) {
      const button = document.getElementById('button-1') as HTMLElement
      if (
        Math.abs(e.clientX - button.getBoundingClientRect().x) < 50 &&
        Math.abs(e.clientY - button.getBoundingClientRect().y) < 40
      ) {
        const x = random.int(0, window.innerWidth - button.offsetWidth)
        const y = random.int(0, window.innerHeight - button.offsetHeight)
        setButtonPosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  function accepted() {
    toast.success('Não tem mais pra onde fugir, agora estamos namorando <3', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    })
  }

  function denied() {
    const button = document.getElementById('button-1') as HTMLElement
    button.remove()
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <canvas width={1920} height={1000} style={{ background: '#ffc8dd', border: 'ridge' }}></canvas>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}
      >
        <h1 style={{ color: '#590d22', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Quer namorar comigo?
        </h1>
        <br />
        <button
          id="button-1"
          style={{
            background: '#ffb3c1',
            border: 'ridge',
            fontSize: '18px',
            fontWeight: 'bold',
            position: 'absolute',
            left: buttonPosition.x + 'px',
            top: buttonPosition.y + 'px'
          }}
          onClick={denied}
        >
          Não
        </button>
        <button
          style={{
            background: '#90ee90',
            border: 'ridge',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '20px'
          }}
          onClick={accepted}
        >
          Aceitar
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}
