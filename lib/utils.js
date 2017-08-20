

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

module.exports = compile;