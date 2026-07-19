import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const activationTime = (milliseconds: number): string => {
  return I18nString.i18nString(UiStrings.ActivationTime, {
    PH1: milliseconds,
  })
}

export const copyId = (id: string): string => {
  return I18nString.i18nString(UiStrings.CopyId, {
    PH1: id,
  })
}

export const disable = (): string => {
  return I18nString.i18nString(UiStrings.Disable)
}

export const disableWorkspace = (): string => {
  return I18nString.i18nString(UiStrings.DisableWorkspace)
}

export const extensionApiElectron = (id: string): string => {
  return I18nString.i18nString(UiStrings.ExtensionApiElectron, {
    PH1: id,
  })
}

export const extensionHostProfilingNotAvailable = (): string => {
  return I18nString.i18nString(UiStrings.ExtensionHostProfilingNotAvailable)
}

export const loadingRunningExtensions = (): string => {
  return I18nString.i18nString(UiStrings.LoadingRunningExtensions)
}

export const noRunningExtensions = (): string => {
  return I18nString.i18nString(UiStrings.NoRunningExtensions)
}

export const reportIssue = (): string => {
  return I18nString.i18nString(UiStrings.ReportIssue)
}

export const reportingIssuesForRunningExtensionsNotAvailable = (): string => {
  return I18nString.i18nString(UiStrings.ReportingIssuesForRunningExtensionsNotAvailable)
}

export const ssh = (host: string): string => {
  return I18nString.i18nString(UiStrings.Ssh, {
    PH1: host,
  })
}

export const startExtensionHostProfile = (): string => {
  return I18nString.i18nString(UiStrings.StartExtensionHostProfile)
}

export const takeHeapSnapshot = (): string => {
  return I18nString.i18nString(UiStrings.TakeHeapSnapshot)
}
