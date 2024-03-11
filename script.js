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
  const colors = ['#00b336', '#00b492', '#f7941d', '#7dcd13']; // Define colors for active dots

  // Function to scroll to a specific section
  function scrollToSection(index) {
    const section = sections[index];
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const windowHeight = window.innerHeight;
    const offset = (windowHeight - sectionHeight) / 2; // Offset to center the section
    const scrollTo = sectionTop - offset;
    
    // Animate the scroll
    window.scrollTo({
      top: scrollTo,
      behavior: 'auto'
    });
  }

  // Handle wheel event to scroll to next/previous section
  let scrolling = false;
  window.addEventListener('wheel', (e) => {
    if (scrolling) return;
    scrolling = true;
    const currentScrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    let index = -1;

    // Find the index of the section closest to the center of the viewport
    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const distance = Math.abs(currentScrollTop + (viewportHeight / 2) - (sectionTop + sectionHeight / 2));
      if (index === -1 || distance < Math.abs(currentScrollTop + (viewportHeight / 2) - (sections[index].offsetTop + sections[index].clientHeight / 2))) {
        index = i;
      }
    });

    // Scroll to the next/previous section
    if (e.deltaY > 0) {
      // Scrolling down
      scrollToSection(index < sections.length - 1 ? index + 1 : index);
    } else {
      // Scrolling up
      scrollToSection(index > 0 ? index - 1 : index);
    }

    setTimeout(() => { scrolling = false; }, 800); // Reset scrolling flag after 800ms
  });

  // Handle dot click to navigate to the corresponding section
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      scrollToSection(index);
    });
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
      dot.style.backgroundColor = ''; // Reset dot color
      if (index === current) {
        dot.classList.add('active');
        dot.style.backgroundColor = colors[index]; // Set color for active dot
      } else {
        dot.classList.remove('active');
      }
    });
  });
});