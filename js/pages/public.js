/* RaiseWise — public website pages. */
(function () {
  const { icon, esc } = RW;
  const t = (...a) => RW.t(...a);
  const ui = RW.ui;

  const pageHero = (eyebrow, title, lead) => `<section class="page-hero"><div class="container">
    ${eyebrow ? `<div class="eyebrow" style="color:var(--gold-500)">${eyebrow}</div>` : ''}<h1>${title}</h1><p>${lead}</p></div></section>`;

  const checkList = (keys) => `<ul class="check-list">${keys.map((k) => `<li>${icon('checkCircle')}<span>${t(k)}</span></li>`).join('')}</ul>`;

  const ctaBand = () => `<section class="section tight"><div class="container"><div class="cta-band">
    <div><h2>${t('cta.title')}</h2><p>${t('cta.text')}</p></div>
    <div class="row wrap"><a class="btn btn-gold btn-lg" href="#/signin">${icon('sparkle')}${t('nav.explore')}</a></div></div></div></section>`;

  const howSteps = () => `<div class="steps">${[1, 2, 3, 4, 5].map((i) => `<div class="step"><h3>${t('how.' + i + '.t')}</h3><p>${t('how.' + i + '.d')}</p></div>`).join('')}</div>`;

  const aiFeatures = () => {
    const ics = ['clipboard', 'chart', 'compass', 'book', 'file', 'target'];
    return `<div class="grid g-3">${[1, 2, 3, 4, 5, 6].map((i) => `<div class="card feature"><div class="f-ic">${icon(ics[i - 1])}</div><h3>${t('ai.' + i + '.t')}</h3><p>${t('ai.' + i + '.d')}</p></div>`).join('')}</div>`;
  };

  const academyGrid = (limit) => `<div class="grid g-4">${RW.seed.academy.slice(0, limit || 99).map((c) => `
    <div class="card hover cat-card"><div class="cat-ic" style="background:${c.color}1A;color:${c.color}">${c.code}</div>
    <div><h4 class="mb-1">${esc(RW.L(c.title))}</h4><p class="xs mb-1">${esc(RW.L(c.desc))}</p>
    <span class="badge">${t('academy.lessons', { n: c.lessons })}</span></div></div>`).join('')}</div>`;

  /* ---------------- HOME ---------------- */
  RW.route('/', {
    layout: 'public', title: 'nav.home',
    render() {
      const sme = RW.db.sme('sme-mekong-pepper');
      const score = RW.db.readiness(sme);
      const top = RW.matchesForSme(sme)[0];
      const featured = [...RW.db.smes()].sort((a, b) => RW.db.readiness(b) - RW.db.readiness(a)).slice(0, 3);
      const providers = RW.db.investors().slice(0, 4);

      return `
      <section class="hero"><div class="container hero-grid">
        <div>
          <div class="eyebrow" style="color:var(--gold-500)">RaiseWise · Cambodia</div>
          <h1>${t('hero.title')}</h1>
          <p class="lead">${t('hero.lead')}</p>
          <div class="row wrap">
            <a class="btn btn-gold btn-lg" href="#" data-action="demo-login" data-role="sme">${t('hero.cta1')}${icon('arrowRight')}</a>
            <a class="btn btn-light btn-lg" href="#" data-action="demo-login" data-role="investor">${t('hero.cta2')}</a>
          </div>
          <div class="hero-trust">
            <span>${icon('pin')}${t('hero.trust1')}</span><span>${icon('globe')}${t('hero.trust2')}</span><span>${icon('sparkle')}${t('hero.trust3')}</span>
          </div>
        </div>
        <div class="hero-panel" aria-label="${t('hero.panel.title')}">
          <div class="mini"><div class="row between mb-1"><b class="small">${t('hero.panel.title')}</b>${ui.demoBadge()}</div>
            <div class="row" style="gap:18px">${ui.ring(score, t('dash.readiness.of'))}
              <div class="grow stack-sm"><div class="bold">${esc(sme.name)}</div><div class="xs muted">${esc(RW.L(RW.seed.industries[sme.industry]))}</div>${ui.levelBadge(score)}
              <div class="xs muted">${t('dash.ask')}: <b>${RW.moneyShort(sme.ask)}</b></div></div></div></div>
          ${top ? `<div class="mini"><div class="row between"><div><div class="xs muted">${t('hero.panel.match')}</div><b>${esc(top.investor.name)}</b></div>
            <div class="match-pct">${top.pct}%<small>${t('match.pct')}</small></div></div>
            <div class="mt-1">${top.reasons.slice(0, 2).map((r) => `<div class="reason ok">${icon('checkCircle')}<span>${r}</span></div>`).join('')}</div></div>` : ''}
        </div>
      </div></section>

      <div class="container entry-cards"><div class="grid g-2">
        <div class="entry-card sme"><div class="ic">${icon('building')}</div><div><h3>${t('entry.sme.title')}</h3><p class="small">${t('entry.sme.text')}</p>
          <div class="row wrap"><a class="btn btn-primary" href="#" data-action="demo-login" data-role="sme">${t('entry.sme.cta')}${icon('arrowRight')}</a><a class="btn btn-ghost" href="#/for-smes">${t('nav.smes')}</a></div></div></div>
        <div class="entry-card inv"><div class="ic">${icon('briefcase')}</div><div><h3>${t('entry.inv.title')}</h3><p class="small">${t('entry.inv.text')}</p>
          <div class="row wrap"><a class="btn btn-dark" href="#" data-action="demo-login" data-role="investor">${t('entry.inv.cta')}${icon('arrowRight')}</a><a class="btn btn-ghost" href="#/for-investors">${t('nav.investors')}</a></div></div></div>
      </div></div>

      <section class="section"><div class="container">
        <div class="section-head"><div class="eyebrow">${t('home.challenge.eyebrow')}</div><h2>${t('home.challenge.title')}</h2><p>${t('home.challenge.text')}</p></div>
        <div class="grid g-4">${[['ch.1', 'file'], ['ch.2', 'book'], ['ch.3', 'search'], ['ch.4', 'eye']].map(([k, ic]) => `
          <div class="card feature"><div class="f-ic" style="background:var(--danger-bg);color:var(--danger)">${icon(ic)}</div><h3>${t(k + '.t')}</h3><p>${t(k + '.d')}</p></div>`).join('')}</div>
      </div></section>

      <section class="section alt"><div class="container grid g-2" style="align-items:center;gap:48px">
        <div><div class="eyebrow">${t('home.solution.eyebrow')}</div><h2>${t('home.solution.title')}</h2><p>${t('home.solution.text')}</p>
          <a class="btn btn-outline" href="#/how-it-works">${t('nav.how')}${icon('arrowRight')}</a></div>
        <div class="grid g-2">${[['how.1.t', 'clipboard'], ['how.2.t', 'book'], ['how.3.t', 'folder'], ['how.4.t', 'target']].map(([k, ic]) => `
          <div class="card flat feature"><div class="f-ic">${icon(ic)}</div><h3 class="mb-0">${t(k)}</h3></div>`).join('')}</div>
      </div></section>

      <section class="section"><div class="container">
        <div class="section-head center"><div class="eyebrow">${t('how.eyebrow')}</div><h2>${t('how.title')}</h2></div>
        ${howSteps()}
      </div></section>

      <section class="section alt"><div class="container grid g-2">
        <div class="card"><div class="row mb-2"><div class="stat-icon" style="width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--teal-50);color:var(--teal-700)">${icon('building')}</div><h3 class="mb-0">${t('ben.sme.title')}</h3></div>
          ${checkList(['ben.sme.1', 'ben.sme.2', 'ben.sme.3', 'ben.sme.4', 'ben.sme.5'])}</div>
        <div class="card"><div class="row mb-2"><div style="width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--gold-100);color:#8A6400">${icon('briefcase')}</div><h3 class="mb-0">${t('ben.inv.title')}</h3></div>
          ${checkList(['ben.inv.1', 'ben.inv.2', 'ben.inv.3', 'ben.inv.4', 'ben.inv.5'])}</div>
      </div></section>

      <section class="section dark"><div class="container">
        <div class="section-head"><div class="eyebrow">${t('ai.eyebrow')}</div><h2>${t('ai.title')}</h2><p>${t('ai.text')}</p></div>
        ${aiFeatures()}
      </div></section>

      <section class="section"><div class="container">
        <div class="row between wrap mb-3"><div class="section-head mb-0"><h2>${t('feat.biz.title')}</h2><p class="mb-0">${t('feat.biz.text')}</p></div></div>
        <div class="grid g-3">${featured.map((s) => RW.cards.smeCard(s, { href: '/investor/sme/' + s.id })).join('')}</div>
      </div></section>

      <section class="section alt"><div class="container">
        <div class="row between wrap mb-3"><div class="section-head mb-0"><h2>${t('feat.inv.title')}</h2><p class="mb-0">${t('feat.inv.text')}</p></div>
          <a class="btn btn-outline" href="#/partners">${t('feat.viewall')}${icon('arrowRight')}</a></div>
        <div class="grid g-4">${providers.map((i) => RW.cards.investorCard(i)).join('')}</div>
      </div></section>

      <section class="section"><div class="container">
        <div class="row between wrap mb-3"><div class="section-head mb-0"><div class="eyebrow">${t('acad.eyebrow')}</div><h2>${t('acad.title')}</h2><p class="mb-0">${t('acad.text')}</p></div>
          <a class="btn btn-outline" href="#/academy">${t('acad.browse')}${icon('arrowRight')}</a></div>
        ${academyGrid(4)}
      </div></section>
      ${ctaBand()}`;
    },
  });

  /* ---------------- ABOUT ---------------- */
  RW.route('/about', {
    layout: 'public', title: 'nav.about',
    render: () => `${pageHero('', t('about.title'), t('about.lead'))}
      <section class="section"><div class="container">
        <div class="grid g-3">${[['about.mission', 'target'], ['about.vision', 'compass'], ['about.values', 'shield']].map(([k, ic]) => `
          <div class="card feature"><div class="f-ic">${icon(ic)}</div><h3>${t(k + '.t')}</h3><p>${t(k + '.d')}</p></div>`).join('')}</div>
        <div class="grid g-2 mt-4">
          <div class="card"><h3>${t('about.who.t')}</h3><p class="mb-0">${t('about.who.d')}</p></div>
          <div class="card"><h3>${t('about.status.t')}</h3><p>${t('about.status.d')}</p>${ui.badge(t('demo.mode'), 'demo', 'flag')}</div>
        </div>
      </div></section>${ctaBand()}`,
  });

  /* ---------------- HOW IT WORKS ---------------- */
  RW.route('/how-it-works', {
    layout: 'public', title: 'nav.how',
    render: () => `${pageHero(t('how.eyebrow'), t('how.title'), t('how.page.lead'))}
      <section class="section"><div class="container">
        <h2 class="mb-3">${t('how.sme.t')}</h2>${howSteps()}
        <div class="grid g-2 mt-4" style="align-items:start">
          <div class="card"><h3>${t('how.inv.t')}</h3>${checkList(['how.inv.1', 'how.inv.2', 'how.inv.3', 'how.inv.4', 'how.inv.5'])}</div>
          <div class="card"><h3>${t('ai.title')}</h3><p class="small">${t('ai.text')}</p>
            ${ui.notice(t('match.notice'), 'warn')}</div>
        </div>
      </div></section>${ctaBand()}`,
  });

  /* ---------------- FOR SMEs ---------------- */
  RW.route('/for-smes', {
    layout: 'public', title: 'nav.smes',
    render: () => `${pageHero(t('nav.smes'), t('entry.sme.title'), t('smes.lead'))}
      <section class="section"><div class="container grid g-2" style="gap:40px;align-items:start">
        <div><h2>${t('smes.what')}</h2>${checkList(['ben.sme.1', 'ben.sme.2', 'ben.sme.3', 'ben.sme.4', 'ben.sme.5'])}
          <a class="btn btn-primary btn-lg mt-3" href="#" data-action="demo-login" data-role="sme">${t('hero.cta1')}${icon('arrowRight')}</a></div>
        <div><h2>${t('smes.types')}</h2><div class="grid g-2">${['equity', 'debt', 'grant', 'blended'].map((k) => `
          <div class="card"><h4>${t('ft.' + k)}</h4><p class="small mb-0">${t('ft.' + k + '.d')}</p></div>`).join('')}</div></div>
      </div></section>
      <section class="section alt"><div class="container"><div class="section-head"><h2>${t('how.title')}</h2></div>${howSteps()}</div></section>${ctaBand()}`,
  });

  /* ---------------- FOR INVESTORS ---------------- */
  RW.route('/for-investors', {
    layout: 'public', title: 'nav.investors',
    render: () => {
      const featured = [...RW.db.smes()].sort((a, b) => RW.db.readiness(b) - RW.db.readiness(a)).slice(0, 3);
      return `${pageHero(t('nav.investors'), t('entry.inv.title'), t('inv.lead'))}
      <section class="section"><div class="container grid g-2" style="gap:40px;align-items:start">
        <div><h2>${t('inv.what')}</h2>${checkList(['ben.inv.1', 'ben.inv.2', 'ben.inv.3', 'ben.inv.4', 'ben.inv.5'])}
          <a class="btn btn-dark btn-lg mt-3" href="#" data-action="demo-login" data-role="investor">${t('hero.cta2')}${icon('arrowRight')}</a></div>
        <div class="card"><h3>${t('how.inv.t')}</h3>${checkList(['how.inv.1', 'how.inv.2', 'how.inv.3', 'how.inv.4', 'how.inv.5'])}</div>
      </div></section>
      <section class="section alt"><div class="container"><div class="section-head"><h2>${t('feat.biz.title')}</h2><p>${t('feat.biz.text')}</p></div>
        <div class="grid g-3">${featured.map((s) => RW.cards.smeCard(s, { href: '/investor/sme/' + s.id })).join('')}</div></div></section>${ctaBand()}`;
    },
  });

  /* ---------------- ACADEMY (public) ---------------- */
  RW.route('/academy', {
    layout: 'public', title: 'nav.academy',
    render: () => `${pageHero(t('acad.eyebrow'), t('acad.title'), t('academy.lead'))}
      <section class="section"><div class="container">${academyGrid()}
        <div class="card mt-4 row between wrap"><p class="mb-0">${t('academy.stage2')}</p>
          <div class="row wrap"><a class="btn btn-primary" href="#" data-action="demo-login" data-role="sme" data-next="academy">${t('ac.for.sme')}</a>
          <a class="btn btn-outline" href="#" data-action="demo-login" data-role="investor" data-next="academy">${t('ac.for.inv')}</a></div></div>
      </div></section>`,
  });

  /* ---------------- PARTNER DIRECTORY ---------------- */
  const dirState = { q: '', kind: '' };
  RW.actions['dir-search'] = (el) => { dirState.q = el.value; RW.rerenderKeepFocus(); };
  RW.actions['dir-kind'] = (el) => { dirState.kind = el.value; RW.render(); };
  RW.actions['dir-clear'] = () => { dirState.q = ''; dirState.kind = ''; RW.render(); };

  RW.route('/partners', {
    layout: 'public', title: 'nav.partners',
    render() {
      const q = dirState.q.trim().toLowerCase();
      const kinds = [...new Set(RW.db.investors().map((i) => i.kind))];
      const list = RW.db.investors().filter((i) => (!dirState.kind || i.kind === dirState.kind) &&
        (!q || (i.name + ' ' + i.about + ' ' + i.industries.map((x) => x === 'any' ? 'any' : RW.L(RW.seed.industries[x])).join(' ')).toLowerCase().includes(q)));
      return `${pageHero(t('nav.partners'), t('nav.partners'), t('partners.lead'))}
      <section class="section"><div class="container">
        ${ui.notice(t('partners.notice'), 'warn')}
        <div class="toolbar mt-3">
          <div class="search">${icon('search')}<input id="dir-q" class="input" type="search" placeholder="${t('partners.search')}" value="${esc(dirState.q)}" data-input="dir-search" aria-label="${t('partners.search')}"></div>
          <select class="select" data-change="dir-kind" aria-label="${t('partners.alltypes')}"><option value="">${t('partners.alltypes')}</option>
            ${kinds.map((k) => `<option value="${k}" ${dirState.kind === k ? 'selected' : ''}>${t('kind.' + k)}</option>`).join('')}</select>
          <span class="small muted">${t('partners.count', { n: list.length })}</span>
        </div>
        ${list.length ? `<div class="grid g-4">${list.map((i) => RW.cards.investorCard(i)).join('')}</div>`
          : `<div class="card">${ui.empty({ title: t('partners.empty'), text: t('partners.empty.d'), action: `<button class="btn btn-outline" data-action="dir-clear">${t('partners.clear')}</button>` })}</div>`}
      </div></section>`;
    },
  });

  /* ---------------- SIGN IN (assessment-style form page) ---------------- */
  RW.i18n.add('en', {
    'si.title': 'Sign in to RaiseWise',
    'si.sub': 'Choose your account type, enter your details, then continue to your portal.',
    'si.load': 'Load demo account', 'si.clear': 'Clear form',
    'si.tab.sme': 'Business owner', 'si.tab.inv': 'Investor',
    'si.h.sme': '1. Business owner sign in', 'si.h.inv': '2. Investor sign in',
    'si.email': 'Email address', 'si.password': 'Password', 'si.submit': 'Sign in',
    'si.note': 'Demo only: any email and password works, nothing is sent to a server.',
    'si.admin': 'Platform administrator? Enter the admin demo',
    'si.missing': 'Please enter your email and password, or press "Load demo account".',
  });
  RW.i18n.add('km', {
    'si.title': 'ចូល RaiseWise',
    'si.sub': 'ជ្រើសរើសប្រភេទគណនី បញ្ចូលព័ត៌មាន ហើយបន្តទៅផតថលរបស់អ្នក។',
    'si.load': 'ផ្ទុកគណនីសាកល្បង', 'si.clear': 'សម្អាតទម្រង់',
    'si.tab.sme': 'ម្ចាស់អាជីវកម្ម', 'si.tab.inv': 'វិនិយោគិន',
    'si.h.sme': '១. ចូលជាម្ចាស់អាជីវកម្ម', 'si.h.inv': '២. ចូលជាវិនិយោគិន',
    'si.email': 'អាសយដ្ឋានអ៊ីមែល', 'si.password': 'ពាក្យសម្ងាត់', 'si.submit': 'ចូល',
    'si.note': 'សាកល្បងប៉ុណ្ណោះ៖ អ៊ីមែល និងពាក្យសម្ងាត់ណាក៏បាន គ្មានអ្វីត្រូវបានផ្ញើទៅម៉ាស៊ីនមេទេ។',
    'si.admin': 'អ្នកគ្រប់គ្រងវេទិកា? ចូលសាកល្បងជាអ្នកគ្រប់គ្រង',
    'si.missing': 'សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់ ឬចុច «ផ្ទុកគណនីសាកល្បង»។',
  });

  const DEMO_LOGIN = {
    sme: { email: 'sokha.chan@mekongpepper.example', password: 'demo1234' },
    investor: { email: 'bopha.meas@lotusimpact.example', password: 'demo1234' },
  };
  let authRole = 'sme';

  RW.actions['auth-role'] = (el) => { authRole = el.dataset.role; RW.render(); };
  RW.actions['signin-load'] = () => {
    const d = DEMO_LOGIN[authRole];
    RW.$('#si-email').value = d.email;
    RW.$('#si-pass').value = d.password;
  };
  RW.actions['signin-clear'] = () => {
    RW.$('#si-email').value = '';
    RW.$('#si-pass').value = '';
    RW.$('#si-email').focus();
  };
  RW.signinSubmit = () => {
    const email = RW.$('#si-email').value.trim(), pass = RW.$('#si-pass').value;
    if (!email || !pass) { ui.toast(t('si.missing'), 'warn'); return false; }
    RW.actions['demo-login']({ dataset: { role: authRole } });
    return false;
  };

  RW.route('/signin', {
    layout: 'public', title: 'nav.signin', bare: true,
    render() {
      const tabs = [['sme', 'si.tab.sme'], ['investor', 'si.tab.inv']];
      const idx = tabs.findIndex(([k]) => k === authRole);
      return `<div class="form-page">
        <h1>${t('si.title')}</h1>
        <p class="form-sub">${t('si.sub')}</p>
        <div class="row wrap mb-2">
          <button class="btn btn-outline btn-lg" data-action="signin-load">${t('si.load')}</button>
          <button class="btn btn-outline btn-lg" data-action="signin-clear">${t('si.clear')}</button>
        </div>
        <div class="form-tabs" role="tablist">${tabs.map(([k, label]) => `<button role="tab" aria-selected="${authRole === k}" class="${authRole === k ? 'on' : ''}" data-action="auth-role" data-role="${k}">${t(label)}</button>`).join('')}</div>
        <div class="form-progress"><span style="width:${((idx + 1) / tabs.length) * 100}%"></span></div>
        <form class="form-card" onsubmit="return RW.signinSubmit()">
          <h2>${t(authRole === 'sme' ? 'si.h.sme' : 'si.h.inv')}</h2>
          <div class="field"><label for="si-email">${t('si.email')}</label>
            <input id="si-email" class="input" type="email" autocomplete="username" autofocus></div>
          <div class="field"><label for="si-pass">${t('si.password')}</label>
            <input id="si-pass" class="input" type="password" autocomplete="current-password"></div>
          <button class="btn btn-primary btn-lg btn-block" type="submit">${icon('lock')}${t('si.submit')}</button>
          <p class="help mb-0">${t('si.note')}</p>
        </form>
        <p class="center mt-3"><a href="#" class="small" data-action="demo-login" data-role="admin">${t('si.admin')}</a></p>
      </div>`;
    },
  });

  /* ---------------- 404 ---------------- */
  RW.route('/404', {
    layout: 'public', title: 'nf.title',
    render: () => `<section class="section"><div class="container">${ui.empty({ title: t('nf.title'), text: t('nf.text'), ic: 'compass', action: `<a class="btn btn-primary" href="#/">${t('nf.home')}</a>` })}</div></section>`,
  });
})();
