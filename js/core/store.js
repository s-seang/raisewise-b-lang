/* RaiseWise — demo state store.
   Seed data is read-only; everything a demo user changes lives in `state`
   and is persisted to localStorage so it survives refreshes during a presentation.
   When a Laravel API arrives, swap the bodies of RW.db.* for fetch calls. */
(function () {
  const KEY = 'rw.demo.v1';

  const fresh = () => ({
    session: null,                         // { role: 'sme' | 'investor' | 'admin', userId }
    saved: { sme: [], investor: [] },      // sme → investor ids · investor → sme ids
    interests: [],                         // { id, from: 'sme'|'investor', smeId, investorId, date }
    verification: {},                      // entityId → 'verified' | 'pending' | 'rejected'
    pipeline: JSON.parse(JSON.stringify(RW.seed.pipeline)),
    docRequests: JSON.parse(JSON.stringify(RW.seed.docRequests)),
    readNotifications: [],
    activity: [],                          // extra activity created during the demo
  });

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (raw && typeof raw === 'object') return Object.assign(fresh(), raw);
    } catch (e) { /* storage unavailable or corrupted → start fresh */ }
    return fresh();
  }

  let state = load();
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  RW.store = {
    get: () => state,
    update(fn) { fn(state); persist(); },
    reset() { const s = state.session; state = fresh(); state.session = s; persist(); },
    login(role) { state.session = { role, userId: RW.seed.demoUsers[role].id }; persist(); },
    logout() { state.session = null; persist(); },
    log(text) { state.activity.unshift({ date: RW.today(), text }); state.activity = state.activity.slice(0, 30); persist(); },
  };

  /* ---------- Data access layer ---------- */
  const W = { financial: .25, governance: .15, model: .15, traction: .15, team: .10, fundraising: .20 };

  RW.db = {
    smes: () => RW.seed.smes,
    investors: () => RW.seed.investors,
    sme: (id) => RW.seed.smes.find((s) => s.id === id),
    investor: (id) => RW.seed.investors.find((i) => i.id === id),
    currentSme: () => RW.db.sme(state.session && state.session.role === 'sme' ? state.session.userId : RW.seed.demoUsers.sme.id),
    currentInvestor: () => RW.db.investor(state.session && state.session.role === 'investor' ? state.session.userId : RW.seed.demoUsers.investor.id),

    readiness(sme) {
      let total = 0; for (const k in W) total += (sme.dims[k] || 0) * W[k];
      return Math.round(total);
    },
    readinessLevel(score) { return score >= 75 ? 'strong' : score >= 55 ? 'developing' : 'early'; },
    weakestDim(sme) { return Object.entries(sme.dims).sort((a, b) => a[1] - b[1])[0][0]; },

    status(entity) { return state.verification[entity.id] || entity.verified || 'pending'; },
    setStatus(id, st) { RW.store.update((s) => { s.verification[id] = st; }); },

    isSaved(role, id) { return state.saved[role].includes(id); },
    toggleSaved(role, id) {
      let now;
      RW.store.update((s) => {
        const list = s.saved[role];
        const i = list.indexOf(id);
        if (i >= 0) { list.splice(i, 1); now = false; } else { list.push(id); now = true; }
      });
      return now;
    },

    hasInterest(from, smeId, investorId) { return state.interests.some((x) => x.from === from && x.smeId === smeId && x.investorId === investorId); },
    addInterest(from, smeId, investorId) {
      if (RW.db.hasInterest(from, smeId, investorId)) return;
      RW.store.update((s) => s.interests.push({ id: RW.uid('int'), from, smeId, investorId, date: RW.today() }));
      const a = from === 'sme' ? RW.db.sme(smeId).name : RW.db.investor(investorId).name;
      const b = from === 'sme' ? RW.db.investor(investorId).name : RW.db.sme(smeId).name;
      RW.store.log({ en: `${a} expressed interest in ${b}`, km: `${a} បានបង្ហាញចំណាប់អារម្មណ៍លើ ${b}` });
    },

    pipelineFor: (investorId) => state.pipeline.filter((d) => d.investorId === investorId),
    moveDeal(id, stage) { RW.store.update((s) => { const d = s.pipeline.find((x) => x.id === id); if (d) { d.stage = stage; d.updated = RW.today().slice(0, 10); } }); },

    docRequestsFor: (investorId) => state.docRequests.filter((d) => d.investorId === investorId),
    hasDocRequest: (investorId, smeId) => state.docRequests.some((d) => d.investorId === investorId && d.smeId === smeId),
    addDocRequest(investorId, smeId) {
      if (RW.db.hasDocRequest(investorId, smeId)) return;
      RW.store.update((s) => s.docRequests.push({ id: RW.uid('doc'), investorId, smeId, status: 'pending', date: RW.today().slice(0, 10) }));
      RW.store.log({ en: `Document access requested for ${RW.db.sme(smeId).name}`, km: `សំណើចូលមើលឯកសារសម្រាប់ ${RW.db.sme(smeId).name}` });
    },

    notifications(role) { return (RW.seed.notifications[role] || []).map((n) => ({ ...n, read: state.readNotifications.includes(n.id) })); },
    unreadCount(role) { return RW.db.notifications(role).filter((n) => !n.read).length; },
    markAllRead(role) { RW.store.update((s) => { RW.seed.notifications[role].forEach((n) => { if (!s.readNotifications.includes(n.id)) s.readNotifications.push(n.id); }); }); },

    activity() { return [...state.activity, ...RW.seed.activity]; },
  };
})();
