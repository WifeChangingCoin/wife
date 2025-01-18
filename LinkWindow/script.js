document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');
  const clickableElements = document.querySelectorAll('.clickable');

  clickableElements.forEach(element => {
    element.addEventListener('click', async () => {
      let textToCopy = element.getAttribute('data-copy');
      // If no data-copy attribute, use the text content (for usernames)
      if (!textToCopy) {
        textToCopy = element.textContent;
      }
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast();
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // Carousel functionality
  const containers = document.querySelectorAll('.container');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const counter = document.querySelector('.profile-counter');
  let currentIndex = 0;

  function updateCarousel() {
    containers.forEach(container => container.classList.remove('active'));
    containers[currentIndex].classList.add('active');
    counter.textContent = `${currentIndex + 1}/3`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + containers.length) % containers.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % containers.length;
    updateCarousel();
  });

  // Background toggle functionality
  const bgToggle = document.getElementById('bgToggle');
  const backgrounds = {
    svg: {
      profile1: "url(\"data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b6b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234ecdc4;stop-opacity:1' /%3E%3C/linearGradient%3E%3Cpattern id='dots' patternUnits='userSpaceOnUse' width='30' height='30'%3E%3Ccircle cx='15' cy='15' r='2' fill='rgba(255,255,255,0.1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='800' fill='url(%23grad1)' /%3E%3Crect width='800' height='800' fill='url(%23dots)' /%3E%3C/svg%3E\")",
      profile2: "url(\"data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2363D471;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23233329;stop-opacity:1' /%3E%3C/linearGradient%3E%3Cpattern id='waves' patternUnits='userSpaceOnUse' width='50' height='50'%3E%3Cpath d='M0,25 Q12.5,0 25,25 T50,25' stroke='rgba(255,255,255,0.1)' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='800' fill='url(%23grad2)' /%3E%3Crect width='800' height='800' fill='url(%23waves)' /%3E%3C/svg%3E\")",
      profile3: "url(\"data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234158D0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23C850C0;stop-opacity:1' /%3E%3C/linearGradient%3E%3Cpattern id='grid' patternUnits='userSpaceOnUse' width='40' height='40'%3E%3Crect width='40' height='40' fill='none' stroke='rgba(255,255,255,0.1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='800' fill='url(%23grad3)' /%3E%3Crect width='800' height='800' fill='url(%23grid)' /%3E%3C/svg%3E\")"
    },
    photo: {
      profile1: "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3')",
      profile2: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3')",
      profile3: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3')"
    }
  };

  bgToggle.addEventListener('change', () => {
    const bgType = bgToggle.checked ? 'photo' : 'svg';
    document.body.style.backgroundImage = backgrounds[bgType][`profile${currentIndex + 1}`];
  });

  // Set initial background
  document.body.style.backgroundImage = backgrounds.photo[`profile${currentIndex + 1}`];
  bgToggle.checked = true;
});