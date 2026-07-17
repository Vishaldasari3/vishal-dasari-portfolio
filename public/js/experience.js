(function () {
  const roles = [
    {
      title: 'Senior Associate Software Engineer III',
      company: 'JPMorgan Chase & Co. — Wilmington, DE',
      dates: 'Nov 2021 – Present',
      bullets: [
        'Developed and maintained Daily Revenue Reporting platforms using Java, Spring Boot, REST APIs, SQL Server, Python, and cloud technologies.',
        'Built Python-based reporting applications using Flask, FastAPI, Pandas, NumPy, SQLAlchemy, and Oracle databases.',
        'Modernized data pipelines using Apache NiFi, Databricks, Delta Lake, and AWS S3 for large-scale data processing.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Vanguard Group — Malvern, PA',
      dates: 'Aug 2018 – Nov 2021',
      bullets: [
        'Designed and developed enterprise applications using Java, Spring Boot, REST APIs, Angular, JavaScript, and SQL databases.',
        'Built responsive UIs using Angular, TypeScript, HTML5, CSS3, and jQuery for Vanguard\u2019s global investment platforms.',
        'Automated build and deployment processes using Maven, Jenkins, Bamboo, and CI/CD practices.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'FedEx Services — Collierville, TN',
      dates: 'Sep 2017 – Aug 2018',
      bullets: [
        'Developed enterprise web applications for FedEx Global Billing Online (GFBO) using Java, AngularJS, JSP, and AJAX.',
        'Developed and integrated RESTful and SOAP web services using JAX-RS and JAX-WS.',
        'Designed backend services and SQL/PL-SQL solutions using Oracle databases.',
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
    { title: 'Hadoop to Databricks & AWS Migration', summary: 'Modernized a legacy on-prem Hadoop data pipeline into a cloud-native Databricks/Delta Lake architecture.', tags: ['Databricks', 'Apache NiFi', 'AWS S3', 'Delta Lake'], details: [
      'Re-architected batch data pipelines from on-prem Hadoop to Databricks running on AWS.',
      'Used Apache NiFi to orchestrate ingestion and transformation flows into Delta Lake.',
      'Reduced processing time and operational overhead versus the legacy Hadoop cluster.',
      'Enabled scalable, cloud-native analytics for downstream reporting teams.',
    ] },
    { title: 'Java Applications: On-Prem to AWS Migration', summary: 'Migrated legacy Java applications to containerized services on AWS EKS with PostgreSQL.', tags: ['AWS EKS', 'PostgreSQL', 'Docker', 'Terraform'], details: [
      'Containerized on-prem Java/Spring Boot applications for deployment on AWS EKS.',
      'Migrated relational data stores to PostgreSQL, replacing legacy on-prem databases.',
      'Provisioned infrastructure as code using Terraform for repeatable, auditable deployments.',
      'Improved scalability and reduced infrastructure maintenance burden.',
    ] },
    { title: 'Daily Revenue Reporting Platform', summary: 'Enterprise financial reporting platform built on Java Spring Boot and Python.', tags: ['Spring Boot', 'FastAPI', 'SQL Server', 'Python'], details: [
      'Built backend services in Java Spring Boot exposing REST APIs for revenue data.',
      'Developed complementary Python reporting apps using Flask, FastAPI, Pandas, and NumPy.',
      'Integrated with SQL Server and Oracle databases to support daily financial reporting workflows.',
      'Supported critical business analytics used across the organization.',
    ] },
    { title: 'Vanguard Global International Sites', summary: 'Modernization of customer-facing international investment platforms.', tags: ['Angular', 'TypeScript', 'REST APIs'], details: [
      'Contributed to modernization of Vanguard\u2019s international customer-facing applications.',
      'Built responsive UIs in Angular, TypeScript, HTML5, and CSS3.',
      'Developed RESTful services integrating backend systems with frontend applications.',
      'Collaborated with global product and QA teams in an Agile/Scrum environment.',
    ] },
    { title: 'GFBO — FedEx Global Billing Online', summary: 'Worldwide web-based billing platform serving customers across multiple regions.', tags: ['Java', 'AngularJS', 'SOAP', 'REST'], details: [
      'Built and maintained FedEx\u2019s Global Billing Online (GFBO) platform.',
      'Developed and integrated RESTful and SOAP web services using JAX-RS and JAX-WS.',
      'Implemented backend services and SQL/PL-SQL solutions on Oracle databases.',
      'Automated builds and deployments using Jenkins and Ant.',
    ] },
    { title: 'Wireless Sensor Parameter Logger', summary: 'Real-time sensor monitoring and data logging system for defense research.', tags: ['Java', 'Struts', 'MySQL', 'Embedded'], details: [
      'Designed a Java-based GUI for real-time monitoring of temperature and pressure sensor data.',
      'Integrated embedded hardware sensors with a desktop monitoring application.',
      'Implemented MySQL-based storage for historical sensor data analysis.',
      'Delivered the full lifecycle: design, implementation, testing, and debugging.',
    ] },
  ];

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.25);

    const rolesEl = document.getElementById('ex-roles');
    rolesEl.innerHTML = roles.map((role) => `
      <div id="ex-timeline-item" style="display: flex; gap: 28px; padding-bottom: 32px; border-bottom: 1px solid #e6e8f0;">
        <div style="width: 130px; flex-shrink: 0; font-size: 14px; color: #9096a8; font-weight: 500; padding-top: 3px;">${esc(role.dates)}</div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 18px; font-weight: 600; color: #1c2030;">${esc(role.title)}</div>
          <div style="font-size: 15px; color: #3654e0; font-weight: 500;">${esc(role.company)}</div>
          ${role.bullets.map((b) => `<div style="font-size: 15px; color: #5b6178; line-height: 1.7; display: flex; gap: 8px;"><span style="color: #3654e0;">&bull;</span><span>${esc(b)}</span></div>`).join('')}
        </div>
      </div>
    `).join('');

    const grid = document.getElementById('ex-projects-grid');
    grid.innerHTML = projectData.map((p, i) => `
      <div data-project-index="${i}" class="hv40" style="cursor: pointer; background: #ffffff; border: 1px solid #e6e8f0; border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 14px; transition: transform 0.15s, box-shadow 0.15s;">
        <div style="font-size: 17px; font-weight: 600; color: #1c2030;">${esc(p.title)}</div>
        <div style="font-size: 14px; color: #7a8199; line-height: 1.6;">${esc(p.summary)}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
          ${p.tags.map((t) => `<span style="font-size: 12px; color: #3654e0; background: #eef0fb; padding: 5px 10px; border-radius: 16px;">${esc(t)}</span>`).join('')}
        </div>
        <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #3654e0; margin-top: 6px;">
          View details
          <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#3654e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    `).join('');

    const overlay = document.getElementById('ex-modal-overlay');
    const panel = document.getElementById('ex-modal-panel');
    function openProject(i) {
      const p = projectData[i];
      document.getElementById('ex-modal-title').textContent = p.title;
      document.getElementById('ex-modal-tags').innerHTML = p.tags.map((t) => `<span style="font-size: 12px; color: #3654e0; background: rgba(54,84,224,0.1); padding: 5px 10px; border-radius: 16px;">${esc(t)}</span>`).join('');
      document.getElementById('ex-modal-details').innerHTML = p.details.map((d) => `<div style="font-size: 15px; color: #3d4356; line-height: 1.7; display: flex; gap: 10px;"><span style="color: #3654e0; flex-shrink: 0;">&bull;</span><span>${esc(d)}</span></div>`).join('');
      overlay.style.display = 'flex';
    }
    function closeProject() { overlay.style.display = 'none'; }

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-project-index]');
      if (card) openProject(Number(card.getAttribute('data-project-index')));
    });
    overlay.addEventListener('click', closeProject);
    panel.addEventListener('click', (e) => e.stopPropagation());
    document.getElementById('ex-modal-close').addEventListener('click', closeProject);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
