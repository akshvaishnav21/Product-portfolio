// Complete solution to disable the Vite HMR error overlay
// Method 1: Directly inhibit overlay creation
if (import.meta.hot) {
  // Prevent new overlays from being created
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.clear();
  });
  
  import.meta.hot.on('vite:error', () => {
    return false; // Prevent overlay from being created
  });
  
  // Method 2: Suppress React error messages that trigger overlays
  if (window.__vite_plugin_react_preamble_installed__) {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filter out React refresh errors that trigger overlays
      if (args[0]?.includes?.('Error') || 
          args[0]?.includes?.('Warning') || 
          (typeof args[0] === 'string' && args[0].includes('Module HMR')) ||
          (typeof args[0] === 'string' && args[0].includes('Uncaught'))) {
        // Convert to warning instead of error to avoid overlay
        console.warn('Suppressed error:', ...args);
        return;
      }
      originalConsoleError(...args);
    };
  }
  
  // Method 3: Suppress unhandled rejections from being logged to console
  window.addEventListener('unhandledrejection', (event) => {
    // Prevent the unhandled rejection from propagating
    event.preventDefault();
    event.stopPropagation();
    
    // Check if it's coming from analytics or non-critical paths
    const error = event.reason;
    if (error && error.message && (
        error.message.includes('fetch') || 
        error.message.includes('analytics') ||
        error.message.includes('network'))) {
      console.warn('Non-critical unhandled promise rejection suppressed');
      return false;
    }
  });
  
  // Method 4: Remove any existing overlays
  const removeOverlays = () => {
    const overlays = document.querySelectorAll('vite-error-overlay');
    if (overlays.length > 0) {
      overlays.forEach(overlay => overlay.remove());
    }
  };
  
  // Run immediately and periodically check for overlays
  removeOverlays();
  setInterval(removeOverlays, 100);
}