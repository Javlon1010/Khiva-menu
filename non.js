const MAIN_DISHES = [
    {
  id: 'bread_assorti',
  name: {
    uz: 'Non assorti',
    ru: 'Хлеб ассорти',
    en: 'Bread Assorti',
  },
  price: 25000,
},
{
  id: 'chorak_bread',
  name: {
    uz: 'Chorak non',
    ru: 'Чорак',
    en: 'Chorak Bread',
  },
  price: 10000,
},
{
  id: 'chorak_bread_05',
  name: {
    uz: 'Chorak non 0.5',
    ru: 'Чорак 0.5',
    en: 'Chorak Bread 0.5',
  },
  price: 6000,
},
{
  id: 'patir',
  name: {
    uz: 'Patir',
    ru: 'Патир',
    en: 'Patir',
  },
  price: 15000,
},
{
  id: 'patir_05',
  name: {
    uz: 'Patir 0.5',
    ru: 'Патир 0.5',
    en: 'Patir 0.5',
  },
  price: 8000,
},
{
  id: 'red_bread',
  name: {
    uz: 'Qizil non',
    ru: 'Кизил нон',
    en: 'Red Bread',
  },
  price: 15000,
},
{
  id: 'red_bread_05',
  name: {
    uz: 'Qizil non 0.5',
    ru: 'Кизил нон 0.5',
    en: 'Red Bread 0.5',
  },
  price: 8000,
},
{
  id: 'black_bread',
  name: {
    uz: 'Qora non',
    ru: 'Кора нон',
    en: 'Black Bread',
  },
  price: 8000,
},
{
  id: 'black_bread_05',
  name: {
    uz: 'Qora non 0.5',
    ru: 'Кора нон 0.5',
    en: 'Black Bread 0.5',
  },
  price: 4000,
},
{
  id: 'loaf',
  name: {
    uz: 'Buxanka',
    ru: 'Буханка',
    en: 'Loaf',
  },
  price: 6000,
},
{
  id: 'loaf_05',
  name: {
    uz: 'Buxanka 0.5',
    ru: 'Буханка 0.5',
    en: 'Loaf 0.5',
  },
  price: 3000,
},
];

const STORAGE_KEYS = {
  theme: 'oddmenu_theme',
  lang: 'oddmenu_lang',
};

const LANGS = ['uz', 'ru', 'en'];

const I18N = {
  uz: {
    title_sayt: 'Nonlar — Qala Restaurant',
    title: 'NONLAR',
    back: 'Orqaga',
    restaurantMeta: "O'zbekiston, Xiva shahri",
    statusOpen: 'Taomlar',
  },
  ru: {
    title_sayt: 'Хлеб — Qala Restaurant',
    title: 'ХЛЕБ',
    back: 'Назад',
    restaurantMeta: 'Город Хива, Узбекистан',
    statusOpen: 'Блюды',
  },
  en: {
    title_sayt: 'Bread — Qala Restaurant',
    title: 'BREAD',
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

  MAIN_DISHES.forEach((s) => {
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
