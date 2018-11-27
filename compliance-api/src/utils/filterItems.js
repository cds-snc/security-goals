const filterItems = (root, passed = undefined) => {
  return Object.entries(root).reduce((controls, [_k, v]) => {
    let items = v.verifications.filter(
      ver => (typeof passed !== 'undefined' ? ver.passed == passed : true),
    )
    if (items.length > 0) {
      return [...controls, v]
    } else {
      return controls
    }
  }, [])
}

module.exports.filterItems = filterItems
