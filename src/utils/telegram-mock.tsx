/**
 * Mock Telegram WebApp API
 * Compatible with https://telegram.org/js/telegram-web-app.js
 * For testing Telegram Mini Apps locally
 */

(function() {
    // Create global window.Telegram.WebApp object
    if (!window.Telegram) {
      window.Telegram = {};
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
    const WebApp = {
      // Properties
      initDataUnsafe: {
        query_id: "AAHdF6IAAAAA13dpfO4iT-hs",
        user: mockUserData,
        auth_date: Math.floor(Date.now() / 1000),
        hash: "d8201a81fabdab577914f65f9f35a4a38c5261cc80a7f0490972e47c5dcd1934"
      },
      
      // LocationManager for handling location-related functionality
      LocationManager: {
        requestLocation: function() {
          return new Promise((resolve, reject) => {
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
                (error) => {
                  console.warn('Error getting actual location:', error);
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
        },
        
        requestUserLocationPermission: function() {
          return new Promise((resolve, reject) => {
            console.log('Requesting user location permission');
            // Attempt to request permission through the browser API
            if (navigator.permissions && navigator.permissions.query) {
              navigator.permissions.query({ name: 'geolocation' })
                .then(permissionStatus => {
                  console.log('Permission status:', permissionStatus.state);
                  if (permissionStatus.state === 'granted') {
                    resolve(true);
                  } else if (permissionStatus.state === 'prompt') {
                    // Try to request permission by triggering the browser prompt
                    navigator.geolocation.getCurrentPosition(
                      () => resolve(true),
                      () => resolve(false)
                    );
                  } else {
                    resolve(false);
                  }
                })
                .catch(() => {
                  // In case of any error, default to a mock confirm dialog
                  const result = confirm('Allow this site to access your location?');
                  resolve(result);
                });
            } else {
              // For browsers that don't support the Permissions API
              const result = confirm('Allow this site to access your location?');
              resolve(result);
            }
          });
        }
      },
      initData: mockInitData,
      version: "6.9",
      platform: "mock",
      colorScheme: "light",
      themeParams: mockThemeParams,
      isExpanded: false,
      viewportHeight: window.innerHeight,
      viewportStableHeight: window.innerHeight,
      headerColor: "#ffffff",
      backgroundColor: "#ffffff",
      isClosingConfirmationEnabled: false,
      
      // Event handlers
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
  
      // Main Button
      MainButton: {
        isVisible: false,
        isActive: true,
        isProgressVisible: false,
        text: "CONTINUE",
        color: "#31a6f7",
        textColor: "#ffffff",
        
        // Methods
        setText: function(text) {
          this.text = text;
          console.log("MainButton text set to:", text);
          return this;
        },
        
        onClick: function(callback) {
          WebApp._callbacks.mainButtonClicked.push(callback);
          return this;
        },
        
        offClick: function(callback) {
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
        
        showProgress: function(leaveActive) {
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
        
        setParams: function(params) {
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
        
        onClick: function(callback) {
          WebApp._callbacks.backButtonClicked.push(callback);
          return this;
        },
        
        offClick: function(callback) {
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
        
        onClick: function(callback) {
          WebApp._callbacks.settingsButtonClicked.push(callback);
          return this;
        },
        
        offClick: function(callback) {
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
        impactOccurred: function(style) {
          console.log("Haptic impact:", style);
        },
        
        notificationOccurred: function(type) {
          console.log("Haptic notification:", type);
        },
        
        selectionChanged: function() {
          console.log("Haptic selection changed");
        }
      },
  
      // Cloud Storage
      CloudStorage: {
        setItem: function(key, value) {
          return new Promise((resolve) => {
            localStorage.setItem(`tg_storage_${key}`, value);
            console.log(`CloudStorage: Set item ${key} = ${value}`);
            resolve();
          });
        },
        
        getItem: function(key) {
          return new Promise((resolve) => {
            const value = localStorage.getItem(`tg_storage_${key}`);
            console.log(`CloudStorage: Get item ${key} = ${value}`);
            resolve(value);
          });
        },
        
        getItems: function(keys) {
          return new Promise((resolve) => {
            const result = {};
            keys.forEach(key => {
              result[key] = localStorage.getItem(`tg_storage_${key}`);
            });
            console.log("CloudStorage: Get items", result);
            resolve(result);
          });
        },
        
        removeItem: function(key) {
          return new Promise((resolve) => {
            localStorage.removeItem(`tg_storage_${key}`);
            console.log(`CloudStorage: Removed item ${key}`);
            resolve();
          });
        },
        
        removeItems: function(keys) {
          return new Promise((resolve) => {
            keys.forEach(key => {
              localStorage.removeItem(`tg_storage_${key}`);
            });
            console.log(`CloudStorage: Removed items`, keys);
            resolve();
          });
        },
        
        getKeys: function() {
          return new Promise((resolve) => {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key.startsWith('tg_storage_')) {
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
        this.isClosingConfirmationEnabled = true;
        console.log('Closing confirmation enabled');
      },
      
      disableClosingConfirmation: function() {
        this.isClosingConfirmationEnabled = false;
        console.log('Closing confirmation disabled');
      },
      
      setHeaderColor: function(color) {
        this.headerColor = color;
        console.log(`Header color set to ${color}`);
      },
      
      setBackgroundColor: function(color) {
        this.backgroundColor = color;
        document.body.style.backgroundColor = color;
        console.log(`Background color set to ${color}`);
      },
      
      showPopup: function(params) {
        return new Promise((resolve) => {
          console.log('Show popup:', params);
          // Mock popup display
          alert(`Popup: ${params.title}\n${params.message}`);
          resolve({ button_id: params.buttons ? params.buttons[0].id : null });
        });
      },
      
      showAlert: function(message) {
        return new Promise((resolve) => {
          console.log('Show alert:', message);
          alert(message);
          resolve();
        });
      },
      
      showConfirm: function(message) {
        return new Promise((resolve) => {
          console.log('Show confirm:', message);
          const result = confirm(message);
          resolve(result);
        });
      },
      
      openLink: function(url) {
        console.log(`Opening link: ${url}`);
        window.open(url, '_blank');
      },
      
      openTelegramLink: function(url) {
        console.log(`Opening Telegram link: ${url}`);
        window.open(url, '_blank');
      },
      
      openInvoice: function(url, callback) {
        console.log(`Opening invoice: ${url}`);
        if (callback) {
          WebApp._callbacks.invoiceClosed.push(callback);
        }
        window.open(url, '_blank');
        // Simulate invoice closed after 3 seconds
        setTimeout(() => {
          WebApp._callbacks.invoiceClosed.forEach(cb => cb({ url: url, status: 'paid' }));
        }, 3000);
      },
      
      showScanQrPopup: function(params) {
        return new Promise((resolve) => {
          console.log('Show QR popup:', params);
          setTimeout(() => {
            const mockText = prompt("Enter mock QR code text:", "https://t.me/example");
            if (mockText) {
              WebApp._callbacks.qrTextReceived.forEach(cb => cb(mockText));
            }
            resolve();
          }, 1000);
        });
      },
      
      closeScanQrPopup: function() {
        console.log('Close QR popup');
      },
      
      readTextFromClipboard: function(callback) {
        console.log('Read text from clipboard');
        navigator.clipboard.readText().then(text => {
          callback(text);
          WebApp._callbacks.clipboardTextReceived.forEach(cb => cb(text));
        }).catch(err => {
          console.error('Failed to read clipboard:', err);
          const mockText = prompt("Mock clipboard (clipboard API may be unavailable):", "Mock clipboard text");
          if (mockText) {
            callback(mockText);
            WebApp._callbacks.clipboardTextReceived.forEach(cb => cb(mockText));
          }
        });
      },
      
      requestWriteAccess: function() {
        return new Promise(resolve => {
          console.log('Requesting write access');
          resolve(true);
        });
      },
      
      requestContact: function() {
        return new Promise(resolve => {
          console.log('Requesting contact');
          resolve(true);
        });
      },
      
      sendData: function(data) {
        console.log('Sending data to bot:', data);
      },
      
      switchInlineQuery: function(query, choose_chat_types) {
        console.log('Switch inline query:', query, choose_chat_types);
      },
      
      // Events
      onEvent: function(eventType, callback) {
        if (eventType in this._callbacks) {
          this._callbacks[eventType].push(callback);
        }
        return this;
      },
      
      offEvent: function(eventType, callback) {
        if (eventType in this._callbacks) {
          const index = this._callbacks[eventType].indexOf(callback);
          if (index !== -1) {
            this._callbacks[eventType].splice(index, 1);
          }
        }
        return this;
      },
      
      triggerEvent: function(eventType, eventData) {
        if (eventType in this._callbacks) {
          this._callbacks[eventType].forEach(callback => callback(eventData));
        }
      }
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
      WebApp.triggerEvent('themeChanged');
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
        WebApp._callbacks.mainButtonClicked.forEach(callback => callback());
      };
      mockControlsDiv.appendChild(mainButtonTrigger);
  
      // Add back button trigger
      const backButtonTrigger = document.createElement('button');
      backButtonTrigger.textContent = 'Trigger Back Button';
      backButtonTrigger.style.display = 'block';
      backButtonTrigger.style.margin = '5px 0';
      backButtonTrigger.style.padding = '5px';
      backButtonTrigger.onclick = function() {
        WebApp._callbacks.backButtonClicked.forEach(callback => callback());
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