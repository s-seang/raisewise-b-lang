/* RaiseWise — reusable UI components (return HTML strings). */
(function () {
  const { esc, icon } = RW;
  const t = (...a) => RW.t(...a);

  RW.ui = {
    badge: (text, tone = '', ic) => `<span class="badge ${tone}">${ic ? icon(ic) : ''}${text}</span>`,
    demoBadge: (key = 'demo.business') => `<span class="badge demo">${icon('flag')}${t(key)}</span>`,

    pageHead: (title, sub, actions = '') => `
      <div class="page-head"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${actions ? `<div class="row wrap">${actions}</div>` : ''}</div>`,

    stat: ({ label, value, sub = '', ic = 'chart' }) => `
      <div class="card stat"><div class="row between top"><div class="stat-label">${label}</div><div class="stat-icon">${icon(ic)}</div></div>
      <div class="stat-value">${value}</div><div class="stat-sub">${sub}</div></div>`,

    bar: (v, tone) => {
      const cls = tone || (v >= 75 ? '' : v >= 55 ? 'warn' : 'low');
      return `<div class="bar ${cls}"><span style="width:${RW.clamp(v, 0, 100)}%"></span></div>`;
    },

    ring(value, label = '') {
      const r = 52, c = 2 * Math.PI * r, off = c * (1 - value / 100);
      const color = value >= 75 ? 'var(--teal-500)' : value >= 55 ? '#E08A1E' : '#D9534F';
      return `<div class="ring"><svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="#E9EEF4" stroke-width="10"/>
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
        <div class="ring-val"><b>${value}</b><small>${label}</small></div></div>`;
    },

    avatar: (name, size = '') => `<div class="avatar ${size}" style="background:${RW.colorFor(name)}">${esc(RW.initials(name))}</div>`,

    empty: ({ title, text = '', ic = 'search', action = '' }) => `
      <div class="empty"><div class="empty-icon">${icon(ic)}</div><h3>${title}</h3><p class="small">${text}</p>${action}</div>`,

    notice: (text, tone = 'info', ic) => `<div class="notice ${tone}">${icon(ic || (tone === 'warn' ? 'alert' : tone === 'success' ? 'checkCircle' : 'info'))}<div>${text}</div></div>`,

    statusBadge(st) {
      const tone = { verified: 'success', pending: 'warning', rejected: 'danger' }[st] || '';
      return RW.ui.badge(t('st.' + st), tone, st === 'verified' ? 'shield' : null);
    },

    levelBadge(score) {
      const lvl = RW.db.readinessLevel(score);
      return RW.ui.badge(t('level.' + lvl), { strong: 'success', developing: 'warning', early: 'danger' }[lvl]);
    },

    /* Placeholder for modules that exist in the architecture but are built in a later stage.
       Deliberately has NO action buttons other than real navigation. */
    modulePlaceholder({ title, sub, features = [], back }) {
      return `${RW.ui.pageHead(title, sub, RW.ui.badge(t('ph.title'), 'info', 'layers'))}
        <div class="module-placeholder">
          <h3>${t('ph.title')}</h3>
          <p class="small">${t('ph.text')}</p>
          ${features.length ? `<h4 class="mt-2">${t('ph.will')}</h4><ul>${features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
          ${back ? `<a class="btn btn-outline mt-3" href="#${back}">${icon('arrowLeft')}${t('ph.back')}</a>` : ''}
        </div>`;
    },

    langToggle: () => `<div class="lang-toggle" role="group" aria-label="Language">
      <button class="${RW.i18n.lang === 'en' ? 'on' : ''}" data-action="set-lang" data-lang="en" aria-pressed="${RW.i18n.lang === 'en'}">EN</button>
      <button class="${RW.i18n.lang === 'km' ? 'on' : ''}" data-action="set-lang" data-lang="km" aria-pressed="${RW.i18n.lang === 'km'}">ខ្មែរ</button></div>`,

    toast(text, tone = 'success') {
      const root = document.getElementById('toast-root');
      const el = document.createElement('div');
      el.className = 'toast ' + tone;
      el.innerHTML = icon(tone === 'warn' ? 'alert' : tone === 'danger' ? 'alert' : 'checkCircle') + `<div>${text}</div>`;
      root.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    },

    confirm({ title, body, confirmText, onConfirm, danger }) {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" data-action="modal-close"><div class="modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
          <div class="modal-head"><h3>${title}</h3><button class="icon-btn" data-action="modal-close" aria-label="Close">${icon('x')}</button></div>
          <div class="modal-body"><p class="mb-0">${body}</p></div>
          <div class="modal-foot"><button class="btn btn-outline" data-action="modal-close">${t('act.cancel')}</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="modal-confirm">${confirmText || t('act.confirm')}</button></div>
        </div></div>`;
      RW.ui._onConfirm = onConfirm;
    },
    closeModal() { document.getElementById('modal-root').innerHTML = ''; RW.ui._onConfirm = null; },
  };

  /* ---------- Shared domain cards ---------- */
  RW.cards = {
    smeCard(sme, { match, href, showSave } = {}) {
      const score = RW.db.readiness(sme);
      const saved = showSave && RW.db.isSaved('investor', sme.id);
      return `<div class="card hover">
        <div class="row top">
          ${RW.ui.avatar(sme.name)}
          <div class="grow"><a class="li-title" href="#${href}" style="font-weight:700;color:var(--navy-900)">${esc(sme.name)}</a>
          <div class="xs muted">${esc(RW.L(RW.seed.industries[sme.industry]))} · ${esc(RW.L(RW.seed.provinces[sme.province]))}</div></div>
          ${match ? `<div class="match-pct center">${match.pct}%<small>${t('match.pct')}</small></div>` : ''}
        </div>
        <p class="small mt-1 mb-1">${esc(RW.L(sme.tagline))}</p>
        <div class="row wrap mb-2">${RW.ui.demoBadge()}${RW.ui.badge(t('stage.' + sme.stage), 'teal')}${sme.esg ? RW.ui.badge('ESG', 'success', 'leaf') : ''}</div>
        <div class="grid g-2" style="gap:10px">
          <div><div class="xs muted">${t('sme.ask')}</div><b>${RW.moneyShort(sme.ask)}</b></div>
          <div><div class="xs muted">${t('dash.readiness')}</div><b>${score}</b><span class="xs muted"> / 100</span></div>
        </div>
        <div class="row mt-2">
          <a class="btn btn-outline btn-sm" href="#${href}">${t('act.view')}</a>
          ${showSave ? `<button class="btn btn-sm ${saved ? 'is-active' : 'btn-ghost'}" data-action="toggle-save" data-role="investor" data-id="${sme.id}">${icon('bookmark')}${saved ? t('act.saved') : t('act.save')}</button>` : ''}
        </div></div>`;
    },

    investorCard(inv, { href } = {}) {
      return `<div class="card hover">
        <div class="row top">${RW.ui.avatar(inv.name)}
          <div class="grow"><div style="font-weight:700;color:var(--navy-900)">${esc(inv.name)}</div>
          <div class="xs muted">${t('kind.' + inv.kind)} · ${esc(inv.hq)}</div></div></div>
        <p class="small mt-1 mb-1">${esc(inv.about)}</p>
        <div class="row wrap">${RW.ui.demoBadge('demo.illustrative')}${RW.ui.badge(RW.moneyShort(inv.ticketMin) + '–' + RW.moneyShort(inv.ticketMax), 'gold')}</div>
        ${href ? `<a class="btn btn-outline btn-sm mt-2" href="#${href}">${t('act.view')}</a>` : ''}
      </div>`;
    },

    readinessBreakdown(sme) {
      return `<div class="stack">${Object.keys(sme.dims).map((k) => `
        <div class="meter-row"><span>${t('dim.' + k)}</span><b class="small" style="text-align:right">${sme.dims[k]}</b>${RW.ui.bar(sme.dims[k])}</div>`).join('')}</div>`;
    },

    matchDetail(m, { compact } = {}) {
      const list = (arr, cls, ic) => arr.map((r) => `<div class="reason ${cls}">${icon(ic)}<span>${r}</span></div>`).join('');
      return `<div class="grid ${compact ? '' : 'g-2'}" style="gap:14px">
        <div><div class="xs bold muted mb-1">${t('match.reasons')}</div>${list(m.reasons, 'ok', 'checkCircle')}</div>
        <div><div class="xs bold muted mb-1">${t('match.gaps')}</div>${m.gaps.length ? list(m.gaps, 'gap', 'alert') : `<div class="reason ok">${icon('check')}<span>${t('match.nogaps')}</span></div>`}</div>
      </div>`;
    },
  };
})();
