const { releaseModel } = require('./model')
const chalk = require('chalk')
const log = console.log

const note = message => {
  log(chalk.black.bgGreen('\n\n' + message))
}

const sumArray = (a, c) => a + c

const sumReleaseControls = async results => {
  const checks = results.reduce((accumulator, item) => {
    const verifications = item.controls.verifications
    const keys = Object.keys(verifications)
    const verified = keys.filter(i => {
      return verifications[i].passed
    })

    let passing = 0

    if (verified.length === keys.length) {
      passing++
    }

    return [...accumulator, passing]
  }, [])

  const passing = checks.reduce(sumArray, 0)
  const total = checks.length
  let passed = false

  if (passing === total) {
    passed = true
  }

  return {
    passed,
    passing,
    total,
  }
}

const checkExists = async obj => {
  const result = await releaseModel.find({ release: obj.release }).exec()
  return result
}

const saveReleaseToDB = async obj => {
  const query = { release: obj.release }

  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  // find and update or insert new
  try {
    const result = await releaseModel.findOneAndUpdate(query, obj, options)
    const sum = await sumRelease(obj.release)
    return await Promise.all([result, sum])
  } catch (e) {
    console.log(e.message)
  }
}

const sumRelease = async sha => {
  const results = await unwindReleaseControls(sha)
  const totals = await sumReleaseControls(results)
  updateRelease(sha, totals)
}

const getAllReleases = async () => {
  note('=== get all releases ===')
  const result = await releaseModel
    .aggregate([
      { $match: {} },
      {
        $project: {
          release: 1,
          timestamp: '$createdAt',
          passed: 1,
          passing: 1,
          total: 1,
        },
      },
    ])
    .exec()

  return result
}

const getReleaseControls = async sha => {
  note('=== get release controls ===')
  const result = await releaseModel
    .aggregate([
      { $match: { release: sha } },
      {
        $project: {
          release: 1,
          timestamp: '$createdAt',
          controls: 1,
          passed: 1,
          passing: 1,
          total: 1,
        },
      },
      { $limit: 1 },
    ])
    .exec()

  console.log(result)

  return result[0]
}

const getControl = async control => {
  note(`=== get control ===`)
  const result = await releaseModel
    .aggregate([
      { $unwind: '$controls' },
      { $match: { 'controls.control': control } },
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    .exec()

  console.log(result)
}

const getReleaseControl = async (control, release) => {
  note(` === get release control ===`)
  const result = await releaseModel
    .aggregate([
      { $unwind: '$controls' },
      { $match: { 'controls.control': control, release } },
      {
        $sort: {
          _id: -1,
        },
      },
    ])
    .exec()

  console.log(result)
}

const unwindReleaseControls = async sha => {
  return await releaseModel
    .aggregate([{ $match: { release: sha } }, { $unwind: '$controls' }])
    .exec()
}

// update release with totals
const updateRelease = async (sha, { passing, passed, total }) => {
  console.log(`release ${sha} =>  ${passing} of ${total}`)

  return await releaseModel
    .findOneAndUpdate(
      { release: sha },
      {
        passing: passing,
        total: total,
        passed: passing === total ? true : false,
      },
      err => {
        if (err) {
          console.log(err.message)
        }
      },
    )
    .exec()
}

module.exports = {
  sumRelease,
  getAllReleases,
  getReleaseControls,
  checkExists,
  saveReleaseToDB,
}
