import { mergeClassNames, text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { getIconVirtualDom } from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

const sshRemotePrefix = 'ssh-remote+'

const getRemoteAuthorityVirtualDom = (remoteAuthority: string | undefined, index?: number): readonly VirtualDomNode[] => {
  if (!remoteAuthority) {
    return []
  }
  const host = remoteAuthority.startsWith(sshRemotePrefix) ? remoteAuthority.slice(sshRemotePrefix.length) : remoteAuthority
  return [
    {
      childCount: 1,
      className: mergeClassNames('RunningExtensionId', 'RunningExtensionRemoteAuthority'),
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(RunningExtensionsStrings.ssh(host)),
  ]
}

export const getExtensionVirtualDom = (extension: RunningExtension, index?: number): readonly VirtualDomNode[] => {
  const displayName = extension.name || extension.id
  const remoteAuthorityDom = getRemoteAuthorityVirtualDom(extension.remoteAuthority, index)
  return [
    {
      childCount: 3,
      className: 'RunningExtension',
      'data-index': index,
      role: AriaRoles.ListItem,
      type: VirtualDomElements.Div,
    },
    ...getIconVirtualDom(extension, index),
    {
      childCount: remoteAuthorityDom.length > 0 ? 3 : 2,
      className: 'RunningExtensionDetails',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'RunningExtensionTitle',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'RunningExtensionName',
      'data-index': index,
      type: VirtualDomElements.Strong,
    },
    text(displayName),
    {
      childCount: 1,
      className: 'RunningExtensionVersion',
      'data-index': index,
      type: VirtualDomElements.Span,
    },
    text(extension.version),
    ...remoteAuthorityDom,
    {
      childCount: 1,
      className: 'RunningExtensionId',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(extension.id),
    {
      childCount: 1,
      className: 'RunningExtensionActivationTime',
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(RunningExtensionsStrings.activationTime(Math.round(extension.activationTime))),
  ]
}
