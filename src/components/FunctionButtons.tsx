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
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
      };
    };
  }
}

export function FunctionButtons() {
  const [text, setText] = useState('')

  useEffect(() => {
    // Initialize Telegram WebApp
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  // Load saved text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem('savedText')
    if (savedText) {
      setText(savedText)
    }
  }, [])

  const handleButtonClick = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      // Get location for F1
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setText(`Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
          },
          (error) => {
            setText(`Error getting location: ${error.message}`)
          }
        )
      } else {
        setText('Geolocation is not supported by this browser')
      }
    } else if (buttonNumber === 2) {
      // Get user name from Telegram WebApp
      const user = window.Telegram?.WebApp?.initDataUnsafe?.user
      if (user) {
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ')
        const displayName = user.username 
          ? `${fullName} (@${user.username})`
          : fullName
        setText(`User: ${displayName}`)
      } else {
        setText('User information not available')
      }
    } else if (buttonNumber === 3) {
      // Save to local storage
      localStorage.setItem('savedText', text)
      setText('Text saved to local storage')
    } else if (buttonNumber === 4) {
      // Load from local storage
      const savedText = localStorage.getItem('savedText')
      if (savedText) {
        setText(savedText)
      } else {
        setText('No saved text found in local storage')
      }
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
        <button onClick={() => handleButtonClick(1)}>Get Location</button>
        <button onClick={() => handleButtonClick(2)}>Get User</button>
        <button onClick={() => handleButtonClick(3)}>Save to Local</button>
        <button onClick={() => handleButtonClick(4)}>Load from Local</button>
      </div>
    </div>
  )
} 