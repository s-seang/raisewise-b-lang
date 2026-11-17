/* RaiseWise — i18n (English / Khmer).
   RW.t(key, vars) looks up the active language, falls back to English, then to the key.
   Data objects can carry {en, km} pairs — read them with RW.L(obj). */
(function () {
  const LS_KEY = 'rw.lang';
  const D = { en: {}, km: {} };
  const add = (lang, obj) => Object.assign(D[lang], obj);

  /* ---------------- ENGLISH ---------------- */
  add('en', {
    'brand.tag': 'SME Investment Platform',
    'demo.strip': '<b>University project prototype.</b> All businesses, investors, scores and matches are simulated for demonstration.',
    'demo.simulated': 'Simulated demo access',
    'demo.mode': 'Demo mode',
    'demo.label': 'Demo',
    'demo.business': 'Demo business',
    'demo.illustrative': 'Illustrative listing',
    'demo.reset': 'Reset demo data',
    'demo.reset.done': 'Demo data reset to the original seed.',
    'demo.reset.confirm': 'This clears saved items, interests, verification changes and pipeline updates made during this demo. Continue?',

    'nav.home': 'Home', 'nav.about': 'About RaiseWise', 'nav.how': 'How It Works', 'nav.smes': 'For SMEs',
    'nav.investors': 'For Investors', 'nav.academy': 'RaiseWise Academy', 'nav.partners': 'Partner Directory',
    'nav.signin': 'Sign In / Register', 'nav.explore': 'Explore Demo', 'nav.menu': 'Menu',

    'hero.title': 'Your Business Deserves the Right Capital to Grow.',
    'hero.lead': 'From understanding your business to becoming investment-ready and connecting with the right partners, RaiseWise empowers you to raise capital with confidence.',
    'hero.cta1': 'Get Investment Ready', 'hero.cta2': 'Explore Investment Opportunities',
    'hero.trust1': 'Built for Cambodian SMEs', 'hero.trust2': 'English & Khmer', 'hero.trust3': 'Simulated AI guidance',
    'hero.panel.title': 'Readiness snapshot', 'hero.panel.match': 'Top investor match',

    'entry.sme.title': "I'm an SME", 'entry.sme.text': 'Check how investment-ready your business is, close the gaps, and find capital providers that fit.',
    'entry.sme.cta': 'Start as an SME',
    'entry.inv.title': "I'm an Investor", 'entry.inv.text': 'Discover Cambodian businesses that match your mandate, with structured profiles and readiness data.',
    'entry.inv.cta': 'Start as an investor',

    'home.challenge.eyebrow': 'The challenge', 'home.challenge.title': 'Good businesses struggle to reach the right capital',
    'home.challenge.text': 'Many Cambodian SMEs are profitable and growing, yet find it hard to raise funding. Investors, in turn, find it costly to discover and assess them.',
    'ch.1.t': 'Informal financial records', 'ch.1.d': 'Bookkeeping is often incomplete, so lenders and investors cannot verify performance.',
    'ch.2.t': 'Limited fundraising knowledge', 'ch.2.d': 'Owners are unsure which funding type fits, or what investors expect to see.',
    'ch.3.t': 'Hard to find the right partner', 'ch.3.d': 'Capital providers have different mandates, ticket sizes and criteria that are hard to compare.',
    'ch.4.t': 'High search cost for investors', 'ch.4.d': 'Investors spend time screening businesses that are not yet ready or do not fit.',

    'home.solution.eyebrow': 'The RaiseWise solution', 'home.solution.title': 'One platform from first assessment to investor conversation',
    'home.solution.text': 'RaiseWise combines a readiness assessment, practical learning, fundraising tools and criteria-based matching, so SMEs and investors meet on clearer terms.',

    'how.eyebrow': 'How RaiseWise works', 'how.title': 'Assess → Learn → Prepare → Connect → Grow',
    'how.1.t': 'Assess', 'how.1.d': 'Complete the investment readiness assessment and see your score across six areas.',
    'how.2.t': 'Learn', 'how.2.d': 'Follow Academy lessons recommended for your specific gaps.',
    'how.3.t': 'Prepare', 'how.3.d': 'Build financials, an investment teaser and a fundraising plan in your workspace.',
    'how.4.t': 'Connect', 'how.4.d': 'Get matched with capital providers and explain why each one fits.',
    'how.5.t': 'Grow', 'how.5.d': 'Manage conversations, share documents securely and track progress.',

    'ben.sme.title': 'Benefits for SMEs', 'ben.inv.title': 'Benefits for investors',
    'ben.sme.1': 'A clear readiness score with a practical gap analysis', 'ben.sme.2': 'Guidance on equity, debt, grants and blended finance',
    'ben.sme.3': 'Templates for financials, teasers and pitch decks', 'ben.sme.4': 'Matches explained with reasons and gaps, not just a number',
    'ben.sme.5': 'Learning in English and Khmer',
    'ben.inv.1': 'Structured, comparable SME profiles', 'ben.inv.2': 'Recommendations based on your stated mandate',
    'ben.inv.3': 'Readiness data to prioritise screening', 'ben.inv.4': 'Deal pipeline and document access requests in one place',
    'ben.inv.5': 'ESG and impact tags on every opportunity',

    'ai.eyebrow': 'AI-powered features', 'ai.title': 'Six assistants, one ecosystem',
    'ai.text': 'In this prototype, AI features run on preloaded demo data and transparent business rules. They are illustrative and are not financial advice.',
    'ai.1.t': 'Business Assessment Agent', 'ai.1.d': 'Scores readiness and explains each result.',
    'ai.2.t': 'Financial Analysis Assistant', 'ai.2.d': 'Reads key figures and flags weak areas.',
    'ai.3.t': 'Fundraising Advisor', 'ai.3.d': 'Explains which funding options suit your stage.',
    'ai.4.t': 'Learning Assistant', 'ai.4.d': 'Recommends Academy lessons for your gaps.',
    'ai.5.t': 'Document Preparation Assistant', 'ai.5.d': 'Helps structure teasers and pitch decks.',
    'ai.6.t': 'Investor Matching Agent', 'ai.6.d': 'Explains why each investor is a match.',

    'feat.biz.title': 'Featured businesses seeking investment', 'feat.biz.text': 'Fictional demo businesses used to show how SME profiles appear to investors.',
    'feat.inv.title': 'Featured capital providers', 'feat.inv.text': 'Illustrative directory listings. Not confirmed RaiseWise partners, and no funding is offered.',
    'feat.viewall': 'View all',
    'acad.eyebrow': 'RaiseWise Academy', 'acad.title': 'Learn what investors look for',
    'acad.text': 'Short, practical lessons for business owners and investors, with templates, quizzes and progress tracking.',
    'acad.browse': 'Browse the Academy',
    'cta.title': 'Ready to see how investment-ready you are?', 'cta.text': 'Enter the demo and explore the SME, investor and admin experiences.',

    'footer.about': 'RaiseWise helps Cambodian SMEs become investment-ready and connect with suitable capital providers.',
    'footer.platform': 'Platform', 'footer.portals': 'Demo portals', 'footer.contact': 'Contact',
    'footer.disclaimer': '<b>Disclaimer.</b> RaiseWise is a university project prototype. All businesses, people, financial figures, funding requests, readiness scores and matching results are simulated and illustrative. Organizations shown in the directory are illustrative listings only and are not confirmed partners; nothing on this site implies endorsement, investment availability or a funding commitment. Nothing here is financial, credit or investment advice.',
    'footer.rights': 'University project prototype — not a licensed financial service.',
    'footer.address': 'Phnom Penh, Cambodia',

    'about.title': 'About RaiseWise', 'about.lead': 'A prototype ecosystem that helps Cambodian SMEs prepare for, find and manage investment.',
    'about.mission.t': 'Mission', 'about.mission.d': 'Make fundraising understandable and achievable for Cambodian small and medium enterprises.',
    'about.vision.t': 'Vision', 'about.vision.d': 'A connected market where well-prepared businesses and suitable capital providers find each other efficiently.',
    'about.values.t': 'Principles', 'about.values.d': 'Transparency in how scores and matches are produced, practical learning, and respect for confidential business information.',
    'about.who.t': 'Who RaiseWise serves',
    'about.who.d': 'SME owners and founders, investors and capital providers such as funds, angels, banks and microfinance institutions, and platform administrators who keep the ecosystem trustworthy.',
    'about.status.t': 'Project status', 'about.status.d': 'This is a university project prototype. All data is simulated, and no real funding, credit scoring or investment takes place on the platform.',

    'how.page.lead': 'Five stages take a business from a first self-check to a well-prepared investor conversation.',
    'how.sme.t': 'For the SME', 'how.inv.t': 'For the investor',
    'how.inv.1': 'Set up an organization profile and investment preferences', 'how.inv.2': 'Receive recommended SMEs that fit your criteria',
    'how.inv.3': 'Review structured profiles and readiness reports', 'how.inv.4': 'Express interest and request confidential documents',
    'how.inv.5': 'Track opportunities through your deal pipeline',

    'smes.lead': 'Understand your business, close the gaps investors care about, and approach the right capital providers with confidence.',
    'smes.what': 'What you get', 'smes.types': 'Funding options explained',
    'ft.equity': 'Equity', 'ft.equity.d': 'Sell a share of the business to an investor in exchange for capital.',
    'ft.debt': 'Debt', 'ft.debt.d': 'Borrow from a bank or lender and repay with interest over time.',
    'ft.grant': 'Grant', 'ft.grant.d': 'Non-repayable funding, usually tied to impact or development goals.',
    'ft.blended': 'Blended finance', 'ft.blended.d': 'A mix of concessional and commercial capital, often for impact projects.',
    'inv.lead': 'Discover structured, comparable Cambodian SME opportunities that match your mandate.',
    'inv.what': 'What you get',

    'partners.lead': 'An illustrative directory of capital-provider types active in the region.',
    'partners.notice': 'These are illustrative directory listings for demonstration. They are not confirmed RaiseWise partners and do not represent endorsement, investment availability or funding commitments.',
    'partners.search': 'Search by name or sector', 'partners.alltypes': 'All provider types', 'partners.count': '{n} listings',
    'partners.empty': 'No listings match your search', 'partners.empty.d': 'Try a different name, or clear the type filter.',
    'partners.clear': 'Clear filters',

    'academy.lead': 'Practical lessons on investment, financial literacy and fundraising, for SMEs and investors.',
    'academy.lessons': '{n} lessons', 'academy.stage2': 'Full lessons, quizzes and progress tracking open in the portal.',
    'academy.open': 'Open in demo portal',

    'auth.title': 'Sign in to RaiseWise', 'auth.lead': 'Choose a demo account to enter a portal immediately.',
    'auth.tab.demo': 'Demo access', 'auth.tab.signin': 'Sign in', 'auth.tab.register': 'Register',
    'auth.demo.notice': 'Demo access is simulated. No password is needed, no account is created, and nothing is sent to a server. Demo activity is stored only in this browser.',
    'auth.enter.sme': 'Enter SME demo', 'auth.enter.sme.d': 'Mekong Pepper Co. — demo business owner',
    'auth.enter.inv': 'Enter Investor demo', 'auth.enter.inv.d': 'Lotus Impact Fund — demo investor',
    'auth.enter.admin': 'Enter Admin demo', 'auth.enter.admin.d': 'Platform administrator — demo',
    'auth.side.title': 'Raise capital with confidence', 'auth.side.text': 'Assess your readiness, learn what investors expect, and connect with capital providers that fit.',
    'auth.real.notice': 'Real sign-in and registration are not available in this prototype. Use Demo access to explore each portal.',
    'auth.email': 'Email', 'auth.password': 'Password', 'auth.fullname': 'Full name', 'auth.iam': 'I am registering as',
    'auth.disabled': 'Not available in prototype', 'auth.usedemo': 'Use demo access instead',
    'auth.required': 'Please choose a demo account to continue.',
    'auth.welcome': 'Signed in to the {role} demo (simulated).', 'auth.signedout': 'You have left the demo portal.',

    'role.sme': 'SME', 'role.investor': 'Investor', 'role.admin': 'Admin',
    'role.sme.long': 'SME / Business Owner', 'role.investor.long': 'Investor / Capital Provider', 'role.admin.long': 'Platform Administrator',
    'portal.switch': 'View as', 'portal.signout': 'Sign out', 'portal.public': 'Public site', 'portal.notifications': 'Notifications',
    'portal.soon': 'Next', 'portal.sidefoot': 'Prototype · all data simulated',

    'grp.overview': 'Overview', 'grp.business': 'My business', 'grp.readiness': 'Readiness', 'grp.fundraising': 'Fundraising',
    'grp.investors': 'Investors', 'grp.learn': 'Learn', 'grp.account': 'Account', 'grp.org': 'Organization', 'grp.deals': 'Deal flow',
    'grp.manage': 'Management', 'grp.content': 'Content', 'grp.insight': 'Insight',

    'm.dashboard': 'Dashboard', 'm.profile': 'My Business Profile', 'm.onboarding': 'Business Onboarding',
    'm.assessment': 'Readiness Assessment', 'm.report': 'Readiness Report', 'm.ai': 'RaiseWise AI Assistant',
    'm.workspace': 'Fundraising Workspace', 'm.financial': 'Financial Planning Tools', 'm.teaser': 'Teaser & Pitch Deck',
    'm.find': 'Find Investors', 'm.matching': 'AI Investor Matching', 'm.saved': 'Saved Investors',
    'm.messages': 'Messages & Connections', 'm.academy': 'RaiseWise Academy', 'm.notifications': 'Notifications', 'm.settings': 'Account Settings',
    'm.inv.dashboard': 'Investor Dashboard', 'm.org': 'Organization Profile', 'm.prefs': 'Investment Preferences',
    'm.discover': 'Discover SMEs', 'm.recommended': 'AI-Recommended', 'm.savedopps': 'Saved Opportunities',
    'm.pipeline': 'Deal Pipeline', 'm.inv.messages': 'Messages & Requests', 'm.docs': 'Document Access Requests',
    'm.admin.overview': 'Platform Overview', 'm.users': 'User Management', 'm.smes': 'SME Management', 'm.investors': 'Investor Management',
    'm.directory': 'Partner Directory', 'm.verify': 'Profile Verification', 'm.content': 'Academy Content',
    'm.activity': 'Connections & Matching', 'm.analytics': 'Platform Analytics', 'm.reports': 'Reported Information',

    'ph.title': 'Planned for the next build stage', 'ph.text': 'This module is part of the RaiseWise architecture and is reachable from navigation. Its interactive features will be added in the next development stage.',
    'ph.will': 'This module will include', 'ph.back': 'Back to dashboard',

    'dash.hello': 'Welcome back, {name}', 'dash.sme.sub': 'Here is where {biz} stands on its fundraising journey.',
    'dash.readiness': 'Investment readiness', 'dash.readiness.of': 'of 100', 'dash.profile': 'Profile completeness',
    'dash.matches': 'Investor matches', 'dash.matches.sub': 'Suitable demo matches', 'dash.academy': 'Academy progress',
    'dash.academy.sub': '{a} of {b} lessons', 'dash.breakdown': 'Readiness by area', 'dash.viewreport': 'View report',
    'dash.topmatches': 'Top investor matches', 'dash.nextsteps': 'Recommended next steps', 'dash.recent': 'Recent notifications',
    'dash.seeall': 'See all', 'dash.ask': 'Asking', 'dash.illustrative': 'Illustrative score based on seeded demo data. Not a credit score or financial advice.',
    'step.1': 'Strengthen governance documents', 'step.1.d': 'Your lowest area. Start with the "Board & governance basics" lesson.',
    'step.2': 'Prepare a 3-year financial projection', 'step.2.d': 'Investors in your matches ask for forward-looking numbers.',
    'step.3': 'Draft your investment teaser', 'step.3.d': 'A 2-page summary helps you approach your top matches.',

    'dim.financial': 'Financial records', 'dim.governance': 'Governance & legal', 'dim.model': 'Business model',
    'dim.traction': 'Market traction', 'dim.team': 'Management team', 'dim.fundraising': 'Fundraising preparedness',
    'level.strong': 'Investment-ready', 'level.developing': 'Developing', 'level.early': 'Early stage',

    'match.title': 'AI Investor Matching', 'match.sub': 'Capital providers ranked by how well their seeded criteria fit {biz}.',
    'match.notice': 'Matching percentages are illustrative. They are computed from demo criteria (industry, ticket size, stage, geography, investment type, ESG focus and revenue) and are not investment recommendations.',
    'match.pct': 'match', 'match.reasons': 'Why it matches', 'match.gaps': 'Potential gaps', 'match.nogaps': 'No major gaps found',
    'match.funding': 'Funding fit', 'match.fit.within': 'Ask within ticket range', 'match.fit.partial': 'Ask near ticket range', 'match.fit.outside': 'Ask outside ticket range',
    'match.criteria': 'Investment criteria', 'match.ticket': 'Ticket size', 'match.types': 'Investment types', 'match.stages': 'Stages', 'match.geo': 'Geography',
    'match.none': 'No suitable matches yet', 'match.none.d': 'Improve your readiness or adjust your funding request to see matches.',
    'match.r.industry': 'Invests in {x}', 'match.r.funding': 'Your ask of {ask} is within their {min}–{max} range',
    'match.r.fundingnear': 'Your ask of {ask} is close to their {min}–{max} range', 'match.r.stage': 'Targets {x}-stage businesses',
    'match.r.geo': 'Covers {x}', 'match.r.type': 'Offers {x}', 'match.r.esg': 'Shares your ESG / impact focus', 'match.r.revenue': 'Your revenue meets their minimum of {x}',
    'match.g.industry': 'Sector is outside their focus', 'match.g.funding': 'Ask of {ask} is outside their {min}–{max} range',
    'match.g.stage': 'They usually back {x}-stage businesses', 'match.g.geo': 'Province is outside their usual focus',
    'match.g.type': 'They do not offer the funding type you seek', 'match.g.esg': 'They require a documented ESG / impact profile',
    'match.g.revenue': 'Revenue is below their {x} minimum',

    'act.save': 'Save', 'act.saved': 'Saved', 'act.unsave': 'Remove', 'act.view': 'View profile', 'act.interest': 'Express interest',
    'act.interested': 'Interest sent', 'act.back': 'Back', 'act.verify': 'Verify', 'act.reject': 'Reject', 'act.reopen': 'Reopen', 'act.cancel': 'Cancel', 'act.confirm': 'Confirm',
    'toast.saved': '{x} saved.', 'toast.unsaved': '{x} removed from saved.', 'toast.interest': 'Interest sent to {x} (simulated).',
    'toast.verified': '{x} marked as verified.', 'toast.rejected': '{x} marked as needs changes.', 'toast.reopened': '{x} returned to the review queue.',
    'toast.stage': '{x} moved to {y}.',

    'saved.inv.title': 'Saved Investors', 'saved.inv.sub': 'Capital providers you bookmarked from matching.',
    'saved.empty': 'Nothing saved yet', 'saved.empty.sme': 'Save investors from AI Investor Matching to compare them later.',
    'saved.empty.inv': 'Save SMEs from Discover or Recommended to review them later.', 'saved.goto.match': 'Go to matching', 'saved.goto.discover': 'Discover SMEs',
    'saved.opp.title': 'Saved Opportunities', 'saved.opp.sub': 'SMEs you bookmarked for later review.',

    'inv.dash.sub': '{org} — opportunities that fit your investment mandate.',
    'inv.kpi.recommended': 'Recommended SMEs', 'inv.kpi.saved': 'Saved opportunities', 'inv.kpi.pipeline': 'Active deals', 'inv.kpi.docs': 'Pending document requests',
    'inv.recs': 'Top recommended opportunities', 'inv.pipesum': 'Pipeline summary', 'inv.mandate': 'Your mandate (demo)',
    'disc.title': 'Discover SMEs', 'disc.sub': 'Browse demo businesses seeking capital.',
    'disc.search': 'Search businesses', 'disc.allind': 'All industries', 'disc.allstage': 'All stages', 'disc.alltype': 'All funding types', 'disc.sort': 'Sort',
    'disc.sort.match': 'Best match', 'disc.sort.ready': 'Highest readiness', 'disc.sort.ask': 'Largest ask',
    'disc.count': '{n} businesses', 'disc.empty': 'No businesses match these filters', 'disc.empty.d': 'Try removing a filter or searching another term.',
    'rec.title': 'AI-Recommended Opportunities', 'rec.sub': 'SMEs ranked against {org}\'s seeded mandate.',
    'sme.ask': 'Funding request', 'sme.revenue': 'Annual revenue', 'sme.employees': 'Employees', 'sme.founded': 'Founded',
    'sme.location': 'Location', 'sme.stage': 'Stage', 'sme.industry': 'Industry', 'sme.seeking': 'Seeking', 'sme.use': 'Use of funds', 'sme.impact': 'Impact tags',
    'sme.about': 'About the business', 'sme.readiness': 'Readiness report (illustrative)', 'sme.fit': 'Fit with your mandate', 'sme.confidential': 'Confidential documents',
    'sme.confidential.d': 'Financial statements and the full pitch deck are shared only after the SME approves an access request.',
    'sme.reqdocs': 'Request document access', 'sme.reqdocs.done': 'Access requested',
    'toast.docreq': 'Document access requested from {x} (simulated).',
    'pipe.title': 'Deal Pipeline', 'pipe.sub': 'Move opportunities between stages. Changes are saved in this browser.',
    'pipe.interested': 'Interested', 'pipe.screening': 'Screening', 'pipe.dd': 'Due diligence', 'pipe.negotiation': 'Negotiation', 'pipe.closed': 'Closed (simulated)',
    'pipe.move': 'Move to', 'pipe.empty': 'No deals in this stage', 'pipe.notice': 'Pipeline records are simulated. No real investment is executed.',

    'adm.sub': 'Simulated platform activity across all demo accounts.',
    'adm.kpi.smes': 'SME accounts', 'adm.kpi.inv': 'Investor accounts', 'adm.kpi.pending': 'Pending verification', 'adm.kpi.conn': 'Connections & interests',
    'adm.queue': 'Verification queue', 'adm.queue.empty': 'Verification queue is clear', 'adm.queue.empty.d': 'All demo profiles have been reviewed.',
    'adm.activity': 'Recent platform activity', 'adm.byind': 'SMEs by industry', 'adm.bystage': 'Readiness distribution',
    'adm.col.name': 'Name', 'adm.col.type': 'Type', 'adm.col.loc': 'Location', 'adm.col.status': 'Status', 'adm.col.ready': 'Readiness', 'adm.col.ask': 'Ask', 'adm.col.actions': 'Actions',
    'adm.col.ticket': 'Ticket range', 'adm.col.focus': 'Focus',
    'st.verified': 'Verified', 'st.pending': 'Pending', 'st.rejected': 'Needs changes',

    'notif.title': 'Notifications', 'notif.sub': 'Simulated updates for this demo account.', 'notif.markall': 'Mark all as read', 'notif.marked': 'All notifications marked as read.',
    'notif.empty': 'You are all caught up', 'notif.new': 'New',

    'ac.title': 'RaiseWise Academy', 'ac.sub': 'Shared learning for SMEs and investors.', 'ac.categories': 'Categories',
    'ac.for.sme': 'For SMEs', 'ac.for.inv': 'For investors', 'ac.for.all': 'Everyone',

    'nf.title': 'Page not found', 'nf.text': 'The page you are looking for does not exist in this prototype.', 'nf.home': 'Go to homepage',
    'stage.idea': 'Idea', 'stage.early': 'Early', 'stage.growth': 'Growth', 'stage.expansion': 'Expansion',
    'type.equity': 'equity', 'type.debt': 'debt', 'type.grant': 'grants', 'type.blended': 'blended finance',
    'kind.vc': 'Venture capital', 'kind.angel': 'Angel network', 'kind.bank': 'Commercial bank', 'kind.mfi': 'Microfinance institution',
    'kind.impact': 'Impact fund', 'kind.family': 'Family office', 'kind.dfi': 'Development finance', 'kind.grant': 'Grant program',
    'geo.nationwide': 'all of Cambodia', 'esg.required': 'Required',
  });

  /* ---------------- KHMER ---------------- */
  add('km', {
    'brand.tag': 'វេទិកាវិនិយោគសម្រាប់ SME',
    'demo.strip': '<b>គម្រោងគំរូរបស់សាកលវិទ្យាល័យ។</b> អាជីវកម្ម វិនិយោគិន ពិន្ទុ និងលទ្ធផលផ្គូផ្គងទាំងអស់ គឺជាការក្លែងធ្វើសម្រាប់ការបង្ហាញ។',
    'demo.simulated': 'ការចូលប្រើសាកល្បង (ក្លែងធ្វើ)', 'demo.mode': 'របៀបសាកល្បង', 'demo.label': 'សាកល្បង',
    'demo.business': 'អាជីវកម្មសាកល្បង', 'demo.illustrative': 'បញ្ជីឧទាហរណ៍', 'demo.reset': 'កំណត់ទិន្នន័យសាកល្បងឡើងវិញ',
    'demo.reset.done': 'ទិន្នន័យសាកល្បងត្រូវបានកំណត់ឡើងវិញ។',
    'demo.reset.confirm': 'សកម្មភាពនេះនឹងលុបធាតុដែលបានរក្សាទុក ចំណាប់អារម្មណ៍ ការផ្ទៀងផ្ទាត់ និងការកែប្រែបំពង់កិច្ចព្រមព្រៀង។ បន្តទេ?',

    'nav.home': 'ទំព័រដើម', 'nav.about': 'អំពី RaiseWise', 'nav.how': 'របៀបដំណើរការ', 'nav.smes': 'សម្រាប់ SME',
    'nav.investors': 'សម្រាប់វិនិយោគិន', 'nav.academy': 'RaiseWise Academy', 'nav.partners': 'បញ្ជីដៃគូ',
    'nav.signin': 'ចូល / ចុះឈ្មោះ', 'nav.explore': 'សាកល្បងប្រព័ន្ធ', 'nav.menu': 'ម៉ឺនុយ',

    'hero.title': 'អាជីវកម្មរបស់អ្នក សមនឹងទទួលបានដើមទុនត្រឹមត្រូវ ដើម្បីរីកចម្រើន។',
    'hero.lead': 'ចាប់ពីការយល់ដឹងពីអាជីវកម្មរបស់អ្នក រហូតដល់ការត្រៀមខ្លួនសម្រាប់ការវិនិយោគ និងការភ្ជាប់ទំនាក់ទំនងជាមួយដៃគូត្រឹមត្រូវ RaiseWise ជួយឱ្យអ្នករៃអង្គាសដើមទុនដោយទំនុកចិត្ត។',
    'hero.cta1': 'ត្រៀមខ្លួនសម្រាប់ការវិនិយោគ', 'hero.cta2': 'ស្វែងរកឱកាសវិនិយោគ',
    'hero.trust1': 'បង្កើតសម្រាប់ SME កម្ពុជា', 'hero.trust2': 'អង់គ្លេស និង ខ្មែរ', 'hero.trust3': 'ការណែនាំ AI ក្លែងធ្វើ',
    'hero.panel.title': 'សង្ខេបការត្រៀមខ្លួន', 'hero.panel.match': 'វិនិយោគិនដែលត្រូវគ្នាបំផុត',

    'entry.sme.title': 'ខ្ញុំជា SME', 'entry.sme.text': 'ពិនិត្យមើលកម្រិតត្រៀមខ្លួនសម្រាប់ការវិនិយោគ បំពេញចន្លោះខ្វះខាត និងស្វែងរកអ្នកផ្តល់ដើមទុនដែលសមស្រប។',
    'entry.sme.cta': 'ចាប់ផ្តើមជា SME',
    'entry.inv.title': 'ខ្ញុំជាវិនិយោគិន', 'entry.inv.text': 'ស្វែងរកអាជីវកម្មកម្ពុជាដែលស្របនឹងគោលដៅវិនិយោគរបស់អ្នក ជាមួយប្រវត្តិរូប និងទិន្នន័យត្រៀមខ្លួនច្បាស់លាស់។',
    'entry.inv.cta': 'ចាប់ផ្តើមជាវិនិយោគិន',

    'home.challenge.eyebrow': 'បញ្ហាប្រឈម', 'home.challenge.title': 'អាជីវកម្មល្អៗ ពិបាកទទួលបានដើមទុនត្រឹមត្រូវ',
    'home.challenge.text': 'SME កម្ពុជាជាច្រើនមានប្រាក់ចំណេញ និងកំពុងរីកចម្រើន ប៉ុន្តែនៅតែពិបាករៃអង្គាសមូលនិធិ។ ចំណែកវិនិយោគិនវិញ ចំណាយច្រើនក្នុងការស្វែងរក និងវាយតម្លៃពួកគេ។',
    'ch.1.t': 'កំណត់ត្រាហិរញ្ញវត្ថុមិនផ្លូវការ', 'ch.1.d': 'ការកត់ត្រាគណនេយ្យជារឿយៗមិនពេញលេញ ធ្វើឱ្យអ្នកឱ្យខ្ចី និងវិនិយោគិនមិនអាចផ្ទៀងផ្ទាត់លទ្ធផលបាន។',
    'ch.2.t': 'ចំណេះដឹងរៃអង្គាសមូលនិធិមានកម្រិត', 'ch.2.d': 'ម្ចាស់អាជីវកម្មមិនប្រាកដថាប្រភេទមូលនិធិណាសមស្រប ឬវិនិយោគិនរំពឹងចង់ឃើញអ្វី។',
    'ch.3.t': 'ពិបាករកដៃគូត្រឹមត្រូវ', 'ch.3.d': 'អ្នកផ្តល់ដើមទុនមានគោលដៅ ទំហំវិនិយោគ និងលក្ខខណ្ឌខុសៗគ្នា ដែលពិបាកប្រៀបធៀប។',
    'ch.4.t': 'ថ្លៃដើមស្វែងរកខ្ពស់សម្រាប់វិនិយោគិន', 'ch.4.d': 'វិនិយោគិនចំណាយពេលពិនិត្យអាជីវកម្មដែលមិនទាន់ត្រៀមខ្លួន ឬមិនសមស្រប។',

    'home.solution.eyebrow': 'ដំណោះស្រាយ RaiseWise', 'home.solution.title': 'វេទិកាតែមួយ ចាប់ពីការវាយតម្លៃដំបូង ដល់ការសន្ទនាជាមួយវិនិយោគិន',
    'home.solution.text': 'RaiseWise រួមបញ្ចូលការវាយតម្លៃការត្រៀមខ្លួន ការរៀនសូត្រជាក់ស្តែង ឧបករណ៍រៃអង្គាសមូលនិធិ និងការផ្គូផ្គងតាមលក្ខខណ្ឌ ដើម្បីឱ្យ SME និងវិនិយោគិនជួបគ្នាដោយច្បាស់លាស់។',

    'how.eyebrow': 'របៀបដំណើរការ', 'how.title': 'វាយតម្លៃ → រៀន → រៀបចំ → ភ្ជាប់ → រីកចម្រើន',
    'how.1.t': 'វាយតម្លៃ', 'how.1.d': 'បំពេញការវាយតម្លៃការត្រៀមខ្លួន និងមើលពិន្ទុរបស់អ្នកលើផ្នែកទាំងប្រាំមួយ។',
    'how.2.t': 'រៀន', 'how.2.d': 'សិក្សាមេរៀន Academy ដែលណែនាំសម្រាប់ចន្លោះខ្វះខាតរបស់អ្នក។',
    'how.3.t': 'រៀបចំ', 'how.3.d': 'រៀបចំហិរញ្ញវត្ថុ ឯកសារណែនាំវិនិយោគ និងផែនការរៃអង្គាសមូលនិធិ។',
    'how.4.t': 'ភ្ជាប់', 'how.4.d': 'ទទួលបានការផ្គូផ្គងជាមួយអ្នកផ្តល់ដើមទុន ព្រមទាំងហេតុផលដែលសមស្រប។',
    'how.5.t': 'រីកចម្រើន', 'how.5.d': 'គ្រប់គ្រងការសន្ទនា ចែករំលែកឯកសារដោយសុវត្ថិភាព និងតាមដានវឌ្ឍនភាព។',

    'ben.sme.title': 'អត្ថប្រយោជន៍សម្រាប់ SME', 'ben.inv.title': 'អត្ថប្រយោជន៍សម្រាប់វិនិយោគិន',
    'ben.sme.1': 'ពិន្ទុត្រៀមខ្លួនច្បាស់លាស់ ជាមួយការវិភាគចន្លោះខ្វះខាត', 'ben.sme.2': 'ការណែនាំអំពីភាគហ៊ុន កម្ចី ជំនួយឥតសំណង និងហិរញ្ញប្បទានចម្រុះ',
    'ben.sme.3': 'គំរូឯកសារហិរញ្ញវត្ថុ និងបទបង្ហាញ', 'ben.sme.4': 'ការផ្គូផ្គងមានហេតុផល និងចន្លោះខ្វះខាត មិនមែនត្រឹមតែលេខ',
    'ben.sme.5': 'ការរៀនជាភាសាអង់គ្លេស និងខ្មែរ',
    'ben.inv.1': 'ប្រវត្តិរូប SME មានរចនាសម្ព័ន្ធ និងអាចប្រៀបធៀបបាន', 'ben.inv.2': 'ការណែនាំផ្អែកលើគោលដៅវិនិយោគរបស់អ្នក',
    'ben.inv.3': 'ទិន្នន័យត្រៀមខ្លួន ដើម្បីកំណត់អាទិភាពការពិនិត្យ', 'ben.inv.4': 'បំពង់កិច្ចព្រមព្រៀង និងសំណើចូលមើលឯកសារនៅកន្លែងតែមួយ',
    'ben.inv.5': 'ស្លាក ESG និងផលប៉ះពាល់សង្គម លើគ្រប់ឱកាស',

    'ai.eyebrow': 'មុខងារ AI', 'ai.title': 'ជំនួយការប្រាំមួយ ក្នុងប្រព័ន្ធតែមួយ',
    'ai.text': 'ក្នុងគំរូនេះ មុខងារ AI ដំណើរការលើទិន្នន័យសាកល្បង និងច្បាប់អាជីវកម្មច្បាស់លាស់។ វាគ្រាន់តែជាឧទាហរណ៍ មិនមែនជាដំបូន្មានហិរញ្ញវត្ថុទេ។',
    'ai.1.t': 'ភ្នាក់ងារវាយតម្លៃអាជីវកម្ម', 'ai.1.d': 'ផ្តល់ពិន្ទុត្រៀមខ្លួន និងពន្យល់លទ្ធផល។',
    'ai.2.t': 'ជំនួយការវិភាគហិរញ្ញវត្ថុ', 'ai.2.d': 'អានតួលេខសំខាន់ៗ និងបង្ហាញចំណុចខ្សោយ។',
    'ai.3.t': 'ទីប្រឹក្សារៃអង្គាសមូលនិធិ', 'ai.3.d': 'ពន្យល់ជម្រើសមូលនិធិដែលសមនឹងដំណាក់កាលរបស់អ្នក។',
    'ai.4.t': 'ជំនួយការសិក្សា', 'ai.4.d': 'ណែនាំមេរៀនសម្រាប់ចន្លោះខ្វះខាតរបស់អ្នក។',
    'ai.5.t': 'ជំនួយការរៀបចំឯកសារ', 'ai.5.d': 'ជួយរៀបចំឯកសារណែនាំ និងបទបង្ហាញ។',
    'ai.6.t': 'ភ្នាក់ងារផ្គូផ្គងវិនិយោគិន', 'ai.6.d': 'ពន្យល់ហេតុផលដែលវិនិយោគិននីមួយៗត្រូវគ្នា។',

    'feat.biz.title': 'អាជីវកម្មដែលកំពុងស្វែងរកការវិនិយោគ', 'feat.biz.text': 'អាជីវកម្មសាកល្បង (ប្រឌិត) ដើម្បីបង្ហាញពីរបៀបដែលប្រវត្តិរូប SME បង្ហាញដល់វិនិយោគិន។',
    'feat.inv.title': 'អ្នកផ្តល់ដើមទុនលេចធ្លោ', 'feat.inv.text': 'បញ្ជីឧទាហរណ៍ប៉ុណ្ណោះ។ មិនមែនជាដៃគូផ្លូវការរបស់ RaiseWise ហើយមិនមានការផ្តល់មូលនិធិទេ។',
    'feat.viewall': 'មើលទាំងអស់',
    'acad.eyebrow': 'RaiseWise Academy', 'acad.title': 'រៀនពីអ្វីដែលវិនិយោគិនចង់ឃើញ',
    'acad.text': 'មេរៀនខ្លីៗ ជាក់ស្តែង សម្រាប់ម្ចាស់អាជីវកម្ម និងវិនិយោគិន ជាមួយគំរូឯកសារ កម្រងសំណួរ និងការតាមដានវឌ្ឍនភាព។',
    'acad.browse': 'រុករក Academy',
    'cta.title': 'ចង់ដឹងថាអ្នកត្រៀមខ្លួនសម្រាប់ការវិនិយោគកម្រិតណា?', 'cta.text': 'ចូលប្រព័ន្ធសាកល្បង ហើយស្វែងយល់ពីបទពិសោធន៍ SME វិនិយោគិន និងអ្នកគ្រប់គ្រង។',

    'footer.about': 'RaiseWise ជួយ SME កម្ពុជាឱ្យត្រៀមខ្លួនសម្រាប់ការវិនិយោគ និងភ្ជាប់ទំនាក់ទំនងជាមួយអ្នកផ្តល់ដើមទុនសមស្រប។',
    'footer.platform': 'វេទិកា', 'footer.portals': 'ផតថលសាកល្បង', 'footer.contact': 'ទំនាក់ទំនង',
    'footer.disclaimer': '<b>សេចក្តីប្រកាស។</b> RaiseWise គឺជាគម្រោងគំរូរបស់សាកលវិទ្យាល័យ។ អាជីវកម្ម បុគ្គល តួលេខហិរញ្ញវត្ថុ សំណើមូលនិធិ ពិន្ទុត្រៀមខ្លួន និងលទ្ធផលផ្គូផ្គងទាំងអស់ គឺជាការក្លែងធ្វើ និងជាឧទាហរណ៍។ ស្ថាប័នដែលបង្ហាញក្នុងបញ្ជីគឺជាឧទាហរណ៍ប៉ុណ្ណោះ មិនមែនជាដៃគូផ្លូវការទេ ហើយគ្មានអ្វីបង្ហាញពីការគាំទ្រ ការវិនិយោគ ឬការសន្យាផ្តល់មូលនិធិឡើយ។ ខ្លឹមសារនេះមិនមែនជាដំបូន្មានហិរញ្ញវត្ថុ ឥណទាន ឬការវិនិយោគទេ។',
    'footer.rights': 'គម្រោងគំរូរបស់សាកលវិទ្យាល័យ — មិនមែនជាសេវាហិរញ្ញវត្ថុមានអាជ្ញាប័ណ្ណ។',
    'footer.address': 'ភ្នំពេញ កម្ពុជា',

    'about.title': 'អំពី RaiseWise', 'about.lead': 'ប្រព័ន្ធគំរូដែលជួយ SME កម្ពុជារៀបចំ ស្វែងរក និងគ្រប់គ្រងការវិនិយោគ។',
    'about.mission.t': 'បេសកកម្ម', 'about.mission.d': 'ធ្វើឱ្យការរៃអង្គាសមូលនិធិងាយយល់ និងអាចសម្រេចបានសម្រាប់សហគ្រាសធុនតូច និងមធ្យមកម្ពុជា។',
    'about.vision.t': 'ចក្ខុវិស័យ', 'about.vision.d': 'ទីផ្សារតភ្ជាប់គ្នា ដែលអាជីវកម្មត្រៀមខ្លួនល្អ និងអ្នកផ្តល់ដើមទុនសមស្រប ស្វែងរកគ្នាបានយ៉ាងមានប្រសិទ្ធភាព។',
    'about.values.t': 'គោលការណ៍', 'about.values.d': 'តម្លាភាពក្នុងការគណនាពិន្ទុ និងការផ្គូផ្គង ការរៀនជាក់ស្តែង និងការគោរពព័ត៌មានសម្ងាត់អាជីវកម្ម។',
    'about.who.t': 'អ្នកដែល RaiseWise បម្រើ',
    'about.who.d': 'ម្ចាស់ និងស្ថាបនិក SME វិនិយោគិន និងអ្នកផ្តល់ដើមទុនដូចជា មូលនិធិ វិនិយោគិនឯកជន ធនាគារ និងគ្រឹះស្ថានមីក្រូហិរញ្ញវត្ថុ ព្រមទាំងអ្នកគ្រប់គ្រងវេទិកាដែលធានាភាពជឿទុកចិត្ត។',
    'about.status.t': 'ស្ថានភាពគម្រោង', 'about.status.d': 'នេះជាគម្រោងគំរូរបស់សាកលវិទ្យាល័យ។ ទិន្នន័យទាំងអស់ជាការក្លែងធ្វើ ហើយគ្មានការផ្តល់មូលនិធិ ការដាក់ពិន្ទុឥណទាន ឬការវិនិយោគពិតប្រាកដទេ។',

    'how.page.lead': 'ដំណាក់កាលប្រាំ នាំអាជីវកម្មពីការពិនិត្យខ្លួនឯងដំបូង ទៅកាន់ការសន្ទនាជាមួយវិនិយោគិនដែលត្រៀមខ្លួនល្អ។',
    'how.sme.t': 'សម្រាប់ SME', 'how.inv.t': 'សម្រាប់វិនិយោគិន',
    'how.inv.1': 'រៀបចំប្រវត្តិរូបស្ថាប័ន និងចំណូលចិត្តវិនិយោគ', 'how.inv.2': 'ទទួលបាន SME ដែលត្រូវនឹងលក្ខខណ្ឌរបស់អ្នក',
    'how.inv.3': 'ពិនិត្យប្រវត្តិរូប និងរបាយការណ៍ត្រៀមខ្លួន', 'how.inv.4': 'បង្ហាញចំណាប់អារម្មណ៍ និងស្នើសុំឯកសារសម្ងាត់',
    'how.inv.5': 'តាមដានឱកាសតាមរយៈបំពង់កិច្ចព្រមព្រៀង',

    'smes.lead': 'យល់ពីអាជីវកម្មរបស់អ្នក បំពេញចន្លោះខ្វះខាតដែលវិនិយោគិនយកចិត្តទុកដាក់ និងទាក់ទងអ្នកផ្តល់ដើមទុនត្រឹមត្រូវដោយទំនុកចិត្ត។',
    'smes.what': 'អ្វីដែលអ្នកទទួលបាន', 'smes.types': 'ពន្យល់ពីជម្រើសមូលនិធិ',
    'ft.equity': 'ភាគហ៊ុន', 'ft.equity.d': 'លក់ភាគហ៊ុនមួយផ្នែកនៃអាជីវកម្មឱ្យវិនិយោគិន ដើម្បីទទួលបានដើមទុន។',
    'ft.debt': 'កម្ចី', 'ft.debt.d': 'ខ្ចីពីធនាគារ ឬអ្នកឱ្យខ្ចី ហើយសងវិញជាមួយការប្រាក់។',
    'ft.grant': 'ជំនួយឥតសំណង', 'ft.grant.d': 'មូលនិធិមិនចាំបាច់សង ជាធម្មតាភ្ជាប់នឹងគោលដៅអភិវឌ្ឍន៍ ឬផលប៉ះពាល់សង្គម។',
    'ft.blended': 'ហិរញ្ញប្បទានចម្រុះ', 'ft.blended.d': 'ការលាយបញ្ចូលគ្នានៃដើមទុនអនុគ្រោះ និងពាណិជ្ជកម្ម ជាញឹកញាប់សម្រាប់គម្រោងផលប៉ះពាល់។',
    'inv.lead': 'ស្វែងរកឱកាស SME កម្ពុជាដែលមានរចនាសម្ព័ន្ធ អាចប្រៀបធៀបបាន និងស្របនឹងគោលដៅរបស់អ្នក។',
    'inv.what': 'អ្វីដែលអ្នកទទួលបាន',

    'partners.lead': 'បញ្ជីឧទាហរណ៍នៃប្រភេទអ្នកផ្តល់ដើមទុនក្នុងតំបន់។',
    'partners.notice': 'ទាំងនេះជាបញ្ជីឧទាហរណ៍សម្រាប់ការបង្ហាញ។ ពួកគេមិនមែនជាដៃគូផ្លូវការរបស់ RaiseWise ហើយមិនតំណាងឱ្យការគាំទ្រ ការវិនិយោគ ឬការសន្យាផ្តល់មូលនិធិទេ។',
    'partners.search': 'ស្វែងរកតាមឈ្មោះ ឬវិស័យ', 'partners.alltypes': 'គ្រប់ប្រភេទអ្នកផ្តល់', 'partners.count': '{n} បញ្ជី',
    'partners.empty': 'រកមិនឃើញបញ្ជីដែលត្រូវគ្នា', 'partners.empty.d': 'សាកល្បងឈ្មោះផ្សេង ឬលុបតម្រងប្រភេទ។', 'partners.clear': 'លុបតម្រង',

    'academy.lead': 'មេរៀនជាក់ស្តែងអំពីការវិនិយោគ អក្ខរកម្មហិរញ្ញវត្ថុ និងការរៃអង្គាសមូលនិធិ សម្រាប់ SME និងវិនិយោគិន។',
    'academy.lessons': '{n} មេរៀន', 'academy.stage2': 'មេរៀនពេញលេញ កម្រងសំណួរ និងការតាមដានវឌ្ឍនភាព មាននៅក្នុងផតថល។',
    'academy.open': 'បើកក្នុងផតថលសាកល្បង',

    'auth.title': 'ចូល RaiseWise', 'auth.lead': 'ជ្រើសរើសគណនីសាកល្បង ដើម្បីចូលផតថលភ្លាមៗ។',
    'auth.tab.demo': 'ចូលសាកល្បង', 'auth.tab.signin': 'ចូល', 'auth.tab.register': 'ចុះឈ្មោះ',
    'auth.demo.notice': 'ការចូលសាកល្បងគឺជាការក្លែងធ្វើ។ មិនត្រូវការពាក្យសម្ងាត់ មិនបង្កើតគណនី ហើយគ្មានអ្វីត្រូវបានផ្ញើទៅម៉ាស៊ីនមេទេ។ សកម្មភាពត្រូវបានរក្សាទុកតែក្នុងកម្មវិធីរុករកនេះប៉ុណ្ណោះ។',
    'auth.enter.sme': 'ចូលជា SME សាកល្បង', 'auth.enter.sme.d': 'Mekong Pepper Co. — ម្ចាស់អាជីវកម្មសាកល្បង',
    'auth.enter.inv': 'ចូលជាវិនិយោគិនសាកល្បង', 'auth.enter.inv.d': 'Lotus Impact Fund — វិនិយោគិនសាកល្បង',
    'auth.enter.admin': 'ចូលជាអ្នកគ្រប់គ្រងសាកល្បង', 'auth.enter.admin.d': 'អ្នកគ្រប់គ្រងវេទិកា — សាកល្បង',
    'auth.side.title': 'រៃអង្គាសដើមទុនដោយទំនុកចិត្ត', 'auth.side.text': 'វាយតម្លៃការត្រៀមខ្លួន រៀនពីការរំពឹងទុករបស់វិនិយោគិន និងភ្ជាប់ទំនាក់ទំនងជាមួយអ្នកផ្តល់ដើមទុនដែលសមស្រប។',
    'auth.real.notice': 'ការចូល និងការចុះឈ្មោះពិតប្រាកដ មិនមានក្នុងគំរូនេះទេ។ សូមប្រើការចូលសាកល្បង ដើម្បីស្វែងយល់ផតថលនីមួយៗ។',
    'auth.email': 'អ៊ីមែល', 'auth.password': 'ពាក្យសម្ងាត់', 'auth.fullname': 'ឈ្មោះពេញ', 'auth.iam': 'ខ្ញុំចុះឈ្មោះជា',
    'auth.disabled': 'មិនមានក្នុងគំរូ', 'auth.usedemo': 'ប្រើការចូលសាកល្បងជំនួស',
    'auth.required': 'សូមជ្រើសរើសគណនីសាកល្បង ដើម្បីបន្ត។',
    'auth.welcome': 'បានចូលផតថល {role} សាកល្បង (ក្លែងធ្វើ)។', 'auth.signedout': 'អ្នកបានចាកចេញពីផតថលសាកល្បង។',

    'role.sme': 'SME', 'role.investor': 'វិនិយោគិន', 'role.admin': 'អ្នកគ្រប់គ្រង',
    'role.sme.long': 'SME / ម្ចាស់អាជីវកម្ម', 'role.investor.long': 'វិនិយោគិន / អ្នកផ្តល់ដើមទុន', 'role.admin.long': 'អ្នកគ្រប់គ្រងវេទិកា',
    'portal.switch': 'មើលជា', 'portal.signout': 'ចាកចេញ', 'portal.public': 'គេហទំព័រសាធារណៈ', 'portal.notifications': 'ការជូនដំណឹង',
    'portal.soon': 'បន្ទាប់', 'portal.sidefoot': 'គំរូ · ទិន្នន័យក្លែងធ្វើ',

    'grp.overview': 'ទិដ្ឋភាពទូទៅ', 'grp.business': 'អាជីវកម្មរបស់ខ្ញុំ', 'grp.readiness': 'ការត្រៀមខ្លួន', 'grp.fundraising': 'ការរៃអង្គាសមូលនិធិ',
    'grp.investors': 'វិនិយោគិន', 'grp.learn': 'ការសិក្សា', 'grp.account': 'គណនី', 'grp.org': 'ស្ថាប័ន', 'grp.deals': 'កិច្ចព្រមព្រៀង',
    'grp.manage': 'ការគ្រប់គ្រង', 'grp.content': 'ខ្លឹមសារ', 'grp.insight': 'ការវិភាគ',

    'm.dashboard': 'ផ្ទាំងគ្រប់គ្រង', 'm.profile': 'ប្រវត្តិរូបអាជីវកម្ម', 'm.onboarding': 'ការចុះឈ្មោះអាជីវកម្ម',
    'm.assessment': 'ការវាយតម្លៃការត្រៀមខ្លួន', 'm.report': 'របាយការណ៍ត្រៀមខ្លួន', 'm.ai': 'ជំនួយការ RaiseWise AI',
    'm.workspace': 'កន្លែងធ្វើការរៃអង្គាសមូលនិធិ', 'm.financial': 'ឧបករណ៍ផែនការហិរញ្ញវត្ថុ', 'm.teaser': 'ឯកសារណែនាំ និងបទបង្ហាញ',
    'm.find': 'ស្វែងរកវិនិយោគិន', 'm.matching': 'ការផ្គូផ្គងវិនិយោគិនដោយ AI', 'm.saved': 'វិនិយោគិនដែលបានរក្សាទុក',
    'm.messages': 'សារ និងទំនាក់ទំនង', 'm.academy': 'RaiseWise Academy', 'm.notifications': 'ការជូនដំណឹង', 'm.settings': 'ការកំណត់គណនី',
    'm.inv.dashboard': 'ផ្ទាំងវិនិយោគិន', 'm.org': 'ប្រវត្តិរូបស្ថាប័ន', 'm.prefs': 'ចំណូលចិត្តវិនិយោគ',
    'm.discover': 'ស្វែងរក SME', 'm.recommended': 'ការណែនាំដោយ AI', 'm.savedopps': 'ឱកាសដែលបានរក្សាទុក',
    'm.pipeline': 'បំពង់កិច្ចព្រមព្រៀង', 'm.inv.messages': 'សារ និងសំណើ', 'm.docs': 'សំណើចូលមើលឯកសារ',
    'm.admin.overview': 'ទិដ្ឋភាពវេទិកា', 'm.users': 'ការគ្រប់គ្រងអ្នកប្រើ', 'm.smes': 'ការគ្រប់គ្រង SME', 'm.investors': 'ការគ្រប់គ្រងវិនិយោគិន',
    'm.directory': 'បញ្ជីដៃគូ', 'm.verify': 'ការផ្ទៀងផ្ទាត់ប្រវត្តិរូប', 'm.content': 'ខ្លឹមសារ Academy',
    'm.activity': 'ទំនាក់ទំនង និងការផ្គូផ្គង', 'm.analytics': 'ការវិភាគវេទិកា', 'm.reports': 'ព័ត៌មានដែលបានរាយការណ៍',

    'ph.title': 'គ្រោងសម្រាប់ដំណាក់កាលបន្ទាប់', 'ph.text': 'ម៉ូឌុលនេះជាផ្នែកនៃរចនាសម្ព័ន្ធ RaiseWise ហើយអាចចូលបានពីម៉ឺនុយ។ មុខងារអន្តរកម្មនឹងត្រូវបន្ថែមក្នុងដំណាក់កាលអភិវឌ្ឍន៍បន្ទាប់។',
    'ph.will': 'ម៉ូឌុលនេះនឹងរួមមាន', 'ph.back': 'ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង',

    'dash.hello': 'សូមស្វាគមន៍ {name}', 'dash.sme.sub': 'នេះជាស្ថានភាពរបស់ {biz} ក្នុងដំណើររៃអង្គាសមូលនិធិ។',
    'dash.readiness': 'ការត្រៀមខ្លួនសម្រាប់ការវិនិយោគ', 'dash.readiness.of': 'ក្នុងចំណោម ១០០', 'dash.profile': 'ភាពពេញលេញនៃប្រវត្តិរូប',
    'dash.matches': 'វិនិយោគិនដែលត្រូវគ្នា', 'dash.matches.sub': 'ការផ្គូផ្គងសាកល្បងសមស្រប', 'dash.academy': 'វឌ្ឍនភាព Academy',
    'dash.academy.sub': '{a} ក្នុងចំណោម {b} មេរៀន', 'dash.breakdown': 'ការត្រៀមខ្លួនតាមផ្នែក', 'dash.viewreport': 'មើលរបាយការណ៍',
    'dash.topmatches': 'វិនិយោគិនដែលត្រូវគ្នាបំផុត', 'dash.nextsteps': 'ជំហានបន្ទាប់ដែលបានណែនាំ', 'dash.recent': 'ការជូនដំណឹងថ្មីៗ',
    'dash.seeall': 'មើលទាំងអស់', 'dash.ask': 'ស្នើសុំ', 'dash.illustrative': 'ពិន្ទុឧទាហរណ៍ផ្អែកលើទិន្នន័យសាកល្បង។ មិនមែនជាពិន្ទុឥណទាន ឬដំបូន្មានហិរញ្ញវត្ថុទេ។',
    'step.1': 'ពង្រឹងឯកសារអភិបាលកិច្ច', 'step.1.d': 'ផ្នែកដែលទាបបំផុតរបស់អ្នក។ ចាប់ផ្តើមជាមួយមេរៀន «មូលដ្ឋានក្រុមប្រឹក្សា និងអភិបាលកិច្ច»។',
    'step.2': 'រៀបចំការព្យាករហិរញ្ញវត្ថុ ៣ ឆ្នាំ', 'step.2.d': 'វិនិយោគិនក្នុងបញ្ជីផ្គូផ្គងរបស់អ្នក ស្នើសុំតួលេខព្យាករ។',
    'step.3': 'រៀបចំសេចក្តីព្រាងឯកសារណែនាំវិនិយោគ', 'step.3.d': 'សេចក្តីសង្ខេប ២ ទំព័រ ជួយអ្នកទាក់ទងវិនិយោគិនដែលត្រូវគ្នាបំផុត។',

    'dim.financial': 'កំណត់ត្រាហិរញ្ញវត្ថុ', 'dim.governance': 'អភិបាលកិច្ច និងច្បាប់', 'dim.model': 'គំរូអាជីវកម្ម',
    'dim.traction': 'ការរីកចម្រើនលើទីផ្សារ', 'dim.team': 'ក្រុមគ្រប់គ្រង', 'dim.fundraising': 'ការត្រៀមរៃអង្គាសមូលនិធិ',
    'level.strong': 'ត្រៀមខ្លួនសម្រាប់វិនិយោគ', 'level.developing': 'កំពុងអភិវឌ្ឍ', 'level.early': 'ដំណាក់កាលដំបូង',

    'match.title': 'ការផ្គូផ្គងវិនិយោគិនដោយ AI', 'match.sub': 'អ្នកផ្តល់ដើមទុន តម្រៀបតាមកម្រិតដែលលក្ខខណ្ឌរបស់ពួកគេត្រូវនឹង {biz}។',
    'match.notice': 'ភាគរយផ្គូផ្គងគឺជាឧទាហរណ៍។ វាគណនាពីលក្ខខណ្ឌសាកល្បង (វិស័យ ទំហំវិនិយោគ ដំណាក់កាល ភូមិសាស្ត្រ ប្រភេទវិនិយោគ ESG និងចំណូល) ហើយមិនមែនជាការណែនាំវិនិយោគទេ។',
    'match.pct': 'ត្រូវគ្នា', 'match.reasons': 'ហេតុអ្វីត្រូវគ្នា', 'match.gaps': 'ចន្លោះខ្វះខាតដែលអាចមាន', 'match.nogaps': 'រកមិនឃើញចន្លោះខ្វះខាតធំៗ',
    'match.funding': 'ភាពសមស្របមូលនិធិ', 'match.fit.within': 'សំណើស្ថិតក្នុងចន្លោះវិនិយោគ', 'match.fit.partial': 'សំណើជិតចន្លោះវិនិយោគ', 'match.fit.outside': 'សំណើក្រៅចន្លោះវិនិយោគ',
    'match.criteria': 'លក្ខខណ្ឌវិនិយោគ', 'match.ticket': 'ទំហំវិនិយោគ', 'match.types': 'ប្រភេទវិនិយោគ', 'match.stages': 'ដំណាក់កាល', 'match.geo': 'ភូមិសាស្ត្រ',
    'match.none': 'មិនទាន់មានការផ្គូផ្គងសមស្រប', 'match.none.d': 'បង្កើនការត្រៀមខ្លួន ឬកែសំណើមូលនិធិ ដើម្បីមើលការផ្គូផ្គង។',
    'match.r.industry': 'វិនិយោគលើ {x}', 'match.r.funding': 'សំណើ {ask} របស់អ្នកស្ថិតក្នុងចន្លោះ {min}–{max}',
    'match.r.fundingnear': 'សំណើ {ask} របស់អ្នកជិតចន្លោះ {min}–{max}', 'match.r.stage': 'ផ្តោតលើអាជីវកម្មដំណាក់កាល {x}',
    'match.r.geo': 'គ្របដណ្តប់ {x}', 'match.r.type': 'ផ្តល់ {x}', 'match.r.esg': 'មានការផ្តោតលើ ESG / ផលប៉ះពាល់ដូចអ្នក', 'match.r.revenue': 'ចំណូលរបស់អ្នកឈានដល់អប្បបរមា {x}',
    'match.g.industry': 'វិស័យស្ថិតនៅក្រៅការផ្តោតរបស់ពួកគេ', 'match.g.funding': 'សំណើ {ask} ស្ថិតក្រៅចន្លោះ {min}–{max}',
    'match.g.stage': 'ពួកគេជាធម្មតាគាំទ្រអាជីវកម្មដំណាក់កាល {x}', 'match.g.geo': 'ខេត្តស្ថិតក្រៅការផ្តោតធម្មតា',
    'match.g.type': 'ពួកគេមិនផ្តល់ប្រភេទមូលនិធិដែលអ្នកស្វែងរក', 'match.g.esg': 'ពួកគេតម្រូវឱ្យមានប្រវត្តិ ESG / ផលប៉ះពាល់ច្បាស់លាស់',
    'match.g.revenue': 'ចំណូលទាបជាងអប្បបរមា {x}',

    'act.save': 'រក្សាទុក', 'act.saved': 'បានរក្សាទុក', 'act.unsave': 'ដកចេញ', 'act.view': 'មើលប្រវត្តិរូប', 'act.interest': 'បង្ហាញចំណាប់អារម្មណ៍',
    'act.interested': 'បានផ្ញើចំណាប់អារម្មណ៍', 'act.back': 'ត្រឡប់', 'act.verify': 'ផ្ទៀងផ្ទាត់', 'act.reject': 'បដិសេធ', 'act.reopen': 'បើកឡើងវិញ', 'act.cancel': 'បោះបង់', 'act.confirm': 'បញ្ជាក់',
    'toast.saved': 'បានរក្សាទុក {x}។', 'toast.unsaved': 'បានដក {x} ចេញ។', 'toast.interest': 'បានផ្ញើចំណាប់អារម្មណ៍ទៅ {x} (ក្លែងធ្វើ)។',
    'toast.verified': '{x} ត្រូវបានផ្ទៀងផ្ទាត់។', 'toast.rejected': '{x} ត្រូវការកែប្រែ។', 'toast.reopened': '{x} ត្រឡប់ទៅជួរពិនិត្យវិញ។',
    'toast.stage': 'បានផ្លាស់ {x} ទៅ {y}។',

    'saved.inv.title': 'វិនិយោគិនដែលបានរក្សាទុក', 'saved.inv.sub': 'អ្នកផ្តល់ដើមទុនដែលអ្នកបានរក្សាទុកពីការផ្គូផ្គង។',
    'saved.empty': 'មិនទាន់មានអ្វីរក្សាទុក', 'saved.empty.sme': 'រក្សាទុកវិនិយោគិនពីការផ្គូផ្គង ដើម្បីប្រៀបធៀបពេលក្រោយ។',
    'saved.empty.inv': 'រក្សាទុក SME ពីការស្វែងរក ឬការណែនាំ ដើម្បីពិនិត្យពេលក្រោយ។', 'saved.goto.match': 'ទៅការផ្គូផ្គង', 'saved.goto.discover': 'ស្វែងរក SME',
    'saved.opp.title': 'ឱកាសដែលបានរក្សាទុក', 'saved.opp.sub': 'SME ដែលអ្នកបានរក្សាទុកសម្រាប់ពិនិត្យពេលក្រោយ។',

    'inv.dash.sub': '{org} — ឱកាសដែលស្របនឹងគោលដៅវិនិយោគរបស់អ្នក។',
    'inv.kpi.recommended': 'SME ដែលបានណែនាំ', 'inv.kpi.saved': 'ឱកាសបានរក្សាទុក', 'inv.kpi.pipeline': 'កិច្ចព្រមព្រៀងសកម្ម', 'inv.kpi.docs': 'សំណើឯកសាររង់ចាំ',
    'inv.recs': 'ឱកាសដែលបានណែនាំបំផុត', 'inv.pipesum': 'សង្ខេបបំពង់កិច្ចព្រមព្រៀង', 'inv.mandate': 'គោលដៅវិនិយោគ (សាកល្បង)',
    'disc.title': 'ស្វែងរក SME', 'disc.sub': 'រុករកអាជីវកម្មសាកល្បងដែលកំពុងស្វែងរកដើមទុន។',
    'disc.search': 'ស្វែងរកអាជីវកម្ម', 'disc.allind': 'គ្រប់វិស័យ', 'disc.allstage': 'គ្រប់ដំណាក់កាល', 'disc.alltype': 'គ្រប់ប្រភេទមូលនិធិ', 'disc.sort': 'តម្រៀប',
    'disc.sort.match': 'ត្រូវគ្នាបំផុត', 'disc.sort.ready': 'ត្រៀមខ្លួនខ្ពស់បំផុត', 'disc.sort.ask': 'សំណើធំបំផុត',
    'disc.count': '{n} អាជីវកម្ម', 'disc.empty': 'គ្មានអាជីវកម្មត្រូវនឹងតម្រងទាំងនេះ', 'disc.empty.d': 'សាកល្បងដកតម្រងចេញ ឬស្វែងរកពាក្យផ្សេង។',
    'rec.title': 'ឱកាសដែលបានណែនាំដោយ AI', 'rec.sub': 'SME តម្រៀបតាមគោលដៅសាកល្បងរបស់ {org}។',
    'sme.ask': 'សំណើមូលនិធិ', 'sme.revenue': 'ចំណូលប្រចាំឆ្នាំ', 'sme.employees': 'បុគ្គលិក', 'sme.founded': 'បង្កើតឆ្នាំ',
    'sme.location': 'ទីតាំង', 'sme.stage': 'ដំណាក់កាល', 'sme.industry': 'វិស័យ', 'sme.seeking': 'កំពុងស្វែងរក', 'sme.use': 'ការប្រើប្រាស់មូលនិធិ', 'sme.impact': 'ស្លាកផលប៉ះពាល់',
    'sme.about': 'អំពីអាជីវកម្ម', 'sme.readiness': 'របាយការណ៍ត្រៀមខ្លួន (ឧទាហរណ៍)', 'sme.fit': 'ភាពសមស្របនឹងគោលដៅរបស់អ្នក', 'sme.confidential': 'ឯកសារសម្ងាត់',
    'sme.confidential.d': 'របាយការណ៍ហិរញ្ញវត្ថុ និងបទបង្ហាញពេញលេញ ចែករំលែកតែបន្ទាប់ពី SME យល់ព្រមលើសំណើប៉ុណ្ណោះ។',
    'sme.reqdocs': 'ស្នើសុំចូលមើលឯកសារ', 'sme.reqdocs.done': 'បានស្នើសុំ',
    'toast.docreq': 'បានស្នើសុំឯកសារពី {x} (ក្លែងធ្វើ)។',
    'pipe.title': 'បំពង់កិច្ចព្រមព្រៀង', 'pipe.sub': 'ផ្លាស់ឱកាសរវាងដំណាក់កាល។ ការផ្លាស់ប្តូររក្សាទុកក្នុងកម្មវិធីរុករកនេះ។',
    'pipe.interested': 'ចាប់អារម្មណ៍', 'pipe.screening': 'ការពិនិត្យដំបូង', 'pipe.dd': 'ការស៊ើបអង្កេតលម្អិត', 'pipe.negotiation': 'ការចរចា', 'pipe.closed': 'បញ្ចប់ (ក្លែងធ្វើ)',
    'pipe.move': 'ផ្លាស់ទៅ', 'pipe.empty': 'គ្មានកិច្ចព្រមព្រៀងក្នុងដំណាក់កាលនេះ', 'pipe.notice': 'កំណត់ត្រាបំពង់កិច្ចព្រមព្រៀងជាការក្លែងធ្វើ។ គ្មានការវិនិយោគពិតប្រាកដទេ។',

    'adm.sub': 'សកម្មភាពវេទិកាក្លែងធ្វើ លើគ្រប់គណនីសាកល្បង។',
    'adm.kpi.smes': 'គណនី SME', 'adm.kpi.inv': 'គណនីវិនិយោគិន', 'adm.kpi.pending': 'រង់ចាំការផ្ទៀងផ្ទាត់', 'adm.kpi.conn': 'ទំនាក់ទំនង និងចំណាប់អារម្មណ៍',
    'adm.queue': 'ជួរផ្ទៀងផ្ទាត់', 'adm.queue.empty': 'ជួរផ្ទៀងផ្ទាត់ទទេ', 'adm.queue.empty.d': 'ប្រវត្តិរូបសាកល្បងទាំងអស់ត្រូវបានពិនិត្យ។',
    'adm.activity': 'សកម្មភាពវេទិកាថ្មីៗ', 'adm.byind': 'SME តាមវិស័យ', 'adm.bystage': 'ការបែងចែកការត្រៀមខ្លួន',
    'adm.col.name': 'ឈ្មោះ', 'adm.col.type': 'ប្រភេទ', 'adm.col.loc': 'ទីតាំង', 'adm.col.status': 'ស្ថានភាព', 'adm.col.ready': 'ត្រៀមខ្លួន', 'adm.col.ask': 'សំណើ', 'adm.col.actions': 'សកម្មភាព',
    'adm.col.ticket': 'ចន្លោះវិនិយោគ', 'adm.col.focus': 'ការផ្តោត',
    'st.verified': 'បានផ្ទៀងផ្ទាត់', 'st.pending': 'រង់ចាំ', 'st.rejected': 'ត្រូវការកែប្រែ',

    'notif.title': 'ការជូនដំណឹង', 'notif.sub': 'ព័ត៌មានថ្មីៗក្លែងធ្វើសម្រាប់គណនីសាកល្បងនេះ។', 'notif.markall': 'សម្គាល់ថាបានអានទាំងអស់', 'notif.marked': 'បានសម្គាល់ការជូនដំណឹងទាំងអស់ថាបានអាន។',
    'notif.empty': 'អ្នកបានអានទាំងអស់ហើយ', 'notif.new': 'ថ្មី',

    'ac.title': 'RaiseWise Academy', 'ac.sub': 'ការសិក្សារួមសម្រាប់ SME និងវិនិយោគិន។', 'ac.categories': 'ប្រភេទ',
    'ac.for.sme': 'សម្រាប់ SME', 'ac.for.inv': 'សម្រាប់វិនិយោគិន', 'ac.for.all': 'សម្រាប់ទាំងអស់គ្នា',

    'nf.title': 'រកមិនឃើញទំព័រ', 'nf.text': 'ទំព័រដែលអ្នកកំពុងស្វែងរក មិនមាននៅក្នុងគំរូនេះទេ។', 'nf.home': 'ទៅទំព័រដើម',
    'stage.idea': 'គំនិត', 'stage.early': 'ដំបូង', 'stage.growth': 'រីកចម្រើន', 'stage.expansion': 'ពង្រីក',
    'type.equity': 'ភាគហ៊ុន', 'type.debt': 'កម្ចី', 'type.grant': 'ជំនួយឥតសំណង', 'type.blended': 'ហិរញ្ញប្បទានចម្រុះ',
    'kind.vc': 'មូលនិធិវិនិយោគ', 'kind.angel': 'បណ្តាញវិនិយោគិនឯកជន', 'kind.bank': 'ធនាគារពាណិជ្ជ', 'kind.mfi': 'គ្រឹះស្ថានមីក្រូហិរញ្ញវត្ថុ',
    'kind.impact': 'មូលនិធិផលប៉ះពាល់', 'kind.family': 'ការិយាល័យគ្រួសារ', 'kind.dfi': 'ហិរញ្ញវត្ថុអភិវឌ្ឍន៍', 'kind.grant': 'កម្មវិធីជំនួយ',
    'geo.nationwide': 'ទូទាំងប្រទេសកម្ពុជា', 'esg.required': 'តម្រូវ',
  });

  let lang = 'en';
  try { lang = localStorage.getItem(LS_KEY) === 'km' ? 'km' : 'en'; } catch (e) {}

  RW.i18n = {
    get lang() { return lang; },
    set(l) {
      lang = l === 'km' ? 'km' : 'en';
      try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
      document.documentElement.lang = lang;
    },
    add,
    has: (k) => k in D.en,
  };

  RW.t = function (key, vars) {
    let s = (D[lang] && D[lang][key]) ?? D.en[key] ?? key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  };

  /* Pick a localized value from {en, km} data, falling back to English */
  RW.L = (v) => (v && typeof v === 'object' ? (v[lang] || v.en || '') : (v ?? ''));

  document.documentElement.lang = lang;
})();
