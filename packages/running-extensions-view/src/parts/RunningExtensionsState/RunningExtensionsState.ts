import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

export interface RunningExtensionsState {
  readonly extensions: readonly RunningExtension[]
  readonly height: number
  readonly loaded: boolean
  readonly uid: number
  readonly width: number
  readonly x: number
  readonly y: number
}
