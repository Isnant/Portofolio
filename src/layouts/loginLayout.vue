<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-indigo-2" :reveal="true" :reveal-offset="100" elevated>
      <q-toolbar
        color="indigo-3">
        <q-toolbar-title align="center">
          <div align="center">
            <img src="statics/sealhead4.png"  class="responsive"  width="900px">
          </div>
            <!-- <font color="white" size=4 class="text-bold" style="margin-bottom:50px">SYSTEM FOR EQUIPMENT AND LOCATION</font> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script src="./js/loginLayout.js"></script>

<style>
</style>
