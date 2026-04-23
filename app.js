// Menyu ilovasi: til (i18n), qidiruv (real-time), dark/light mode

const STORAGE_KEYS = {
  theme: 'oddmenu_theme',
  lang: 'oddmenu_lang',
};

const LANGS = ['uz', 'ru', 'en'];

// UI matnlar tarjimasi
const I18N = {
  uz: {
    title_sayt: 'Qala restoran Menyu',
    appName: 'Restoran Menyu',
    restaurantName: 'Qala Restaurant',
    restaurantMeta: "O'zbekiston, Xiva shahri",
    statusOpen: 'Taomlar',
    theme: 'Tema',
    contact: 'Aloqa',
    follow: 'Kuzatib boring',
    address: "Toshkent, O'zbekiston",
    made: 'Tez va qulay buyurtma',
    searchPlaceholder: 'Qidirish...',
    empty: "Hech narsa topilmadi. Qidiruv so'zini o'zgartirib ko'ring.",
  },
  ru: {
    title_sayt: 'Меню ресторана Qala',
    appName: 'Меню ресторана',
    restaurantName: 'Qala Restaurant', 
    restaurantMeta: 'Город Хива, Узбекистан',
    statusOpen: 'Блюды',
    theme: 'Тема',
    contact: 'Контакты',
    follow: 'Подписывайтесь',
    address: 'Ташкент, Узбекистан',
    made: 'Быстрый и удобный заказ',
    searchPlaceholder: 'Поиск',
    empty: 'Ничего не найдено. Попробуйте изменить запрос.',
  },
  en: {
    title_sayt: 'Qala Restaurant Menu',
    appName: 'Restaurant Menu',
    restaurantName: 'Qala Restaurant',
    restaurantMeta: 'Khiva City, Uzbekistan',
    statusOpen: 'Dishes',
    theme: 'Theme',
    contact: 'Contact',
    follow: 'Follow us',
    address: 'Tashkent, Uzbekistan',
    made: 'Fast and convenient ordering',
    searchPlaceholder: 'Search',
    empty: 'Nothing found. Try a different search.',
  },
};

const CATEGORIES = [
  {
    id: 'salads',
    img:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Salatlar', ru: 'САЛАТЫ', en: 'SALADS' },
  },
  {
    id: 'cold',
    img:
      'https://dyj6gt4964deb.cloudfront.net/images/dca7f44d-f84c-4116-ab49-10bdf5726724.jpeg',
    label: { uz: 'Sovuq gazaklar', ru: 'ХОЛОДНЫЕ ЗАКУСКИ', en: 'COLD APPETIZERS' },
  },
  {
    id: 'garnish',
    img:
      'https://sdmntprwestus2.oaiusercontent.com/files/00000000-9588-71f8-aad9-17267a95057c/raw?se=2026-04-22T10:08:24Z&sp=r&sv=2026-02-06&sr=b&scid=62f4d260-d7e1-4890-8de6-c6a9b47dd5c6&skoid=1a0ef048-201c-43e0-8950-52d58956a71a&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-04-21T20:52:12Z&ske=2026-04-22T20:52:12Z&sks=b&skv=2026-02-06&sig=bSVlm0tCv8AFjCVKilO0AwklQ88WJKHPzWXaqYCS4V8%3D',
    label: { uz: 'Garnir / sous', ru: 'ГАРНИР СОУСА', en: 'SIDES & SAUCES' },
  },
  {
    id: 'soups',
    img:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=70',
    label: { uz: "Sho'rvalar", ru: 'СУПЫ', en: 'SOUPS' },
  },
  {
    id: 'main',
    img:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Asosiy taomlar', ru: 'ОСНОВНЫЕ БЛЮДА', en: 'MAIN DISHES' },
  },
  {
    id: 'burgers',
    img:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Burgerlar', ru: 'БУРГЕРЫ', en: 'BURGERS' },
  },
  {
    id: 'pizza',
    img:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Pitsa', ru: 'ПИЦЦА ПИДЕ', en: 'PIZZA & PIDE' },
  },
  {
    id: 'pasta',
    img:
      'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Pasta', ru: 'ПАСТА', en: 'PASTA' },
  },
  {
    id: 'fish',
    img:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Baliq', ru: 'РЫБА', en: 'FISH' },
  },
  {
    id: 'dough',
    img:
      'https://images.unsplash.com/photo-1604908554027-8f5a0f8e58b4?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Xamirli taomlar', ru: 'БЛЮДА ИЗ ТЕСТА', en: 'DOUGH DISHES' },
  },
  {
    id: 'mangal',
    img:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Mangal', ru: 'МАНГАЛ', en: 'GRILL' },
  },
  {
    id: 'assorti',
    img:
      'https://images.unsplash.com/photo-1544025162-72d6a79d6f2b?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Assorti taomlar', ru: 'АССОРТИ БЛЮДА', en: 'ASSORTED DISHES' },
  },
  {
    id: 'bread',
    img:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=70',
    label: { uz: 'Non', ru: 'ХЛЕБ', en: 'BREAD' },
  },
];

