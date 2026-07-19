import { expect, test } from '@jest/globals'
import * as RunningExtensionsStrings from '../src/parts/RunningExtensionsStrings/RunningExtensionsStrings.ts'

test('activationTime', () => {
  expect(RunningExtensionsStrings.activationTime(13)).toBe('Activation: 13ms')
})

test('copyId', () => {
  expect(RunningExtensionsStrings.copyId('sample.extension')).toBe('Copy id (sample.extension)')
})

test('disable', () => {
  expect(RunningExtensionsStrings.disable()).toBe('Disable')
})

test('disableWorkspace', () => {
  expect(RunningExtensionsStrings.disableWorkspace()).toBe('Disable (Workspace)')
})

test('extensionApiElectron', () => {
  expect(RunningExtensionsStrings.extensionApiElectron('sample.extension')).toBe('Extension API (Electron): sample.extension')
})

test('extensionHostProfilingNotAvailable', () => {
  expect(RunningExtensionsStrings.extensionHostProfilingNotAvailable()).toBe('Extension host profiling is not available yet.')
})

test('loadingRunningExtensions', () => {
  expect(RunningExtensionsStrings.loadingRunningExtensions()).toBe('Loading running extensions…')
})

test('noRunningExtensions', () => {
  expect(RunningExtensionsStrings.noRunningExtensions()).toBe('No running extensions')
})

test('reportIssue', () => {
  expect(RunningExtensionsStrings.reportIssue()).toBe('Report Issue')
})

test('reportingIssuesForRunningExtensionsNotAvailable', () => {
  expect(RunningExtensionsStrings.reportingIssuesForRunningExtensionsNotAvailable()).toBe(
    'Reporting issues for running extensions is not available yet.',
  )
})

test('ssh', () => {
  expect(RunningExtensionsStrings.ssh('remote.example.com')).toBe('SSH: remote.example.com')
})

test('startExtensionHostProfile', () => {
  expect(RunningExtensionsStrings.startExtensionHostProfile()).toBe('Start Extension Host Profile')
})

test('takeHeapSnapshot', () => {
  expect(RunningExtensionsStrings.takeHeapSnapshot()).toBe('Take Heap Snapshot')
})
