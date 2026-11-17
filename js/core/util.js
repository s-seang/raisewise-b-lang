/* RaiseWise — shared helpers. Everything hangs off one global namespace: RW */
window.RW = window.RW || {};

RW.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

RW.money = (n) => '$' + Number(n || 0).toLocaleString('en-US');
RW.moneyShort = (n) => {
  n = Number(n || 0);
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n;
};
RW.uid = (p = 'id') => p + '-' + Math.random().toString(36).slice(2, 8);
RW.today = () => new Date().toISOString();
RW.fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(RW.i18n && RW.i18n.lang === 'km' ? 'km-KH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) { return iso; }
};
RW.initials = (name) => String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

/* Deterministic colour per entity so avatars stay stable between renders */
RW.colorFor = (key) => {
  const palette = ['#0F7F75', '#16386A', '#B7791F', '#7C3AED', '#0E7490', '#BE185D', '#15803D', '#9A3412', '#4338CA', '#0F766E'];
  let h = 0; for (const ch of String(key)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
};

RW.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
RW.$ = (sel, root = document) => root.querySelector(sel);
RW.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
