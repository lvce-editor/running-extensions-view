export interface RunningExtension {
  readonly activationEvent: string
  readonly activationTime: number
  readonly error?: string
  readonly icon: string
  readonly id: string
  readonly isolated?: boolean
  readonly name?: unknown
  readonly remoteAuthority?: string
  readonly repository?: string
  readonly status?: 'error' | 'running' | 'terminated'
  readonly version?: unknown
  readonly workerName?: string
}
