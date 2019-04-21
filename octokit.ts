import * as Octokit from '@octokit/rest'
import { runCommand } from './utils'

const githubAuth = {
  clientId: '97c98e94d5fbc82dcdeb',
  clientSecret: 'c88577737d7414966192544d90c88ec65f8bb271',
}

const github = new Octokit(githubAuth)

const owner = 'g2jose'
const repo = 'beacon'
const prNumber = 2

const getPRDiff = async (pull_number = prNumber) => {
  const response = await github.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: {
      format: 'diff',
    },
  })
  return response.data
}

export const getPRFiles = async (pull_number = prNumber) => {
  const response = await github.pulls.listFiles({
    owner,
    repo,
    pull_number,
  })
  return response.data.map(({ filename }) => filename)
}

export const getPR = async (pull_number = prNumber) => {
  const response = await github.pulls.get({
    owner,
    repo,
    pull_number,
  })
  return response.data
}

const doStuff = async () => {
  return await getPRFiles()
}
doStuff().then(console.log)
