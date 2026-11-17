/* RaiseWise — hash router, role guard and global event delegation.
   Register a page:   RW.route('/sme/dashboard', { role: 'sme', layout: 'portal', nav: 'dashboard', title: 'm.dashboard', render(params) {...} })
   Dynamic segments:  RW.route('/investor/sme/:id', ...) → params.id
   Click actions:     <button data-action="name" data-id="x">  →  RW.actions.name(el, event)
   Change/input:      data-change="name" / data-input="name"   →  RW.actions.name(el, event) */
(function () {
  const routes = [];
  RW.actions = {};

  RW.route = (pattern, def) => {
    const keys = [];
    const rx = new RegExp('^' + pattern.replace(/:[a-zA-Z]+/g, (m) => { keys.push(m.slice(1)); return '([^/]+)'; }) + '$');
    routes.push({ pattern, rx, keys, def });
  };

  RW.go = (path) => { if (location.hash !== '#' + path) location.hash = '#' + path; else RW.render(); };
  RW.path = () => (location.hash.slice(1) || '/').split('?')[0];
  RW.query = () => new URLSearchParams((location.hash.split('?')[1]) || '');

  function resolve(path) {
    for (const r of routes) {
      const m = path.match(r.rx);
      if (m) { const params = {}; r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1]))); return { def: r.def, params }; }
    }
    return { def: routes.find((r) => r.pattern === '/404').def, params: {} };
  }

  let lastPath = null;
  RW.render = function () {
    const path = RW.path();
    const { def, params } = resolve(path);
    const session = RW.store.get().session;

    if (def.role && (!session || session.role !== def.role)) {
      RW.flash = { text: RW.t('auth.required'), tone: 'warn' };
      RW.afterLogin = path; // resume here if the matching demo role is chosen
      return RW.go('/signin');
    }

    const body = def.render(params);
    const html = def.layout === 'portal' ? RW.layouts.portal(def, body, path) : RW.layouts.public(body, path, def);
    document.getElementById('app').innerHTML = html;
    document.title = (def.title ? RW.t(def.title) + ' · ' : '') + 'RaiseWise';

    if (path !== lastPath) { window.scrollTo(0, 0); lastPath = path; }
    if (def.after) def.after(params);
    if (RW.flash) { RW.ui.toast(RW.flash.text, RW.flash.tone); RW.flash = null; }
  };

  /* Re-render while keeping focus + caret in a text field (used by live search inputs) */
  RW.rerenderKeepFocus = function () {
    const a = document.activeElement;
    const id = a && a.id, pos = a && a.selectionStart;
    RW.render();
    if (id) { const el = document.getElementById(id); if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (e) {} } }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const fn = RW.actions[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el, e); }
    else console.warn('[RaiseWise] no action registered for', el.dataset.action);
  });
  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-change]');
    if (el && RW.actions[el.dataset.change]) RW.actions[el.dataset.change](el, e);
  });
  document.addEventListener('input', (e) => {
    const el = e.target.closest('[data-input]');
    if (el && RW.actions[el.dataset.input]) RW.actions[el.dataset.input](el, e);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') RW.ui && RW.ui.closeModal(); });

  window.addEventListener('hashchange', RW.render);
})();
