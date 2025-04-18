/**
 * Mock Telegram WebApp API
 * Compatible with https://telegram.org/js/telegram-web-app.js
 * For testing Telegram Mini Apps locally
 */

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe: {
    query_id?: string;
    user?: {
      first_name: string;
      last_name?: string;
      username?: string;
    };
    auth_date?: number;
    hash?: string;
  };
  initData: string;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  _callbacks: {
    [key: string]: ((data: any) => void)[];
    viewportChanged: ((data: any) => void)[];
    themeChanged: ((data: any) => void)[];
    mainButtonClicked: ((data: any) => void)[];
    backButtonClicked: ((data: any) => void)[];
    settingsButtonClicked: ((data: any) => void)[];
    invoiceClosed: ((data: any) => void)[];
    popupClosed: ((data: any) => void)[];
    qrTextReceived: ((data: any) => void)[];
    clipboardTextReceived: ((data: any) => void)[];
  };
  LocationManager: {
    requestLocation: () => Promise<{
      latitude: number;
      longitude: number;
      provider: string;
      accuracy: number;
      timestamp: number;
    }>;
  };
  MainButton: {
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    text: string;
    color: string;
    textColor: string;
    setText: (text: string) => TelegramWebApp['MainButton'];
    onClick: (callback: () => void) => TelegramWebApp['MainButton'];
    offClick: (callback: () => void) => TelegramWebApp['MainButton'];
    show: () => TelegramWebApp['MainButton'];
    hide: () => TelegramWebApp['MainButton'];
    enable: () => TelegramWebApp['MainButton'];
    disable: () => TelegramWebApp['MainButton'];
    showProgress: (leaveActive?: boolean) => TelegramWebApp['MainButton'];
    hideProgress: () => TelegramWebApp['MainButton'];
    setParams: (params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }) => TelegramWebApp['MainButton'];
  };
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => TelegramWebApp['BackButton'];
    offClick: (callback: () => void) => TelegramWebApp['BackButton'];
    show: () => TelegramWebApp['BackButton'];
    hide: () => TelegramWebApp['BackButton'];
  };
  SettingsButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => TelegramWebApp['SettingsButton'];
    offClick: (callback: () => void) => TelegramWebApp['SettingsButton'];
    show: () => TelegramWebApp['SettingsButton'];
    hide: () => TelegramWebApp['SettingsButton'];
  };
  HapticFeedback: {
    impactOccurred: (style: string) => void;
    notificationOccurred: (type: string) => void;
    selectionChanged: () => void;
  };
  CloudStorage: {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    getItems: (keys: string[]) => Promise<Record<string, string | null>>;
    removeItem: (key: string) => Promise<void>;
    removeItems: (keys: string[]) => Promise<void>;
    getKeys: () => Promise<string[]>;
  };
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  showPopup: (params: { title: string; message: string; buttons?: Array<{ id: string; text: string }> }) => Promise<{ button_id: string | null }>;
  showAlert: (message: string) => Promise<void>;
  showConfirm: (message: string) => Promise<boolean>;
  openLink: (url: string) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback?: (data: { url: string; status: string }) => void) => void;
  showScanQrPopup: (params: { text?: string }) => Promise<void>;
  closeScanQrPopup: () => void;
  readTextFromClipboard: (callback: (text: string) => void) => void;
  requestWriteAccess: () => Promise<boolean>;
  requestContact: () => Promise<boolean>;
  sendData: (data: string) => void;
  switchInlineQuery: (query: string, choose_chat_types?: string[]) => void;
  onEvent: (eventType: string, callback: (data: any) => void) => TelegramWebApp;
  offEvent: (eventType: string, callback: (data: any) => void) => TelegramWebApp;
  triggerEvent: (eventType: string, eventData: any) => void;
  close: () => void;
  enableClosingConfirmation: () => void;
}

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

