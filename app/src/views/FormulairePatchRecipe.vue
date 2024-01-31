<script setup lang="ts">
import { storeAuthentification } from '@/store/storeAuthentification'
import { ref, onMounted } from 'vue'
import { flashMessage } from '@smartweb/vue-flash-message'
import router from '@/router'

const recipeToUpdate = ref({
  title: '',
  description: '',
  preparation: [''],
  recipeDetails: {
    difficulty: 0,
    preparationTime: 0,
    nbPersons: 0
  },
  categoryNames: [''],
  compositionData: [
    {
      ingredientName: '',
      quantity: 0,
      unit: ''
    }
  ],
  imageName: ''
})
const recipeId = router.currentRoute.value.params.id
const emit = defineEmits<{ updated: [] }>()

onMounted(async () => {
  const response = await fetch(`http://api.iut.romainmillan.fr/api/recipes/${recipeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: `Bearer ${storeAuthentification.JWT}`
    }
  })
  const data = await response.json()
  transformDataForPatch(data)
})

function addPreparationStep() {
  recipeToUpdate.value.preparation.push('')
}

function removePreparationStep(index: number) {
  recipeToUpdate.value.preparation.splice(index, 1)
}

function addCategory() {
  if (storeAuthentification.premium) {
    if (recipeToUpdate.value.categoryNames.length < 3) recipeToUpdate.value.categoryNames.push('')
    else
      flashMessage.show({
        type: 'error',
        title: 'Vous pouvez ajouter au maximum 3 catégories'
      })
  } else {
    if (recipeToUpdate.value.categoryNames.length < 1) recipeToUpdate.value.categoryNames.push('')
    else
      flashMessage.show({
        type: 'error',
        title: 'Vous devez être premium pour ajouter plus de 1 catégorie'
      })
  }
}

function removeCategory(index: number) {
  recipeToUpdate.value.categoryNames.splice(index, 1)
}

function addComposition() {
  recipeToUpdate.value.compositionData.push({
    ingredientName: '',
    quantity: 0,
    unit: ''
  })
}

function removeComposition(index: number) {
  recipeToUpdate.value.compositionData.splice(index, 1)
}

function transformDataForPatch(data: any) {
  const categoryNames = data.categories.map((category: { name: any }) => category.name)
  const compositionsData = data.ingredients.map(
    (ingredient: { ingredientName: any; quantity: any; unit: any }) => ({
      ingredientName: ingredient.ingredientName,
      quantity: ingredient.quantity,
      unit: ingredient.unit
    })
  )
  const difficulty = parseInt(data.details[0].split(':')[1].trim().split('/')[0])
  const preparationTime = parseInt(data.details[1].split(':')[1].trim().replace('min', ''))
  const nbPersons = parseInt(data.details[2].split(':')[1].trim().split(' ')[0])
  recipeToUpdate.value = {
    title: data.title,
    description: data.description,
    recipeDetails: {
      difficulty,
      preparationTime,
      nbPersons
    },
    preparation: data.preparation,
    categoryNames,
    compositionData: compositionsData,
    imageName: data.imageName
  }
}

async function envoyer() {
  const response = await fetch(`http://api.iut.romainmillan.fr/api/recipes/${recipeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/merge-patch+json',
      Authorization: `Bearer ${storeAuthentification.JWT}`
    },
    body: JSON.stringify(recipeToUpdate.value)
  })

  if (response.status === 204 || response.status === 200) {
    emit('updated')
    flashMessage.show({
      type: 'success',
      title: 'Recette modifiée'
    })
  } else {
    flashMessage.show({
      type: 'error',
      title: 'Erreur lors de la modification de la recette'
    })
  }
}
</script>
<template>
  <p class="header">Modifier la recette</p>
  <div class="wrapper">
    <form class="form" @submit.prevent="envoyer">
      <p>Titre</p>
      <input type="text" v-model="recipeToUpdate.title" />

      <p>Description</p>
      <input type="text" v-model="recipeToUpdate.description" />

      <div>
        <p>Détails de la recette</p>
        <p>Difficulté</p>
        <input type="number" min="0" max="5" v-model="recipeToUpdate.recipeDetails.difficulty" />
        <p>Temps de préparation</p>
        <input
          type="number"
          min="0"
          max="180"
          v-model="recipeToUpdate.recipeDetails.preparationTime"
        />
        <p>Nombre de personnes</p>
        <input type="number" min="0" max="10" v-model="recipeToUpdate.recipeDetails.nbPersons" />
      </div>

      <div>
        <p>Préparation</p>
        <div v-for="(step, index) in recipeToUpdate.preparation" :key="index">
          <input type="text" v-model="recipeToUpdate.preparation[index]" />
          <button type="button" @click="removePreparationStep(index)">Supprimer</button>
        </div>
        <button type="button" @click="addPreparationStep">Ajouter une étape</button>
      </div>

      <div>
        <p>Catégories</p>
        <div v-for="(category, index) in recipeToUpdate.categoryNames" :key="index">
          <input type="text" v-model="recipeToUpdate.categoryNames[index]" />
          <button type="button" @click="removeCategory(index)">Supprimer</button>
        </div>
        <button type="button" @click="addCategory">Ajouter une catégorie</button>
      </div>

      <div>
        <p>Composition</p>
        <div v-for="(composition, index) in recipeToUpdate.compositionData" :key="index">
          <input type="text" v-model="composition.ingredientName" />
          <input type="number" v-model="composition.quantity" />
          <input type="text" v-model="composition.unit" />
          <button type="button" @click="removeComposition(index)">Supprimer</button>
        </div>
        <button type="button" @click="addComposition">Ajouter une composition</button>
      </div>

      <button type="submit">Modifier</button>
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
  background-color: rgb(30, 255, 142);
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
