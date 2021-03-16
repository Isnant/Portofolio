<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-indigo-5" :reveal="true" :reveal-offset="100" elevated>
      <q-toolbar
        color="indigo-5">
        <q-toolbar-title align="center">
            <font color="white" size=4 class="text-bold" style="margin-bottom:50px">SYSTEM FOR EQUIPMENT AND LOCATION</font>
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
