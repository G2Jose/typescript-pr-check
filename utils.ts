const util = require('util')
const childProcess = require('child_process')

const exec = util.promisify(childProcess.exec)

export const runCommand = async cmd => {
  const { stdout = '', stderr } = await exec(cmd)
  if (stderr) {
    throw stderr
  }
  return stdout.replace('\n', '').trim()
}
