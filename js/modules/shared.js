/* RaiseWise — shared portal actions and modules used by more than one role. */
(function () {
  const { icon, esc } = RW;
  const t = (...a) => RW.t(...a);
  const ui = RW.ui;

  /* ---------- Global actions ---------- */
  Object.assign(RW.actions, {
    'set-lang': (el) => { RW.i18n.set(el.dataset.lang); RW.render(); },

    'demo-login': (el) => {
      const role = el.dataset.role;
      RW.store.login(role);
      const resume = RW.afterLogin && RW.afterLogin.startsWith('/' + role + '/') ? RW.afterLogin : null;
      RW.afterLogin = null;
      RW.flash = { text: t('auth.welcome', { role: t('role.' + role) }), tone: 'success' };
      RW.go(resume || `/${role}/${el.dataset.next || 'dashboard'}`);
    },

    'switch-role': (el) => {
      const role = el.value;
      const current = RW.path().split('/')[2];
      RW.store.login(role);
      const sameModule = RW.portalNav[role].some((g) => g.items.some(([k]) => k === current));
      RW.flash = { text: t('auth.welcome', { role: t('role.' + role) }), tone: 'success' };
      RW.go(`/${role}/${sameModule ? current : 'dashboard'}`);
    },

    logout: () => { RW.store.logout(); RW.flash = { text: t('auth.signedout'), tone: 'success' }; RW.go('/'); },

    'reset-demo': () => ui.confirm({
      title: t('demo.reset'), body: t('demo.reset.confirm'), danger: true, confirmText: t('demo.reset'),
      onConfirm: () => { RW.store.reset(); ui.toast(t('demo.reset.done')); RW.render(); },
    }),

    'modal-close': () => ui.closeModal(),
    'modal-confirm': () => { const fn = ui._onConfirm; ui.closeModal(); if (fn) fn(); },

    'toggle-menu': () => { const n = document.getElementById('site-nav'); if (n) n.classList.toggle('open'); },
    'toggle-sidebar': () => { const s = document.getElementById('sidebar'); if (s) s.classList.toggle('open'); },

    'toggle-save': (el) => {
      const role = el.dataset.role, id = el.dataset.id;
      const now = RW.db.toggleSaved(role, id);
      const name = role === 'sme' ? RW.db.investor(id).name : RW.db.sme(id).name;
      ui.toast(t(now ? 'toast.saved' : 'toast.unsaved', { x: esc(name) }));
      RW.rerenderKeepFocus();
    },

    'express-interest': (el) => {
      const from = el.dataset.from, smeId = el.dataset.sme, invId = el.dataset.inv;
      RW.db.addInterest(from, smeId, invId);
      ui.toast(t('toast.interest', { x: esc(from === 'sme' ? RW.db.investor(invId).name : RW.db.sme(smeId).name) }));
      RW.render();
    },

    'mark-all-read': () => { RW.db.markAllRead(RW.store.get().session.role); ui.toast(t('notif.marked')); RW.render(); },
  });

  /* ---------- Helpers for module registration ---------- */
  RW.portalRoute = (role, key, title, render, extra = {}) =>
    RW.route(`/${role}/${key}`, Object.assign({ role, layout: 'portal', nav: key, title, render }, extra));

  /* Register a scaffolded module that will be built in a later stage */
  RW.placeholder = (role, key, title, features) =>
    RW.portalRoute(role, key, title, () => ui.modulePlaceholder({
      title: t(title), sub: t('demo.simulated'), features, back: `/${role}/dashboard`,
    }));

  /* ---------- Shared: Academy catalog (all roles) ---------- */
  function academyView(role) {
    const prog = RW.seed.academyProgress[role] || { done: 0, total: 41 };
    const pct = Math.round((prog.done / prog.total) * 100);
    const aud = { all: 'ac.for.all', sme: 'ac.for.sme', investor: 'ac.for.inv' };
    return `${ui.pageHead(t('ac.title'), t('ac.sub'))}
      ${role !== 'admin' ? `<div class="card mb-3"><div class="row between wrap"><div><b>${t('dash.academy')}</b><div class="xs muted">${t('dash.academy.sub', { a: prog.done, b: prog.total })}</div></div><b class="text-teal">${pct}%</b></div><div class="mt-1">${ui.bar(pct, 'gold')}</div></div>` : ''}
      <h3>${t('ac.categories')}</h3>
      <div class="grid g-2">${RW.seed.academy.map((c) => `
        <div class="card cat-card"><div class="cat-ic" style="background:${c.color}1A;color:${c.color}">${c.code}</div>
          <div class="grow"><div class="row between"><h4 class="mb-0">${esc(RW.L(c.title))}</h4>${ui.badge(t(aud[c.audience]))}</div>
          <p class="xs mt-1 mb-1">${esc(RW.L(c.desc))}</p><span class="badge teal">${t('academy.lessons', { n: c.lessons })}</span></div></div>`).join('')}</div>
      <div class="mt-3">${ui.notice(t('academy.stage2'), 'info', 'layers')}</div>`;
  }
  ['sme', 'investor', 'admin'].forEach((role) => {
    if (role !== 'admin') RW.portalRoute(role, 'academy', 'm.academy', () => academyView(role));
  });
  RW.academyView = academyView;

  /* ---------- Shared: Notifications ---------- */
  ['sme', 'investor', 'admin'].forEach((role) => RW.portalRoute(role, 'notifications', 'm.notifications', () => {
    const list = RW.db.notifications(role);
    const unread = list.some((n) => !n.read);
    return `${ui.pageHead(t('notif.title'), t('notif.sub'), unread ? `<button class="btn btn-outline btn-sm" data-action="mark-all-read">${icon('check')}${t('notif.markall')}</button>` : '')}
      <div class="card">${list.length ? list.map((n) => `
        <div class="list-item"><div class="stat-icon" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--teal-50);color:var(--teal-700)">${icon(n.icon)}</div>
          <div class="grow"><div class="li-title" style="font-weight:${n.read ? 500 : 700}">${esc(RW.L(n.text))}</div><div class="li-sub">${RW.fmtDate(n.date)}</div></div>
          ${n.read ? '' : ui.badge(t('notif.new'), 'gold')}</div>`).join('') : ui.empty({ title: t('notif.empty'), ic: 'bell' })}</div>`;
  }));

  /* ---------- Shared: SME profile detail (investor view; reused by admin) ---------- */
  RW.smeProfileView = function (sme, { viewer }) {
    const score = RW.db.readiness(sme);
    const inv = viewer === 'investor' ? RW.db.currentInvestor() : null;
    const m = inv ? RW.match(sme, inv) : null;
    const saved = inv && RW.db.isSaved('investor', sme.id);
    const interested = inv && RW.db.hasInterest('investor', sme.id, inv.id);
    const requested = inv && RW.db.hasDocRequest(inv.id, sme.id);
    const kv = (k, v) => `<dt>${t(k)}</dt><dd>${v}</dd>`;

    return `<a class="btn btn-ghost btn-sm mb-2" href="#/${viewer}/${viewer === 'investor' ? 'discover' : 'smes'}">${icon('arrowLeft')}${t('act.back')}</a>
      <div class="card mb-3"><div class="row top wrap" style="gap:18px">
        ${ui.avatar(sme.name, 'lg')}
        <div class="grow"><h1 style="font-size:26px;margin:0">${esc(sme.name)}</h1>
          <p class="mb-1">${esc(RW.L(sme.tagline))}</p>
          <div class="row wrap">${ui.demoBadge()}${ui.statusBadge(RW.db.status(sme))}${ui.badge(t('stage.' + sme.stage), 'teal')}${sme.esg ? ui.badge('ESG', 'success', 'leaf') : ''}</div></div>
        ${inv ? `<div class="row wrap">
          <button class="btn ${saved ? 'is-active' : 'btn-outline'}" data-action="toggle-save" data-role="investor" data-id="${sme.id}">${icon('bookmark')}${saved ? t('act.saved') : t('act.save')}</button>
          <button class="btn btn-primary" data-action="express-interest" data-from="investor" data-sme="${sme.id}" data-inv="${inv.id}" ${interested ? 'disabled' : ''}>${icon(interested ? 'check' : 'heart')}${interested ? t('act.interested') : t('act.interest')}</button></div>` : ''}
      </div></div>
      <div class="grid g-detail" style="align-items:start">
        <div class="stack">
          <div class="card"><h3>${t('sme.about')}</h3><p>${esc(sme.about)}</p>
            <dl class="kv">${kv('sme.industry', esc(RW.L(RW.seed.industries[sme.industry])))}${kv('sme.location', esc(RW.L(RW.seed.provinces[sme.province])))}
              ${kv('sme.founded', sme.founded)}${kv('sme.employees', sme.employees)}${kv('sme.revenue', RW.money(sme.revenue) + ' <span class="xs muted">(' + t('demo.label') + ')</span>')}
              ${kv('sme.ask', RW.money(sme.ask))}${kv('sme.seeking', sme.seeking.map((x) => t('type.' + x)).join(', '))}${kv('sme.use', esc(sme.use))}
              ${kv('sme.impact', sme.impact.map((x) => `<span class="chip">${esc(x)}</span>`).join(' '))}</dl></div>
          ${m ? `<div class="card"><div class="card-head"><h3>${t('sme.fit')}</h3>${m.eligible ? `<span class="match-pct">${m.pct}%</span>` : ui.badge(t('match.fit.outside'), 'warning')}</div>
            ${RW.cards.matchDetail(m)}<p class="xs muted mt-2 mb-0">${t('match.notice')}</p></div>` : ''}
        </div>
        <div class="stack">
          <div class="card"><div class="card-head"><h3>${t('sme.readiness')}</h3>${ui.levelBadge(score)}</div>
            <div class="row mb-2">${ui.ring(score, t('dash.readiness.of'))}<p class="xs muted mb-0">${t('dash.illustrative')}</p></div>
            ${RW.cards.readinessBreakdown(sme)}</div>
          ${inv ? `<div class="card"><h3>${icon('lock')} ${t('sme.confidential')}</h3><p class="small">${t('sme.confidential.d')}</p>
            <button class="btn ${requested ? 'is-active' : 'btn-outline'} btn-block" data-action="request-docs" data-id="${sme.id}" ${requested ? 'disabled' : ''}>${icon(requested ? 'check' : 'file')}${requested ? t('sme.reqdocs.done') : t('sme.reqdocs')}</button></div>` : ''}
        </div>
      </div>`;
  };

  RW.actions['request-docs'] = (el) => {
    const inv = RW.db.currentInvestor(), sme = RW.db.sme(el.dataset.id);
    RW.db.addDocRequest(inv.id, sme.id);
    ui.toast(t('toast.docreq', { x: esc(sme.name) }));
    RW.render();
  };
})();
