/* RaiseWise — SME Investment Readiness Assessment (input form, 6 steps).
   Answers are saved in this browser (localStorage). Scores are illustrative. */
(function () {
  const { esc, icon } = RW;
  const ui = RW.ui;
  const KEY = 'rw.assess.v1';

  const opt = (arr) => arr.map((x) => (Array.isArray(x) ? x : [x, x]));
  const industryOpts = () => Object.keys(RW.seed.industries).map((k) => [k, RW.L(RW.seed.industries[k])]);

  const STEPS = [
    { id: 'business', label: 'Business', title: '1. Business', fields: [
      { k: 'name', l: 'Business name', type: 'text' },
      { k: 'industry', l: 'Industry / sector', type: 'select', o: industryOpts },
      { k: 'location', l: 'Business location', type: 'text', ph: 'e.g. Phnom Penh' },
      { k: 'year', l: 'Year established', type: 'number', ph: 'e.g. 2019' },
      { k: 'employees', l: 'Number of employees', type: 'number' },
      { k: 'stage', l: 'Business stage', type: 'select', o: () => opt([['idea', 'Idea'], ['early', 'Startup'], ['growth', 'Growth'], ['expansion', 'Expansion']]) },
    ] },
    { id: 'financial', label: 'Financial', title: '2. Financial', fields: [
      { k: 'revenue', l: 'Annual revenue (USD)', type: 'number' },
      { k: 'profit', l: 'Annual net profit (USD, can be negative)', type: 'number' },
      { k: 'debt', l: 'Existing debt (USD)', type: 'number' },
      { k: 'books', l: 'How do you keep financial records?', type: 'select', o: () => opt([['none', 'No formal records'], ['basic', 'Notebook / simple spreadsheet'], ['monthly', 'Monthly accounts'], ['audited', 'Audited / accountant-prepared statements']]) },
    ] },
    { id: 'management', label: 'Management', title: '3. Management', fields: [
      { k: 'team', l: 'Number of people in the management team', type: 'number' },
      { k: 'registered', l: 'Is the business legally registered?', type: 'select', o: () => opt([['yes', 'Yes, fully registered'], ['progress', 'In progress'], ['no', 'Not yet']]) },
      { k: 'tax', l: 'Do you have a tax ID and file taxes?', type: 'select', o: () => opt([['yes', 'Yes'], ['no', 'No']]) },
      { k: 'board', l: 'Board or advisors', type: 'select', o: () => opt([['none', 'None'], ['advisors', 'Informal advisors'], ['board', 'Formal board / advisory board']]) },
    ] },
    { id: 'market', label: 'Market', title: '4. Market', fields: [
      { k: 'customers', l: 'Number of regular customers', type: 'number' },
      { k: 'growth', l: 'Sales trend over the last 12 months', type: 'select', o: () => opt([['declining', 'Declining'], ['flat', 'Flat'], ['growing', 'Growing'], ['fast', 'Growing fast (30%+)']]) },
      { k: 'channel', l: 'Main way you sell', type: 'select', o: () => opt([['direct', 'Direct to customers'], ['distributors', 'Through distributors / retailers'], ['online', 'Online'], ['export', 'Export'], ['mixed', 'Several channels']]) },
      { k: 'competitors', l: 'Main competitors (optional)', type: 'text' },
    ] },
    { id: 'funding', label: 'Funding', title: '5. Funding', fields: [
      { k: 'ask', l: 'Amount you want to raise (USD)', type: 'number' },
      { k: 'type', l: 'Type of funding you prefer', type: 'select', o: () => opt([['equity', 'Equity'], ['debt', 'Debt / loan'], ['grant', 'Grant'], ['blended', 'Blended finance']]) },
      { k: 'use', l: 'How will you use the funds?', type: 'textarea' },
      { k: 'plan', l: 'Fundraising preparation', type: 'select', o: () => opt([['none', 'Nothing prepared yet'], ['draft', 'Draft pitch / financials'], ['ready', 'Pitch deck and financials ready']]) },
    ] },
  ];
  const REVIEW = { id: 'review', label: 'Review', title: '6. Review' };
  const ALL = STEPS.concat([REVIEW]);

  const blank = () => ({ step: 0, done: false, data: {} });
  const DEMO = { name: 'Mekong Pepper Co.', industry: 'agri', location: 'Kampot', year: '2017', employees: '34', stage: 'growth',
    revenue: '420000', profit: '58000', debt: '40000', books: 'monthly', team: '4', registered: 'yes', tax: 'yes', board: 'advisors',
    customers: '65', growth: 'growing', channel: 'export', competitors: 'Other Kampot pepper exporters',
    ask: '250000', type: 'equity', use: 'Expand drying and packing capacity and obtain export certifications.', plan: 'draft' };

  let S = (() => { try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY))); } catch (e) { return blank(); } })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const n = (k) => Number(S.data[k]) || 0;
  const clamp = RW.clamp;

  function score() {
    const d = S.data, rev = n('revenue');
    const margin = rev > 0 ? n('profit') / rev : 0;
    let financial = ({ none: 25, basic: 50, monthly: 72, audited: 90 })[d.books] || 0;
    if (rev > 0) financial += 5;
    if (margin >= 0.1) financial += 5; else if (margin < 0) financial -= 10;
    if (rev > 0 && n('debt') / rev > 1) financial -= 10;

    const governance = (({ yes: 40, progress: 20, no: 0 })[d.registered] || 0) + (d.tax === 'yes' ? 30 : 0) + (({ board: 30, advisors: 20, none: 0 })[d.board] || 0);
    const model = (({ idea: 35, early: 50, growth: 70, expansion: 80 })[d.stage] || 0) + (d.channel ? 10 : 0) + (n('year') && n('year') <= 2022 ? 5 : 0);
    const traction = (({ declining: 25, flat: 45, growing: 70, fast: 88 })[d.growth] || 0) + Math.min(n('customers'), 100) / 10;
    const team = 35 + Math.min(n('team'), 6) * 6 + Math.min(n('employees'), 30) * 0.8;
    const fundraising = (({ none: 25, draft: 55, ready: 85 })[d.plan] || 0) + (String(d.use || '').length > 20 ? 10 : 0) + (n('ask') > 0 ? 5 : 0);
    const dims = { financial, governance, model, traction, team, fundraising };
    for (const k in dims) dims[k] = Math.round(clamp(dims[k], 0, 100));
    return { dims, total: RW.db.readiness({ dims }) };
  }

  function fieldHtml(f) {
    const v = S.data[f.k] ?? '';
    const id = 'as-' + f.k;
    let control;
    if (f.type === 'select') {
      control = `<select id="${id}" class="input" data-change="as-field" data-key="${f.k}"><option value="">Select…</option>${f.o().map(([val, lab]) => `<option value="${esc(val)}" ${v === val ? 'selected' : ''}>${esc(lab)}</option>`).join('')}</select>`;
    } else if (f.type === 'textarea') {
      control = `<textarea id="${id}" class="input" rows="3" data-input="as-field" data-key="${f.k}">${esc(v)}</textarea>`;
    } else {
      control = `<input id="${id}" class="input" type="${f.type}" ${f.type === 'number' ? 'min="0" inputmode="numeric"' : ''} placeholder="${esc(f.ph || '')}" value="${esc(v)}" data-input="as-field" data-key="${f.k}">`;
    }
    return `<div class="field"><label for="${id}">${f.l}</label>${control}</div>`;
  }

  function reviewHtml() {
    const sc = score();
    const label = (f) => { const v = S.data[f.k]; if (!v) return '—'; if (f.type === 'select') { const m = f.o().find(([x]) => x === v); return esc(m ? m[1] : v); } return esc(v); };
    const summary = STEPS.map((st) => `<h4 class="mt-2 mb-1">${st.label}</h4><dl class="kv">${st.fields.map((f) => `<dt>${f.l}</dt><dd>${label(f)}</dd>`).join('')}</dl>`).join('');
    const report = S.done ? `<div class="divider"></div><h3>Your readiness report</h3>
      <div class="row top wrap" style="gap:24px"><div class="center">${ui.ring(sc.total, 'of 100')}<div class="mt-1">${ui.levelBadge(sc.total)}</div></div>
      <div class="grow" style="min-width:240px">${RW.cards.readinessBreakdown({ dims: sc.dims })}</div></div>
      <p class="xs muted mt-2 mb-0">Illustrative score based on your answers. Not a credit score or financial advice.</p>` : '';
    return `<p class="small muted">Check your answers, go back to any step to change them, then generate your report.</p>${summary}
      <button class="btn btn-primary btn-lg btn-block mt-2" data-action="as-gen">${icon('chart')}Generate report</button>${report}`;
  }

  /* ---------- Business-owner layout: simple top nav (no sidebar) ---------- */
  RW.i18n.add('en', { 'own.report': 'Report', 'own.aifund': 'AI & Funding' });
  RW.i18n.add('km', { 'own.report': 'របាយការណ៍', 'own.aifund': 'AI និងមូលនិធិ' });

  RW.layouts.owner = (def, body) => {
    const t = (...a) => RW.t(...a);
    const links = [['#/', 'nav.home'], ['#/how-it-works', 'nav.how'], ['#/for-smes', 'nav.smes']];
    return `<header class="owner-header"><div class="owner-bar">
        ${RW.brand('#/sme/assessment')}
        <nav class="owner-nav" aria-label="Main">
          ${links.map(([h, k]) => `<a href="${h}">${t(k)}</a>`).join('')}
          <a href="#" data-action="as-report">${t('own.report')}</a>
          <a href="#/sme/matching">${t('own.aifund')}</a>
        </nav>
        <button class="owner-out" data-action="logout">${t('portal.signout')}</button>
      </div></header>
      <main id="main" class="owner-main">${body}</main>`;
  };
  // The router sends unknown layouts to the public one; route 'owner' pages here instead.
  const publicLayout = RW.layouts.public;
  RW.layouts.public = (body, path, def) => (def && def.layout === 'owner' ? RW.layouts.owner(def, body, path) : publicLayout(body, path, def));

  // Business owners land on the assessment after signing in (unless resuming a specific page).
  const demoLogin = RW.actions['demo-login'];
  RW.actions['demo-login'] = (el, e) => (el.dataset.role === 'sme' && !el.dataset.next
    ? demoLogin({ dataset: { role: 'sme', next: 'assessment' } }, e) : demoLogin(el, e));

  RW.route('/sme/assessment', { role: 'sme', layout: 'owner', nav: 'assessment', title: 'm.assessment', render: () => {
    const st = ALL[S.step], last = S.step === ALL.length - 1;
    return `<div class="assess-wrap">
      <h1 style="font-size:30px;margin-bottom:10px">SME Investment Readiness Assessment</h1>
      <p class="form-sub">Answer each section, review your responses, then generate your report.</p>
      <div class="row wrap mb-2"><button class="btn btn-outline btn-lg" data-action="as-load">Load demo business</button><button class="btn btn-outline btn-lg" data-action="as-clear">Clear form</button></div>
      <div class="form-tabs six" role="tablist">${ALL.map((s, i) => `<button role="tab" aria-selected="${i === S.step}" class="${i === S.step ? 'on' : ''}" data-action="as-step" data-i="${i}">${s.label}</button>`).join('')}</div>
      <div class="form-progress"><span style="width:${((S.step + 1) / ALL.length) * 100}%"></span></div>
      <div class="form-card"><h2>${st.title}</h2>
        ${st.fields ? st.fields.map(fieldHtml).join('') : reviewHtml()}
        <div class="row between">
          <button class="btn btn-outline" data-action="as-back" ${S.step === 0 ? 'disabled' : ''}>${icon('arrowLeft')}Back</button>
          ${last ? '' : `<button class="btn btn-primary" data-action="as-next">Next${icon('arrowRight')}</button>`}
        </div></div></div>`;
  } });

  const go = (i) => { S.step = clamp(i, 0, ALL.length - 1); save(); RW.render(); };
  Object.assign(RW.actions, {
    'as-field': (el) => { S.data[el.dataset.key] = el.value; S.done = false; save(); },
    'as-next': () => go(S.step + 1),
    'as-back': () => go(S.step - 1),
    'as-report': () => { S.step = ALL.length - 1; save(); RW.go('/sme/assessment'); },
    'as-step': (el) => go(Number(el.dataset.i)),
    'as-load': () => { S.data = Object.assign({}, DEMO); S.done = false; save(); ui.toast('Demo business loaded.'); RW.render(); },
    'as-clear': () => { S = blank(); save(); ui.toast('Form cleared.'); RW.render(); },
    'as-gen': () => {
      if (!String(S.data.name || '').trim()) { ui.toast('Please enter the business name in step 1 first.', 'warn'); return go(0); }
      S.done = true; save(); ui.toast('Report generated (illustrative).'); RW.render();
    },
  });
})();
