/* RaiseWise — Investor portal. Stage 1: dashboard, discover (search/filters), recommended,
   SME profile, saved opportunities, deal pipeline. Others scaffolded. */
(function () {
  const { icon, esc } = RW;
  const t = (...a) => RW.t(...a);
  const ui = RW.ui;
  const R = 'investor';
  const stages = RW.seed.pipelineStages;
  const stageKey = (s) => 'pipe.' + s;

  /* ---------- Dashboard ---------- */
  RW.portalRoute(R, 'dashboard', 'm.inv.dashboard', () => {
    const inv = RW.db.currentInvestor();
    const recs = RW.matchesForInvestor(inv);
    const deals = RW.db.pipelineFor(inv.id);
    const active = deals.filter((d) => d.stage !== 'closed').length;
    const pendingDocs = RW.db.docRequestsFor(inv.id).filter((d) => d.status === 'pending').length;
    return `${ui.pageHead(t('dash.hello', { name: esc(RW.seed.demoUsers.investor.name.split(' ')[0]) }), t('inv.dash.sub', { org: esc(inv.name) }), ui.demoBadge('demo.illustrative'))}
      <div class="grid g-4 mb-3">
        ${ui.stat({ label: t('inv.kpi.recommended'), value: recs.length, sub: t('dash.matches.sub'), ic: 'sparkle' })}
        ${ui.stat({ label: t('inv.kpi.saved'), value: RW.store.get().saved.investor.length, sub: '', ic: 'bookmark' })}
        ${ui.stat({ label: t('inv.kpi.pipeline'), value: active, sub: t('pipe.notice'), ic: 'kanban' })}
        ${ui.stat({ label: t('inv.kpi.docs'), value: pendingDocs, sub: '', ic: 'lock' })}
      </div>
      <div class="grid g-detail mb-3">
        <div class="card"><div class="card-head"><h3>${t('inv.recs')}</h3><a class="small" href="#/investor/recommended">${t('dash.seeall')}</a></div>
          ${recs.slice(0, 4).map((m) => `<div class="list-item">${ui.avatar(m.sme.name)}
            <div class="grow"><a class="li-title" href="#/investor/sme/${m.sme.id}">${esc(m.sme.name)}</a>
            <div class="li-sub">${esc(RW.L(RW.seed.industries[m.sme.industry]))} · ${t('dash.ask')} ${RW.moneyShort(m.sme.ask)} · ${t('dash.readiness')} ${RW.db.readiness(m.sme)}</div></div>
            <div class="match-pct center">${m.pct}%<small>${t('match.pct')}</small></div></div>`).join('') || ui.empty({ title: t('match.none'), ic: 'sparkle' })}</div>
        <div class="card"><div class="card-head"><h3>${t('inv.mandate')}</h3></div>
          <dl class="kv"><dt>${t('match.ticket')}</dt><dd>${RW.moneyShort(inv.ticketMin)}–${RW.moneyShort(inv.ticketMax)}</dd>
            <dt>${t('match.types')}</dt><dd>${inv.types.map((x) => t('type.' + x)).join(', ')}</dd>
            <dt>${t('match.stages')}</dt><dd>${inv.stages.map((s) => t('stage.' + s)).join(', ')}</dd>
            <dt>${t('sme.industry')}</dt><dd>${inv.industries.map((x) => esc(RW.L(RW.seed.industries[x]))).join(', ')}</dd>
            <dt>ESG</dt><dd>${inv.esgRequired ? ui.badge(t('esg.required'), 'success', 'leaf') : '—'}</dd></dl></div>
      </div>
      <div class="card"><div class="card-head"><h3>${t('inv.pipesum')}</h3><a class="small" href="#/investor/pipeline">${t('m.pipeline')}</a></div>
        <div class="grid g-5">${stages.map((s) => `<div class="card flat stat" style="background:var(--surface-2)"><div class="stat-label">${t(stageKey(s))}</div><div class="stat-value">${deals.filter((d) => d.stage === s).length}</div></div>`).join('')}</div></div>`;
  });

  /* ---------- Discover SMEs ---------- */
  const f = { q: '', industry: '', stage: '', type: '', sort: 'match' };
  RW.actions['disc-q'] = (el) => { f.q = el.value; RW.rerenderKeepFocus(); };
  RW.actions['disc-f'] = (el) => { f[el.dataset.key] = el.value; RW.render(); };
  RW.actions['disc-clear'] = () => { Object.assign(f, { q: '', industry: '', stage: '', type: '' }); RW.render(); };

  RW.portalRoute(R, 'discover', 'm.discover', () => {
    const inv = RW.db.currentInvestor();
    const q = f.q.trim().toLowerCase();
    let list = RW.db.smes().filter((s) =>
      (!f.industry || s.industry === f.industry) && (!f.stage || s.stage === f.stage) && (!f.type || s.seeking.includes(f.type)) &&
      (!q || (s.name + ' ' + RW.L(s.tagline) + ' ' + s.about + ' ' + s.province).toLowerCase().includes(q)));
    const withMatch = list.map((s) => ({ s, m: RW.match(s, inv) }));
    const sorters = { match: (a, b) => (b.m.pct || 0) - (a.m.pct || 0), ready: (a, b) => RW.db.readiness(b.s) - RW.db.readiness(a.s), ask: (a, b) => b.s.ask - a.s.ask };
    withMatch.sort(sorters[f.sort]);
    const sel = (key, all, opts) => `<select class="select" data-change="disc-f" data-key="${key}" aria-label="${all}"><option value="">${all}</option>${opts.map(([v, l]) => `<option value="${v}" ${f[key] === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
    return `${ui.pageHead(t('disc.title'), t('disc.sub'))}
      <div class="toolbar">
        <div class="search">${icon('search')}<input id="disc-q" class="input" type="search" placeholder="${t('disc.search')}" value="${esc(f.q)}" data-input="disc-q" aria-label="${t('disc.search')}"></div>
        ${sel('industry', t('disc.allind'), Object.keys(RW.seed.industries).map((k) => [k, esc(RW.L(RW.seed.industries[k]))]))}
        ${sel('stage', t('disc.allstage'), ['idea', 'early', 'growth', 'expansion'].map((k) => [k, t('stage.' + k)]))}
        ${sel('type', t('disc.alltype'), ['equity', 'debt', 'grant', 'blended'].map((k) => [k, t('type.' + k)]))}
        <select class="select" data-change="disc-f" data-key="sort" aria-label="${t('disc.sort')}">${['match', 'ready', 'ask'].map((k) => `<option value="${k}" ${f.sort === k ? 'selected' : ''}>${t('disc.sort')}: ${t('disc.sort.' + k)}</option>`).join('')}</select>
      </div>
      <p class="small muted">${t('disc.count', { n: withMatch.length })}</p>
      ${withMatch.length ? `<div class="grid g-3">${withMatch.map(({ s, m }) => RW.cards.smeCard(s, { match: m.eligible ? m : null, href: '/investor/sme/' + s.id, showSave: true })).join('')}</div>`
        : `<div class="card">${ui.empty({ title: t('disc.empty'), text: t('disc.empty.d'), action: `<button class="btn btn-outline" data-action="disc-clear">${t('partners.clear')}</button>` })}</div>`}`;
  });

  /* ---------- AI-Recommended ---------- */
  RW.portalRoute(R, 'recommended', 'm.recommended', () => {
    const inv = RW.db.currentInvestor();
    const recs = RW.matchesForInvestor(inv);
    return `${ui.pageHead(t('rec.title'), t('rec.sub', { org: esc(inv.name) }))}
      <div class="mb-3">${ui.notice(t('match.notice'), 'warn')}</div>
      ${recs.length ? `<div class="stack">${recs.map((m) => `<div class="card">
        <div class="row top wrap">${ui.avatar(m.sme.name)}
          <div class="grow"><a class="li-title" style="font-size:16px" href="#/investor/sme/${m.sme.id}">${esc(m.sme.name)}</a>
          <div class="xs muted">${esc(RW.L(RW.seed.industries[m.sme.industry]))} · ${esc(RW.L(RW.seed.provinces[m.sme.province]))} · ${t('dash.ask')} ${RW.moneyShort(m.sme.ask)}</div>
          <div class="row wrap mt-1">${ui.demoBadge()}${ui.levelBadge(RW.db.readiness(m.sme))}</div></div>
          <div class="center"><div class="match-pct" style="font-size:28px">${m.pct}%</div><div class="xs muted">${t('match.pct')}</div></div></div>
        <div class="divider"></div>${RW.cards.matchDetail(m)}
        <div class="row mt-2"><a class="btn btn-outline btn-sm" href="#/investor/sme/${m.sme.id}">${t('act.view')}</a>
          <button class="btn btn-sm ${RW.db.isSaved(R, m.sme.id) ? 'is-active' : 'btn-ghost'}" data-action="toggle-save" data-role="investor" data-id="${m.sme.id}">${icon('bookmark')}${RW.db.isSaved(R, m.sme.id) ? t('act.saved') : t('act.save')}</button></div>
      </div>`).join('')}</div>` : `<div class="card">${ui.empty({ title: t('match.none'), ic: 'sparkle' })}</div>`}`;
  });

  /* ---------- SME profile ---------- */
  RW.route('/investor/sme/:id', {
    role: R, layout: 'portal', nav: 'discover', title: 'm.discover',
    render({ id }) {
      const sme = RW.db.sme(id);
      return sme ? RW.smeProfileView(sme, { viewer: R }) : ui.empty({ title: t('nf.title'), text: t('nf.text') });
    },
  });

  /* ---------- Saved opportunities ---------- */
  RW.portalRoute(R, 'saved', 'm.savedopps', () => {
    const inv = RW.db.currentInvestor();
    const list = RW.store.get().saved.investor.map((id) => RW.db.sme(id)).filter(Boolean);
    return `${ui.pageHead(t('saved.opp.title'), t('saved.opp.sub'))}
      ${list.length ? `<div class="grid g-3">${list.map((s) => { const m = RW.match(s, inv); return RW.cards.smeCard(s, { match: m.eligible ? m : null, href: '/investor/sme/' + s.id, showSave: true }); }).join('')}</div>`
        : `<div class="card">${ui.empty({ title: t('saved.empty'), text: t('saved.empty.inv'), ic: 'bookmark', action: `<a class="btn btn-primary" href="#/investor/discover">${t('saved.goto.discover')}</a>` })}</div>`}`;
  });

  /* ---------- Deal pipeline ---------- */
  RW.actions['move-deal'] = (el) => {
    const d = RW.store.get().pipeline.find((x) => x.id === el.dataset.id);
    RW.db.moveDeal(el.dataset.id, el.value);
    ui.toast(t('toast.stage', { x: esc(RW.db.sme(d.smeId).name), y: t(stageKey(el.value)) }));
    RW.render();
  };

  RW.portalRoute(R, 'pipeline', 'm.pipeline', () => {
    const inv = RW.db.currentInvestor();
    const deals = RW.db.pipelineFor(inv.id);
    return `${ui.pageHead(t('pipe.title'), t('pipe.sub'))}
      <div class="mb-3">${ui.notice(t('pipe.notice'), 'warn')}</div>
      <div class="pipeline">${stages.map((s) => {
        const col = deals.filter((d) => d.stage === s);
        return `<div class="pipe-col"><h4><span>${t(stageKey(s))}</span><span>${col.length}</span></h4>
          ${col.length ? col.map((d) => { const sme = RW.db.sme(d.smeId); return `<div class="pipe-card">
            <a class="li-title" href="#/investor/sme/${sme.id}">${esc(sme.name)}</a>
            <div class="xs muted mb-1">${RW.moneyShort(sme.ask)} · ${RW.fmtDate(d.updated)}</div>
            <label class="xs muted">${t('pipe.move')}
              <select class="select mt-1" data-change="move-deal" data-id="${d.id}">${stages.map((x) => `<option value="${x}" ${x === d.stage ? 'selected' : ''}>${t(stageKey(x))}</option>`).join('')}</select></label>
          </div>`; }).join('') : `<p class="xs muted center mt-2">${t('pipe.empty')}</p>`}</div>`;
      }).join('')}</div>`;
  });

  /* ---------- Scaffolded modules ---------- */
  RW.placeholder(R, 'organization', 'm.org', ['Organization overview, team and track record', 'Fund type, size and contact preferences', 'Profile visibility to SMEs']);
  RW.placeholder(R, 'preferences', 'm.prefs', ['Edit sectors, ticket size, stages and geography', 'ESG and impact requirements', 'Live preview of how preferences change recommendations']);
  RW.placeholder(R, 'messages', 'm.inv.messages', ['Simulated conversations with SMEs', 'Incoming and outgoing connection requests', 'Meeting scheduling placeholders']);
  RW.placeholder(R, 'documents', 'm.docs', ['Status of confidential document requests', 'Approved document viewer (demo files)', 'Access expiry and audit trail']);
  RW.placeholder(R, 'settings', 'm.settings', ['Language and notification preferences', 'Team members (demo)', 'Data-sharing settings']);
})();
