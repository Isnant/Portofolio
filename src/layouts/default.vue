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
        <q-toolbar-title shrink>
          {{userInfo.fullName}} [{{userInfo.department}}]
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
        <q-item to="/fieldEq">
          <q-item-section avatar>
            <q-icon name="fas fa-road" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Field Equipment</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/indoorEq">
          <q-item-section avatar>
            <q-icon name="fas fa-building" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Indoor Equipment</q-item-label>
          </q-item-section>
        </q-item>
         <q-item to="/networkEq">
          <q-item-section avatar>
            <q-icon name="fas fa-building" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Network Equipment</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="fas fa-database"
          label="Master Data"
          default-opened
        >
          <q-item
            to="/mAreaRegion"
            :inset-level="1"
          >
            <q-item-section>
              <q-item-label>Master Area</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mBuild"
            :inset-level="1"
          >
            <q-item-section>
              <q-item-label>Master Building</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mPtst"
            :inset-level="1"
          >
            <q-item-section>
              <q-item-label>Product Type - Sub Type</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mManBran"
            :inset-level="1"
          >
            <q-item-section>
              <q-item-label>Manufacturer - Brand</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mPSeries"
            :inset-level="1"
          >
            <q-item-section>
              <q-item-label>Master Product Series</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script src="./js/default.js"></script>

<style>
</style>
