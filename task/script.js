// ========== COPY CODE FUNCTIONALITY ==========
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code').innerText;

  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = '✅ Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const originalText = button.textContent;
    button.textContent = '✅ Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  });
}

// ========== SCROLL PROGRESS BAR ==========
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
}

// ========== BACK TO TOP BUTTON ==========
function handleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SCROLL ANIMATIONS (Intersection Observer) ==========
function initScrollAnimations() {
  const parts = document.querySelectorAll('.part');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  parts.forEach((part) => observer.observe(part));
}

// ========== ACTIVE TOC HIGHLIGHT ==========
function initTocHighlight() {
  const tocItems = document.querySelectorAll('.toc-item');
  const sections = document.querySelectorAll('.part');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocItems.forEach((item) => {
            item.style.borderColor =
              item.getAttribute('href') === '#' + id
                ? 'rgba(99, 102, 241, 0.4)'
                : 'rgba(255, 255, 255, 0.06)';
            item.style.background =
              item.getAttribute('href') === '#' + id
                ? 'rgba(99, 102, 241, 0.08)'
                : 'rgba(255, 255, 255, 0.03)';
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ========== SMOOTH SCROLL FOR TOC LINKS ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== KEYBOARD NAVIGATION ==========
function initKeyboardNav() {
  const parts = [
    'part1', 'part2', 'part3', 'part4', 'part5',
    'part6', 'part7', 'part8', 'part9', 'part10',
  ];
  let currentIndex = -1;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      currentIndex = Math.min(currentIndex + 1, parts.length - 1);
      document.getElementById(parts[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      currentIndex = Math.max(currentIndex - 1, 0);
      document.getElementById(parts[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ========== INIT ==========
window.addEventListener('scroll', () => {
  updateProgressBar();
  handleBackToTop();
});

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initTocHighlight();
  initSmoothScroll();
  initKeyboardNav();
});
