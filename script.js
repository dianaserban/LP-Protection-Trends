document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const navbar = document.getElementById('navbar');
  
    // Create navigation dots for each section
    for (let i = 0; i < sections.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.setAttribute('data-index', i);
      navbar.appendChild(dot);
    }
  
    const dots = document.querySelectorAll('.dot');
  
    // Function to scroll to a specific section
    function scrollToSection(index) {
      const section = sections[index];
      section.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  
    // Handle wheel event to automatically scroll to next section
    let scrolling = false;
    window.addEventListener('wheel', (e) => {
      if (scrolling) return;
      scrolling = true;
      const currentScrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      if (e.deltaY > 0) {
        // Scrolling down
        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          if (sectionTop > currentScrollTop + viewportHeight) {
            scrollToSection(index);
            setTimeout(() => { scrolling = false; }, 800);
            return;
          }
        });
      } else {
        // Scrolling up
        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          if (currentScrollTop > sectionTop + viewportHeight) {
            scrollToSection(index - 1);
            setTimeout(() => { scrolling = false; }, 800);
            return;
          }
        });
      }
    });
  
    // Handle arrow down key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        const currentScrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          if (sectionTop > currentScrollTop + viewportHeight) {
            scrollToSection(index);
            setTimeout(() => { scrolling = false; }, 800);
            return;
          }
        });
      }
    });
  
    // Highlight current section in navigation on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = index;
        }
      });
  
      dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === current) {
          dot.classList.add('active');
        }
      });
    });
  });
  