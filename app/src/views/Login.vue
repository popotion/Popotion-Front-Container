<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { storeAuthentification } from '@/store/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message'
//faire des trucs avec storeAuth.JWT qui contient mon JWT
const connectingUser = ref({
  login: '',
  password: ''
})

// à completer
function connect(): void {
  storeAuthentification.connexion(
    connectingUser.value.login,
    connectingUser.value.password,
    () => {
      router.push('/home')
      flashMessage.show({
        type: 'success',
        title: 'Vous êtes connecté'
      })
    },
    () => {
      connectingUser.value.login = ''
      connectingUser.value.password = ''
      flashMessage.show({
        type: 'error',
        title: 'Identifiant ou mot de passe incorrect'
      })
    }
  )
}
</script>

<template>
  <div class="wrapper">
    <div class="top">
      <h3>Connexion</h3>
    </div>
    <form @submit.prevent="connect" class="content">
      <div class="group">
        <label>Login</label>
        <input v-model="connectingUser.login" />
        <p></p>
      </div>
      <div class="group">
        <label>Mot de passe</label>
        <input type="password" v-model="connectingUser.password" />
        <p></p>
      </div>
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<style scoped>
div.wrapper {
  width: 60%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}
.top {
  box-shadow: 0 0 0.3rem #999;
  border-radius: 10px 10px 0 0;
  background-color: #f5b59a; /*linear-gradient(90deg, rgba(255, 255, 0, 1) 0%, rgba(0, 188, 212, 1) 50%, rgba(238, 130, 238, 1) 100%); */
}

h3 {
  text-align: center;
  font-size: 25px;
  color: white;
}
.group {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-weight: 900;
}
.group p {
  width: 235px;
}

.top .clickable:hover {
  color: rgb(0, 0, 0);
}

.content .group {
  margin-top: 20px;
}
.content .group label {
  margin-right: 20px;
}

button {
  margin-top: 20px;
  background-color: rgb(75, 81, 85);
  padding: 5px 15px;
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 3px;
  font-weight: 700;
}

.content {
  padding: 20px;
  flex-grow: 1;
  box-shadow: 0 0 0.3rem #999;
  font:
    1.2em 'Fira Sans',
    sans-serif;
  border-radius: 0 0 10px 10px;
  text-align: center;
}
.content.clickable:hover {
  box-shadow: 0 0 0.3rem #000;
  cursor: pointer;
}
input {
  height: 30px;
  width: 225px;
  font-size: 100%;
}

._vue-flash-msg-body._vue-flash-msg-body_success {
  background-color: aqua;
}
</style>
