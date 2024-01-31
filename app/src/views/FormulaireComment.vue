<script setup lang="ts">
import { storeAuthentification } from '@/store/storeAuthentification'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { flashMessage } from '@smartweb/vue-flash-message'

const emit = defineEmits<{ updated: [] }>()
const router = useRouter()
const id = router.currentRoute.value.params.id

function envoyer() {
  const body = {
    message: message.value,
    recipe: 'api/recipes/' + id
  }
  fetch('http://api.iut.romainmillan.fr/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: `Bearer ${storeAuthentification.JWT}`
    },
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.status == 201 || response.status == 200) {
      emit('updated')
      flashMessage.show({
        type: 'success',
        title: 'Votre commentaire a bien été ajouté !'
      })
    } else {
      if (response.status == 401) {
        flashMessage.show({
          type: 'error',
          title: 'Vous devez être connecté pour ajouter un commentaire !'
        })
      } else {
        flashMessage.show({
          type: 'error',
          title: 'Champs invalides ou manquants !'
        })
      }
    }
  })
}

let message = ref('')
</script>
<template>
  <p class="header">Ajouter un commentaire</p>
  <div class="wrapper">
    <form class="form" @submit.prevent="envoyer">
      <p>Message</p>
      <input v-model="message" />
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>
<style scoped>
.form {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div.wrapper {
  background-color: rgb(252, 255, 254);
  box-shadow: 0 0 0.3rem #999;
  font:
    1.2em 'Fira Sans',
    sans-serif;
  border-radius: 10px;
  width: 59%;
  padding: 5px;
  flex-grow: 1;
  margin: auto auto 5% auto;
  font-family: 'comfortaa';
}
h3 {
  text-align: center;
  font-weight: 900;
}
.group {
  display: flex;
  flex-direction: column;
  text-align: center;
}
textarea {
  width: 60%;
  height: 100px;
  margin: 10px auto;
  border: solid 1px #ccc;
  border-radius: 10px;
}
button {
  width: 20%;
  margin: 10px auto;
  border-radius: 2px;
  background-color: rgb(75, 81, 85);
  font-size: 20px;
  border: none;
  padding: 5px;
  color: white;
  font-family: 'comfortaa';
}

.form {
  text-align: center;
}

.form div {
  margin: 20px 0;
  font-weight: 500;
  font-size: 20px;
}

input {
  width: 40%;
  height: 30px;
  margin: 10px auto;
  border: solid 1px #ccc;
  border-radius: 10px;
}

.input {
  width: 40%;
  height: 30px;
  margin: 10px auto;
  border: solid 1px #ccc;
  border-radius: 10px;
}
.header {
  text-align: center;
  font-size: 30px;
  font-weight: 900;
  margin: 20px;
}

#preparation {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
