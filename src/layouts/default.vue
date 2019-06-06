<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :reveal="true" :reveal-offset="100" elevated>
      <q-toolbar
        color="primary">
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
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      overlay
      bordered
      :breakpoint="2000"
    >
      <q-list>
        <q-item to="/">
          <q-item-section avatar>
            <q-icon name="check_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Active Asset</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Inactive">
          <q-item-section avatar>
            <q-icon name="highlight_off" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inactive Asset</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'default',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
