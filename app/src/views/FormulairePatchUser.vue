<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import { flashMessage } from '@smartweb/vue-flash-message'

const id = router.currentRoute.value.params.id

const inscriptionUser = ref({
  currentPlainPassword: '',
  plainPassword: '',
  mailAdress: '',
  status: ''
})

function getUser(): void {
  fetch('http://api.iut.romainmillan.fr/api/users/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/ld+json'
    }
  }).then((response) => {
    response.json().then((data) => {
      inscriptionUser.value.currentPlainPassword = data.currentPlainPassword
      inscriptionUser.value.plainPassword = data.plainPassword
      inscriptionUser.value.mailAdress = data.mailAdress
      inscriptionUser.value.status = data.status
    })
  })
}

function update(): void {
  fetch('http://api.iut.romainmillan.fr/api/users/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/merge-patch+json'
    },
    body: JSON.stringify(inscriptionUser.value)
  }).then((response) => {
    response.json().then(() => {
      if (response.status === 201 || response.status === 200) {
        router.push('/home')
        flashMessage.show({
          type: 'success',
          title: 'Vos informations ont bien été modifiées'
        })
      } else {
        router.push('/home')
        flashMessage.show({
          type: 'error',
          title: 'Erreurs dans les informations saisies'
        })
      }
    })
  })
}
onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="wrapper">
    <div class="top">
      <h3>Modification du profil</h3>
    </div>
    <form @submit.prevent="update" class="content">
      <div class="group">
        <label>Ancien mot de passe</label>
        <input type="password" v-model="inscriptionUser.currentPlainPassword" />
        <p></p>
      </div>
      <div class="group">
        <label>Nouveau mot de passe</label>
        <input type="password" v-model="inscriptionUser.plainPassword" />
        <p></p>
      </div>
      <div class="group">
        <label>Mail</label>
        <input v-model="inscriptionUser.mailAdress" />
        <p></p>
      </div>
      <div class="group">
        <label>Status</label>
        <input v-model="inscriptionUser.status" />
        <p></p>
      </div>
      <button type="submit">Modifier</button>
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
  width: 20%;
  margin: 10px auto;
  border-radius: 2px;
  background-color: rgb(30, 255, 142);
  font-size: 20px;
  border: none;
  padding: 5px;
  color: white;
  font-family: 'comfortaa';
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
</style>
