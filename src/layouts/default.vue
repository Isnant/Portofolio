<template>
  <div class="mainClass">
  <q-layout view="hHh Lpr lff">
    <!-- <q-header width="50%" class="mainClass" elevated>
      <q-toolbar
        color="indigo-14">
        <q-btn
          flat
          round
          color="indigo-14"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title shrink>
          <div style="margin-bottom:10px">
            <font size=2 color="indigo-5" style="margin-right:10px">{{userInfo.fullName}}</font>
            <q-btn
              flat
              color="indigo-5"
              round size="sm"
              to="/">
              <q-icon name="account_box" />
              <q-tooltip>Profil</q-tooltip>
            </q-btn>
            <q-btn flat
              color="indigo-5"
              round
              size="sm"
              to="/login" >
              <q-icon name="exit_to_app"/>
              <q-tooltip>Logout</q-tooltip>
            </q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  </div>
</template>

<script src="./js/default.js"></script>
<style>
.my-menu-link {
  color: white;
  background: #f1b672;
}
.menu_right {
  background-color: #040218;
  color: rgb(188, 208, 243);
}
.mainClass {
  background-color:  #061431;
}
</style>
