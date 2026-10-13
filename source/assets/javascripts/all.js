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

function flashCopied(button) {
  button.classList.add('is-copied');
  setTimeout(() => button.classList.remove('is-copied'), 2000);
}

function activateCopyButtons() {
  for (const button of document.querySelectorAll('.copy-button')) {
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      flashCopied(button);
    });
  }
}

function activateGenerator() {
  const form = document.querySelector('[data-generator]');
  if (!form) return;

  const output = form.querySelector('.generator__command');
  const copyButton = form.querySelector('.copy-button');
  const orm = form.elements.orm;

  const update = () => {
    const parts = ['padrino g project blog'];

    for (const field of form.querySelectorAll('[data-requires]')) {
      field.hidden = !field.dataset.requires.split(' ').includes(orm.value);
    }

    for (const select of form.querySelectorAll('select')) {
      if (select.value && !select.closest('label').hidden) {
        parts.push(`--${select.name} ${select.value}`);
      }
    }

    output.replaceChildren();
    parts.forEach((part, index) => {
      const span = document.createElement('span');
      span.textContent = part;
      if (index > 0) output.append(' ');
      output.append(span);
    });
    copyButton.dataset.copy = parts.join(' ');
  };

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (event) => event.preventDefault());
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  activateToggle('site-nav-toggle', document.body, 'nav-is-open');
  activateToggle('docs-sidebar-toggle', document.getElementById('docs-sidebar'), 'is-open');
  activateThemeToggle();
  activateHeadingAnchors();
  activateGenerator();
  activateCopyButtons();
});
