(function () {
  const certData = [
    {
      title: 'Oracle Certified Professional, Java SE 6 Programmer',
      issuer: 'Oracle',
      logo: 'assets/oracle-logo.png',
      dateLine: 'Issued Dec 2014',
      url: 'https://www.credly.com/badges/52eb2a7f-63b1-4c54-b4ab-526a04508538/linked_in',
      skills: ['Java SE', 'Object-Oriented Programming', 'Core Java'],
    },
    {
      title: 'AWS Certified Developer \u2013 Associate',
      issuer: 'Amazon Web Services (AWS)',
      logo: 'assets/aws-cert-logo.png',
      dateLine: 'Issued Aug 2022 \u00b7 Expires Aug 2025',
      url: 'https://www.credly.com/badges/f8d81104-7adb-4b20-a226-496688c27bb3/linked_in_profile',
      skills: ['AWS Lambda', 'DynamoDB', 'Cloud Development', 'CI/CD'],
    },
    {
      title: 'AI Skills Fest 2026',
      issuer: 'Microsoft',
      logo: 'assets/ms-ai-fest-logo.png',
      dateLine: 'Issued Jun 2026',
      url: 'https://www.credly.com/badges/ec2dc74a-8b6e-4145-adec-252a12bfe392/linked_in_profile',
      skills: ['Artificial Intelligence', 'Applied AI', 'Generative AI Tools', 'AI Agents', 'Workflow Automation', 'Prompt Engineering'],
    },
    {
      title: 'Machine Learning with Python \u2014 Level 1',
      issuer: 'IBM',
      logo: 'assets/ibm-logo.png',
      dateLine: 'Issued Oct 2020',
      url: 'https://www.credly.com/badges/d7306259-7f46-452b-ad6d-d018bfa8b266?source=linked_in_profile',
      skills: ['Machine Learning', 'Python', 'Scikit-learn'],
    },
    {
      title: 'Python for Data Science',
      issuer: 'IBM',
      logo: 'assets/ibm-logo.png',
      dateLine: 'Issued Aug 2020',
      url: 'https://www.credly.com/badges/51fbee59-d6ef-47d5-97e4-caa17f87e3f8?source=linked_in_profile',
      skills: ['Python', 'Data Science', 'Pandas', 'NumPy'],
    },
    {
      title: 'Build a Face Recognition Application using Python',
      issuer: 'HCL GUVI',
      logo: 'assets/hcl-logo.png',
      dateLine: 'Issued Apr 2021',
      credentialId: '1S8919K5e072680BL6',
      url: 'https://www.guvi.in/verify-certificate?id=1S8919K5e072680BL6',
      skills: ['Computer Vision', 'OpenCV', 'Python'],
    },
  ];

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.25);

    const grid = document.getElementById('cert-grid');
    grid.innerHTML = certData.map((c) => `
      <div class="cert-card" style="background: #ffffff; border: 1px solid #e6e8f0; border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 16px; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease;">
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="width: 96px; height: 96px; border-radius: 16px; background: #ffffff; border: 1px solid #e6e8f0; flex-shrink: 0; overflow: hidden; padding: 8px;">
            <img src="${c.logo}" alt="${esc(c.issuer)} logo" style="width: 100%; height: 100%; object-fit: contain;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="font-size: 19px; font-weight: 600; color: #1c2030; line-height: 1.35;">${esc(c.title)}</div>
            <div style="font-size: 16px; color: #7a8199;">${esc(c.issuer)}</div>
          </div>
        </div>
        <div style="font-size: 13px; color: #9096a8;">${esc(c.dateLine)}</div>
        ${c.credentialId ? `<div style="font-size: 13px; color: #9096a8;">Credential ID ${esc(c.credentialId)}</div>` : ''}
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${c.skills.map((s) => `<span style="font-size: 12px; color: #3654e0; background: #eef0fb; padding: 5px 10px; border-radius: 16px;">${esc(s)}</span>`).join('')}
        </div>
        <a href="${c.url}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #3654e0; margin-top: 6px;">
          View credential
          <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#3654e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    `).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
