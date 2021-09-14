<template>
  <div id="main">
    <font size="1" class="text-bold" color="grey">EQUIPMENT <q-icon name="double_arrow"></q-icon> HOME</font><br><br>
    <font size="6">Hi <b>{{userInfo.fullName}}</b>, Welcome to SEAL </font><img src="statics/sealhead.png"  class="responsive"  width="80px">
    <br><font size="4">System of Equipment And Location</font>
    <q-card style="margin-top:30px;width:60%">
      <q-card-section>
        <div align="center">
          <font size="4"><b>YOUR PROFILE</b></font>
          <q-avatar size="200px" class="q-mb-sm" align="center">
            <q-img src="statics/avatar.png"></q-img>
          </q-avatar>
          <div align="center" style="width:260px">
            <q-separator color="indigo" />
            <q-separator color="indigo" />
          </div>
          <div align="center" style="width:160px; margin-top:10px; margin-bottom:20px">
            <q-separator color="orange" />
            <q-separator color="orange" />
          </div>
        </div>

        <div style="width:500px" align="center">
          <q-input v-model="userInfo.username"
            label="Username"
            readonly
            :stack-label="true">
            <template v-slot:prepend>
              <q-icon name="assignment_ind" class="text-indigo"/>
            </template>
          </q-input>
          <q-input v-model="userInfo.fullName"
            label="FullName"
            readonly
            :stack-label="true">
            <template v-slot:prepend>
              <q-icon name="account_box" class="text-indigo"/>
            </template>
          </q-input>
          <q-input v-model="userInfo.email"
            label="Email"
            readonly
            :stack-label="true">
            <template v-slot:prepend>
              <q-icon name="email" class="text-indigo"/>
            </template>
          </q-input>
          <q-input v-model="userInfo.branch"
            label="Daerah"
            readonly
            :stack-label="true">
            <template v-slot:prepend>
              <q-icon name="location_on" class="text-indigo"/>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script src="./js/main.js"></script>
