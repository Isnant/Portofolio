<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-cyan" :reveal="true" :reveal-offset="100" elevated>
      <q-toolbar
        color="cyan">
        <q-toolbar-title align="center">
          ENGINEERING ASSET MANAGEMENT SYSTEM
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
