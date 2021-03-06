/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk')  // eslint-disable-line
const path = require('path')

// const msgPath = process.env.GIT_PARAMS
const msgPath = path.resolve('.git', 'COMMIT_EDITMSG')
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?!?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`,
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${chalk.green(`feat: commit message`)}\n` +
      `    ${chalk.green(`fix(v-model): fix v-model bug`)}\n\n` +
      chalk.red(`  See docs/git/git_commit_standard.md for more details.\n`) +
      chalk.red(
        `  You can also use ${chalk.cyan(
          `npm run commit`,
        )} to interactively generate a commit message.\n`,
      ),
  )
  process.exit(1)
}
