import { getPRFiles, getPR } from './octokit'
import { check } from './typecheck'
import { runCommand } from './utils'

const BASE_PATH = '/home/ubuntu/dev/beacon/'
const doStuff = async () => {
  const files = await getPRFiles()
  const fileLocations = files.map(file => `${BASE_PATH}${file}`)

  const pr = await getPR()
  const branch = pr.head.ref
  console.log(fileLocations)
  try {
    await runCommand(`cd ${BASE_PATH}; git checkout ${branch}`)
  } finally {
    check(fileLocations)
    await runCommand(`git checkout -`)
  }
}

doStuff().then(() => console.log('done'))
