const matchVarDecl = /\$([^:]+):[ ]*([^;]+);?/;
const matchVarName = /^\$([\s\S]+)$/;

function camelCase(k) {
  return k.replace(/-(.)/gi, (_, l) => l.toUpperCase());
}

function parse(content, parsed = {}) {
  return content.split(`\n`).map(::matchVarDecl.exec).filter(t => t)
    .map(([_, vname, value]) => { // eslint-disable-line no-unused-vars
      const m = matchVarName.exec(value);
      return {
        [camelCase(vname)]: m ? parsed[camelCase(m[1])] || value : value
      };
    })
    .reduce((ac, v) => ({ ...ac, ...v }), {});
}

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  return `module.exports = ${JSON.stringify(parse(content, parse(content)))};`;
};
