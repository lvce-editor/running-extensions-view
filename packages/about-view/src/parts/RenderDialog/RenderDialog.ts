import type { AboutState } from '../AboutState/AboutState.ts'
import * as CreateViewModel from '../CreateViewModel/CreateViewModel.ts'
import * as GetAboutVirtualDom from '../GetAboutVirtualDom/GetAboutVirtualDom.ts'

export const renderDialog = (oldState: AboutState, newState: AboutState): readonly any[] => {
  const viewModel = CreateViewModel.createViewModel(newState)
  const dom = GetAboutVirtualDom.getAboutVirtualDom(
    viewModel.productName,
    viewModel.lines,
    viewModel.closeMessage,
    viewModel.okMessage,
    viewModel.copyMessage,
    viewModel.infoMessage,
  )
  return ['Viewlet.setDom2', dom]
}
