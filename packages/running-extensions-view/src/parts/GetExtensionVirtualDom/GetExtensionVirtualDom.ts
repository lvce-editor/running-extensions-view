import { mergeClassNames, text, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { RunningExtension } from '../RunningExtension/RunningExtension.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getIconVirtualDom } from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as RunningExtensionsStrings from '../RunningExtensionsStrings/RunningExtensionsStrings.ts'

const sshRemotePrefix = 'ssh-remote+'

const getActivationReasonVirtualDom = (activationEvent: string, index?: number): readonly VirtualDomNode[] => {
  if (!activationEvent) {
    return []
  }
  return [
    {
      childCount: 1,
      className: ClassNames.RunningExtensionActivationReason,
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(RunningExtensionsStrings.activationReason(activationEvent)),
  ]
}

const getRemoteAuthorityVirtualDom = (remoteAuthority: string | undefined, index?: number): readonly VirtualDomNode[] => {
  if (!remoteAuthority) {
    return []
  }
  const host = remoteAuthority.startsWith(sshRemotePrefix) ? remoteAuthority.slice(sshRemotePrefix.length) : remoteAuthority
  return [
    {
      childCount: 1,
      className: mergeClassNames(ClassNames.RunningExtensionId, ClassNames.RunningExtensionRemoteAuthority),
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(RunningExtensionsStrings.ssh(host)),
  ]
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

export const getExtensionVirtualDom = (extension: RunningExtension, index?: number, focused = false, selected = false): readonly VirtualDomNode[] => {
  const displayName = extension.name || extension.id
  const activationReasonDom = getActivationReasonVirtualDom(extension.activationEvent, index)
  const remoteAuthorityDom = getRemoteAuthorityVirtualDom(extension.remoteAuthority, index)
  const className = getClassName(focused, selected)
  return [
    {
      childCount: 3,
      className,
      'data-index': index,
      role: AriaRoles.ListItem,
      type: VirtualDomElements.Div,
    },
    ...getIconVirtualDom(extension, index),
    {
      childCount: remoteAuthorityDom.length > 0 ? 3 : 2,
      className: ClassNames.RunningExtensionDetails,
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.RunningExtensionTitle,
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.RunningExtensionName,
      'data-index': index,
      type: VirtualDomElements.Strong,
    },
    text(displayName),
    {
      childCount: 1,
      className: ClassNames.RunningExtensionVersion,
      'data-index': index,
      type: VirtualDomElements.Span,
    },
    text(extension.version),
    ...remoteAuthorityDom,
    {
      childCount: 1,
      className: ClassNames.RunningExtensionId,
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(extension.id),
    {
      childCount: activationReasonDom.length > 0 ? 2 : 1,
      className: ClassNames.RunningExtensionActivationDetails,
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.RunningExtensionActivationTime,
      'data-index': index,
      type: VirtualDomElements.Div,
    },
    text(RunningExtensionsStrings.activationTime(Math.round(extension.activationTime))),
    ...activationReasonDom,
  ]
}
