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

const COPY_ICONS = `
  <svg class="icon icon--copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  <svg class="icon icon--check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
`;

function addCodeCopyButtons() {
  for (const pre of document.querySelectorAll('.content pre')) {
    let text = pre.textContent.replace(/\n$/, '');
    if (pre.classList.contains('shell')) text = text.replace(/^\$ /gm, '');

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.before(wrapper);
    wrapper.append(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.dataset.copy = text;
    button.innerHTML = COPY_ICONS;
    wrapper.append(button);
  }
}

function activateTocHighlighting() {
  const links = document.querySelectorAll('.toc__link');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linkById = new Map([...links].map((link) => [link.hash.slice(1), link]));

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((link) => link.classList.remove('is-active'));
      linkById.get(entry.target.id)?.classList.add('is-active');
    }
  }, { rootMargin: '-80px 0px -70% 0px' });

  for (const id of linkById.keys()) {
    const heading = document.getElementById(id);
    if (heading) observer.observe(heading);
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

function activatePageActions() {
  const copyButton = document.querySelector('.page-actions__copy');
  const menu = document.querySelector('.page-actions__menu');

  copyButton?.addEventListener('click', async () => {
    const response = await fetch(copyButton.dataset.copyUrl);
    await navigator.clipboard.writeText(await response.text());
    flashCopied(copyButton);
  });

  if (menu) {
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) menu.removeAttribute('open');
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
  addCodeCopyButtons();
  activatePageActions();
  activateGenerator();
  activateCopyButtons();
  activateTocHighlighting();
});
