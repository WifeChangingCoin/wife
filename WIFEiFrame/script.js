document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const dragHandle = document.querySelector('.drag-handle');
  const copyBtn = document.querySelector('.copy-btn');
  const contractInput = document.querySelector('.contract-address input');
  const toastContainer = document.querySelector('.toast-container');
  const carouselItems = document.querySelectorAll('.carousel-item');

  let modalPos = { x: 80, y: 80 };
  let handlePos = { x: 60, y: 60 };

  Object.assign(modal.style, {
    left: `${modalPos.x}px`,
    top: `${modalPos.y}px`
  });

  Object.assign(dragHandle.style, {
    left: `${handlePos.x}px`,
    top: `${handlePos.y}px`
  });

  interact('.drag-handle').draggable({
    listeners: {
      start() {
        modal.classList.add('moving');
      },
      move(event) {
        modalPos.x += event.dx;
        modalPos.y += event.dy;
        handlePos.x += event.dx;
        handlePos.y += event.dy;

        Object.assign(modal.style, {
          left: `${modalPos.x}px`,
          top: `${modalPos.y}px`
        });

        Object.assign(dragHandle.style, {
          left: `${handlePos.x}px`,
          top: `${handlePos.y}px`
        });
      },
      end() {
        modal.classList.remove('moving');
      }
    }
  });

  function showToast(message, delay = 0) {
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      toastContainer.appendChild(toast);

      // Force reflow
      toast.offsetHeight;

      // Show toast
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
          toastContainer.removeChild(toast);
        }, 400);
      }, 3000);
    }, delay);
  }

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(contractInput.value)
      .then(() => {
        copyBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
          copyBtn.style.transform = 'scale(1)';
        }, 200);

        showToast('Address copied to clipboard!');
        showToast('Now go buy some WIFE', 4000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  });

  let currentSlide = 0;
  
  function nextSlide() {
    carouselItems[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % carouselItems.length;
    carouselItems[currentSlide].classList.add('active');
  }

  // Change slide every 3 seconds
  setInterval(nextSlide, 3000);

  // Right side modal functionality
  const iconBtns = document.querySelectorAll('.icon-btn');
  const modals = document.querySelectorAll('.right-modal');
  const closeBtns = document.querySelectorAll('.close-btn');

  iconBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.remove('active'));
      modals[index].classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.right-modal').classList.remove('active');
    });
  });

  // Update the second icon (podcast) to radio icon
  iconBtns[1].querySelector('svg').innerHTML = `
    <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"/>
  `;

  // Add logo modal expansion functionality
  const logoModal = document.querySelector('.logo-modal');
  
  logoModal.addEventListener('click', () => {
    logoModal.classList.toggle('expanded');
  });

  // Add the column divider functionality
  const divider = document.querySelector('.column-divider');
  const leftColumn = document.querySelector('.left-column');
  const rightColumn = document.querySelector('.right-column');
  const container = document.querySelector('.paragraph-container');
  const leftText = leftColumn.querySelector('p');
  const rightText = rightColumn.querySelector('p');
  
  let isDragging = false;
  let startX, startLeftWidth;

  divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    divider.classList.add('dragging');
    
    startX = e.pageX;
    startLeftWidth = leftColumn.offsetWidth;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const containerWidth = container.offsetWidth;
    const minWidth = 100; // Minimum width for each column
    
    let newLeftWidth = startLeftWidth + (e.pageX - startX);
    
    // Enforce minimum widths
    if (newLeftWidth < minWidth) newLeftWidth = minWidth;
    if (newLeftWidth > containerWidth - minWidth) newLeftWidth = containerWidth - minWidth;
    
    const leftPercent = (newLeftWidth / containerWidth) * 100;
    const rightPercent = 100 - leftPercent;
    
    // Set column widths
    leftColumn.style.width = `${leftPercent}%`;
    rightColumn.style.width = `${rightPercent}%`;

    // Adjust font sizes based on column widths
    const baseFontSize = 16;
    const leftScale = leftPercent / 50;
    const rightScale = rightPercent / 50;
    
    leftText.style.fontSize = `${baseFontSize * leftScale}px`;
    rightText.style.fontSize = `${baseFontSize * rightScale}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    divider.classList.remove('dragging');
  });
});

// WIFEPAPER loading optimization
document.addEventListener('DOMContentLoaded', () => {
  const wifePaperLink = document.querySelector('.wifepaper-link');
  if (!wifePaperLink) return;

  // Create loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingOverlay);

  // Handle WIFEPAPER link click
  wifePaperLink.addEventListener('click', (e) => {
    e.preventDefault();
    const url = wifePaperLink.href;

    // Show loading overlay
    loadingOverlay.style.display = 'flex';

    // Create a temporary iframe to check if the page is loaded
    const tempIframe = document.createElement('iframe');
    tempIframe.style.display = 'none';
    document.body.appendChild(tempIframe);

    tempIframe.onload = () => {
      // Page is loaded, redirect
      loadingOverlay.style.display = 'none';
      window.location.href = url;
      document.body.removeChild(tempIframe);
    };

    tempIframe.onerror = () => {
      loadingOverlay.style.display = 'none';
      document.body.removeChild(tempIframe);
      window.location.href = url; // Fallback to direct navigation
    };

    // Start loading
    tempIframe.src = url;

    // Timeout after 5 seconds
    setTimeout(() => {
      if (document.body.contains(tempIframe)) {
        loadingOverlay.style.display = 'none';
        document.body.removeChild(tempIframe);
        window.location.href = url; // Fallback to direct navigation
      }
    }, 5000);
  });

  // Preload the WIFEPAPER page
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = wifePaperLink.href;
  document.head.appendChild(link);
});