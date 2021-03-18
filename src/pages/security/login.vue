<template>
 <q-page padding>
   <div class="row justify-center">
    <fieldset class="login-box">
      <div align="center" class="text-bold" style="margin-bottom:20px">
        <img src="statics/seal3.png"  class="responsive"  width="90px">
        <br>
        <font size= 3> LOGIN YOUR ACCOUNT</font>
      </div>
      <q-input v-model="cred.username"
      float-label
      color="indigo-3"
      rounded
      outlined
      label-color="indigo-6"
      label="Username">
        <template v-slot:prepend>
          <q-icon name="account_box" color="indigo-10" />
        </template>
      </q-input>
      <q-input v-model="cred.password"
      type="password"
      color="indigo-3"
      rounded
      outlined
      label-color="indigo-6"
      float-label label ="Password"
      @keydown.enter="login()"
      style="margin-top:20px">
        <template v-slot:prepend>
          <q-icon name="lock" color="indigo-10" />
        </template>
      </q-input>

      <div style="text-align: center; padding-top: 20px">
        <q-btn size="15px"
        style="width: 240px"
          rounded
          class="q-px-xl q-py-xs"
          label="LOGIN"
          color="indigo-6"
          @click="login()">
          <!-- <q-icon name="fas fa-lock" size="1em" /> -->
        </q-btn>
      </div>
    </fieldset>
   </div>
 </q-page>
</template>

<script src="./js/login.js"></script>
<style>
.login-box {
  border: 2px none;
  border-radius: 5px;
  border-color: navy;
  width: 300px;
  padding: 20px 30px 20px 30px;
}

.login-box legend {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
