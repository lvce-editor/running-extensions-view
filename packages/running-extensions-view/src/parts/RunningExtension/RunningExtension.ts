export interface RunningExtension {
  readonly activationEvent: string
  readonly activationTime: number
  readonly icon: string
  readonly id: string
  readonly isolated?: boolean
  readonly name: string
  readonly remoteAuthority?: string
  readonly version: string
  readonly workerName?: string
}
