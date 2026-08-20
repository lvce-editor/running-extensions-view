import { mergeClassNames, text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getIconVirtualDom } from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

const sshRemotePrefix = 'ssh-remote+'
const undefinedValue = 'undefined'

const activationReasonNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.RunningExtensionActivationReason,
  type: VirtualDomElements.Div,
}

const titleNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.RunningExtensionTitle,
  type: VirtualDomElements.Div,
}

const nameNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.RunningExtensionName,
  type: VirtualDomElements.Strong,
}

const versionNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.RunningExtensionVersion,
  type: VirtualDomElements.Span,
}

const idNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.RunningExtensionId,
  type: VirtualDomElements.Div,
}

const remoteAuthorityNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ClassNames.RunningExtensionId, ClassNames.RunningExtensionRemoteAuthority),
  type: VirtualDomElements.Div,
}

const activationTimeNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.RunningExtensionActivationTime,
  type: VirtualDomElements.Div,
}

const errorStatusNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ClassNames.RunningExtensionStatus, ClassNames.RunningExtensionStatusError),
  type: VirtualDomElements.Div,
}

const terminatedStatusNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ClassNames.RunningExtensionStatus, ClassNames.RunningExtensionStatusTerminated),
  type: VirtualDomElements.Div,
}

const getStatusVirtualDom = (extension: RunningExtension): readonly VirtualDomNode[] => {
  if (extension.status === 'error') {
    return [errorStatusNode, text(RunningExtensionsStrings.errorStatus(extension.error || 'Activation failed'))]
  }
  if (extension.status === 'terminated') {
    return [terminatedStatusNode, text(RunningExtensionsStrings.terminatedStatus(extension.error || 'Extension worker stopped'))]
  }
  return [activationTimeNode, text(RunningExtensionsStrings.activationTime(Math.round(extension.activationTime)))]
}

const getActivationReasonVirtualDom = (activationEvent: string): readonly VirtualDomNode[] => {
  if (!activationEvent) {
    return []
  }
  return [activationReasonNode, text(RunningExtensionsStrings.activationReason(activationEvent))]
}

const getRemoteAuthorityVirtualDom = (remoteAuthority: string | undefined): readonly VirtualDomNode[] => {
  if (!remoteAuthority) {
    return []
  }
  const host = remoteAuthority.startsWith(sshRemotePrefix) ? remoteAuthority.slice(sshRemotePrefix.length) : remoteAuthority
  return [remoteAuthorityNode, text(RunningExtensionsStrings.ssh(host))]
}

const getClassName = (focused: boolean, selected: boolean): string => {
  let className = ClassNames.RunningExtension
  if (focused) {
    className = mergeClassNames(className, ClassNames.FocusOutline)
  }
  if (selected) {
    className = mergeClassNames(className, ClassNames.ExtensionActive)
  }
  return className
}

export const getExtensionVirtualDom = (extension: RunningExtension, focused = false, selected = false): readonly VirtualDomNode[] => {
  const displayName = typeof extension.name === 'string' && extension.name ? extension.name : extension.id
  const displayVersion = typeof extension.version === 'string' && extension.version !== undefinedValue ? extension.version : ''
  const activationReasonDom = getActivationReasonVirtualDom(extension.activationEvent)
  const statusDom = getStatusVirtualDom(extension)
  const remoteAuthorityDom = getRemoteAuthorityVirtualDom(extension.remoteAuthority)
  const className = getClassName(focused, selected)
  return [
    {
      childCount: 3,
      className,
      role: AriaRoles.ListItem,
      type: VirtualDomElements.Li,
    },
    ...getIconVirtualDom(extension),
    {
      childCount: remoteAuthorityDom.length > 0 ? 3 : 2,
      className: ClassNames.RunningExtensionDetails,
      type: VirtualDomElements.Div,
    },
    titleNode,
    nameNode,
    text(displayName),
    versionNode,
    text(displayVersion),
    ...remoteAuthorityDom,
    idNode,
    text(extension.id),
    {
      childCount: activationReasonDom.length > 0 ? 2 : 1,
      className: ClassNames.RunningExtensionActivationDetails,
      type: VirtualDomElements.Div,
    },
    ...statusDom,
    ...activationReasonDom,
  ]
}
