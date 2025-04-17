// Disable the Vite HMR error overlay
if (import.meta.hot) {
  // For Vite 3+
  import.meta.hot.on('vite:beforeUpdate', () => {
    // Suppress error overlay
    console.clear();
  });
  
  // For all Vite versions
  if (window.__vite_plugin_react_preamble_installed__) {
    const oldConsoleError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('Uncaught') && 
          args[0]?.includes?.('Error') && 
          args[1]?.includes?.('SyntaxError')) {
        return;
      }
      oldConsoleError(...args);
    };
  }
  
  // Remove existing error overlay
  setTimeout(() => {
    const errorOverlay = document.querySelector('vite-error-overlay');
    if (errorOverlay) {
      errorOverlay.remove();
    }
  }, 0);
}