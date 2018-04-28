const { resolve } = require('path');
const { readdirSync, writeFileSync } = require('fs');

const readDir = dir => readdirSync(dir);
const GITHUB = 'https://github.com/FGRibreau/ui-predicate';

const root = resolve(__dirname, '../docs/packages');

const createPackageIndex = (dir, versions) => {
  writeFileSync(
    resolve(dir, 'index.html'),
    `
<html><head>
</head>
<body>
<ul>
  ${versions.sort(isHigherThan).map(v => `<a href="./${v}">${v}</a>`)}
</ul>
</body>
</html>
  `,
    'utf8'
  );
};

function isHigherThan(lhs, rhs) {
  const acc = rhs.split('.');
  const [major, minor, patch] = lhs.split('.');
  return major >= acc[0] && minor >= acc[1] && patch >= acc[2];
}

const lastVersion = versions =>
  versions.reduce(
    (acc, version) => (isHigherThan(version, acc) ? version : acc),
    '0.0.0'
  );

const createLatest = (dir, versions) => {
  const redirect = `./${lastVersion(versions)}/index.html`;
  writeFileSync(
    resolve(dir, 'latest.html'),
    `<html><head><meta http-equiv="refresh" content="5; URL="${redirect}">
<script>location.href = '${redirect}'</script>
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
    <title>ui-predicate</title>
  </head>
  <body>
    <pre><ul><li><a href="${GITHUB}">Github</a></li>${packages
      .map(
        ([pkg, versions]) =>
          `<li>${pkg} <a href="${GITHUB}/tree/master/packages/${pkg}">README</a></li><ul><li><a href="./${pkg}/latest.html">latest</a></li>${versions
            .sort(isHigherThan)
            .map(v => `<li><a href="./${pkg}/${v}">${v}</a></li>`)
            .join('')}</ul>`
      )
      .join('\n')}</ul></pre>
  </body>
  </html>
    `,
    'utf8'
  );
};

createIndex(root, packages);
