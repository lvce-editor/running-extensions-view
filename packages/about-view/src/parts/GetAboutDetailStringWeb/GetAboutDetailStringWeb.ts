import { commit } from '../Commit/Commit.ts'
import { commitDate } from '../CommitDate/CommitDate.ts'
import * as FormatAboutDate from '../FormatAboutDate/FormatAboutDate.ts'
import * as GetBrowser from '../GetBrowser/GetBrowser.ts'
import { version } from '../Version/Version.ts'

export const getDetailStringWeb = (): readonly string[] => {
  const now = Date.now()
  const formattedDate = FormatAboutDate.formatAboutDate(commitDate, now)
  const browser = GetBrowser.getBrowser()
  const lines = [`Version: ${version}`, `Commit: ${commit}`, `Date: ${formattedDate}`, `Browser: ${browser}`]
  return lines
}
