const { releaseModel } = require('./model')
const chalk = require('chalk')
const log = console.log

const note = message => {
  // @ts-ignore
  log(chalk.black.bgGreen('\n\n' + message))
}

const getControl = async control => {
  note(`=== get control ===`)

  // @todo update this query to target single release
  // add => { $match: { 'controls.control': control, release } },

  const result = await releaseModel
    .aggregate([
      { $unwind: '$controls' },
      { $match: { 'controls.control': control } },
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
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    .exec()

  return result
}

// SAVE ==========================================

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
    const result = await releaseModel.findOneAndUpdate(
      query,
      obj,
      options,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }

        console.log('save release', result.updatedAt)
      },
    )
    const sum = await sumRelease(obj.release)
    return await Promise.all([result, sum])
  } catch (e) {
    console.log(e.message)
  }
}

const unwindReleaseControls = async sha => {
  return releaseModel
    .aggregate([{ $match: { release: sha } }, { $unwind: '$controls' }])
    .exec()
}

const sumRelease = async sha => {
  const results = await unwindReleaseControls(sha)
  const totals = await sumReleaseControls(results)
  updateRelease(sha, totals)
}

// update release with totals
const updateRelease = async (sha, { passing, total }) => {
  console.log(`updated ${sha} =>  ${passing} of ${total} passing`)

  return releaseModel
    .findOneAndUpdate(
      { release: sha },
      {
        passing: passing,
        total: total,
        passed: passing === total,
      },
      (err, results) => {
        if (err) {
          console.log(err.message)
        }

        console.log('sum updated', results.updatedAt)
      },
    )
    .exec()
}

module.exports = {
  getControl,
  sumRelease,
  checkExists,
  saveReleaseToDB,
}
