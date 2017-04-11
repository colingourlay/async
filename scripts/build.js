// Native
const {readdirSync, mkdirSync, readFileSync, writeFileSync} = require('fs');
const {dirname} = require('path');

// External
const rollupAsync = require('rollup-plugin-async');
const rollupBabel = require('rollup-plugin-babel');
const {transformFileSync} = require('babel-core');
const del = require('del');
const rollup = require('rollup');

// Internal
const {version} = require('../lerna');

const PROJECT_SCOPE = '@colingourlay';
const PROJECT_NAME = 'async';
const SRC = 'src';
const PACKAGES = 'packages';
const ENTRIES = readdirSync(`${SRC}/`).map(x => x.split('.')[0]);
const ES2017 = 'es2017';
const ES2016 = 'es2016';
const ES2015 = 'es2015';
const ES5 = 'es5';
const ES_VERSIONS = {
  [ES2017]: {
    babelPresets: [],
    isDefault: true,
    name: 'ES2017'
  },
  [ES2015]: {
    babelPresets: [ES2017, ES2016],
    name: 'ES2015 (ES6)'
  },
  [ES5]: {
    babelPresets: [ES2017, ES2016, [ES2015, {modules: false}]],
    name: 'ES5'
  }
};
const ES_MODULES = 'es';
const COMMON_JS = 'cjs';
const MODULE_FORMATS = {
  [ES_MODULES]: {
    isDefault: true,
    name: 'ES Module'
  },
  [COMMON_JS]: {
    name: 'CommonJS'
  }
};
const NUM_COMBINATIONS = Object.keys(ES_VERSIONS).length * Object.keys(MODULE_FORMATS).length;

function mkdirpath(path) {
	const dir = dirname(path);

	try {
		readdirSync(dir);
	} catch (err) {
		mkdirpath(dir);
		mkdirSync(dir);
	}
}

let task = Promise.resolve();

task = task.then(() => del(PACKAGES));

function build({
  task,
  esVersion,
  moduleFormat,
  basePath,
  babelConfig,
  rollupBabelConfig,
  entry
}) {
  const dest = `${basePath}/${entry}.js`;
  const standaloneDest = dest.replace('.js', '.standalone.js');
  const babelBundle = transformFileSync(`${SRC}/${entry}.js`, babelConfig);

  return task.then(() => {
    mkdirpath(dest);
    writeFileSync(dest, babelBundle.code);

    const rollupPlugins = [rollupBabelConfig];

    if (esVersion === ES2017) {
      rollupPlugins.shift(rollupAsync());
    }

    return rollup.rollup({
      entry: `${SRC}/${entry}.js`,
      plugins: rollupPlugins
    }).then(rollupBundle => {
      return rollupBundle.write({
        dest: standaloneDest,
        format: moduleFormat
      });
    });
  });
}

let progressCounter = 0;

function progress(esVersion, moduleFormat, wasBuilt) {
  console.log(`${++progressCounter}/${NUM_COMBINATIONS} ${wasBuilt ? 'Built' : 'Noped'} ${esVersion}:${moduleFormat}`);
}

Object.keys(ES_VERSIONS).forEach(esVersion => {
  Object.keys(MODULE_FORMATS).forEach(moduleFormat => {
    if (esVersion === ES5 && moduleFormat === ES_MODULES) {
      return task = task.then(() => {
        progress(esVersion, moduleFormat);

        return Promise.resolve();
      });
    }

    const name = `${PROJECT_NAME}${ES_VERSIONS[esVersion].isDefault ?
      '' : `-${esVersion}`}${MODULE_FORMATS[moduleFormat].isDefault ?
      '' : `-${moduleFormat}`}`;
    const basePath = `${PACKAGES}/${name}`;
    const pkgPath = `${basePath}/package.json`;
    const npmrcPath = `${basePath}/.npmrc`;
    const readmePath = `${basePath}/README.md`;
    const babelConfig = {
      babelrc: false,
      plugins: moduleFormat === COMMON_JS ? [
        'babel-plugin-add-module-exports',
        'transform-es2015-modules-commonjs'
      ] : [],
      presets: ES_VERSIONS[esVersion].babelPresets
    };
    const rollupBabelConfig = rollupBabel(Object.assign({}, babelConfig, {
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }));

    task = task.then(() => {
      mkdirpath(pkgPath);
      writeFileSync(pkgPath, `{
  "name": "${PROJECT_SCOPE}/${name}",
  "desciription": "A collection of async helper functions${ES_VERSIONS[esVersion].isDefault ? '' : `, transpiled to ${ES_VERSIONS[esVersion].name}`}, in ${MODULE_FORMATS[moduleFormat].name} format.",
  "version": "${version}",
  "license": "MIT",
  "repository": "${PROJECT_SCOPE.slice(1)}/${name}",
  "main": "index.js"${moduleFormat === ES_MODULES ? `,
  "module": "index.js",
  "jsnext:main": "index.js"` : ''}
}`);

      return Promise.resolve();
    });

    task = task.then(() => {
      mkdirpath(npmrcPath);
      writeFileSync(npmrcPath, 'access=public');

      return Promise.resolve();
    });

    task = task.then(() => {
      mkdirpath(readmePath);
      writeFileSync(readmePath, `# ${PROJECT_NAME}

A bunch of helper functions for working with collections and control flow in the age of \`Promises\` and \`async\`/\`await\`.

Pre-compiled for use in ${ES_VERSIONS[esVersion].name} projects using the ${MODULE_FORMATS[moduleFormat].name} module format. Tree-shaken standalone bundles included.`);

      return Promise.resolve();
    });

    ENTRIES.forEach(entry => {
      task = build({
        task,
        esVersion,
        moduleFormat,
        entry,
        basePath,
        babelConfig,
        rollupBabelConfig
      });
    });

    task = task.then(() => {
      progress(esVersion, moduleFormat, true);

      return Promise.resolve();
    });
  });
});

task.catch(err => console.error(err));
