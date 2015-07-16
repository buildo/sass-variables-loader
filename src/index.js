const match = /\$([^:]+):[ ]*([^;]+);/gi;

const camelCase = k => k.replace(/-(.)/gi, (_, l) => l.toUpperCase());

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  return `module.exports = ${JSON.stringify(
    content
      .split(`\n`)
      .map(::match.exec)
      .filter(t => t)
      .map(([_, vvar, value]) => ({ // eslint-disable-line no-unused-vars
        [camelCase(vvar)]: value
      }))
      .reduce((ac, v) => ({ ...ac, ...v }), {})
  )};`;
};
