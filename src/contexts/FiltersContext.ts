import { createContext } from 'react'
import { INITIAL_FILTERS } from '../../static/common'

export const FiltersContext = createContext(INITIAL_FILTERS)
// eslint-disable-next-line
export const FiltersDispatchContext = createContext<any>(null)
