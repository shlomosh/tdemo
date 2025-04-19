import { useState, useEffect } from 'react'
import '../App.css'

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
            is_bot: boolean;
            is_premium: boolean;
          };
        };
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          enable: () => void;
          disable: () => void;
        };
      };
    };
  }
}

export function FunctionButtons() {
  const [text, setText] = useState('')
  const [isTelegramAvailable, setIsTelegramAvailable] = useState(false)

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (window.Telegram?.WebApp) {
      setIsTelegramAvailable(true)
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()

      // Setup MainButton
      const mainButton = window.Telegram.WebApp.MainButton
      mainButton.setText('Save')
      mainButton.onClick(() => {
        localStorage.setItem('savedText', text)
        setText('Text saved to local storage')
      })
      mainButton.show()
    } else {
      setText('Telegram WebApp is not available. Running in mock mode.')
    }

    // Cleanup
    return () => {
      if (window.Telegram?.WebApp?.MainButton) {
        window.Telegram.WebApp.MainButton.offClick(() => {})
        window.Telegram.WebApp.MainButton.hide()
      }
    }
  }, [])

  // Load saved text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem('savedText')
    if (savedText) {
      setText(savedText)
    }
  }, [])

  const handleGeoButton = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setText(`Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}`)
        },
        (error) => {
          setText(`Error getting location: ${error.message}`)
        }
      )
    } else {
      setText('Geolocation is not supported by this browser')
    }
  }

  const handleUserButton = () => {
    if (isTelegramAvailable) {
      const user = window.Telegram?.WebApp?.initDataUnsafe?.user
      if (user) {
        setText(`Name: ${user.first_name} ${user.last_name}\nUsername: ${user.username}\nId: ${user.id}\nIsBot: ${user.is_bot}\nIsPremium: ${user.is_premium}`)
      } else {
        setText('User information not available')
      }
    } else {
      setText('Telegram WebApp is not available')
    }
  }

  const handleSaveButton = () => {
    localStorage.setItem('savedText', text)
  }

  const handleLoadButton = () => {
    const savedText = localStorage.getItem('savedText')
    if (savedText) {
      setText(savedText)
    } else {
      setText('')
    }
  }

  return (
    <div className="app-container">
      <div className="text-area-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Click a function button or type your message here..."
        />
      </div>
      <div className="button-container">
        <button onClick={handleGeoButton}>Geo</button>
        <button onClick={handleUserButton}>User</button>
        <button onClick={handleSaveButton}>Save</button>
        <button onClick={handleLoadButton}>Load</button>
      </div>
    </div>
  )
} 