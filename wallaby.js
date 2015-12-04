var wallabify = require("wallabify");
var babel = require("babel-core");

var wallabyPostprocessor = wallabify({
  entryPatterns: [
    "tests/jsnlogTestConfigure.js",
    "tests/**/test.*.js*"
  ]
});

module.exports = function (wallaby) {
  wallaby.defaults.files.load = false;
  wallaby.defaults.tests.load = false;

  return {
    files: ['src/*.ts', 'tests/jsnlogTestConfigure.ts'],

    tests: ['tests/**/test.*.ts*'],

    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({
        target: 2,  //ES6
        module: 1,  //commonjs
        jsx: 2      // react
      })
    },

    debug: true,

    postprocessor: wallabyPostprocessor,

    preprocessors: {
      '**/*.js': file => require("babel-core").transform(file.content, {
        sourceMap: true,
        compact: false,
        presets: ["es2015"]
      })
    },

    bootstrap: function () {
      window.__jsnlog_configure();
      window.__moduleBundler.loadTests();
    }
  };
};
