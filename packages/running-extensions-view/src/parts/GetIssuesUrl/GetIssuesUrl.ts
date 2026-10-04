const gitSuffixRegex = /\.git$/

export const getIssuesUrl = (repository: unknown): string => {
  if (typeof repository !== 'string' || !URL.canParse(repository)) {
    return ''
  }
  const url = new URL(repository)
  if (url.protocol !== 'https:' || url.hostname !== 'github.com') {
    return ''
  }
  const [owner, repositoryWithSuffix] = url.pathname.split('/').filter(Boolean)
  if (!owner || !repositoryWithSuffix) {
    return ''
  }
  const repositoryName = repositoryWithSuffix.replace(gitSuffixRegex, '')
  if (!repositoryName) {
    return ''
  }
  return `https://github.com/${owner}/${repositoryName}/issues`
}
