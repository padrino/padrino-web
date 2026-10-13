function activateToggle(buttonId, target, openClass) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = target.classList.toggle(openClass);
    button.setAttribute('aria-expanded', isOpen);
  });
}

function activateThemeToggle() {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  button.addEventListener('click', () => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = root.dataset.theme ? root.dataset.theme === 'dark' : systemDark;
    const theme = isDark ? 'light' : 'dark';

    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  });
}

function activateHeadingAnchors() {
  const headings = document.querySelectorAll('.content h2[id], .content h3[id], .content h4[id]');

  for (const heading of headings) {
    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = `#${heading.id}`;
    anchor.setAttribute('aria-label', 'Link to this section');
    anchor.textContent = '#';
    heading.append(anchor);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  activateToggle('site-nav-toggle', document.body, 'nav-is-open');
  activateToggle('docs-sidebar-toggle', document.getElementById('docs-sidebar'), 'is-open');
  activateThemeToggle();
  activateHeadingAnchors();
});
