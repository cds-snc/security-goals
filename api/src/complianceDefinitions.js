const complianceDefinitions = definitions => {
  const obj = Object.entries(definitions)
    .filter(k => {
      if (k[0] !== 'name') return true
    })
    .reduce((target, [k]) => {
      target[k] = definitions[k]
      target[k].id = k
      return target
    }, {})

  return obj
}

module.exports.complianceDefinitions = complianceDefinitions
