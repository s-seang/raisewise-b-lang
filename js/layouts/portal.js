/* RaiseWise — portal layout (sidebar + topbar) and per-role navigation.
   Each role sees only its own navigation. `soon: true` marks modules scaffolded for a later stage. */
(function () {
  const { icon, esc } = RW;
  const t = (...a) => RW.t(...a);

  RW.portalNav = {
    sme: [
      { g: 'grp.overview', items: [['dashboard', 'm.dashboard', 'dashboard']] },
      { g: 'grp.business', items: [['profile', 'm.profile', 'building', 1], ['onboarding', 'm.onboarding', 'clipboard', 1]] },
      { g: 'grp.readiness', items: [['assessment', 'm.assessment', 'clipboard', 1], ['report', 'm.report', 'chart', 1], ['ai', 'm.ai', 'bot', 1]] },
      { g: 'grp.fundraising', items: [['workspace', 'm.workspace', 'folder', 1], ['financial', 'm.financial', 'calc', 1], ['teaser', 'm.teaser', 'file', 1]] },
      { g: 'grp.investors', items: [['find', 'm.find', 'search', 1], ['matching', 'm.matching', 'target'], ['saved', 'm.saved', 'bookmark'], ['messages', 'm.messages', 'message', 1]] },
      { g: 'grp.learn', items: [['academy', 'm.academy', 'book']] },
      { g: 'grp.account', items: [['notifications', 'm.notifications', 'bell'], ['settings', 'm.settings', 'settings', 1]] },
    ],
    investor: [
      { g: 'grp.overview', items: [['dashboard', 'm.inv.dashboard', 'dashboard']] },
      { g: 'grp.org', items: [['organization', 'm.org', 'building', 1], ['preferences', 'm.prefs', 'compass', 1]] },
      { g: 'grp.deals', items: [['discover', 'm.discover', 'search'], ['recommended', 'm.recommended', 'sparkle'], ['saved', 'm.savedopps', 'bookmark'], ['pipeline', 'm.pipeline', 'kanban']] },
      { g: 'grp.investors', items: [['messages', 'm.inv.messages', 'message', 1], ['documents', 'm.docs', 'lock', 1]] },
      { g: 'grp.learn', items: [['academy', 'm.academy', 'book']] },
      { g: 'grp.account', items: [['notifications', 'm.notifications', 'bell'], ['settings', 'm.settings', 'settings', 1]] },
    ],
    admin: [
      { g: 'grp.overview', items: [['dashboard', 'm.admin.overview', 'dashboard']] },
      { g: 'grp.manage', items: [['users', 'm.users', 'users', 1], ['smes', 'm.smes', 'building'], ['investors', 'm.investors', 'briefcase'], ['directory', 'm.directory', 'globe', 1], ['verification', 'm.verify', 'shield']] },
      { g: 'grp.content', items: [['content', 'm.content', 'book', 1], ['reports', 'm.reports', 'flag', 1]] },
      { g: 'grp.insight', items: [['activity', 'm.activity', 'activity', 1], ['analytics', 'm.analytics', 'bar', 1], ['notifications', 'm.notifications', 'bell'], ['settings', 'm.settings', 'settings', 1]] },
    ],
  };

  function who(role) {
    if (role === 'sme') { const s = RW.db.currentSme(); return { name: RW.seed.demoUsers.sme.name, org: s.name }; }
    if (role === 'investor') { const i = RW.db.currentInvestor(); return { name: RW.seed.demoUsers.investor.name, org: i.name }; }
    return { name: RW.seed.demoUsers.admin.name, org: 'RaiseWise' };
  }

  RW.layouts.portal = function (def, body, path) {
    const role = RW.store.get().session.role;
    const me = who(role);
    const unread = RW.db.unreadCount(role);
    const nav = RW.portalNav[role].map((grp) => `
      <div class="side-group">${t(grp.g)}</div>
      ${grp.items.map(([key, label, ic, soon]) => {
        const active = def.nav === key;
        const count = key === 'notifications' && unread ? `<span class="count">${unread}</span>` : '';
        return `<a class="side-link ${active ? 'active' : ''}" href="#/${role}/${key}" ${active ? 'aria-current="page"' : ''}>${icon(ic)}<span>${t(label)}</span>${count || (soon ? `<span class="soon">${t('portal.soon')}</span>` : '')}</a>`;
      }).join('')}`).join('');

    return `<div class="portal">
      <aside class="sidebar" id="sidebar">
        ${RW.brand('#/' + role + '/dashboard')}
        <div class="side-role">${RW.ui.avatar(me.org, 'sm')}<div class="who">${esc(me.name)}<small>${esc(me.org)} · ${t('role.' + role)}</small></div></div>
        <nav class="side-nav" aria-label="${t('role.' + role + '.long')}">${nav}</nav>
        <div class="side-foot">${t('portal.sidefoot')}
          <div class="row wrap mt-1"><a class="btn btn-light btn-sm" href="#/">${icon('globe')}${t('portal.public')}</a>
          <button class="btn btn-light btn-sm" data-action="reset-demo">${icon('refresh')}${t('demo.reset')}</button></div></div>
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="icon-btn portal-menu-btn" data-action="toggle-sidebar" aria-label="${t('nav.menu')}">${icon('menu')}</button>
          <div class="crumb">${t('role.' + role + '.long')} / <b>${t(def.title)}</b></div>
          <div class="tb-actions">
            <span class="demo-pill hide-xs" title="${t('demo.simulated')}">${icon('flag')}${t('demo.mode')}</span>
            <label class="role-switch"><span>${t('portal.switch')}</span>
              <select data-change="switch-role" aria-label="${t('portal.switch')}">
                ${['sme', 'investor', 'admin'].map((r) => `<option value="${r}" ${r === role ? 'selected' : ''}>${t('role.' + r)}</option>`).join('')}
              </select></label>
            ${RW.ui.langToggle()}
            <a class="icon-btn" href="#/${role}/notifications" aria-label="${t('portal.notifications')}">${icon('bell')}${unread ? '<span class="dot"></span>' : ''}</a>
            <button class="icon-btn hide-xs" data-action="reset-demo" title="${t('demo.reset')}" aria-label="${t('demo.reset')}">${icon('refresh')}</button>
            <a class="icon-btn hide-xs" href="#/" title="${t('portal.public')}" aria-label="${t('portal.public')}">${icon('globe')}</a>
            <button class="icon-btn" data-action="logout" title="${t('portal.signout')}" aria-label="${t('portal.signout')}">${icon('logout')}</button>
          </div>
        </header>
        <div class="content" id="main">${body}</div>
      </div>
    </div>`;
  };
})();
