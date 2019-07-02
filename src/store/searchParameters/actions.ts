import {ActionTree} from 'vuex';
import {QueryState, SortableField} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<QueryState, RootState> = {
  setTerm({commit, state, rootState}, t): any {
    commit('setTerm', t)
  },
  setIncludeOldLabels({commit, state, rootState}, t): any {
    commit('setIncludeOldLabels', t)
  },
  setGroupbyPlacename({commit, state, rootState}, t): any {
    commit('setGroupbyPlacename', t)
  },
  addSortField({commit, state, rootState}, {field, order}): any {
    commit('addSortField', {field, order});
  },
  updateSortField({commit, state, rootState}, {field, order}): any {
    commit('updateSortField', {field, order});
  },
  removeSortField({commit, state, rootState}, field): any {
    commit('removeSortField', field)
  },
  setFilter({commit, state, rootState}, {filter, value}): any {
    switch (filter) {
      case "department":
        commit('setDepFilter', value);
        break;
    }
  },
};