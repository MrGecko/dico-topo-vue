import {ActionTree} from 'vuex';
import {PlacenameState, Placename} from './types';
import {RootState} from '../types';
import {api} from "@/utils/http-common";
import {ApiResponse} from "apisauce";


export const actions: ActionTree<PlacenameState, RootState> = {
  searchPlacename({commit, rootState}, {query, pageSize, pageNumber}): any {
    commit('setLoading', true)
    const index = `${process.env.VUE_APP_PLACENAME_INDEX}`
    const maxPageSize: number = process.env.VUE_APP_PLACENAME_INDEX_PAGE_SIZE
    const searchPageSize = pageSize > maxPageSize || pageSize === -1 ? maxPageSize: pageSize
    const searchPageNumber = pageNumber > 0 ? pageNumber : 1
    return api.get(`/search?query=label:${query}&index=${index}&sort=label.keyword&page[size]=${searchPageSize}&page[number]=${searchPageNumber}`)
      .then((res: ApiResponse<any>) => {
        const {ok, data} = res;
        if (ok) {
          const items : Array<Placename> = data.data.map((p: any) => {
            const longlat: any = p.attributes["longlat"]
            let coords: [number, number] = longlat ? longlat.substr(1, longlat.length - 2).split(',') : null
            return {
              id: p.id,
              label: p.attributes["placename-label"],
              description: p.attributes["desc"],
              comment: p.attributes["comment"],

              insee_code: p.attributes["localization-insee-code"],
              department: p.attributes["dpt"],
              region: p.attributes["region"],

              coordinates: coords,
              geoname_id: p.attributes["geoname-id"],
              wikidata_item_id: p.attributes["wikidata-item-id"],
              wikipedia_url:  p.attributes["wikipedia-url"],
              databnf_ark: p.attributes["databnf-ark"],
              viaf_id: p.attributes["viaf-id"]
            }
          })
          commit('setItems', {p: items, links: data.links, meta: {totalCount: data.meta["total-count"]}})
        } else {
          commit('setError', data)
          commit('setLoading', false)
        }
        commit('setLoading', false)
      })
      .catch((error: any) => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
  }
};