const state = {
  lang: 'uz',
  theme: 'dark',
  query: '',
};

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  renderThemeIcon();
}

function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
}

function setLang(lang) {
  state.lang = LANGS.includes(lang) ? lang : 'uz';
  document.documentElement.lang = state.lang;
  localStorage.setItem(STORAGE_KEYS.lang, state.lang);
  applyI18nTexts();
  renderCategories();
}

function setQuery(q) {
  state.query = (q || '').trim().toLowerCase();
  renderCategories();
}

function applyI18nTexts() {
  const dict = I18N[state.lang] || I18N.uz;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.getAttribute('data-i18n');
    const val = dict[k];
    if (typeof val === 'string') el.textContent = val;
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.placeholder = dict.searchPlaceholder;
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

function filterCategories(items) {
  if (!state.query) return items;
  return items.filter((it) => {
    const label = (it.label[state.lang] || '').toLowerCase();
    return label.includes(state.query);
  });
}

function renderCategories() {
  const root = document.getElementById('menuRoot');
  if (!root) return;

  const filtered = filterCategories(CATEGORIES);
  root.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = (I18N[state.lang] || I18N.uz).empty;
    root.appendChild(empty);
    return;
  }

  filtered.forEach((cat) => root.appendChild(renderCategoryCard(cat)));
}

function renderCategoryCard(cat) {
  const el = document.createElement('article');
  el.className = 'cat';
  el.tabIndex = 0;

  const img = document.createElement('img');
  img.className = 'cat__img';
  img.src = cat.img;
  img.alt = cat.label[state.lang] || '';
  img.loading = 'lazy';

  const overlay = document.createElement('div');
  overlay.className = 'cat__overlay';

  const title = document.createElement('div');
  title.className = 'cat__title';
  title.textContent = cat.label[state.lang] || '';

  const open = () => {
    const urlMap = {
      'salads': 'salads.html',
      'cold': 'sovuq_gazaklar.html',
      'garnish': 'garnir.html',
      'soups': 'shorva.html',
      'main': 'asosiy_taomlar.html',
    };
    
    const url = urlMap[cat.id];
    if (url) {
      window.location.href = url;
      return;
    }

    alert(cat.label[state.lang] || '');
  };

  el.addEventListener('click', open);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') open();
  });

  el.appendChild(img);
  el.appendChild(overlay);
  el.appendChild(title);
  return el;
}

function init() {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Persisted state
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const savedLang = localStorage.getItem(STORAGE_KEYS.lang);

  if (savedTheme === 'dark' || savedTheme === 'light') state.theme = savedTheme;
  if (LANGS.includes(savedLang)) state.lang = savedLang;

  // Controls
  const langSelect = document.getElementById('langSelect');
  langSelect.value = state.lang;
  langSelect.addEventListener('change', (e) => setLang(e.target.value));

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => setQuery(e.target.value));

  // Initial render
  setTheme(state.theme);
  setLang(state.lang);
  applyI18nTexts();
  renderCategories();
}

init();
