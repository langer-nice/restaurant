// Language helper for multilingual site
const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'fr', 'it'];

function getLangFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang && SUPPORTED_LANGS.includes(lang)) return lang;
  return DEFAULT_LANG;
}

function setLangLinks(lang) {
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

async function loadTranslations(lang) {
  const res = await fetch(`/locales/${lang}.json`);
  return res.json();
}

function applyTranslations(t) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}

function updateLangSwitcher(currentLang) {
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.onclick = () => {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', btn.dataset.lang);
      window.location.href = url.toString();
    };
  });
  setLangLinks(currentLang);
}

function updateNavLinks(currentLang) {
  document.querySelectorAll('nav a[data-i18n]').forEach(link => {
    const url = new URL(link.getAttribute('href'), window.location.origin);
    url.searchParams.set('lang', currentLang);
    link.setAttribute('href', url.pathname + url.search);
  });
}

export async function initI18n() {
  const lang = getLangFromQuery();
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  updateLangSwitcher(lang);
  updateNavLinks(lang);
}

// For direct script usage
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initI18n();
  });
}
