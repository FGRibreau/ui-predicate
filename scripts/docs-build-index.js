const { resolve } = require('path');
const { readdirSync, writeFileSync } = require('fs');
const pack = require('../package.json');
const readDir = dir => readdirSync(dir);
const GITHUB = 'https://github.com/FGRibreau/ui-predicate';
const CSS_HEAD =
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css"/>';

const root = resolve(__dirname, '../docs/packages');

const createPackageIndex = (dir, versions) => {
  writeFileSync(
    resolve(dir, 'index.html'),
    `
<html><head>${CSS_HEAD}</head>
<body><pre><ul>
  ${versions
    .sort(isHigherThan)
    .map(v => `<li><a href="./${v}">${v}</a></li>`)
    .join('')}
</ul></pre>
</body>
</html>
  `,
    'utf8'
  );
};

function isHigherThan(lhs, rhs) {
  const acc = rhs.split('.');
  const [major, minor, patch] = lhs.split('.');
  return major >= acc[0] && minor >= acc[1]
    ? true
    : major >= acc[0] && minor >= acc[1] && patch >= acc[2];
}

const lastVersion = versions =>
  versions.reduce(
    (acc, version) => (isHigherThan(version, acc) ? version : acc),
    '0.0.0'
  );

const createLatest = (dir, versions) => {
  const redirect = `./${lastVersion(versions)}`;
  writeFileSync(
    resolve(dir, 'latest.html'),
    `<html><head>
<script>
  location.href = './${lastVersion(
    versions
  )}' + (location.hash ? location.hash.slice(1) : '/index.html')</script>
</head></html>`,
    'utf8'
  );
};

const packages = readDir(root)
  .filter(pkg => pkg.startsWith('ui-'))
  .map(pkg => {
    const pkgDir = resolve(root, pkg);
    const versions = readDir(resolve(root, pkg)).filter(
      version => version.split('.').length >= 3
    );
    createPackageIndex(pkgDir, versions);
    createLatest(pkgDir, versions);

    return [pkg, versions];
  });

const createIndex = (dir, packages) => {
  writeFileSync(
    resolve(dir, 'index.html'),
    `
  <html><head>
    <title>${pack.title}</title>
    ${CSS_HEAD}
  </head>
  <body>
  <main class="container">

    <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          ${pack.title}
        </h1>
        <h2 class="subtitle">
          ${pack.description}
        </h2>
      </div>
    </div>
  </section>

  <aside class="menu">
    ${packages
      .map(
        ([pkg, versions]) =>
          `<p class="menu-label">${pkg}</p>
            <ul class="menu-list">
              <li><a href="./${pkg}/latest.html">latest</a></li><li><ul>${versions
            .sort(isHigherThan)
            .reverse()
            .map(v => `<li><a href="./${pkg}/${v}">${v}</a></li>`)
            .join('')}</ul></li></ul>`
      )
      .join('\n')}
  </aside>
  </main>
  </body>
  </html>
    `,
    'utf8'
  );
};

createIndex(root, packages);
