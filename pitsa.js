const SALADS = [
    {
  id: 'vegetable_pizza',
  name: {
    uz: 'Sabzavotli pitsa',
    ru: 'Овощной пицца',
    en: 'Vegetable Pizza',
  },
  price: 65000,
},
{
  id: 'pepperoni_pizza',
  name: {
    uz: 'Pepperoni pitsa',
    ru: 'Пицца Пеперони',
    en: 'Pepperoni Pizza',
  },
  price: 80000,
},
{
  id: 'margarita_pizza',
  name: {
    uz: 'Margarita pitsa',
    ru: 'Пицца Маргарита',
    en: 'Margarita Pizza',
  },
  price: 60000,
},
{
  id: 'meat_pizza',
  name: {
    uz: 'Go‘shtli pitsa',
    ru: 'Пицца мясной',
    en: 'Meat Pizza',
  },
  price: 85000,
},
{
  id: 'caesar_pizza',
  name: {
    uz: 'Sezar pitsa',
    ru: 'Пицца Цезарь',
    en: 'Caesar Pizza',
  },
  price: 80000,
},
{
  id: 'steak_pizza',
  name: {
    uz: 'Steyk pitsa',
    ru: 'Стейк Пицца',
    en: 'Steak Pizza',
  },
  price: 90000,
},
{
  id: 'cheese_pide',
  name: {
    uz: 'Pishloqli pide',
    ru: 'Пиде Сырный',
    en: 'Cheese Pide',
  },
  price: 55000,
},
{
  id: 'sausage_pide',
  name: {
    uz: 'Kolbasali pide',
    ru: 'Пиде колбаски',
    en: 'Sausage Pide',
  },
  price: 65000,
},
{
  id: 'meat_pide',
  name: {
    uz: 'Go‘shtli pide',
    ru: 'Пиде мясной',
    en: 'Meat Pide',
  },
  price: 75000,
},
{
  id: 'minced_pide',
  name: {
    uz: 'Qiyma bilan pide',
    ru: 'Пиде с Фаршом',
    en: 'Minced Meat Pide',
  },
  price: 70000,
},
];

const STORAGE_KEYS = {
  theme: 'oddmenu_theme',
  lang: 'oddmenu_lang',
};

const LANGS = ['uz', 'ru', 'en'];

const I18N = {
  uz: {
    title_sayt: 'Pitsa & Pide — Qala Restaurant',
    title: 'PITSALAR',
    back: 'Orqaga',
    restaurantMeta: "O'zbekiston, Xiva shahri",
    statusOpen: 'Taomlar',
  },
  ru: {
    title_sayt: 'Пицца & Пиде — Qala Restaurant',
    title: 'ПИЦЦА И ПИДЕ',
    back: 'Назад',
    restaurantMeta: 'Город Хива, Узбекистан',
    statusOpen: 'Блюды',
  },
  en: {
    title_sayt: 'Pizza & Pide — Qala Restaurant',
    title: 'PIZZA AND PIDE',
    back: 'Back',
    restaurantMeta: 'Khiva City, Uzbekistan',
    statusOpen: 'Dishes',
  },
};

const state = {
  lang: 'ru',
  theme: 'dark',
};

function formatUZS(amount) {
  const spaced = new Intl.NumberFormat('uz-UZ').format(amount);
  return `${spaced} so'm`;
}

function setTheme(theme) {
  state.theme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  renderThemeIcon();
}

function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
}

function setLang(lang) {
  state.lang = LANGS.includes(lang) ? lang : 'ru';
  document.documentElement.lang = state.lang;
  localStorage.setItem(STORAGE_KEYS.lang, state.lang);
  applyI18n();
  render();
}

function getSaladName(item) {
  const n = item?.name;
  if (!n) return '';
  if (typeof n === 'string') return n;
  return n[state.lang] || n.ru || n.en || '';
}

function applyI18n() {
  const dict = I18N[state.lang] || I18N.ru;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.getAttribute('data-i18n');
    if (dict[k]) el.textContent = dict[k];
  });
}

function renderThemeIcon() {
  const holder = document.querySelector('[data-theme-icon]');
  if (!holder) return;
  holder.innerHTML = state.theme === 'dark' ? moonSvg() : sunSvg();
}

function sunSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8ZM11 2h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2ZM4.2 4.2l1.4-1.4l2.1 2.1l-1.4 1.4L4.2 4.2Zm12.1 12.1l1.4-1.4l2.1 2.1l-1.4 1.4l-2.1-2.1ZM19.8 4.2l-2.1 2.1l-1.4-1.4l2.1-2.1l1.4 1.4ZM7.4 17.7l-2.1 2.1l-1.4-1.4l2.1-2.1l1.4 1.4Z" />
    </svg>
  `;
}

function moonSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 14.2A8.2 8.2 0 0 1 9.8 3a7.2 7.2 0 1 0 11.2 11.2Z" />
    </svg>
  `;
}

function escapeXml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function svgDataUri(title) {
  const t = escapeXml(title.toUpperCase());

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b0a0a"/>
      <stop offset="0.55" stop-color="#0b0b0c"/>
      <stop offset="1" stop-color="#2a0a0a"/>
    </linearGradient>
    <linearGradient id="o" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ff6f00" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ff8f00" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#g)"/>
  <circle cx="980" cy="-40" r="220" fill="url(#o)" opacity="0.22"/>
  <circle cx="120" cy="720" r="260" fill="url(#o)" opacity="0.18"/>
  <text x="60" y="380" fill="#ffffff" font-family="Roboto, Arial" font-size="52" font-weight="700" opacity="0.92">${t}</text>
</svg>`;

  const encoded = encodeURIComponent(svg)
    .replaceAll('%0A', '')
    .replaceAll('%20', ' ');

  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

function render() {
  const root = document.getElementById('list');
  root.innerHTML = '';

  SALADS.forEach((s) => {
    const displayName = getSaladName(s);
    const el = document.createElement('article');
    el.className = 'item';

    const img = document.createElement('img');
    img.className = 'item__img';
    img.alt = displayName;
    img.loading = 'lazy';
    img.src = svgDataUri(displayName);

    const body = document.createElement('div');
    body.className = 'item__body';

    const name = document.createElement('h3');
    name.className = 'item__name';
    name.textContent = displayName;

    const price = document.createElement('p');
    price.className = 'item__price';
    price.textContent = formatUZS(s.price);

    body.appendChild(name);
    body.appendChild(price);

    el.appendChild(img);
    el.appendChild(body);

    root.appendChild(el);
  });
}

function init() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const savedLang = localStorage.getItem(STORAGE_KEYS.lang);

  if (savedTheme === 'dark' || savedTheme === 'light') state.theme = savedTheme;
  if (LANGS.includes(savedLang)) state.lang = savedLang;

  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.value = state.lang;
    langSelect.addEventListener('change', (e) => setLang(e.target.value));
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  setTheme(state.theme);
  setLang(state.lang);
  applyI18n();
  render();
}

init();
