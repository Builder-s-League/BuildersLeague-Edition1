const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    // Only run commands on the staged files
    return [
      buildEslintCommand(filenames),
      `prettier --write ${filenames.join(' ')}`,
    ]
  },
}
