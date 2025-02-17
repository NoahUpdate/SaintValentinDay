import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [btnkamen, setBtnkamen] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [saludar, setSaludar] = useState(false)
  const [position, setPosition] = useState({ top: '0%', left: '0%' })
  const [showFlower, setShowFlower] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null) // Agrega useRef para el audio

  // Función para generar posiciones aleatorias
  const getRandomPosition = () => {
    const randomTop = Math.random() * 84 + 8 // Genera un número aleatorio entre 8 y 92
    const randomLeft = Math.random() * 72 + 14 // Genera un número aleatorio entre 14 y 86
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` })
  }

  // Mueve la imagen cada 850 milisegundos
  useEffect(() => {
    if (showFlower) {
      const interval = setInterval(getRandomPosition, 750)
      return () => clearInterval(interval) // Limpiar el intervalo cuando el componente se desmonta
    }
  }, [showFlower]) // Solo activa el intervalo cuando showFlower es true

  const manejarBtnKamen = () => {
    setBtnkamen(true)
    setShowFlower(true)
  }

  const manejarSaludo = () => {
    setClicks((prev) => prev + 1)
    if (clicks === 6) {
      setSaludar(true)
      setShowFlower(false)
    }
    audioRef.current?.play()
  }

  return (
    <>
      <div className="z-[3]  p-5 bg-gradient-to-br from-[#f7886f] to-[#f54ea4] h-dvh w-full flex justify-center items-center">
        <div className="border border-amber-100 w-[90%] h-[90%] p-5 flex flex-col justify-evenly items-center">
          {saludar ? (
            <>
              <div className='"w-60 rounded-full h-60 bg-radial from-white to-[#FFE7EB] opacity-75 shadow-lg"'>
                <img
                  src="/images/shinchan-saludo-nf.png"
                  alt="sinchan saludo"
                  className="h-[400px] w-auto mx-auto floating-imagese -translate-y-12 "
                />
              </div>
              <p className="m- font-slave text-3xl text-center ">
                ¡Hola, Ema! Eres más especial que mi juguete favorito y más
                dulce que las chuches. ¡Te quiero más que a Ultrahéroe! ¡Feliz
                San Valentín bbcita! 💖 ¡Brrr!
              </p>
            </>
          ) : (
            <>
              <img
                src={
                  btnkamen
                    ? '/images/shinchan-actionkamen.jpg'
                    : '/images/sinchan1.png'
                }
                alt="sinchan ingreso"
                className="h-[180px] w-auto mx-auto floating-imagese "
              />
              <p className="m-5 font-slave text-4xl text-center">
                Uaaah ya es 15 de Febrero...
              </p>
              <button
                onClick={manejarBtnKamen}
                className="w-[160px] rounded-md px-1.5 py-1 text-center border bg-indigo-600 border-indigo-600 text-white font-mono floating-button"
              >
                {btnkamen
                  ? 'Recoge las flores Shin Chan'
                  : 'Ayudanos Ultrahéroe!!!'}
              </button>{' '}
            </>
          )}
        </div>

        {showFlower && (
          <>
            {/* <audio id="shinchan-audio" src="https://www.myinstants.com/es/instant/uoo-shin-chan-71244/?utm_source=copy&utm_medium=share" preload="auto" /> */}
            <audio
              ref={audioRef}
              src="/audio/uoo-shin-chan.mp3"
              preload="auto"
            />
            <button onClick={manejarSaludo}>
              <img
                src="/images/shinchan-flower.png"
                alt="shinchan-flower"
                className="h-[120px] absolute z-0 cursor-pointer animate-fadeIn"
                style={{
                  top: position.top,
                  left: position.left,
                  transition: 'top 0.5s, left 0.5s', // Agrega una transición suave
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default App
