<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, type Ref, onMounted } from 'vue'
import BoiteRecipeDetails from '@/components/BoiteRecipeDetails.vue'
import { flashMessage } from '@smartweb/vue-flash-message'
import { storeAuthentification } from '@/store/storeAuthentification'

const router = useRouter()
const id = router.currentRoute.value.params.id
const recipe: Ref<any> = ref({
  title: 'chargement',
  description: 'chargement',
  details: ['chargement', 'chargement', 'chargement'],
  preparation: ['chargement'],
  author: {
    id: 0,
    login: 'chargement',
    premium: false
  },
  categories: [
    {
      id: 0,
      name: 'chargement'
    }
  ],
  comments: [],
  favorites: [],
  datePublication: '2024-01-27T00:38:23+01:00',
  imageName: '',
  ingredients: [
    {
      id: 1,
      ingredientName: 'tchargementest2',
      quantity: 0,
      unit: 'chargement'
    }
  ]
})
onMounted(() => {
  fetch(encodeURI(String('http://api.iut.romainmillan.fr/api/recipes/' + id)), {
    headers: {
      Authorization: `Bearer ${storeAuthentification.JWT}`
    }
  }).then((reponsehttp) => {
    if (reponsehttp.status === 200) {
      reponsehttp.json().then((data) => {
        recipe.value = data
      })
    } else if (reponsehttp.status === 401) {
      flashMessage.show({
        type: 'error',
        title: 'Vous devez être connecté et majeur pour accéder à cette page'
      })
      router.push('/home')
    } else {
      flashMessage.show({
        type: 'error',
        title: 'Erreur lors du chargement de la recette'
      })
      router.push('/home')
    }
  })
})
</script>

<template>
  <div>
    <BoiteRecipeDetails :key="recipe.id" :recipe="recipe" :id="recipe.id" />
  </div>
</template>
