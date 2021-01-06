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
        <q-item to="/fieldEq" active-class="my-menu-link" v-show="menu.fieldEquipment">
          <q-item-section avatar>
            <q-icon name="fas fa-road" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Field Equipment</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/indoorEq" active-class="my-menu-link" v-show="menu.indoorEquipment">
          <q-item-section avatar>
            <q-icon name="fas fa-building" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Indoor Equipment</q-item-label>
          </q-item-section>
        </q-item>
         <q-item to="/networkEq" active-class="my-menu-link" v-show="menu.networkEquipmet">
          <q-item-section avatar>
            <q-icon name="fas fa-network-wired" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Network Equipment</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/migrationHistory" active-class="my-menu-link" v-show="menu.migrationHistory">
          <q-item-section avatar>
            <q-icon name="grading" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Migration History</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/hierarchy" active-class="my-menu-link" v-show="menu.fieldHierarchy">
          <q-item-section avatar>
            <q-icon name="account_tree" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Field Hierarchy</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/logBatch" active-class="my-menu-link" v-show="menu.equipmentUploadLog">
          <q-item-section avatar>
            <q-icon name="app_settings_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Upload Log Batch</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="fas fa-database"
          label="Master Data"
          v-show="menu.masterData"
        >
          <q-item
            to="/mAreaRegion"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Area</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mHubCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Hub Code</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mHubRoom"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Hub Room</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mHubCodeService"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Hub Code Service</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mPtst"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Product Type - Sub Type</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mManBran"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manufacturer - Brand</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mBdf"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master BDF</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mPSeries"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Product Series</q-item-label>
            </q-item-section>
          </q-item>
           <q-item
            to="/mNodeCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Node</q-item-label>
            </q-item-section>
          </q-item>
           <q-item
            to="/mPsCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Power Supply</q-item-label>
            </q-item-section>
          </q-item>
           <q-item
            to="/mAmplifierCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Amplifier</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mLegAmplifierCode"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Master Leg Amplifier</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/mOthers"
            :inset-level="1"
            active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Others</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
         <q-expansion-item
            :header-inset-level="0"
            expand-separator
            icon="fas fa-user-shield"
            label="Security"
            header-class="text-white"
            expand-icon-class="text-white"
            v-show="menu.security"
          >
          <q-item to="/secRole" style="padding-left: 70px" active-class="my-menu-link">
            <q-item-section to avatar>
              <q-icon name="fas fa-user-tie" color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">Role</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/secUser" style="padding-left: 70px" active-class="my-menu-link">
            <q-item-section to avatar>
              <q-icon name="fas fa-users" color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">User</q-item-label>
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
  background: #df933d;
}
.menu_right {
  background-color: #040218;
  color: white;
}
</style>
