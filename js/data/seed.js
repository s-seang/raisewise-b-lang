/* RaiseWise — Stage 1 seed data.
   ALL entities here are fictional demo data. The full sample-data specification
   (18+ investor profiles, 10+ SMEs, etc.) replaces/extends this file in a later stage.
   Keep the field shapes stable: modules, the match engine and admin views read them. */
RW.seed = (function () {
  const industries = {
    agri:      { en: 'Agriculture & agro-processing', km: 'កសិកម្ម និងកែច្នៃកសិផល' },
    handicraft:{ en: 'Handicrafts & creative goods',  km: 'សិប្បកម្ម និងផលិតផលច្នៃប្រឌិត' },
    logistics: { en: 'Logistics & cold chain',        km: 'ភស្តុភារ និងប្រព័ន្ធត្រជាក់' },
    energy:    { en: 'Renewable energy',               km: 'ថាមពលកកើតឡើងវិញ' },
    fnb:       { en: 'Food & beverage',                km: 'ម្ហូបអាហារ និងភេសជ្ជៈ' },
    education: { en: 'Education & EdTech',             km: 'ការអប់រំ និងបច្ចេកវិទ្យាអប់រំ' },
    tourism:   { en: 'Tourism & hospitality',          km: 'ទេសចរណ៍ និងបដិសណ្ឋារកិច្ច' },
    tech:      { en: 'Technology',                     km: 'បច្ចេកវិទ្យា' },
  };
  const provinces = {
    'Phnom Penh': { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
    'Kampot':     { en: 'Kampot', km: 'កំពត' },
    'Siem Reap':  { en: 'Siem Reap', km: 'សៀមរាប' },
    'Battambang': { en: 'Battambang', km: 'បាត់ដំបង' },
    'Koh Kong':   { en: 'Koh Kong', km: 'កោះកុង' },
  };

  /* dims: financial, governance, model, traction, team, fundraising (0–100) */
  const smes = [
    {
      id: 'sme-mekong-pepper', name: 'Mekong Pepper Co.', owner: 'Sokha Chan', industry: 'agri', province: 'Kampot',
      stage: 'growth', founded: 2017, employees: 34, revenue: 420000, ask: 250000, seeking: ['equity', 'debt'],
      esg: true, impact: ['Smallholder farmers', 'Women employment', 'Export'], verified: 'verified',
      tagline: { en: 'Premium Kampot pepper sourced from 120 smallholder farms', km: 'ម្រេចកំពតគុណភាពខ្ពស់ ពីកសិដ្ឋានខ្នាតតូច ១២០' },
      about: 'Processes and exports Kampot pepper under a geographical-indication label, buying directly from smallholder farmers and running a small packing facility near Kampot town.',
      use: 'Expand drying and packing capacity, obtain export certifications, and build working capital for harvest-season purchasing.',
      dims: { financial: 78, governance: 58, model: 80, traction: 76, team: 70, fundraising: 62 }, profile: 86,
    },
    {
      id: 'sme-angkor-weave', name: 'Angkor Weave Collective', owner: 'Dara Kim', industry: 'handicraft', province: 'Siem Reap',
      stage: 'early', founded: 2020, employees: 18, revenue: 95000, ask: 80000, seeking: ['grant', 'debt'],
      esg: true, impact: ['Artisan livelihoods', 'Women employment'], verified: 'pending',
      tagline: { en: 'Hand-woven silk goods from village artisan groups', km: 'ផលិតផលសូត្រត្បាញដៃ ពីក្រុមសិប្បករភូមិ' },
      about: 'Works with village weaving groups around Siem Reap to design and sell silk scarves and home goods to hotels and online buyers.',
      use: 'Buy additional looms, train new weavers, and launch an online store for international buyers.',
      dims: { financial: 52, governance: 45, model: 64, traction: 58, team: 60, fundraising: 40 }, profile: 64,
    },
    {
      id: 'sme-tonle-cold', name: 'Tonle Cold Chain Logistics', owner: 'Vannak Heng', industry: 'logistics', province: 'Phnom Penh',
      stage: 'expansion', founded: 2015, employees: 85, revenue: 1800000, ask: 750000, seeking: ['equity', 'debt'],
      esg: false, impact: ['Food loss reduction'], verified: 'verified',
      tagline: { en: 'Refrigerated trucking and storage for fresh produce', km: 'ដឹកជញ្ជូន និងស្តុកទុកដោយប្រព័ន្ធត្រជាក់ សម្រាប់កសិផលស្រស់' },
      about: 'Operates refrigerated trucks and a cold-storage warehouse serving supermarkets, restaurants and exporters across the Phnom Penh corridor.',
      use: 'Add a second cold-storage hub and 12 refrigerated trucks for provincial routes.',
      dims: { financial: 86, governance: 82, model: 78, traction: 84, team: 80, fundraising: 74 }, profile: 94,
    },
    {
      id: 'sme-sora-solar', name: 'Sora Solar Solutions', owner: 'Rithy Sok', industry: 'energy', province: 'Battambang',
      stage: 'growth', founded: 2019, employees: 22, revenue: 610000, ask: 400000, seeking: ['equity', 'blended'],
      esg: true, impact: ['Clean energy', 'Rural access'], verified: 'verified',
      tagline: { en: 'Rooftop and irrigation solar for farms and rice mills', km: 'ថាមពលព្រះអាទិត្យ សម្រាប់កសិដ្ឋាន និងរោងម៉ាស៊ីនកិនស្រូវ' },
      about: 'Designs and installs solar systems for rice mills, irrigation pumps and rural businesses in north-west Cambodia, with a lease-to-own option.',
      use: 'Fund a lease-to-own portfolio for 150 rural customers and hire two field engineers.',
      dims: { financial: 72, governance: 66, model: 76, traction: 70, team: 72, fundraising: 64 }, profile: 82,
    },
    {
      id: 'sme-num-pang', name: 'Num Pang House Bakery', owner: 'Sreymom Ly', industry: 'fnb', province: 'Phnom Penh',
      stage: 'growth', founded: 2018, employees: 40, revenue: 350000, ask: 120000, seeking: ['debt'],
      esg: false, impact: ['Local sourcing'], verified: 'pending',
      tagline: { en: 'Neighbourhood bakery chain with five outlets', km: 'បណ្តាញហាងនំប៉័ងសង្កាត់ ចំនួន ៥ សាខា' },
      about: 'Runs five bakery-café outlets in Phnom Penh and supplies bread to offices and schools from a central kitchen.',
      use: 'Upgrade the central kitchen and open two new outlets.',
      dims: { financial: 74, governance: 60, model: 70, traction: 72, team: 64, fundraising: 54 }, profile: 78,
    },
    {
      id: 'sme-khmerlearn', name: 'KhmerLearn EdTech', owner: 'Piseth Nhem', industry: 'education', province: 'Phnom Penh',
      stage: 'early', founded: 2022, employees: 12, revenue: 60000, ask: 200000, seeking: ['equity', 'grant'],
      esg: true, impact: ['Education access', 'Youth'], verified: 'rejected',
      tagline: { en: 'Khmer-language exam prep app for high-school students', km: 'កម្មវិធីត្រៀមប្រឡងជាភាសាខ្មែរ សម្រាប់សិស្សវិទ្យាល័យ' },
      about: 'Mobile app offering Khmer-language video lessons and practice tests for the national grade-12 exam, with a low-cost subscription.',
      use: 'Produce new subject content, improve offline mode, and run school partnerships in three provinces.',
      dims: { financial: 46, governance: 52, model: 66, traction: 48, team: 70, fundraising: 50 }, profile: 70,
    },
  ];

  /* industries: list or ['any'] · geo: ['nationwide'] or province names */
  const investors = [
    { id: 'inv-mekong-growth', name: 'Mekong Growth Partners', kind: 'vc', hq: 'Phnom Penh', industries: ['logistics', 'tech', 'fnb', 'agri'],
      ticketMin: 200000, ticketMax: 1500000, stages: ['growth', 'expansion'], geo: ['nationwide'], types: ['equity'], esgRequired: false, esgFocus: false, minRevenue: 300000,
      about: 'Growth-equity investor backing scalable Cambodian businesses with proven revenue.' },
    { id: 'inv-lotus-impact', name: 'Lotus Impact Fund', kind: 'impact', hq: 'Phnom Penh', industries: ['agri', 'energy', 'handicraft', 'education'],
      ticketMin: 50000, ticketMax: 500000, stages: ['early', 'growth'], geo: ['nationwide'], types: ['equity', 'blended', 'grant'], esgRequired: true, esgFocus: true, minRevenue: 50000,
      about: 'Impact investor focused on livelihoods, clean energy and inclusive growth.' },
    { id: 'inv-angel-circle', name: 'Phnom Penh Angel Circle', kind: 'angel', hq: 'Phnom Penh', industries: ['tech', 'education', 'fnb'],
      ticketMin: 25000, ticketMax: 250000, stages: ['idea', 'early'], geo: ['Phnom Penh', 'Siem Reap'], types: ['equity'], esgRequired: false, esgFocus: false, minRevenue: 0,
      about: 'Network of local business owners investing in early-stage founders.' },
    { id: 'inv-delta-credit', name: 'Delta SME Credit', kind: 'bank', hq: 'Phnom Penh', industries: ['any'],
      ticketMin: 20000, ticketMax: 800000, stages: ['growth', 'expansion'], geo: ['nationwide'], types: ['debt'], esgRequired: false, esgFocus: false, minRevenue: 150000,
      about: 'SME lending desk offering term loans and working-capital lines.' },
    { id: 'inv-green-asean', name: 'Green ASEAN Ventures', kind: 'vc', hq: 'Phnom Penh', industries: ['energy', 'agri', 'logistics'],
      ticketMin: 300000, ticketMax: 2000000, stages: ['growth', 'expansion'], geo: ['nationwide'], types: ['equity', 'blended'], esgRequired: true, esgFocus: true, minRevenue: 400000,
      about: 'Climate-focused fund investing in energy transition and sustainable food systems.' },
    { id: 'inv-riverstone', name: 'Riverstone Family Office', kind: 'family', hq: 'Phnom Penh', industries: ['fnb', 'agri', 'tourism', 'logistics'],
      ticketMin: 100000, ticketMax: 600000, stages: ['growth'], geo: ['nationwide'], types: ['equity', 'debt'], esgRequired: false, esgFocus: false, minRevenue: 200000,
      about: 'Patient capital from a Cambodian family business group.' },
    { id: 'inv-sangkat-mfi', name: 'Sangkat Microfinance', kind: 'mfi', hq: 'Battambang', industries: ['any'],
      ticketMin: 5000, ticketMax: 150000, stages: ['early', 'growth'], geo: ['nationwide'], types: ['debt'], esgRequired: false, esgFocus: false, minRevenue: 30000,
      about: 'Microfinance lender serving small and growing enterprises.' },
    { id: 'inv-rumdul-fund', name: 'Rumdul Women Enterprise Fund', kind: 'grant', hq: 'Siem Reap', industries: ['handicraft', 'fnb', 'agri', 'education'],
      ticketMin: 10000, ticketMax: 100000, stages: ['idea', 'early', 'growth'], geo: ['nationwide'], types: ['grant', 'debt'], esgRequired: false, esgFocus: true, minRevenue: 0,
      about: 'Grant and soft-loan program for women-led and women-employing enterprises.' },
  ];

  investors.forEach((i) => { i.verified = i.id === 'inv-sangkat-mfi' ? 'pending' : 'verified'; });

  const demoUsers = {
    sme: { id: 'sme-mekong-pepper', name: 'Sokha Chan' },
    investor: { id: 'inv-lotus-impact', name: 'Bopha Meas' },
    admin: { id: 'admin-1', name: 'Admin (demo)' },
  };

  const pipelineStages = ['interested', 'screening', 'dd', 'negotiation', 'closed'];
  const pipeline = [
    { id: 'deal-1', investorId: 'inv-lotus-impact', smeId: 'sme-sora-solar', stage: 'dd', updated: '2026-11-12' },
    { id: 'deal-2', investorId: 'inv-lotus-impact', smeId: 'sme-angkor-weave', stage: 'screening', updated: '2026-11-10' },
    { id: 'deal-3', investorId: 'inv-lotus-impact', smeId: 'sme-khmerlearn', stage: 'interested', updated: '2026-11-08' },
  ];

  const docRequests = [
    { id: 'doc-1', investorId: 'inv-lotus-impact', smeId: 'sme-sora-solar', status: 'pending', date: '2026-11-13' },
  ];

  const notifications = {
    sme: [
      { id: 'n-s1', date: '2026-11-15', icon: 'target', text: { en: 'Lotus Impact Fund viewed your business profile.', km: 'Lotus Impact Fund បានមើលប្រវត្តិរូបអាជីវកម្មរបស់អ្នក។' } },
      { id: 'n-s2', date: '2026-11-14', icon: 'chart', text: { en: 'Your readiness score was recalculated: 71 / 100.', km: 'ពិន្ទុត្រៀមខ្លួនរបស់អ្នកត្រូវបានគណនាឡើងវិញ៖ ៧១ / ១០០។' } },
      { id: 'n-s3', date: '2026-11-12', icon: 'book', text: { en: 'New Academy lesson recommended: Board & governance basics.', km: 'មេរៀនថ្មីត្រូវបានណែនាំ៖ មូលដ្ឋានក្រុមប្រឹក្សា និងអភិបាលកិច្ច។' } },
    ],
    investor: [
      { id: 'n-i1', date: '2026-11-15', icon: 'target', text: { en: '2 new SMEs match your mandate.', km: 'SME ថ្មី ២ ត្រូវនឹងគោលដៅរបស់អ្នក។' } },
      { id: 'n-i2', date: '2026-11-13', icon: 'file', text: { en: 'Sora Solar Solutions is reviewing your document request.', km: 'Sora Solar Solutions កំពុងពិនិត្យសំណើឯកសាររបស់អ្នក។' } },
      { id: 'n-i3', date: '2026-11-11', icon: 'message', text: { en: 'New message from Angkor Weave Collective.', km: 'សារថ្មីពី Angkor Weave Collective។' } },
    ],
    admin: [
      { id: 'n-a1', date: '2026-11-15', icon: 'shield', text: { en: '2 SME profiles are waiting for verification.', km: 'ប្រវត្តិរូប SME ២ កំពុងរង់ចាំការផ្ទៀងផ្ទាត់។' } },
      { id: 'n-a2', date: '2026-11-14', icon: 'flag', text: { en: '1 listing was reported for outdated information.', km: 'បញ្ជីមួយត្រូវបានរាយការណ៍ថាមានព័ត៌មានហួសសម័យ។' } },
      { id: 'n-a3', date: '2026-11-12', icon: 'book', text: { en: 'Academy lesson "Debt vs equity" was published.', km: 'មេរៀន «កម្ចី និងភាគហ៊ុន» ត្រូវបានផ្សព្វផ្សាយ។' } },
    ],
  };

  const activity = [
    { date: '2026-11-15', text: { en: 'Lotus Impact Fund expressed interest in Sora Solar Solutions', km: 'Lotus Impact Fund បានបង្ហាញចំណាប់អារម្មណ៍លើ Sora Solar Solutions' } },
    { date: '2026-11-14', text: { en: 'Mekong Pepper Co. completed the readiness assessment', km: 'Mekong Pepper Co. បានបញ្ចប់ការវាយតម្លៃការត្រៀមខ្លួន' } },
    { date: '2026-11-13', text: { en: 'Document access requested for Sora Solar Solutions', km: 'សំណើចូលមើលឯកសារសម្រាប់ Sora Solar Solutions' } },
    { date: '2026-11-12', text: { en: 'Angkor Weave Collective submitted profile for verification', km: 'Angkor Weave Collective បានដាក់ប្រវត្តិរូបសម្រាប់ការផ្ទៀងផ្ទាត់' } },
  ];

  const academy = [
    { id: 'fundamentals', code: 'IF', color: '#0F7F75', lessons: 6, audience: 'all', title: { en: 'Investment Fundamentals', km: 'មូលដ្ឋានគ្រឹះនៃការវិនិយោគ' }, desc: { en: 'How equity, debt and grants work, and what investors expect in return.', km: 'របៀបដែលភាគហ៊ុន កម្ចី និងជំនួយដំណើរការ និងអ្វីដែលវិនិយោគិនរំពឹង។' } },
    { id: 'literacy', code: 'FL', color: '#16386A', lessons: 8, audience: 'sme', title: { en: 'Business Financial Literacy', km: 'អក្ខរកម្មហិរញ្ញវត្ថុអាជីវកម្ម' }, desc: { en: 'Bookkeeping, cash flow, profit and loss, and balance sheets.', km: 'ការកត់ត្រាគណនេយ្យ លំហូរសាច់ប្រាក់ ចំណេញ-ខាត និងតារាងតុល្យការ។' } },
    { id: 'readiness', code: 'IR', color: '#B7791F', lessons: 5, audience: 'sme', title: { en: 'Investment Readiness', km: 'ការត្រៀមខ្លួនសម្រាប់ការវិនិយោគ' }, desc: { en: 'Governance, legal registration and the documents investors ask for.', km: 'អភិបាលកិច្ច ការចុះបញ្ជីស្របច្បាប់ និងឯកសារដែលវិនិយោគិនស្នើសុំ។' } },
    { id: 'strategy', code: 'FS', color: '#7C3AED', lessons: 5, audience: 'sme', title: { en: 'Fundraising Strategy', km: 'យុទ្ធសាស្ត្ររៃអង្គាសមូលនិធិ' }, desc: { en: 'Choosing the right capital, timing a raise and building a target list.', km: 'ការជ្រើសរើសដើមទុនត្រឹមត្រូវ ពេលវេលា និងការរៀបចំបញ្ជីគោលដៅ។' } },
    { id: 'modeling', code: 'FM', color: '#0E7490', lessons: 4, audience: 'all', title: { en: 'Financial Modeling', km: 'ការបង្កើតគំរូហិរញ្ញវត្ថុ' }, desc: { en: 'Simple 3-year projections, unit economics and valuation basics.', km: 'ការព្យាករ ៣ ឆ្នាំ សេដ្ឋកិច្ចឯកតា និងមូលដ្ឋានវាយតម្លៃ។' } },
    { id: 'pitching', code: 'PN', color: '#BE185D', lessons: 4, audience: 'sme', title: { en: 'Pitching and Negotiation', km: 'ការធ្វើបទបង្ហាញ និងការចរចា' }, desc: { en: 'Teasers, pitch decks, investor meetings and term-sheet basics.', km: 'ឯកសារណែនាំ បទបង្ហាញ កិច្ចប្រជុំវិនិយោគិន និងមូលដ្ឋានលក្ខខណ្ឌកិច្ចព្រមព្រៀង។' } },
    { id: 'esg', code: 'ESG', color: '#15803D', lessons: 4, audience: 'all', title: { en: 'ESG and Impact Investment', km: 'ESG និងការវិនិយោគផលប៉ះពាល់' }, desc: { en: 'Measuring social and environmental impact and reporting it credibly.', km: 'ការវាស់វែងផលប៉ះពាល់សង្គម និងបរិស្ថាន និងការរាយការណ៍ដែលគួរឱ្យជឿ។' } },
    { id: 'investor-ed', code: 'IE', color: '#9A3412', lessons: 5, audience: 'investor', title: { en: 'Investor Education', km: 'ការអប់រំវិនិយោគិន' }, desc: { en: 'Assessing Cambodian SMEs, due diligence and portfolio support.', km: 'ការវាយតម្លៃ SME កម្ពុជា ការស៊ើបអង្កេត និងការគាំទ្រផលប័ត្រ។' } },
  ];

  const academyProgress = { sme: { done: 7, total: 41 }, investor: { done: 3, total: 41 } };

  return { industries, provinces, smes, investors, demoUsers, pipelineStages, pipeline, docRequests, notifications, activity, academy, academyProgress };
})();
