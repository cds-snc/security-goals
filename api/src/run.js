// node run.js
const { promises: fs } = require('fs')
const path = require('path')
const cpFile = require('cp-file')
const rimraf = require('rimraf')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const delay = (max = 100, min = 5000) => {
  const num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}

const getFileInfo = filename => {
  const name = path.parse(filename).name // hello
  const ext = path.parse(filename).ext
  return { name, ext }
}

const getFiles = async dirname => {
  const files = await fs.readdir(dirname)
  return files.filter(f => getFileInfo(f).ext === '.json')
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const showFiles = async (dirname, target) => {
  try {
    const files = await getFiles(dirname)

    console.log(`run => found ${files.length} files`)
    rimraf(`${target}/*`, () => {
      asyncForEach(files, async file => {
        await sleep(delay())
        await cpFile(`${dirname}/${file}`, `${target}/${file}`)
      })
    })
  } catch (e) {
    console.log(e)
    process.exit()
  }
}

const dir = '__tests__/testData/'

showFiles(`${dir}/checks3`, `${dir}/checks4`)
