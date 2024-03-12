document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  const navbar = document.getElementById('navbar');
  const colors = ['#00b336', '#00b492', '#f7941d', '#7dcd13'];
  let currentSectionIndex = 0;
  let isScrolling = false;
  let delayTimer;

  // Function to set active dot and its color
  function setActiveDot(index) {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      dots.forEach((dot, i) => {
          if (i === index) {
              dot.style.backgroundColor = colors[i];
          } else {
              dot.style.backgroundColor = '';
          }
      });
  }

  // Create navigation dots for each section
  const dots = [];
  for (let i = 0; i < sections.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.setAttribute('data-index', i);
      navbar.appendChild(dot);
      dots.push(dot);
  }

  // Handle dot click to navigate to the corresponding section
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          if (!isScrolling && index !== currentSectionIndex) {
              scrollToSection(index);
          }
      });
  });

  // Function to scroll to a specific section
  function scrollToSection(index) {
      const section = sections[index];
      isScrolling = true;
      section.scrollIntoView({ behavior: 'smooth' });
      currentSectionIndex = index;
      setActiveDot(index);
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => {
          isScrolling = false;
      }, 2000); // Adjust the delay time as needed
  }

  // Handle wheel event to scroll to next/previous section
  window.addEventListener('wheel', (e) => {
      e.preventDefault(); // Prevent default scroll behavior
      if (!isScrolling) {
          const direction = e.deltaY > 0 ? 1 : -1;
          const nextSectionIndex = currentSectionIndex + direction;
          if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
              scrollToSection(nextSectionIndex);
          }
      }
  });

  // Handle keyboard arrow keys for navigation
  window.addEventListener('keydown', (e) => {
      if (!isScrolling) {
          if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
              scrollToSection(currentSectionIndex + 1);
          } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
              scrollToSection(currentSectionIndex - 1);
          }
      }
  });

  // Set initial active dot
  setActiveDot(currentSectionIndex);
});
