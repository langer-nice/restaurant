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
  // Update dropdown selected language display
  const selectedLangSpan = document.querySelector('.selected-lang');
  if (selectedLangSpan) {
    selectedLangSpan.textContent = lang.toUpperCase();
  }
  
  // Update selected flag
  const selectedFlag = document.getElementById('selectedFlag');
  const langOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
  if (selectedFlag && langOption) {
    const flagSrc = langOption.getAttribute('data-flag');
    if (flagSrc) {
      selectedFlag.src = flagSrc;
    }
  }
  
  // Update active state on dropdown options
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.toggle('active', option.dataset.lang === lang);
  });
  
  // Fallback for old button system if it exists
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
  // Handle dropdown language options
  document.querySelectorAll('.lang-option').forEach(option => {
    option.onclick = () => {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', option.dataset.lang);
      window.location.href = url.toString();
    };
  });
  
  // Fallback for old button system if it exists
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
  
  // Ensure dropdown shows correct language
  const selectedLangSpan = document.querySelector('.selected-lang');
  if (selectedLangSpan) {
    selectedLangSpan.textContent = lang.toUpperCase();
  }
  
  // Set active state on correct option
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.toggle('active', option.dataset.lang === lang);
  });
}

// For direct script usage
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initI18n();
  });
}
