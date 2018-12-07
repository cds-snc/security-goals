const deepFreeze = object => {
  let propNames = Object.getOwnPropertyNames(object)
  for (let name of propNames) {
    let value = object[name]
    object[name] =
      value && typeof value === 'object' ? deepFreeze(value) : value
  }
  return Object.freeze(object)
}

const createComplianceTarget = (standard, definitions) =>
  Object.entries(standard).reduce((target, [k]) => {
    target[k] = definitions[k]
    target[k].id = k
    return target
  }, {})

module.exports.createCompliance = async ({ definitions, certification }) => {
  let complianceTarget = createComplianceTarget(
    certification.standards['ITSG-33a'],
    definitions,
  )

  return deepFreeze(complianceTarget)
}
