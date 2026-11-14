const Aether = {
  async loadComponent(componentPath, targetId, callback) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) throw new Error('Failed to load');
      const html = await response.text();
      const target = document.getElementById(targetId);
      if (target) { target.innerHTML = html; if (callback) callback(); }
    } catch (e) { console.error(e); }
  },
  initNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });
    this.setActiveNav();
  },
  setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (path.includes('/about') && link.dataset.nav === 'about') link.classList.add('active');
      else if (path.includes('/contact') && link.dataset.nav === 'contact') link.classList.add('active');
      else if (link.dataset.nav === 'home') link.classList.add('active');
    });
  },
  fixNavigationPaths() {
    const isSubPage = window.location.pathname.includes('/pages/');
    document.querySelectorAll('[data-nav]').forEach(el => {
      if (el.tagName !== 'A') return;
      const nav = el.dataset.nav;
      if (isSubPage) {
        if (nav === 'home') el.href = '../../index.html';
        else if (nav === 'about') el.href = '../about/index.html';
        else if (nav === 'contact') el.href = '../contact/index.html';
      } else {
        if (nav === 'home') el.href = './index.html';
        else if (nav === 'about') el.href = './pages/about/index.html';
        else if (nav === 'contact') el.href = './pages/contact/index.html';
      }
    });
  },
  init() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      const isSubPage = window.location.pathname.includes('/pages/');
      const headerPath = isSubPage ? '../../components/Header/index.html' : './components/Header/index.html';
      this.loadComponent(headerPath, 'header-placeholder', () => {
        this.fixNavigationPaths();
        this.initNavigation();
      });
    }
  }
};
document.addEventListener('DOMContentLoaded', () => Aether.init());