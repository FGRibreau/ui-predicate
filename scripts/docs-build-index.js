const { resolve } = require('path');
const { readdirSync, writeFileSync } = require('fs');

const readDir = dir => readdirSync(dir);

const root = resolve(__dirname, '../docs/packages');

const packages = readDir(root).filter(pkg => pkg.startsWith('ui-'));

const createIndex = (dir, versions) => {
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

packages.forEach(pkg => {
  const pkgDir = resolve(root, pkg);
  const versions = readDir(resolve(root, pkg)).filter(
    version => version.split('.').length >= 3
  );
  createIndex(pkgDir, versions);
  createLatest(pkgDir, versions);
});
