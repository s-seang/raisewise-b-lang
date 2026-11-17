/* RaiseWise — public website layout (header + footer). */
(function () {
  const { icon } = RW;
  const t = (...a) => RW.t(...a);
  RW.layouts = RW.layouts || {};

  RW.publicNav = [
    ['/', 'nav.home'], ['/about', 'nav.about'], ['/how-it-works', 'nav.how'], ['/for-smes', 'nav.smes'],
    ['/for-investors', 'nav.investors'], ['/academy', 'nav.academy'], ['/partners', 'nav.partners'],
  ];

  RW.brand = (href = '#/') => `<a class="brand" href="${href}"><span class="brand-mark">${icon('logo')}</span><span>RaiseWise<small>${t('brand.tag')}</small></span></a>`;

  function header(path) {
    const session = RW.store.get().session;
    return `
      <div class="demo-strip">${t('demo.strip')}</div>
      <header class="site-header"><div class="container">
        ${RW.brand()}
        <nav class="site-nav" id="site-nav" aria-label="Main">
          ${RW.publicNav.map(([p, k]) => `<a href="#${p}" class="${path === p ? 'active' : ''}">${t(k)}</a>`).join('')}
          <a href="#/signin" class="nav-mobile-only">${t('nav.explore')} / ${t('nav.signin')}</a>
        </nav>
        <div class="header-actions">
          ${RW.ui.langToggle()}
          ${session
            ? `<a class="btn btn-primary btn-sm" href="#/${session.role}/dashboard">${icon('dashboard')}${t('m.dashboard')}</a>`
            : `<a class="btn btn-ghost btn-sm hide-sm hide-md" href="#/signin">${t('nav.signin')}</a>
               <a class="btn btn-gold btn-sm hide-xs" href="#/signin">${icon('sparkle')}${t('nav.explore')}</a>`}
          <button class="icon-btn menu-btn" data-action="toggle-menu" aria-label="${t('nav.menu')}">${icon('menu')}</button>
        </div>
      </div></header>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="container">
      <div class="footer-grid">
        <div>${RW.brand()}<p class="mt-2" style="color:#A9B8CC">${t('footer.about')}</p></div>
        <div><h4>${t('footer.platform')}</h4>${RW.publicNav.slice(1).map(([p, k]) => `<a href="#${p}">${t(k)}</a>`).join('')}</div>
        <div><h4>${t('footer.portals')}</h4>
          <a href="#" data-action="demo-login" data-role="sme">${t('auth.enter.sme')}</a>
          <a href="#" data-action="demo-login" data-role="investor">${t('auth.enter.inv')}</a>
          <a href="#" data-action="demo-login" data-role="admin">${t('auth.enter.admin')}</a>
          <a href="#/signin">${t('nav.signin')}</a></div>
        <div><h4>${t('footer.contact')}</h4>
          <span style="display:block;padding:3px 0">${t('footer.address')}</span>
          <span style="display:block;padding:3px 0">hello@raisewise.example</span>
          <span style="display:block;padding:3px 0" class="xs">(${t('demo.label')})</span></div>
      </div>
      <div class="disclaimer">${t('footer.disclaimer')}</div>
      <div class="footer-bottom"><span>© 2026 RaiseWise · ${t('footer.rights')}</span><span>EN / ខ្មែរ</span></div>
    </div></footer>`;
  }

  RW.layouts.public = (body, path, def) => header(path) + `<main id="main">${body}</main>` + (def && def.bare ? '' : footer());
})();
