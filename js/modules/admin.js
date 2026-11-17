/* RaiseWise — Admin dashboard. Stage 1: overview, SME & investor management, verification.
   Others scaffolded. */
(function () {
  const { icon, esc } = RW;
  const t = (...a) => RW.t(...a);
  const ui = RW.ui;
  const R = 'admin';

  const setStatus = (id, st, msgKey) => {
    const e = RW.db.sme(id) || RW.db.investor(id);
    RW.db.setStatus(id, st);
    RW.store.log({ en: `Admin set ${e.name} to ${st}`, km: `អ្នកគ្រប់គ្រងបានកំណត់ ${e.name} ជា ${RW.t('st.' + st)}` });
    ui.toast(t(msgKey, { x: esc(e.name) }), st === 'rejected' ? 'warn' : 'success');
    RW.render();
  };
  RW.actions['admin-verify'] = (el) => setStatus(el.dataset.id, 'verified', 'toast.verified');
  RW.actions['admin-reject'] = (el) => setStatus(el.dataset.id, 'rejected', 'toast.rejected');
  RW.actions['admin-reopen'] = (el) => setStatus(el.dataset.id, 'pending', 'toast.reopened');

  const actionBtns = (id, st) => `<div class="row">
    ${st !== 'verified' ? `<button class="btn btn-sm btn-primary" data-action="admin-verify" data-id="${id}">${icon('check')}${t('act.verify')}</button>` : ''}
    ${st === 'pending' ? `<button class="btn btn-sm btn-danger" data-action="admin-reject" data-id="${id}">${t('act.reject')}</button>` : ''}
    ${st !== 'pending' ? `<button class="btn btn-sm btn-ghost" data-action="admin-reopen" data-id="${id}">${t('act.reopen')}</button>` : ''}</div>`;

  /* ---------- Overview ---------- */
  RW.portalRoute(R, 'dashboard', 'm.admin.overview', () => {
    const smes = RW.db.smes(), invs = RW.db.investors();
    const pending = [...smes, ...invs].filter((e) => RW.db.status(e) === 'pending');
    const st = RW.store.get();
    const conns = st.interests.length + st.docRequests.length + st.pipeline.length;
    const byInd = {}; smes.forEach((s) => (byInd[s.industry] = (byInd[s.industry] || 0) + 1));
    const max = Math.max(...Object.values(byInd));
    const bands = { strong: 0, developing: 0, early: 0 }; smes.forEach((s) => bands[RW.db.readinessLevel(RW.db.readiness(s))]++);
    return `${ui.pageHead(t('m.admin.overview'), t('adm.sub'), ui.demoBadge('demo.mode'))}
      <div class="grid g-4 mb-3">
        ${ui.stat({ label: t('adm.kpi.smes'), value: smes.length, ic: 'building' })}
        ${ui.stat({ label: t('adm.kpi.inv'), value: invs.length, ic: 'briefcase' })}
        ${ui.stat({ label: t('adm.kpi.pending'), value: pending.length, ic: 'shield' })}
        ${ui.stat({ label: t('adm.kpi.conn'), value: conns, ic: 'activity' })}
      </div>
      <div class="grid g-detail mb-3">
        <div class="card"><div class="card-head"><h3>${t('adm.queue')}</h3><a class="small" href="#/admin/verification">${t('dash.seeall')}</a></div>
          ${pending.length ? pending.slice(0, 4).map((e) => `<div class="list-item">${ui.avatar(e.name, 'sm')}<div class="grow"><div class="li-title">${esc(e.name)}</div><div class="li-sub">${e.industry && RW.seed.industries[e.industry] ? t('role.sme') : t('role.investor')}</div></div>${actionBtns(e.id, 'pending')}</div>`).join('')
            : ui.empty({ title: t('adm.queue.empty'), text: t('adm.queue.empty.d'), ic: 'shield' })}</div>
        <div class="card"><div class="card-head"><h3>${t('adm.activity')}</h3></div>
          ${RW.db.activity().slice(0, 6).map((a) => `<div class="list-item"><span style="color:var(--teal-700)">${icon('activity')}</span><div class="grow"><div class="li-title" style="font-weight:500">${esc(RW.L(a.text))}</div><div class="li-sub">${RW.fmtDate(a.date)}</div></div></div>`).join('')}</div>
      </div>
      <div class="grid g-2">
        <div class="card"><h3>${t('adm.byind')}</h3><div class="stack mt-2">${Object.entries(byInd).sort((a, b) => b[1] - a[1]).map(([k, n]) => `
          <div class="meter-row"><span>${esc(RW.L(RW.seed.industries[k]))}</span><b class="small" style="text-align:right">${n}</b>${ui.bar(n / max * 100, ' ')}</div>`).join('')}</div></div>
        <div class="card"><h3>${t('adm.bystage')}</h3><div class="stack mt-2">${Object.entries(bands).map(([k, n]) => `
          <div class="meter-row"><span>${t('level.' + k)}</span><b class="small" style="text-align:right">${n}</b>${ui.bar(n / smes.length * 100, { strong: ' ', developing: 'warn', early: 'low' }[k])}</div>`).join('')}</div>
          <p class="xs muted mt-2 mb-0">${t('dash.illustrative')}</p></div>
      </div>`;
  });

  /* ---------- SME management ---------- */
  RW.portalRoute(R, 'smes', 'm.smes', () => `${ui.pageHead(t('m.smes'), t('adm.sub'))}
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr>
      <th>${t('adm.col.name')}</th><th>${t('sme.industry')}</th><th>${t('adm.col.loc')}</th><th>${t('adm.col.ready')}</th><th>${t('adm.col.ask')}</th><th>${t('adm.col.status')}</th><th>${t('adm.col.actions')}</th></tr></thead><tbody>
      ${RW.db.smes().map((s) => { const st = RW.db.status(s); return `<tr>
        <td><div class="row">${ui.avatar(s.name, 'sm')}<div><a class="bold" href="#/admin/sme/${s.id}">${esc(s.name)}</a><div class="xs muted">${t('demo.business')}</div></div></div></td>
        <td>${esc(RW.L(RW.seed.industries[s.industry]))}</td><td>${esc(RW.L(RW.seed.provinces[s.province]))}</td>
        <td><b>${RW.db.readiness(s)}</b></td><td>${RW.moneyShort(s.ask)}</td><td>${ui.statusBadge(st)}</td><td>${actionBtns(s.id, st)}</td></tr>`; }).join('')}
    </tbody></table></div></div>`);

  RW.route('/admin/sme/:id', {
    role: R, layout: 'portal', nav: 'smes', title: 'm.smes',
    render: ({ id }) => { const s = RW.db.sme(id); return s ? RW.smeProfileView(s, { viewer: R }) : ui.empty({ title: t('nf.title') }); },
  });

  /* ---------- Investor management ---------- */
  RW.portalRoute(R, 'investors', 'm.investors', () => `${ui.pageHead(t('m.investors'), t('partners.notice'))}
    <div class="card pad-0"><div class="table-wrap"><table class="table"><thead><tr>
      <th>${t('adm.col.name')}</th><th>${t('adm.col.type')}</th><th>${t('adm.col.ticket')}</th><th>${t('adm.col.focus')}</th><th>${t('adm.col.status')}</th><th>${t('adm.col.actions')}</th></tr></thead><tbody>
      ${RW.db.investors().map((i) => { const st = RW.db.status(i); return `<tr>
        <td><div class="row">${ui.avatar(i.name, 'sm')}<div><b>${esc(i.name)}</b><div class="xs muted">${t('demo.illustrative')}</div></div></div></td>
        <td>${t('kind.' + i.kind)}</td><td class="nowrap">${RW.moneyShort(i.ticketMin)}–${RW.moneyShort(i.ticketMax)}</td>
        <td class="xs">${i.types.map((x) => t('type.' + x)).join(', ')}</td><td>${ui.statusBadge(st)}</td><td>${actionBtns(i.id, st)}</td></tr>`; }).join('')}
    </tbody></table></div></div>`);

  /* ---------- Verification queue ---------- */
  RW.portalRoute(R, 'verification', 'm.verify', () => {
    const all = RW.db.smes().map((s) => ({ e: s, st: RW.db.status(s) }));
    const order = { pending: 0, rejected: 1, verified: 2 };
    all.sort((a, b) => order[a.st] - order[b.st]);
    return `${ui.pageHead(t('m.verify'), t('adm.sub'))}
      <div class="stack">${all.map(({ e, st }) => `<div class="card"><div class="row wrap">
        ${ui.avatar(e.name)}<div class="grow"><a class="li-title" href="#/admin/sme/${e.id}">${esc(e.name)}</a>
        <div class="li-sub">${esc(RW.L(RW.seed.industries[e.industry]))} · ${t('dash.profile')} ${e.profile}% · ${t('dash.readiness')} ${RW.db.readiness(e)}</div></div>
        ${ui.statusBadge(st)}${actionBtns(e.id, st)}</div></div>`).join('')}</div>`;
  });

  /* ---------- Scaffolded modules ---------- */
  RW.placeholder(R, 'users', 'm.users', ['All demo user accounts across roles', 'Suspend / reactivate (simulated)', 'Role and access overview']);
  RW.placeholder(R, 'directory', 'm.directory', ['Add and edit illustrative directory listings', 'Mandatory "illustrative listing" labelling', 'Archive outdated listings']);
  RW.placeholder(R, 'content', 'm.content', ['Create and edit Academy lessons', 'Quiz builder', 'Publish / unpublish lessons']);
  RW.placeholder(R, 'reports', 'm.reports', ['Review information reported by users', 'Resolve or dismiss reports', 'Audit trail of decisions']);
  RW.placeholder(R, 'activity', 'm.activity', ['Connection and matching activity log', 'Simulated platform events control', 'Filter by role and date']);
  RW.placeholder(R, 'analytics', 'm.analytics', ['Charts of sign-ups, matches and lesson completions (seeded)', 'Readiness trends', 'Export of demo metrics']);
  RW.placeholder(R, 'settings', 'm.settings', ['Platform configuration (demo)', 'Default language', 'Matching rule weights']);
})();
