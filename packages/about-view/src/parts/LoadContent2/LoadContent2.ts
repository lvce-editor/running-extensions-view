import type { AboutState } from '../AboutState/AboutState.ts'
import * as AboutFocusId from '../AboutFocusId/AboutFocusId.ts'
import { commit } from '../Commit/Commit.ts'
import { commitDate } from '../CommitDate/CommitDate.ts'
import * as FormatAboutDate from '../FormatAboutDate/FormatAboutDate.ts'
import * as GetAboutDetailStringWeb from '../GetAboutDetailStringWeb/GetAboutDetailStringWeb.ts'
import * as GetBrowser from '../GetBrowser/GetBrowser.ts'
import * as LoadConfig from '../LoadConfig/LoadConfig.ts'
import { version } from '../Version/Version.ts'

interface Content {
  readonly lines: readonly string[]
  readonly productName: string
}

const getContentFromConfig = async (state: AboutState): Promise<Content> => {
  const now = Date.now()
  try {
    const config = await LoadConfig.loadConfig(state)
    const resolvedVersion = config.version || version
    const resolvedCommit = config.commit || commit
    const resolvedDate = config.date || commitDate
    const formattedDate = FormatAboutDate.formatAboutDate(resolvedDate, now)
    const browser = GetBrowser.getBrowser()
    return {
      lines: [`Version: ${resolvedVersion}`, `Commit: ${resolvedCommit}`, `Date: ${formattedDate}`, `Browser: ${browser}`],
      productName: config.productName || state.productName,
    }
  } catch {
    return {
      lines: GetAboutDetailStringWeb.getDetailStringWeb(),
      productName: state.productName,
    }
  }
}

export const loadContent2 = async (state: AboutState): Promise<AboutState> => {
  const content = state.useNewLoadConfig
    ? await getContentFromConfig(state)
    : {
        lines: GetAboutDetailStringWeb.getDetailStringWeb(),
        productName: state.productName,
      }
  return {
    ...state,
    focusId: AboutFocusId.Ok,
    lines: content.lines,
    productName: content.productName,
  }
}
