import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'

export interface RunningExtensionsState {
  readonly assetDir: string
  readonly extensions: readonly RunningExtension[]
  readonly focusedIndex: number
  readonly height: number
  readonly loaded: boolean
  readonly platform: number
  readonly uid: number
  readonly width: number
  readonly x: number
  readonly y: number
}
