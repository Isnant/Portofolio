<template>
  <div class="q-pa-md">
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-indigo-5" elevated>
      <q-toolbar
        color="indigo-10">
        <q-btn
          flat
          round
          color="orange-4"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <font color="white" size=3 class="text-bold">ENGINEERING ASSET MANAGEMENT SYSTEM</font>
        </q-toolbar-title>
        <q-toolbar-title shrink>
          <font size=2 style="margin-right:10px">{{userInfo.fullName}}</font>
           <q-btn-dropdown rounded size="sm" color="indigo-5">
            <q-list>
              <q-item clickable v-close-popup >
                <q-item-section>
                  <q-btn color="indigo-8" round size="sm">
                    <q-icon name="account_box" />
                    <q-tooltip>Profil</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/login">
                <q-item-section>
                  <q-btn color="indigo-8" round size="sm">
                    <q-icon name="exit_to_app" />
                    <q-tooltip>Logout</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="menu_right"
      bordered
      :breakpoint="500"
    >
     <q-scroll-area class="fit">
      <q-list padding class="menu-list" style="margin-top:10px">
        <!-- <div align="right" style="margin-left:40px;margin-top:10px;margin-right:40px;margin-bottom:10px;width:220px">
          <q-separator color="grey-2"/>
        </div> -->
        <div align="right" style="margin-left:20px;margin-bottom:20px;width:250px">
          <q-separator color="orange-4"/>
          <q-separator color="orange-4"/>
          <q-separator color="orange-4"/>
        </div>
        <!-- <div align="right" style="margin-left:40px;margin-top:10px;margin-right:40px;margin-bottom:20px;width:220px">
          <q-separator color="purple-4"/>
        </div> -->
        <q-item to="/fieldEq" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="fas fa-road" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Field Equipment</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/indoorEq" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="fas fa-building" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Indoor Equipment</q-item-label>
          </q-item-section>
        </q-item>
         <q-item to="/networkEq" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="fas fa-network-wired" />
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
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Master Area</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mHubCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Master Hub Code</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mHubRoom"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Master Hub Room</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mBuild"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Master Building</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mPtst"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Product Type - Sub Type</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mManBran"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Manufacturer - Brand</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mBdf"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Master BDF</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mPSeries"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Master Product Series</q-item-label>
            </q-item-section>
          </q-item>
           <q-item
            to="/mNodeCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Node Code</q-item-label>
            </q-item-section>
          </q-item>
           <q-item
            to="/mPsCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Power Supply Code</q-item-label>
            </q-item-section>
          </q-item>
           <q-item
            to="/mAmplifierCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Amplifier Code</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mOthers"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section>
              <q-item-label>Others</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
      </q-scroll-area>
    </q-drawer>
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
  background: #4d79ff;
}
.menu_right {
  background-color: #040218;
  color: white;
}
</style>
