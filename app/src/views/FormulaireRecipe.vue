<script setup lang="ts">
import { storeAuthentification } from '@/store/storeAuthentification'
import { ref } from 'vue'
import { flashMessage } from '@smartweb/vue-flash-message'

const emit = defineEmits<{ updated: [] }>()
const newRecipe = ref({
  title: '',
  description: '',
  preparation: [''],
  recipeDetails: {
    difficulty: 0,
    preparationTime: 0,
    nbPersons: 0
  },
  categoryNames: [''],
  compositionsData: [
    {
      ingredientName: '',
      quantity: 0,
      unit: ''
    }
  ],
  imageName: ''
})

function addPreparationStep() {
  if (newRecipe.value.preparation.length < 10) {
    newRecipe.value.preparation.push('')
  }
}

function removePreparationStep(index: number) {
  newRecipe.value.preparation.splice(index, 1)
}

function addCategory() {
  if (storeAuthentification.premium)
    if (newRecipe.value.categoryNames.length < 3) newRecipe.value.categoryNames.push('')
    else
      flashMessage.show({
        type: 'error',
        title: 'Vous devez être premium pour ajouter plus de 3 catégories'
      })
}

function removeCategory(index: number) {
  newRecipe.value.categoryNames.splice(index, 1)
}

function addComposition() {
  if (newRecipe.value.compositionsData.length < 10) {
    newRecipe.value.compositionsData.push({
      ingredientName: '',
      quantity: 0,
      unit: ''
    })
  }
}

function removeComposition(index: number) {
  newRecipe.value.compositionsData.splice(index, 1)
}

async function envoyer() {
  var urlApi = 'http://api.iut.romainmillan.fr/api/image/'
  var inputElement = document.getElementById('imageFile') as HTMLInputElement
  // Vérification qu'un fichier a été sélectionné
  if (inputElement?.files?.length === 0) {
    console.error('Aucun fichier sélectionné.')
    return
  }
  if (!inputElement.files) {
    console.error('Aucun fichier sélectionné.')
    return
  }
  var fichier = inputElement.files[0] // Récupération du fichier depuis l'input file
  var nomImage = fichier.name // Récupération du nom du fichier
  // Création d'un objet FormData pour envoyer le fichier
  var formData = new FormData()
  formData.append('image', fichier, nomImage)
  // Utilisation de l'API Fetch pour envoyer la requête
  let response = await fetch(urlApi + nomImage, {
    method: 'POST',
    body: formData
  })
  if (response.ok) {
    console.log("L'image a été envoyée avec succès à l'URL : ", urlApi + nomImage)
  } else {
    console.error("Erreur lors de l'envoi de l'image. Code de statut :", response.status)
  }

  newRecipe.value.imageName = nomImage
  response = await fetch('http://api.iut.romainmillan.fr/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: `Bearer ${storeAuthentification.JWT}`
    },
    body: JSON.stringify(newRecipe.value)
  })
  const data = await response.json()
  if (response.status === 201) {
    emit('updated')
    flashMessage.show({
      type: 'success',
      title: 'Recette créée'
    })
  } else {
    flashMessage.show({
      type: 'error',
      title: 'Erreur lors de la création de la recette'
    })
  }
}
</script>
<template>
  <p class="header">Créer une recette</p>
  <div class="wrapper">
    <form class="form" @submit.prevent="envoyer">
      <p>Titre</p>
      <input type="text" v-model="newRecipe.title" />

      <p>Images</p>
      <input type="file" id="imageFile" ref="imageInput" accept="image/*" class="input-field" />

      <p>Description</p>
      <input type="text" v-model="newRecipe.description" />

      <div>
        <p>Détails de la recette</p>
        <p>Difficulté</p>
        <input type="number" min="0" max="5" v-model="newRecipe.recipeDetails.difficulty" />
        <p>Temps de préparation</p>
        <input type="number" min="0" max="180" v-model="newRecipe.recipeDetails.preparationTime" />
        <p>Nombre de personnes</p>
        <input type="number" min="0" max="10" v-model="newRecipe.recipeDetails.nbPersons" />
      </div>

      <div>
        <p>Préparation</p>
        <div v-for="(step, index) in newRecipe.preparation" :key="index">
          <input type="text" v-model="newRecipe.preparation[index]" />
          <button type="button" @click="removePreparationStep(index)">Supprimer</button>
        </div>
        <button type="button" @click="addPreparationStep">Ajouter une étape</button>
      </div>

      <div>
        <p>Catégories</p>
        <div v-for="(category, index) in newRecipe.categoryNames" :key="index">
          <input type="text" v-model="newRecipe.categoryNames[index]" />
          <button type="button" @click="removeCategory(index)">Supprimer</button>
        </div>
        <button type="button" @click="addCategory" v-if="newRecipe.categoryNames.length < 3">
          Ajouter une catégorie
        </button>
      </div>

      <div>
        <p>Composition</p>
        <div v-for="(composition, index) in newRecipe.compositionsData" :key="index">
          <input type="text" v-model="composition.ingredientName" />
          <input type="number" v-model="composition.quantity" />
          <input type="text" v-model="composition.unit" />
          <button type="button" @click="removeComposition(index)">Supprimer</button>
        </div>
        <button type="button" @click="addComposition">Ajouter une composition</button>
      </div>

      <button type="submit">Créer</button>
    </form>
  </div>
</template>
<style scoped>
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
