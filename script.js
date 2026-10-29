const wrappers = [...document.querySelectorAll('.collapsible-wrapper')];
wrappers.forEach((wrapper, index) => {
  const button = wrapper.querySelector('.collapsible');
  const content = wrapper.querySelector('.content');
  content.id = `section-${index + 1}`;
  content.hidden = true;
  button.setAttribute('aria-controls', content.id);
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.classList.toggle('active', !expanded);
    content.hidden = expanded;
  });
});
// Keep year links keyboard accessible and independently expandable.
document.querySelectorAll('.year-card').forEach((card, index) => {
  card.removeAttribute('onclick');
  const inner = card.querySelector('.year-card-inner');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = inner.className;
  button.innerHTML = inner.innerHTML;
  inner.replaceWith(button);
  const links = card.querySelector('.year-links');
  links.id = `year-links-${index + 1}`;
  links.hidden = true;
  button.setAttribute('aria-controls', links.id);
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    links.hidden = expanded;
  });
});
const search = document.getElementById('search');
const count = document.getElementById('result-count');
const empty = document.getElementById('empty-state');
function filterItems() {
  const query = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  wrappers.forEach(wrapper => {
    const matches = wrapper.textContent.toLocaleLowerCase().includes(query);
    wrapper.hidden = !matches;
    if (matches) visible++;
  });
  count.textContent = `${visible} รายการ`;
  empty.hidden = visible !== 0;
}
search.addEventListener('input', filterItems);
filterItems();
const themeButton = document.getElementById('theme-toggle-btn');
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeButton.innerHTML = `<i class='bx ${dark ? 'bx-sun' : 'bx-moon'}' aria-hidden='true'></i>`;
  themeButton.setAttribute('aria-label', dark ? 'เปิดโหมดสว่าง' : 'เปิดโหมดมืด');
}
try { setTheme(localStorage.getItem('theme') === 'dark'); } catch (_) { setTheme(false); }
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-mode');
  setTheme(dark);
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
});
