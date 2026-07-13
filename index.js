// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Add shadow to navbar on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// Contact form handler
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const message = form.elements['message'].value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields before submitting.';
    formMessage.style.color = '#ef4444';
    return;
  }

  if (!emailPattern.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = '#ef4444';
    return;
  }

  formMessage.textContent = "Thanks for your message! I'll get back to you soon.";
  formMessage.style.color = '#6366f1';
  form.reset();
  setTimeout(() => { formMessage.textContent = ''; }, 5000);
});

