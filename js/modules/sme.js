/* RaiseWise — SME portal. Stage 1: dashboard, matching, saved investors, investor detail.
   Remaining modules are registered as scaffolds so navigation is complete. */
(function () {
  const { icon, esc } = RW;
  const t = (...a) => RW.t(...a);
  const ui = RW.ui;
  const R = 'sme';

  /* ---------- Dashboard ---------- */
  RW.portalRoute(R, 'dashboard', 'm.dashboard', () => {
    const sme = RW.db.currentSme();
    const score = RW.db.readiness(sme);
    const matches = RW.matchesForSme(sme);
    const prog = RW.seed.academyProgress.sme;
    const notes = RW.db.notifications(R).slice(0, 3);

    return `${ui.pageHead(t('dash.hello', { name: esc(RW.seed.demoUsers.sme.name.split(' ')[0]) }), t('dash.sme.sub', { biz: esc(sme.name) }), ui.demoBadge())}
      <div class="grid g-4 mb-3">
        ${ui.stat({ label: t('dash.readiness'), value: `${score}<span class="small muted"> / 100</span>`, sub: t('level.' + RW.db.readinessLevel(score)), ic: 'chart' })}
        ${ui.stat({ label: t('dash.profile'), value: sme.profile + '%', sub: ui.bar(sme.profile), ic: 'building' })}
        ${ui.stat({ label: t('dash.matches'), value: matches.length, sub: t('dash.matches.sub'), ic: 'target' })}
        ${ui.stat({ label: t('dash.academy'), value: Math.round(prog.done / prog.total * 100) + '%', sub: t('dash.academy.sub', { a: prog.done, b: prog.total }), ic: 'book' })}
      </div>
      <div class="grid g-detail mb-3">
        <div class="card"><div class="card-head"><h3>${t('dash.breakdown')}</h3><a class="small" href="#/sme/report">${t('dash.viewreport')}</a></div>
          <div class="row top wrap" style="gap:24px">
            <div class="center">${ui.ring(score, t('dash.readiness.of'))}<div class="mt-1">${ui.levelBadge(score)}</div></div>
            <div class="grow" style="min-width:240px">${RW.cards.readinessBreakdown(sme)}</div></div>
          <p class="xs muted mt-2 mb-0">${t('dash.illustrative')}</p></div>
        <div class="card"><div class="card-head"><h3>${t('dash.nextsteps')}</h3></div>
          ${[1, 2, 3].map((i) => `<div class="list-item"><div class="avatar sm" style="background:var(--teal-50);color:var(--teal-700)">${i}</div>
            <div class="grow"><div class="li-title">${t('step.' + i)}</div><div class="li-sub">${t('step.' + i + '.d')}</div></div></div>`).join('')}</div>
      </div>
      <div class="grid g-detail">
        <div class="card"><div class="card-head"><h3>${t('dash.topmatches')}</h3><a class="small" href="#/sme/matching">${t('dash.seeall')}</a></div>
          ${matches.slice(0, 3).map((m) => `<div class="list-item">${ui.avatar(m.investor.name)}
            <div class="grow"><a class="li-title" href="#/sme/investor/${m.investor.id}">${esc(m.investor.name)}</a>
            <div class="li-sub">${t('kind.' + m.investor.kind)} · ${RW.moneyShort(m.investor.ticketMin)}–${RW.moneyShort(m.investor.ticketMax)}</div></div>
            <div class="match-pct center">${m.pct}%<small>${t('match.pct')}</small></div></div>`).join('') || ui.empty({ title: t('match.none'), text: t('match.none.d'), ic: 'target' })}</div>
        <div class="card"><div class="card-head"><h3>${t('dash.recent')}</h3><a class="small" href="#/sme/notifications">${t('dash.seeall')}</a></div>
          ${notes.map((n) => `<div class="list-item"><span style="color:var(--teal-700)">${icon(n.icon)}</span><div class="grow"><div class="li-title" style="font-weight:500">${esc(RW.L(n.text))}</div><div class="li-sub">${RW.fmtDate(n.date)}</div></div></div>`).join('')}</div>
      </div>`;
  });

  /* ---------- AI Investor Matching ---------- */
  function matchCard(m, sme) {
    const inv = m.investor;
    const saved = RW.db.isSaved(R, inv.id);
    const interested = RW.db.hasInterest(R, sme.id, inv.id);
    const fitTone = { within: 'success', partial: 'warning', outside: 'danger' }[m.fit];
    return `<div class="card">
      <div class="row top wrap">
        ${ui.avatar(inv.name)}
        <div class="grow"><a class="li-title" style="font-size:16px" href="#/sme/investor/${inv.id}">${esc(inv.name)}</a>
          <div class="xs muted">${t('kind.' + inv.kind)} · ${esc(inv.hq)}</div>
          <div class="row wrap mt-1">${ui.demoBadge('demo.illustrative')}${ui.badge(t('match.fit.' + m.fit), fitTone)}</div></div>
        <div class="center"><div class="match-pct" style="font-size:28px">${typeof m.pct === 'number' ? m.pct + '%' : '—'}</div><div class="xs muted">${t('match.pct')}</div></div>
      </div>
      <div class="divider"></div>
      ${RW.cards.matchDetail(m)}
      <div class="divider"></div>
      <div class="row between wrap">
        <div class="xs muted">${t('match.ticket')}: <b>${RW.moneyShort(inv.ticketMin)}–${RW.moneyShort(inv.ticketMax)}</b> · ${t('match.types')}: <b>${inv.types.map((x) => t('type.' + x)).join(', ')}</b></div>
        <div class="row wrap">
          <button class="btn btn-sm ${saved ? 'is-active' : 'btn-outline'}" data-action="toggle-save" data-role="sme" data-id="${inv.id}">${icon('bookmark')}${saved ? t('act.saved') : t('act.save')}</button>
          <button class="btn btn-sm btn-primary" data-action="express-interest" data-from="sme" data-sme="${sme.id}" data-inv="${inv.id}" ${interested ? 'disabled' : ''}>${icon(interested ? 'check' : 'heart')}${interested ? t('act.interested') : t('act.interest')}</button>
        </div>
      </div></div>`;
  }

  RW.portalRoute(R, 'matching', 'm.matching', () => {
    const sme = RW.db.currentSme();
    const matches = RW.matchesForSme(sme);
    return `${ui.pageHead(t('match.title'), t('match.sub', { biz: esc(sme.name) }))}
      <div class="mb-3">${ui.notice(t('match.notice'), 'warn')}</div>
      ${matches.length ? `<div class="stack">${matches.map((m) => matchCard(m, sme)).join('')}</div>`
        : `<div class="card">${ui.empty({ title: t('match.none'), text: t('match.none.d'), ic: 'target' })}</div>`}`;
  });

  /* ---------- Saved investors ---------- */
  RW.portalRoute(R, 'saved', 'm.saved', () => {
    const sme = RW.db.currentSme();
    const ids = RW.store.get().saved.sme;
    const list = ids.map((id) => RW.match(sme, RW.db.investor(id)));
    return `${ui.pageHead(t('saved.inv.title'), t('saved.inv.sub'))}
      ${list.length ? `<div class="stack">${list.map((m) => matchCard(m, sme)).join('')}</div>`
        : `<div class="card">${ui.empty({ title: t('saved.empty'), text: t('saved.empty.sme'), ic: 'bookmark', action: `<a class="btn btn-primary" href="#/sme/matching">${t('saved.goto.match')}</a>` })}</div>`}`;
  });

  /* ---------- Investor detail (from SME side) ---------- */
  RW.route('/sme/investor/:id', {
    role: R, layout: 'portal', nav: 'matching', title: 'm.matching',
    render({ id }) {
      const inv = RW.db.investor(id);
      if (!inv) return ui.empty({ title: t('nf.title'), text: t('nf.text') });
      const sme = RW.db.currentSme();
      const m = RW.match(sme, inv);
      const saved = RW.db.isSaved(R, inv.id);
      const interested = RW.db.hasInterest(R, sme.id, inv.id);
      const kv = (k, v) => `<dt>${t(k)}</dt><dd>${v}</dd>`;
      const inds = inv.industries.includes('any') ? '—' : inv.industries.map((x) => esc(RW.L(RW.seed.industries[x]))).join(', ');
      return `<a class="btn btn-ghost btn-sm mb-2" href="#/sme/matching">${icon('arrowLeft')}${t('act.back')}</a>
        <div class="card mb-3"><div class="row top wrap" style="gap:18px">${ui.avatar(inv.name, 'lg')}
          <div class="grow"><h1 style="font-size:26px;margin:0">${esc(inv.name)}</h1><p class="mb-1">${esc(inv.about)}</p>
          <div class="row wrap">${ui.demoBadge('demo.illustrative')}${ui.badge(t('kind.' + inv.kind), 'gold')}</div></div>
          ${m.eligible ? `<div class="center"><div class="match-pct" style="font-size:34px">${m.pct}%</div><div class="xs muted">${t('match.pct')}</div></div>` : ''}</div></div>
        <div class="grid g-detail" style="align-items:start">
          <div class="card"><h3>${t('match.reasons')} / ${t('match.gaps')}</h3>${RW.cards.matchDetail(m)}<p class="xs muted mt-2 mb-0">${t('match.notice')}</p></div>
          <div class="card"><h3>${t('match.criteria')}</h3>
            <dl class="kv">${kv('match.ticket', RW.money(inv.ticketMin) + ' – ' + RW.money(inv.ticketMax))}${kv('match.types', inv.types.map((x) => t('type.' + x)).join(', '))}
            ${kv('match.stages', inv.stages.map((s) => t('stage.' + s)).join(', '))}${kv('match.geo', inv.geo.includes('nationwide') ? t('geo.nationwide') : inv.geo.join(', '))}
            ${kv('sme.industry', inds)}${kv('match.funding', t('match.fit.' + m.fit))}</dl>
            <div class="row wrap mt-2">
              <button class="btn ${saved ? 'is-active' : 'btn-outline'}" data-action="toggle-save" data-role="sme" data-id="${inv.id}">${icon('bookmark')}${saved ? t('act.saved') : t('act.save')}</button>
              <button class="btn btn-primary" data-action="express-interest" data-from="sme" data-sme="${sme.id}" data-inv="${inv.id}" ${interested ? 'disabled' : ''}>${icon(interested ? 'check' : 'heart')}${interested ? t('act.interested') : t('act.interest')}</button></div></div>
        </div>`;
    },
  });

  /* ---------- Scaffolded modules (next stage) ---------- */
  RW.placeholder(R, 'profile', 'm.profile', ['Editable company overview, team and legal registration details', 'Products, customers and market information', 'Profile visibility controls for investors']);
  RW.placeholder(R, 'onboarding', 'm.onboarding', ['Step-by-step business setup wizard', 'Document checklist (registration, tax ID, financial statements)', 'Progress saved between sessions']);
  RW.placeholder(R, 'report', 'm.report', ['Full readiness report with gap analysis', 'Priority actions ranked by impact', 'Linked Academy lessons for each gap']);
  RW.placeholder(R, 'ai', 'm.ai', ['Context-aware chat using your business profile', 'Business assessment, financial analysis and fundraising advice scenarios', 'Clear labels that responses are simulated, not financial advice']);
  RW.placeholder(R, 'workspace', 'm.workspace', ['Fundraising plan and timeline', 'Document vault with access control', 'Task checklist for the raise']);
  RW.placeholder(R, 'financial', 'm.financial', ['Cash-flow and break-even calculators', '3-year projection builder', 'Funding need estimator']);
  RW.placeholder(R, 'teaser', 'm.teaser', ['Investment teaser generator from profile data', 'Pitch deck outline and checklist', 'AI document preparation suggestions']);
  RW.placeholder(R, 'find', 'm.find', ['Searchable investor directory with filters', 'Filter by type, ticket size, sector and ESG focus', 'Links to AI match explanations']);
  RW.placeholder(R, 'messages', 'm.messages', ['Simulated conversations with investors', 'Connection requests and status', 'Document access approvals']);
  RW.placeholder(R, 'settings', 'm.settings', ['Language and notification preferences', 'Demo account information', 'Privacy and data-sharing settings']);
})();
