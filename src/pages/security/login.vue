<template>
 <q-page padding>
   <div class="row justify-center">
    <fieldset class="login-box">
        <q-input v-model="cred.username" float-label="User Name"/>
        <q-input v-model="cred.password" type="password" float-label="Password" @keydown.enter="login()" />
        <div style="text-align: center; padding-top: 20px">
          <q-btn round color="primary" @click="login()">
            <q-icon name="fas fa-lock" size="1em" />
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
