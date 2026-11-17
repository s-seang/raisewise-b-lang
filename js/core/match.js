/* RaiseWise — deterministic investor matching (illustrative).
   Each criterion (incl. readiness) awards points out of 100. A pair is a "suitable match" when the
   hard criteria (industry + investment type) pass and the raw score is ≥ 55.
   Suitable raw scores 55–100 are mapped onto the 60–98% display range. */
(function () {
  const WEIGHTS = { industry: 20, funding: 18, stage: 12, geo: 8, type: 12, esg: 10, revenue: 10, readiness: 10 };

  function fundingFit(ask, min, max) {
    if (ask >= min && ask <= max) return 'within';
    if (ask >= min * 0.6 && ask <= max * 1.4) return 'partial';
    return 'outside';
  }

  RW.match = function (sme, inv) {
    const t = RW.t, L = RW.L, money = RW.moneyShort;
    const reasons = [], gaps = [];
    let raw = 0;

    // Industry
    const indOk = inv.industries.includes('any') || inv.industries.includes(sme.industry);
    const generalist = inv.industries.includes('any');
    if (indOk) { raw += WEIGHTS.industry * (generalist ? 0.7 : 1); reasons.push(t('match.r.industry', { x: L(RW.seed.industries[sme.industry]).toLowerCase() })); }
    else gaps.push(t('match.g.industry'));

    // Funding amount
    const fit = fundingFit(sme.ask, inv.ticketMin, inv.ticketMax);
    const fv = { ask: money(sme.ask), min: money(inv.ticketMin), max: money(inv.ticketMax) };
    if (fit === 'within') { raw += WEIGHTS.funding; reasons.push(t('match.r.funding', fv)); }
    else if (fit === 'partial') { raw += WEIGHTS.funding * 0.5; reasons.push(t('match.r.fundingnear', fv)); gaps.push(t('match.g.funding', fv)); }
    else gaps.push(t('match.g.funding', fv));

    // Stage
    if (inv.stages.includes(sme.stage)) { raw += WEIGHTS.stage; reasons.push(t('match.r.stage', { x: t('stage.' + sme.stage).toLowerCase() })); }
    else gaps.push(t('match.g.stage', { x: inv.stages.map((s) => t('stage.' + s).toLowerCase()).join(' / ') }));

    // Geography
    const geoOk = inv.geo.includes('nationwide') || inv.geo.includes(sme.province);
    if (geoOk) { raw += WEIGHTS.geo; reasons.push(t('match.r.geo', { x: inv.geo.includes('nationwide') ? t('geo.nationwide') : L(RW.seed.provinces[sme.province]) })); }
    else gaps.push(t('match.g.geo'));

    // Investment type
    const common = sme.seeking.filter((x) => inv.types.includes(x));
    if (common.length) { raw += WEIGHTS.type; reasons.push(t('match.r.type', { x: common.map((c) => t('type.' + c)).join(', ') })); }
    else gaps.push(t('match.g.type'));

    // ESG / impact
    if (inv.esgRequired && !sme.esg) gaps.push(t('match.g.esg'));
    else if (sme.esg && (inv.esgFocus || inv.esgRequired)) { raw += WEIGHTS.esg; reasons.push(t('match.r.esg')); }
    else raw += WEIGHTS.esg * 0.5; // neutral

    // Revenue requirement
    if (sme.revenue >= inv.minRevenue) { raw += WEIGHTS.revenue; if (inv.minRevenue > 0) reasons.push(t('match.r.revenue', { x: money(inv.minRevenue) })); }
    else gaps.push(t('match.g.revenue', { x: money(inv.minRevenue) }));

    // Readiness — better-prepared businesses score higher with every investor
    raw += WEIGHTS.readiness * (RW.db.readiness(sme) / 100);

    raw = Math.round(raw);
    const eligible = indOk && common.length > 0 && !(inv.esgRequired && !sme.esg) && raw >= 55;
    const pct = eligible ? RW.clamp(Math.round(60 + ((raw - 55) / 45) * 38), 60, 98) : null;
    return { investor: inv, sme, raw, pct, eligible, fit, reasons, gaps };
  };

  RW.matchesForSme = (sme) => RW.db.investors().map((inv) => RW.match(sme, inv)).filter((m) => m.eligible).sort((a, b) => b.pct - a.pct);
  RW.matchesForInvestor = (inv) => RW.db.smes().map((sme) => RW.match(sme, inv)).filter((m) => m.eligible).sort((a, b) => b.pct - a.pct);
})();