(function() {
  // Create global window.Telegram.WebApp object
  if (!window.Telegram) {
    window.Telegram = { WebApp: {} as TelegramWebApp };
  }

  // Mock user data
  const mockUserData = {
    id: 123456789,
    first_name: "Test",
    last_name: "User",
    username: "testuser",
    language_code: "en",
    is_premium: false
  };
  
  // Mock init data - can be customized as needed
  const mockInitData = "query_id=AAHdF6IAAAAA13dpfO4iT-hs&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1698154157&hash=d8201a81fabdab577914f65f9f35a4a38c5261cc80a7f0490972e47c5dcd1934";

  // Theme parameters
  const mockThemeParams = {
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    link_color: "#2481cc",
    button_color: "#31a6f7",
    button_text_color: "#ffffff",
    secondary_bg_color: "#f1f1f1"
  };

  // Main WebApp object
  const WebApp: TelegramWebApp = {
    // Properties
    version: "6.9",
    platform: "web",

    initData: mockInitData,    
    initDataUnsafe: {
      query_id: "AAHdF6IAAAAA13dpfO4iT-hs",
      user: mockUserData,
      auth_date: Math.floor(Date.now() / 1000),
      hash: "d8201a81fabdab577914f65f9f35a4a38c5261cc80a7f0490972e47c5dcd1934"
    },
    
    colorScheme: "light",
    themeParams: mockThemeParams,
    
    headerColor: "#ffffff",
    backgroundColor: "#ffffff",
    
    viewportHeight: window.innerHeight,
    viewportStableHeight: window.innerHeight,
    
    // LocationManager for handling location-related functionality
    LocationManager: {
      requestLocation: function() {
        return new Promise((resolve) => {
          console.log('Location requested');
          // Check if geolocation is supported by the browser
          if (navigator.geolocation) {
            // Try to get the actual location if available
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  provider: 'browser',
                  accuracy: position.coords.accuracy,
                  timestamp: position.timestamp
                };
                console.log('Location obtained:', location);
                resolve(location);
              },
              () => {
                // Fall back to mock location
                const mockLocation = {
                  latitude: 37.7749,  // Default: San Francisco
                  longitude: -122.4194,
                  provider: 'mock',
                  accuracy: 100,
                  timestamp: Date.now()
                };
                console.log('Using mock location:', mockLocation);
                resolve(mockLocation);
              }
            );
          } else {
            // No geolocation support, use mock data
            const mockLocation = {
              latitude: 37.7749,  // Default: San Francisco
              longitude: -122.4194,
              provider: 'mock',
              accuracy: 100,
              timestamp: Date.now()
            };
            console.log('Geolocation not supported, using mock location:', mockLocation);
            resolve(mockLocation);
          }
        });
      }
    },

    // Main Button
    MainButton: {
      isVisible: false,
      isActive: true,
      isProgressVisible: false,
      text: "CONTINUE",
      color: "#31a6f7",
      textColor: "#ffffff",
      
      setText: function(text: string) {
        this.text = text;
        console.log("MainButton text set to:", text);
        return this;
      },
      
      onClick: function(callback: () => void) {
        WebApp._callbacks.mainButtonClicked.push(callback);
        return this;
      },
      
      offClick: function(callback: () => void) {
        const index = WebApp._callbacks.mainButtonClicked.indexOf(callback);
        if (index !== -1) {
          WebApp._callbacks.mainButtonClicked.splice(index, 1);
        }
        return this;
      },
      
      show: function() {
        this.isVisible = true;
        console.log("MainButton shown");
        return this;
      },
      
      hide: function() {
        this.isVisible = false;
        console.log("MainButton hidden");
        return this;
      },
      
      enable: function() {
        this.isActive = true;
        return this;
      },
      
      disable: function() {
        this.isActive = false;
        return this;
      },
      
      showProgress: function(leaveActive = false) {
        this.isProgressVisible = true;
        if (!leaveActive) {
          this.isActive = false;
        }
        return this;
      },
      
      hideProgress: function() {
        this.isProgressVisible = false;
        return this;
      },
      
      setParams: function(params: {
        text?: string;
        color?: string;
        text_color?: string;
        is_active?: boolean;
        is_visible?: boolean;
      }) {
        if (params.text) this.text = params.text;
        if (params.color) this.color = params.color;
        if (params.text_color) this.textColor = params.text_color;
        if (params.is_active !== undefined) this.isActive = params.is_active;
        if (params.is_visible !== undefined) this.isVisible = params.is_visible;
        return this;
      }
    },

    // Back Button
    BackButton: {
      isVisible: false,
      
      onClick: function(callback: () => void) {
        WebApp._callbacks.backButtonClicked.push(callback);
        return this;
      },
      
      offClick: function(callback: () => void) {
        const index = WebApp._callbacks.backButtonClicked.indexOf(callback);
        if (index !== -1) {
          WebApp._callbacks.backButtonClicked.splice(index, 1);
        }
        return this;
      },
      
      show: function() {
        this.isVisible = true;
        console.log("BackButton shown");
        return this;
      },
      
      hide: function() {
        this.isVisible = false;
        console.log("BackButton hidden");
        return this;
      }
    },

    // Settings Button
    SettingsButton: {
      isVisible: false,
      
      onClick: function(callback: () => void) {
        WebApp._callbacks.settingsButtonClicked.push(callback);
        return this;
      },
      
      offClick: function(callback: () => void) {
        const index = WebApp._callbacks.settingsButtonClicked.indexOf(callback);
        if (index !== -1) {
          WebApp._callbacks.settingsButtonClicked.splice(index, 1);
        }
        return this;
      },
      
      show: function() {
        this.isVisible = true;
        console.log("SettingsButton shown");
        return this;
      },
      
      hide: function() {
        this.isVisible = false;
        console.log("SettingsButton hidden");
        return this;
      }
    },

    // HapticFeedback
    HapticFeedback: {
      impactOccurred: function(style: string) {
        console.log("Haptic impact:", style);
      },
      
      notificationOccurred: function(type: string) {
        console.log("Haptic notification:", type);
      },
      
      selectionChanged: function() {
        console.log("Haptic selection changed");
      }
    },

    // Cloud Storage
    CloudStorage: {
      setItem: function(key: string, value: string) {
        return new Promise<void>((resolve) => {
          localStorage.setItem(`tg_storage_${key}`, value);
          console.log(`CloudStorage: Set item ${key} = ${value}`);
          resolve();
        });
      },
      
      getItem: function(key: string) {
        return new Promise<string | null>((resolve) => {
          const value = localStorage.getItem(`tg_storage_${key}`);
          console.log(`CloudStorage: Get item ${key} = ${value}`);
          resolve(value);
        });
      },
      
      getItems: function(keys: string[]) {
        return new Promise<Record<string, string | null>>((resolve) => {
          const result: Record<string, string | null> = {};
          keys.forEach(key => {
            result[key] = localStorage.getItem(`tg_storage_${key}`);
          });
          console.log("CloudStorage: Get items", result);
          resolve(result);
        });
      },
      
      removeItem: function(key: string) {
        return new Promise<void>((resolve) => {
          localStorage.removeItem(`tg_storage_${key}`);
          console.log(`CloudStorage: Removed item ${key}`);
          resolve();
        });
      },
      
      removeItems: function(keys: string[]) {
        return new Promise<void>((resolve) => {
          keys.forEach(key => {
            localStorage.removeItem(`tg_storage_${key}`);
          });
          console.log(`CloudStorage: Removed items`, keys);
          resolve();
        });
      },
      
      getKeys: function() {
        return new Promise<string[]>((resolve) => {
          const keys: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('tg_storage_')) {
              keys.push(key.substring(11)); // Remove 'tg_storage_' prefix
            }
          }
          console.log("CloudStorage: Get keys", keys);
          resolve(keys);
        });
      }
    },

    // Methods
    ready: function() {
      console.log('WebApp ready called');
    },
    
    expand: function() {
      this.isExpanded = true;
      console.log('WebApp expanded');
    },
    
    close: function() {
      console.log('WebApp close called');
    },
    
    enableClosingConfirmation: function() {
      console.log('Enable closing confirmation');
    },
    
    setHeaderColor: function(color: string) {
      this.headerColor = color;
      console.log(`Header color set to ${color}`);
    },
    
    setBackgroundColor: function(color: string) {
      this.backgroundColor = color;
      document.body.style.backgroundColor = color;
      console.log(`Background color set to ${color}`);
    },
    
    showPopup: function(params: { title: string; message: string; buttons?: Array<{ id: string; text: string }> }) {
      return new Promise<{ button_id: string | null }>((resolve) => {
        console.log('Show popup:', params);
        // Mock popup display
        alert(`Popup: ${params.title}\n${params.message}`);
        resolve({ button_id: params.buttons ? params.buttons[0].id : null });
      });
    },
    
    showAlert: function(message: string) {
      return new Promise<void>((resolve) => {
        console.log('Show alert:', message);
        alert(message);
        resolve();
      });
    },
    
    showConfirm: function(message: string) {
      return new Promise<boolean>((resolve) => {
        console.log('Show confirm:', message);
        const result = confirm(message);
        resolve(result);
      });
    },
    
    openLink: function(url: string) {
      console.log(`Opening link: ${url}`);
      window.open(url, '_blank');
    },
    
    openTelegramLink: function(url: string) {
      console.log(`Opening Telegram link: ${url}`);
      window.open(url, '_blank');
    },
    
    openInvoice: function(url: string, callback?: (data: { url: string; status: string }) => void) {
      console.log('Open invoice:', url);
      if (callback) {
        callback({ url, status: 'paid' });
      }
    },
    
    showScanQrPopup: function(params: { text?: string }) {
      console.log('Show scan QR popup:', params);
      return Promise.resolve();
    },
    
    closeScanQrPopup: function() {
      console.log('Close QR popup');
    },
    
    readTextFromClipboard: function(callback: (text: string) => void) {
      console.log('Read text from clipboard');
      callback('mock clipboard text');
    },
    
    requestWriteAccess: function() {
      return new Promise<boolean>(resolve => {
        console.log('Requesting write access');
        resolve(true);
      });
    },
    
    requestContact: function() {
      return new Promise<boolean>(resolve => {
        console.log('Requesting contact');
        resolve(true);
      });
    },
    
    sendData: function(data: string) {
      console.log('Sending data to bot:', data);
    },
    
    switchInlineQuery: function(query: string, choose_chat_types?: string[]) {
      console.log('Switch inline query:', query, choose_chat_types);
    },
    
    // Events
    onEvent: function(eventType: string, callback: (data: any) => void) {
      if (eventType in this._callbacks) {
        this._callbacks[eventType].push(callback);
      }
      return this;
    },
    
    offEvent: function(eventType: string, callback: (data: any) => void) {
      if (eventType in this._callbacks) {
        const index = this._callbacks[eventType].indexOf(callback);
        if (index !== -1) {
          this._callbacks[eventType].splice(index, 1);
        }
      }
      return this;
    },
    
    triggerEvent: function(eventType: string, eventData: any) {
      if (eventType in this._callbacks) {
        this._callbacks[eventType].forEach(callback => callback(eventData));
      }
    },

    isExpanded: false,
    isClosingConfirmationEnabled: false,

    _callbacks: {
        viewportChanged: [],
        themeChanged: [],
        mainButtonClicked: [],
        backButtonClicked: [], 
        settingsButtonClicked: [],
        invoiceClosed: [],
        popupClosed: [],
        qrTextReceived: [],
        clipboardTextReceived: []
      },
  };

  // Add simulated viewport change listener
  window.addEventListener('resize', function() {
    WebApp.viewportHeight = window.innerHeight;
    WebApp.viewportStableHeight = window.innerHeight;
    WebApp.triggerEvent('viewportChanged', { 
      isStateStable: true, 
      height: window.innerHeight 
    });
  });

  // Setup theme toggle for testing
  const toggleTheme = function() {
    if (WebApp.colorScheme === 'light') {
      WebApp.colorScheme = 'dark';
      WebApp.themeParams = {
        bg_color: "#212121",
        text_color: "#ffffff",
        hint_color: "#aaaaaa",
        link_color: "#8ec4e6",
        button_color: "#31a6f7",
        button_text_color: "#ffffff",
        secondary_bg_color: "#181818"
      };
    } else {
      WebApp.colorScheme = 'light';
      WebApp.themeParams = mockThemeParams;
    }
    WebApp.triggerEvent('themeChanged', {});
  };

  // Create a UI for the mock
  const createMockUI = function() {
    const mockControlsDiv = document.createElement('div');
    mockControlsDiv.style.position = 'fixed';
    mockControlsDiv.style.top = '10px';
    mockControlsDiv.style.right = '10px';
    mockControlsDiv.style.backgroundColor = 'rgba(0,0,0,0.1)';
    mockControlsDiv.style.padding = '10px';
    mockControlsDiv.style.borderRadius = '5px';
    mockControlsDiv.style.zIndex = '9999';
    mockControlsDiv.style.fontSize = '12px';

    // Add theme toggle button
    const themeButton = document.createElement('button');
    themeButton.textContent = 'Toggle Theme';
    themeButton.style.display = 'block';
    themeButton.style.margin = '5px 0';
    themeButton.style.padding = '5px';
    themeButton.onclick = toggleTheme;
    mockControlsDiv.appendChild(themeButton);

    // Add main button trigger
    const mainButtonTrigger = document.createElement('button');
    mainButtonTrigger.textContent = 'Trigger Main Button';
    mainButtonTrigger.style.display = 'block';
    mainButtonTrigger.style.margin = '5px 0';
    mainButtonTrigger.style.padding = '5px';
    mainButtonTrigger.onclick = function() {
      WebApp._callbacks.mainButtonClicked.forEach(callback => callback(null));
    };
    mockControlsDiv.appendChild(mainButtonTrigger);

    // Add back button trigger
    const backButtonTrigger = document.createElement('button');
    backButtonTrigger.textContent = 'Trigger Back Button';
    backButtonTrigger.style.display = 'block';
    backButtonTrigger.style.margin = '5px 0';
    backButtonTrigger.style.padding = '5px';
    backButtonTrigger.onclick = function() {
      WebApp._callbacks.backButtonClicked.forEach(callback => callback(null));
    };
    mockControlsDiv.appendChild(backButtonTrigger);

    // Add info text
    const infoText = document.createElement('div');
    infoText.textContent = 'Mock Telegram WebApp';
    infoText.style.marginTop = '10px';
    infoText.style.color = '#666';
    mockControlsDiv.appendChild(infoText);
    
    // Add location test button
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Test Location Request';
    locationButton.style.display = 'block';
    locationButton.style.margin = '5px 0';
    locationButton.style.padding = '5px';
    locationButton.onclick = function() {
      WebApp.LocationManager.requestLocation().then(location => {
        alert(`Location received:\nLat: ${location.latitude}\nLng: ${location.longitude}\nAccuracy: ${location.accuracy}m\nProvider: ${location.provider}`);
      }).catch(err => {
        alert('Error getting location: ' + err.message);
      });
    };
    mockControlsDiv.appendChild(locationButton);

    document.body.appendChild(mockControlsDiv);
  };

  // Initialize after DOM loaded
  document.addEventListener('DOMContentLoaded', function() {
    createMockUI();
    console.log('Telegram WebApp Mock initialized');
    // Dispatch ready event for compatibility
    const event = new Event('telegram-web-app-ready');
    document.dispatchEvent(event);
  });

  // Expose WebApp object
  window.Telegram.WebApp = WebApp;
})();