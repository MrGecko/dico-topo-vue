// profile/getters.ts
import { GetterTree } from 'vuex'
import { BiblState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<BiblState, RootState> = {
  getCanvasIndex: (state) => (numPage: number) => {
    const pageOne : any = state.bibl ? state.bibl.gallica_page_one.split('.')[0].substr(1) : 0
    return (parseInt(pageOne) - 1) + (numPage - 1)
  },
  getComputedBiblRef: (state) => (numPage: number) => {
    return state.bibl ? `${state.bibl.abbr}, p. ${numPage}.` : null
  },
  getGallicaLink: (state, getters) => (numPage: number) => {
    const idx = getters.getCanvasIndex(numPage) + 1
    return state.bibl ? `https://gallica.bnf.fr/${state.bibl.gallica_ark}/f${idx}.image` : null
  }
}
