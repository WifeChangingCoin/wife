document.addEventListener('DOMContentLoaded', () => {
  const scrollStyles = `
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      border: 2px solid rgba(255, 255, 255, 0.05);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;

  const injectStyles = (frame) => {
    const tryInject = () => {
      try {
        const doc = frame.contentDocument || frame.contentWindow.document;
        
        // Check if styles are already injected
        const existingStyle = doc.querySelector('style[data-scrollbar-styles]');
        if (existingStyle) return;
        
        // Create and inject the style element
        const styleElement = doc.createElement('style');
        styleElement.setAttribute('data-scrollbar-styles', 'true');
        styleElement.textContent = scrollStyles;
        doc.head.appendChild(styleElement);
      } catch (e) {
        console.log('Retrying style injection...');
        // Retry after a short delay
        setTimeout(tryInject, 500);
      }
    };

    // Initial attempt
    tryInject();

    // Also try when frame loads/reloads
    frame.addEventListener('load', tryInject);
  };

  // Get both iframes
  const frames = [
    document.getElementById('telegram-frame'),
    document.getElementById('wifecoin-frame')
  ];

  // Inject styles for each frame
  frames.forEach(frame => {
    injectStyles(frame);
  });
});