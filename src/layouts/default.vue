<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'">
        <q-btn
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          ENGINEERING ASSET MANAGEMENT SYSTEM
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      overlay
      :breakpoint="2000"
    >
      <q-scroll-area class="fit">
        <q-btn
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
          <q-item to="/" style="margin: 50px 0 10px 0">
            <q-item-side icon="check_circle" color="primary"/>
            <q-item-main label="Active Asset" />
          </q-item>
          <q-item to="/Inactive" tyle="margin: 0 0 10px 0">
            <q-item-side icon="highlight_off" color="negative"/>
            <q-item-main label="Inactive Asset" />
          </q-item>
          <q-item to="/UploadNode">
            <q-item-side icon="far fa-file-excel" color="positive"/>
            <q-item-main label="Upload Node" />
          </q-item>
           <q-item to="/Node">
            <q-item-side icon="far fa-file-excel" color="positive"/>
            <q-item-main label="FIBERNODE" />
          </q-item>
      </q-scroll-area>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'default',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
  },
};
</script>

<style>
</style>
