document.addEventListener('DOMContentLoaded', () => {
  const bottomBar = document.getElementById('bottom-bar');
  const expandedContainer = document.getElementById('expanded-container');
  const menuButton = document.getElementById('menu-button');
  const menuPopup = document.getElementById('menu-popup');
  const telegramFrame = document.getElementById('telegram-frame');
  const resizeHandle = document.getElementById('resize-handle');
  const scrollIndicator = document.getElementById('mobile-scroll-indicator');
  const expandIcon = document.getElementById('expand-icon');
  const imageCarousel = document.getElementById('image-carousel');
  const carouselContainer = document.getElementById('carousel-container');

  let isExpanded = false;
  let isDragging = false;
  let startY, startHeight;
  let currentImageIndex = 0;
  let isCarouselExpanded = false;

  // Update expand icon rotation based on expansion state
  function updateExpandIcon() {
    // Rotate 180 degrees when expanded (pointing down), 0 when collapsed (pointing up)
    expandIcon.style.transform = `translateX(-50%) rotate(${isExpanded ? 180 : 0}deg)`;
  }

  // Add click handlers for menu items
  menuPopup.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      telegramFrame.src = url;
      menuPopup.classList.add('hidden');
    });
  });

  // Bottom bar expansion handling
  bottomBar.addEventListener('click', (e) => {
    if (e.target.closest('#menu-button')) return;
    
    isExpanded = !isExpanded;
    if (isExpanded) {
      expandedContainer.style.transform = 'translateY(0)';
      bottomBar.style.position = 'fixed';
      bottomBar.style.top = '0';
      bottomBar.style.left = '0';
      bottomBar.style.width = '100%';
      updateExpandIcon();
    } else {
      expandedContainer.style.transform = 'translateY(100%)';
      bottomBar.style.position = 'relative';
      bottomBar.style.top = '';
      bottomBar.style.left = '';
      bottomBar.style.width = '';
      updateExpandIcon();
    }
  });

  // Menu button handling
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = menuButton.getBoundingClientRect();
    menuPopup.style.left = `${rect.left}px`;
    
    // Position menu above the button when bar is at bottom,
    // below the button when bar is at top
    if (!isExpanded) {
      menuPopup.style.top = 'auto';
      menuPopup.style.bottom = `${window.innerHeight - rect.top}px`;
    } else {
      menuPopup.style.bottom = 'auto';
      menuPopup.style.top = `${rect.bottom}px`;
    }
    
    menuPopup.classList.toggle('hidden');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuPopup.contains(e.target) && e.target !== menuButton && !imageCarousel.contains(e.target)) {
      menuPopup.classList.add('hidden');
      if (!imageCarousel.contains(e.target)) {
        imageCarousel.classList.remove('expanded');
        isCarouselExpanded = false;
        setTimeout(() => {
          carouselContainer.style.transform = 'translateX(0)';
          currentImageIndex = 0;
        }, 300);
      }
    }
  });

  // Telegram frame resize handling
  resizeHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startHeight = telegramFrame.offsetHeight;
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  resizeHandle.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    startHeight = telegramFrame.offsetHeight;
    
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const delta = e.clientY - startY;
    telegramFrame.style.height = `${startHeight + delta}px`;
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    const delta = e.touches[0].clientY - startY;
    telegramFrame.style.height = `${startHeight + delta}px`;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function onTouchEnd() {
    isDragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }

  // Mobile scroll indicator handling
  let scrollTimeout;
  const wifecoinFrame = document.getElementById('wifecoin-frame');

  wifecoinFrame.addEventListener('touchstart', () => {
    if (window.innerWidth <= 768) {
      scrollIndicator.classList.add('active');
      scrollIndicator.style.opacity = '1';
      clearTimeout(scrollTimeout);
    }
  });

  wifecoinFrame.addEventListener('touchend', () => {
    if (window.innerWidth <= 768) {
      scrollTimeout = setTimeout(() => {
        scrollIndicator.style.opacity = '0';
      }, 1500);
    }
  });

  // Image carousel functionality
  const images = [
    'https://wifecoin.life/wifeSOL.png',
    'https://wifecoin.life/logo.png',
    'https://wifecoin.life/banner.png'
  ];

  // Initialize carousel images
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'carousel-image';
    carouselContainer.appendChild(img);
  });

  imageCarousel.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!isCarouselExpanded) {
      imageCarousel.classList.add('expanded');
      isCarouselExpanded = true;
    } else {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      carouselContainer.style.transform = `translateX(-${currentImageIndex * 200}px)`;
    }
  });
});