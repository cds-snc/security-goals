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
    //target[k].verifications = []
    return target
  }, {})

const addControlsWithVerifications = (checks, target, definitions) => {
  return checks.reduce((status, check) => {
    check.satisfies.forEach(ctl => {
      if (status[ctl]) {
        /*
        if (status[ctl].verifications) {
          status[ctl].verifications = [...status[ctl].verifications, check]
        } else {
          status[ctl].verifications = [check]
        }
        */
      } else {
        status[ctl] = definitions[ctl]
        //status[ctl].verifications = [check]
        status[ctl].id = ctl
      }
    })
    return status
  }, target)
}

module.exports.createCompliance = async ({
  definitions,
  checks,
  certification,
}) => {
  let complianceTarget = createComplianceTarget(
    certification.standards['ITSG-33a'],
    definitions,
  )

  let complianceStatus = addControlsWithVerifications(
    checks,
    complianceTarget,
    definitions,
  )

  return deepFreeze(complianceStatus)
}
