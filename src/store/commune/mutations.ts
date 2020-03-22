import { MutationTree } from 'vuex'
import Vue from 'vue'

import { CommuneState, InseeRefObject } from '@/store/commune/types'
export function getDefaultState (): CommuneState {
  return {
    commune: {},
    region: undefined,
    canton: undefined,
    departement: undefined,
    arrondissement: undefined
  }
};

export const mutations: MutationTree<CommuneState> = {
  setCommune (state: CommuneState, t) {
    state.commune = Object.assign({}, state.commune, t)
  },
  setCanton (state: CommuneState, t) {
    state.canton = Object.assign({}, state.region, t)
  },
  setRegion (state: CommuneState, t) {
    state.region = Object.assign({}, state.region, t)
  },
  setArrondissement (state: CommuneState, t) {
    console.log('setting arr', state, t)
    state.arrondissement = Object.assign({}, state.arrondissement, t)
  },
  setDepartement (state: CommuneState, t) {
    state.departement = Object.assign({}, state.departement, t)
  }
}
