(function () {
  const roles = [
    {
      title: 'Senior Associate Software Engineer III',
      company: 'JPMorgan Chase & Co. — Wilmington, DE',
      dates: 'Nov 2021 – Present',
      bullets: [
        'Led migration of on-prem application servers to Amazon EKS and the database layer from SQL Server to Aurora PostgreSQL for the Daily Revenue Reporting platform, cutting infrastructure cost and operational overhead.',
        'Re-architected a monolithic Angular application into four independent React micro-frontends built on JPMorgan\u2019s Salt Design System.',
        'Upgraded the platform from Java 17 to Java 21, migrated the test suite to JUnit 5, and added Playwright automation across UI and service layers.',
        'Introduced a Redis caching layer for high-traffic reporting queries and directed CI/CD and infrastructure-as-code strategy using Jenkins, Spinnaker, and Terraform.',
        'Refactored and rewrote core reporting services for better performance, cutting query latency and easing read load on Aurora during peak reporting cycles.',
        'Owns incident management for the platform \u2014 triaging production issues and remediating security findings \u2014 while mentoring junior and mid-level engineers.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Vanguard Group of Investments — Malvern, PA',
      dates: 'Aug 2018 – Nov 2021',
      bullets: [
        'Migrated Vanguard\u2019s Australian site to Amazon ECS while upgrading the frontend to Angular 10 and backend to Java 11.',
        'Built Spring Boot services and JAX-RS APIs powering real-time fund pricing and performance data for individual and institutional investors.',
        'Introduced Redis-backed caching for high-traffic fund pricing pages and led adoption of a Selenium/JUnit regression suite across the international site portfolio.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'FedEx Services — Collierville, TN',
      dates: 'Sep 2017 – Aug 2018',
      bullets: [
        'Built GFBO (Global FedEx Billing Online), a web-based invoicing platform serving customers across 5 regions (US, Canada, APAC, EMEA, LAC).',
        'Implemented RESTful and SOAP web services (JAX-RS/JAX-WS) with reusable JAXB-based transformation utilities, reducing duplicate integration code.',
        'Developed UI components with AngularJS, JSP, and jQuery, and validated services with JUnit, SoapUI, and ReadyAPI.',
      ],
    },
    {
      title: 'Application Developer Intern',
      company: 'Defence Research & Development Laboratory (DRDL) — Hyderabad, India',
      dates: 'Jan 2014 – Apr 2014',
      bullets: [
        'Designed a Java-based GUI application for real-time monitoring of temperature and pressure sensor data.',
        'Built software integration between embedded hardware sensors and desktop applications.',
        'Implemented database storage using MySQL for historical sensor analysis.',
      ],
    },
  ];

  const projectData = [
    { title: 'Daily Revenue Reporting — Cloud & Platform Modernization', summary: 'Migrated the Daily Revenue Reporting platform to Amazon EKS and Aurora PostgreSQL, modernizing its Java backend and CI/CD pipeline.', tags: ['Java', 'Spring Boot', 'AWS EKS', 'Aurora PostgreSQL', 'MFE'], details: [
      'Migrated on-prem application servers to Amazon EKS and the database layer from SQL Server to Aurora PostgreSQL, cutting infrastructure and licensing cost.',
      'Designed and maintained RESTful APIs in Java and Spring Boot, backed by SQL Server, across all phases of the SDLC.',
      'Upgraded the runtime from Java 17 to Java 21 and migrated the JUnit test suite to JUnit 5, aligning the codebase with current language and testing standards.',
      'Introduced a Redis caching layer for high-traffic reporting queries, easing read load on Aurora during peak reporting cycles.',
      'Directed CI/CD and infrastructure-as-code strategy using Jenkins, Spinnaker, Maven, and Terraform.',
      'Re-architected a monolithic Angular app into four independent React micro-frontends built on JPMorgan\u2019s Salt Design System.',
    ] },
    { title: 'Internal Spring Boot Framework', summary: 'Core contributor to an internal Spring Boot platform framework adopted across multiple JPMorgan engineering teams.', tags: ['Kafka', 'Spring Boot', 'Java', 'Open Service Broker API'], details: [
      'Designed and implemented Kafka-based event-driven messaging capabilities within the framework, providing reusable integration patterns adopted by multiple teams.',
      'Built new feature capabilities for an Open Service Broker API application using Java and Spring Boot.',
      'Wrote JUnit test cases for framework components, championing test coverage standards across the team.',
      'Served as a technical point of contact for cross-team architecture discussions and design reviews on the framework.',
    ] },
    { title: 'Hadoop to Databricks & AWS Migration', summary: 'Modernized a legacy on-prem Hadoop data pipeline into a cloud-native Databricks/Delta Lake architecture.', tags: ['Databricks', 'Apache NiFi', 'AWS S3', 'Delta Lake'], details: [
      'Led modernization of a legacy Hadoop-based pipeline to Databricks and Apache NiFi, migrating large-scale datasets into AWS S3.',
      'Orchestrated ingestion and transformation flows with Apache NiFi, and built Delta tables, clusters, and workflows in Databricks.',
      'Enabled self-service analytics for multiple downstream teams, reducing processing time and operational overhead versus the legacy Hadoop cluster.',
    ] },
    { title: 'Vanguard Global International Sites', summary: 'Modernization of customer-facing international investment platforms, spanning personal investor, retail, institutional, and B2B lines.', tags: ['Angular 10', 'Java 11', 'AWS ECS', 'Redis'], details: [
      'Migrated Vanguard\u2019s Australian site (vanguard.com.au) to Amazon ECS while upgrading the frontend to Angular 10 and backend to Java 11.',
      'Built Spring Boot services and JAX-RS APIs powering real-time fund pricing and performance data \u2014 mutual fund and ETF pricing, index fund NAVs, and historical performance \u2014 for global investors.',
      'Introduced Redis-backed caching for high-traffic fund pricing pages, improving responsiveness during peak market hours.',
      'Led adoption of a Selenium/JUnit regression suite across the international site portfolio, and covered Angular components using Karma and Jasmine.',
    ] },
    { title: 'GFBO — FedEx Global Billing Online', summary: 'Worldwide web-based billing platform serving customers across 5 regions (US, Canada, APAC, EMEA, LAC).', tags: ['Java', 'AngularJS', 'SOAP', 'REST'], details: [
      'Built and maintained FedEx\u2019s Global Billing Online (GFBO) platform across specification, design, integration, testing, and deployment.',
      'Developed and integrated RESTful and SOAP web services (JAX-RS/JAX-WS) with reusable JAXB-based transformation utilities, reducing duplicate integration code.',
      'Implemented backend services and SQL/PL-SQL solutions on Oracle databases, using Log4J for application logging and debugging.',
      'Automated builds and deployments to WebLogic using Jenkins and Ant build scripts.',
    ] },
    { title: 'Wireless Sensor Parameter Logger', summary: 'Real-time sensor monitoring and data logging system built for missile systems testing at DRDL.', tags: ['Java', 'Struts', 'MySQL', 'Embedded'], details: [
      'Designed, developed, and tested a Java-based GUI (Struts, jQuery, Applets) for real-time monitoring of temperature and pressure sensor data.',
      'Performed embedded coding to interface sensor hardware with the GUI software.',
      'Persisted readings to a MySQL database for historical analysis and reporting.',
      'Delivered the full lifecycle: requirements, design, implementation, testing, and defect resolution.',
    ] },
  ];

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.32);

    const rolesEl = document.getElementById('ex-roles');
    rolesEl.innerHTML = `
      <div style="display: flex; flex-direction: column;">
        ${roles.map((role, i) => {
          const yr = (role.dates.match(/\d{4}/) || [''])[0];
          const end = /Present/.test(role.dates) ? 'Now' : ((role.dates.match(/\d{4}/g) || []).pop() || '');
          return `
          <div class="ex-item ex-row" style="transition-delay: ${i * 0.08}s;">
            <div style="width: 120px; flex-shrink: 0;">
              <div class="ex-year">${yr}&ndash;${end}</div>
              <div style="font-size: 12px; color: #9096a8; margin-top: 5px;">${esc(role.dates)}</div>
              ${i === 0 ? '<span style="display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 600; color: #1f8a5b; background: #e9f7ef; padding: 3px 9px; border-radius: 10px; letter-spacing: .5px; margin-top: 8px;"><span class="ex-dot-now" style="width: 5px; height: 5px; border-radius: 50%; background: #1f8a5b; display: inline-block;"></span>CURRENT</span>' : ''}
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 11.5px; font-weight: 600; color: #7a8199; letter-spacing: 1.2px; text-transform: uppercase;">${esc(role.company)}</div>
              <div style="font-size: 19px; font-weight: 600; color: #14162b; letter-spacing: -0.2px;">${esc(role.title)}</div>
              <div style="display: flex; flex-direction: column; gap: 7px; margin-top: 4px;">
                ${role.bullets.map((b) => `<div style="font-size: 14.5px; color: #5b6178; line-height: 1.7; display: flex; gap: 10px;"><span style="color: #3654e0; flex-shrink: 0;">&mdash;</span><span>${esc(b)}</span></div>`).join('')}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`;

    const items = rolesEl.querySelectorAll('.ex-item');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('ex-in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));

    const grid = document.getElementById('ex-projects-grid');
    grid.innerHTML = projectData.map((p, i) => `
      <div data-project-index="${i}" class="ex-proj ex-item" style="cursor: pointer; background: rgba(255,255,255,0.75); border: 1px solid rgba(28,32,48,0.1); border-radius: 20px; padding: 26px; display: flex; flex-direction: column; gap: 13px; transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s, opacity .6s ease; transition-delay: ${(i % 2) * 0.08}s;">
        <div style="position: absolute; top: 16px; right: 22px; font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800; color: rgba(28,32,48,0.05); line-height: 1; letter-spacing: -2px; pointer-events: none; user-select: none;">0${i + 1}</div>
        <div style="font-size: 16.5px; font-weight: 600; color: #14162b; padding-right: 48px; letter-spacing: -0.2px;">${esc(p.title)}</div>
        <div style="font-size: 13.5px; color: #7a8199; line-height: 1.65; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;">${esc(p.summary)} ${p.details.slice(0, 3).map(esc).join(' ')}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 2px;">
          ${p.tags.map((t) => `<span class="ex-chip">${esc(t)}</span>`).join('')}
        </div>
        <div style="display: inline-flex; align-items: center; gap: 7px; font-size: 13.5px; font-weight: 600; color: #3654e0; margin-top: auto; padding-top: 4px;">
          View details
          <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#3654e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    `).join('');
    grid.querySelectorAll('.ex-proj').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
      io.observe(card);
    });

    const overlay = document.getElementById('ex-modal-overlay');
    const panel = document.getElementById('ex-modal-panel');
    let sourceEl = null;
    function flipRect(el) { return el.getBoundingClientRect(); }
    function transformFor(fromRect, toRect, flipped) {
      const scaleX = fromRect.width / toRect.width;
      const scaleY = fromRect.height / toRect.height;
      const dx = (fromRect.left + fromRect.width / 2) - (toRect.left + toRect.width / 2);
      const dy = (fromRect.top + fromRect.height / 2) - (toRect.top + toRect.height / 2);
      return `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY}) rotateY(${flipped ? 90 : 0}deg)`;
    }
    function openProject(i, tileEl) {
      const p = projectData[i];
      document.getElementById('ex-modal-title').textContent = p.title;
      document.getElementById('ex-modal-tags').innerHTML = p.tags.map((t) => `<span style="font-size: 12px; color: #3654e0; background: rgba(54,84,224,0.1); padding: 5px 10px; border-radius: 16px; white-space: nowrap;">${esc(t)}</span>`).join('');
      document.getElementById('ex-modal-details').innerHTML = p.details.map((d) => `<div style="font-size: 15px; color: #3d4356; line-height: 1.7; display: flex; gap: 10px;"><span style="color: #3654e0; flex-shrink: 0;">&bull;</span><span>${esc(d)}</span></div>`).join('');
      sourceEl = tileEl;
      overlay.style.display = 'flex';
      panel.style.transition = 'none';
      panel.style.opacity = '0';
      requestAnimationFrame(() => {
        const tileRect = flipRect(tileEl);
        const finalRect = flipRect(panel);
        panel.style.transform = transformFor(tileRect, finalRect, true);
        void panel.offsetWidth;
        panel.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .4s ease';
        requestAnimationFrame(() => {
          panel.style.transform = 'translate(0,0) scale(1,1) rotateY(0deg)';
          panel.style.opacity = '1';
        });
      });
    }
    function closeProject() {
      if (sourceEl && document.body.contains(sourceEl)) {
        const tileRect = flipRect(sourceEl);
        const finalRect = flipRect(panel);
        panel.style.transition = 'transform .4s cubic-bezier(.5,0,.75,0), opacity .3s ease';
        panel.style.transform = transformFor(tileRect, finalRect, true);
        panel.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
          panel.style.transition = ''; panel.style.transform = ''; panel.style.opacity = '';
        }, 400);
      } else {
        overlay.style.display = 'none';
      }
    }

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-project-index]');
      if (card) openProject(Number(card.getAttribute('data-project-index')), card);
    });
    overlay.addEventListener('click', closeProject);
    panel.addEventListener('click', (e) => e.stopPropagation());
    document.getElementById('ex-modal-close').addEventListener('click', closeProject);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
