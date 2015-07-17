const matchVarDecl = /\$([^:]+):[ ]*([^;]+);/gi;
const matchVarName = /^\$([\s\S]+)$/;

function camelCase(k) {
  return k.replace(/-(.)/gi, (_, l) => l.toUpperCase());
}

function firstPass(content) {
  return content.split(`\n`).map(::matchVarDecl.exec).filter(t => t)
    .map(([_, vname, value]) => ({ // eslint-disable-line no-unused-vars
      [camelCase(vname)]: value
    }))
    .reduce((ac, v) => ({ ...ac, ...v }), {});
}

function secondPass(parsed) {
  const toReplace = Object.keys(parsed).map(k => {
    const matched = matchVarName.exec(parsed[k]);
    return matched ? { [k]: matched[1] } : false;
  }).filter(t => t);

  return toReplace.length === 0 ?
    parsed : secondPass({
      ...parsed,
      ...toReplace.reduce((ac, v) => {
        const k = Object.keys(v)[0];
        return {
          ...ac,
          [k]: parsed[camelCase(v[k])]
        };
      }, {})
    });
}

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  return `module.exports = ${JSON.stringify(secondPass(firstPass(content)))};`;
};
