/* Shared hostname pairs used by Next.js routing and browser navigation. */
(function (root, factory) {
  const site = factory();
  if (typeof module === 'object' && module.exports) module.exports = site;
  else root.VD_SITE = site;
})(typeof window === 'undefined' ? globalThis : window, function () {
  const environments = [
    {name:'production', portfolio:'www.dasarivishal.com', aliases:['dasarivishal.com'], blog:'blog.dasarivishal.com'},
    {name:'production-alias', portfolio:'vishaldasari.vercel.app', aliases:[], blog:'blogvishaldasari.vercel.app'},
    // Temporary pre-production domains; remove this pair when the redesign is retired.
    {name:'pre-production', portfolio:'vishaldasari1.vercel.app', aliases:[], blog:'blogvishaldasari1.vercel.app'},
    {name:'local', portfolio:'localhost', aliases:['127.0.0.1'], blog:'blog.localhost'}
  ];
  function resolve(hostname, port) {
    const environment = environments.find(e => [e.portfolio, e.blog, ...e.aliases].includes(hostname));
    if (!environment) return {name:'preview', isBlog:false, portfolioOrigin:'', blogOrigin:'', journalPath:'/blog'};
    const local = environment.name === 'local';
    const suffix = local && port ? ':' + port : '';
    const scheme = local ? 'http://' : 'https://';
    return {
      name:environment.name, isBlog:hostname === environment.blog,
      portfolioOrigin:scheme + environment.portfolio + suffix,
      blogOrigin:scheme + environment.blog + suffix,
      journalPath:hostname === environment.blog ? '/' : '/blog'
    };
  }
  return {environments, resolve};
});
