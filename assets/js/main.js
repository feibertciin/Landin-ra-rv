/**
 * Corporación Universitaria Lasallista - VR / AR / MR Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching Logic (Light / Dark)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Interactive Simulator Switcher
  const simButtons = document.querySelectorAll('.sim-btn');
  const simImages = document.querySelectorAll('.sim-img');
  const simTitle = document.getElementById('sim-overlay-title');
  const simDesc = document.getElementById('sim-overlay-desc');

  const simInfoMap = {
    vr: {
      title: 'Realidad Virtual (VR) - Inmersión Total',
      desc: 'Prototipado inmersivo 3D de servidores, microservicios y arquitectura de redes sin restricción de hardware físico.'
    },
    ar: {
      title: 'Realidad Aumentada (AR) - Visualización Contextual',
      desc: 'Superposición de métricas de telemetría y diagnósticos directamente sobre servidores y código fuente.'
    },
    mr: {
      title: 'Realidad Mixta (MR) - Aula Híbrida Inteligente',
      desc: 'Colaboración espacio-temporal para estudiantes de ingeniería mediante manipulación directa de hologramas.'
    }
  };

  simButtons.forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-mode');

      // Update Active Button
      simButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update Active Image
      simImages.forEach(img => {
        if (img.getAttribute('data-mode') === mode) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      // Update Overlay Text
      if (simInfoMap[mode]) {
        if (simTitle) simTitle.textContent = simInfoMap[mode].title;
        if (simDesc) simDesc.textContent = simInfoMap[mode].desc;
      }
    });
  });

  // Smooth Scroll offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
