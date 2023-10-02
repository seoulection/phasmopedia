import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import {
  FiltersContext,
  FiltersDispatchContext,
} from '@/contexts/FiltersContext'
import { INITIAL_FILTERS } from '@static/common'

type Overrides = {
  dispatchHandler?: () => void
  filterOverrides?: object
}

function contextRender(
  ui: ReactNode,
  {
    dispatchHandler = jest.fn(),
    filterOverrides = INITIAL_FILTERS,
  }: Overrides = {
    dispatchHandler: jest.fn(),
    filterOverrides: INITIAL_FILTERS,
  },
) {
  return render(
    <FiltersContext.Provider value={{ ...INITIAL_FILTERS, ...filterOverrides }}>
      <FiltersDispatchContext.Provider value={dispatchHandler}>
        {ui}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>,
  )
}

export * from '@testing-library/react'
export { contextRender }
