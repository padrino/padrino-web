function activateToggle(buttonId, target, openClass) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = target.classList.toggle(openClass);
    button.setAttribute('aria-expanded', isOpen);
  });
}

function activateDocsSidebar() {
  const sidebar = document.getElementById('docs-sidebar');
  const button = document.getElementById('docs-sidebar-toggle');
  if (!sidebar || !button) return;

  const setOpen = (isOpen) => {
    sidebar.classList.toggle('is-open', isOpen);
    button.setAttribute('aria-expanded', isOpen);
    if (!isOpen) return;

    const nav = document.getElementById('docs-sidebar-nav');
    const active = nav.querySelector('.sidebar__link.is-active');
    if (active) {
      const offset = active.getBoundingClientRect().top - nav.getBoundingClientRect().top;
      nav.scrollTop += offset - nav.clientHeight / 2;
    }
  };

  button.addEventListener('click', () => {
    setOpen(!sidebar.classList.contains('is-open'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
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

// Code blocks and tables that scroll sideways need to be focusable, so keyboard users can scroll them
function makeScrollAreasFocusable() {
  const areas = document.querySelectorAll('.content pre, .content table, .code-window pre');
  const update = () => {
    for (const area of areas) {
      if (area.scrollWidth > area.clientWidth) {
        area.tabIndex = 0;
        if (area.tagName === 'PRE') {
          area.setAttribute('role', 'group');
          area.setAttribute('aria-label', 'Code example');
        }
      } else {
        area.removeAttribute('tabindex');
        if (area.getAttribute('aria-label') === 'Code example') {
          area.removeAttribute('role');
          area.removeAttribute('aria-label');
        }
      }
    }
  };
  update();
  window.addEventListener('resize', update);
}

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

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

// Split the raw text once on all terms, then escape each piece, so a later term can never match
// inside an earlier <mark> or an escaped entity such as &amp;.
function highlightTerms(text, terms) {
  if (!terms.length) return escapeHtml(text);
  const alternation = [...terms]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  return text
    .split(new RegExp(`(${alternation})`, 'gi'))
    .map((part, i) => (i % 2 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
    .join('');
}

function searchGuides(index, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return { terms, results: [] };

  const results = [];

  for (const guide of index) {
    const title = guide.title.toLowerCase();
    const text = guide.text.toLowerCase();
    let score = 0;

    const matchesAll = terms.every((term) => {
      const inTitle = title.includes(term);
      const occurrences = text.split(term).length - 1;
      if (inTitle) score += 20;
      score += Math.min(occurrences, 20);
      return inTitle || occurrences > 0;
    });
    if (!matchesAll) continue;

    const phrase = terms.join(' ');
    if (terms.length > 1) score += 3 * Math.min(text.split(phrase).length - 1, 5);

    const titleMatches = terms.every((term) => title.includes(term));
    const heading = !titleMatches && guide.headings.find((h) => {
      const headingText = h.text.toLowerCase();
      return terms.every((term) => headingText.includes(term));
    });
    if (heading) score += 10;

    let position = text.indexOf(phrase);
    if (position === -1) position = text.indexOf(terms[0]);
    const start = Math.max(0, position - 60);
    const snippet = `${start > 0 ? '…' : ''}${guide.text.slice(start, start + 160)}…`;

    results.push({
      score,
      url: heading ? `${guide.url}#${heading.id}` : guide.url,
      title: guide.title,
      context: heading ? `${guide.chapter} › ${guide.title}` : guide.chapter,
      heading: heading && heading.text,
      snippet
    });
  }

  results.sort((a, b) => b.score - a.score);
  return { terms, results: results.slice(0, 12) };
}

function activateSearch() {
  const dialog = document.getElementById('search');
  const openButton = document.getElementById('search-open');
  if (!dialog || !openButton) return;

  const input = document.getElementById('search-input');
  const list = document.getElementById('search-results');
  const status = document.getElementById('search-status');
  let index = null;
  let selected = 0;

  const loadIndex = async () => {
    index ??= await (await fetch('/search.json')).json();
    return index;
  };

  const select = (position) => {
    const items = list.querySelectorAll('.search-results__link');
    if (!items.length) return;
    selected = (position + items.length) % items.length;
    items.forEach((item, i) => item.setAttribute('aria-selected', i === selected));
    items[selected].scrollIntoView({ block: 'nearest' });
  };

  const render = async () => {
    const query = input.value.trim();
    if (!query) {
      list.innerHTML = '';
      status.textContent = 'Type to search the guides.';
      status.hidden = false;
      return;
    }

    const found = searchGuides(await loadIndex(), query);
    list.innerHTML = found.results.map((result) => `
      <li><a class="search-results__link" role="option" href="${result.url}">
        <span class="search-results__context">${escapeHtml(result.context)}</span>
        <span class="search-results__title">${highlightTerms(result.heading || result.title, found.terms)}</span>
        <span class="search-results__snippet">${highlightTerms(result.snippet, found.terms)}</span>
      </a></li>
    `).join('');
    status.textContent = `No results for "${query}".`;
    status.hidden = found.results.length > 0;
    select(0);
  };

  const open = () => {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    loadIndex();
  };

  if (!/Mac|iPhone|iPad/.test(navigator.platform)) {
    openButton.querySelector('.search-trigger__mod').textContent = 'Ctrl';
  }

  openButton.addEventListener('click', open);
  document.getElementById('search-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  input.addEventListener('input', render);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); select(selected + 1); }
    if (event.key === 'ArrowUp') { event.preventDefault(); select(selected - 1); }
    if (event.key === 'Enter') {
      const current = list.querySelectorAll('.search-results__link')[selected];
      if (current) { event.preventDefault(); window.location.href = current.href; dialog.close(); }
    }
  });

  document.addEventListener('keydown', (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
      event.preventDefault();
      open();
    }
  });
}

function activatePageActions() {
  const copyButton = document.querySelector('.page-actions__copy');
  const menu = document.querySelector('.page-actions__menu');

  copyButton?.addEventListener('click', async () => {
    const response = await fetch(copyButton.dataset.copyUrl);
    if (!response.ok) throw new Error(`Could not load ${copyButton.dataset.copyUrl} (${response.status})`);
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
  activateDocsSidebar();
  activateThemeToggle();
  activateHeadingAnchors();
  makeScrollAreasFocusable();
  addCodeCopyButtons();
  activatePageActions();
  activateGenerator();
  activateCopyButtons();
  activateTocHighlighting();
  activateSearch();
});
