<template>
  <v-app>
    <main-toolbar :show-time-range="false" :show-filters="true">

    </main-toolbar>

    <v-content style="height:100%">
        <div class="map-container">
          <my-awesome-map
            :mapmarker-items="mapMarkerItems"
            :on-marker-click="selectPlace"
            :on-map-click="onMapClickCallback"
            :initial-zoom="zoom"
            :initial-center="center"
            :save-position="true"
            :use-fly-animation="false"
          >
          </my-awesome-map>
        </div>

        <place-search-table
          v-show="!tableMinimized && term.length > 0 && (meta.totalCount || ctnFilter || depFilter)"
          :select-item-callback="selectPlaceOnMap"
        >
          <v-btn
            depressed small
            @click="hideTable"
            class="toggle-table grey lighten-3 text-center"
          >
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </place-search-table>

          <v-btn
            v-if="tableMinimized"
            depressed small
            @click="showTable"
            class="toggle-table toggle-table-up elevation-5 grey lighten-3 text-center"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>

        <place-card v-if="selectedPlace"
          :place-id="selectedPlace.id"
          :key="selectedPlace.id"
          :popup="true">
        </place-card>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'

import PlaceSearchTable from '../PlaceSearchTable'
import MainToolbar from '../ui/MainToolbar'

export default {
  name: 'HomePage',
  components: {
    MainToolbar,
    PlaceSearchTable,
    'MyAwesomeMap': () => import(/* webpackChunkName: "map-component" */ '../MyAwesomeMap'),
    'PlaceCard': () => import(/* webpackChunkName: "card-component" */ '../PlaceCard')
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // access to component instance via `vm`
      // console.log('BEFORE@', from, vm.selectedItem)
      if (vm.selectedItem && from.name === 'place') {
        vm.selectPlace(vm.selectedItem)
      } else {
        vm.unselectPlace()
      }
      next()
    })
  },
  data () {
    return {

    }
  },
  mounted () {
    // this.unselectPlace()
    this.inputTerm = this.term
  },
  methods: {
    ...mapActions('places', ['fetchPlace', 'searchPlace', 'clearAll', 'selectPreviousAggPage', 'recordCurrentAggPage']),
    ...mapActions('places', ['selectPlace', 'unselectPlace']),
    ...mapActions('searchParameters', ['setTableMinimized']),
    selectPlaceOnMap (obj) {
      if (obj) {
        this.selectPlace(obj)
      } else {
        this.unselectPlace()
      }
    },
    onMapClickCallback () {
    },
    showTable () {
      this.setTableMinimized(false)
    },
    hideTable () {
      this.setTableMinimized(true)
    }
  },
  computed: {
    ...mapState('mapmarkers', { 'mapMarkerItems': 'items' }),
    ...mapState('places', { selectedPlace: 'selectedItem', meta: 'meta' }),
    ...mapState('searchParameters', ['tableMinimized', 'term', 'range', 'includeOldLabels', 'groupbyPlace', 'minTermLength', 'zoom', 'center', 'ctnFilter', 'depFilter'])
  }
}
</script>

<style scoped>
  .map-container {
    width: 100%;
    height: calc(100vh - 64px) !important;
    position: absolute;
  }

  .toggle-table-up {
    position: fixed;
    bottom: 0;
    margin: auto;
    /* z-index: 1000; */
    left: calc(50% - 35px);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .toggle-table {
    width: 70px;
    height: 36px;
  }

  html, body {
    overflow-y: hidden;
    height: 100%;
  }
</style>
