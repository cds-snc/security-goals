export const getControls = (data) => {
  const controls = data.reduce((acc, row) => {
    return acc.concat(row.controls.map((i) => i.control));
  }, [])
  return [...new Set(controls)]
}


export const setInitialWeight = (controls) => {
  let weighted = {};
  controls.forEach((control) => weighted[control] = 1);
  
  const ordered = {};
  Object.keys(weighted).sort().forEach(function(key) {
    ordered[key] = weighted[key];
  })

  return ordered;
}