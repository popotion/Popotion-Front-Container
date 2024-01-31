<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import BoiteRecipe from '@/components/BoiteRecipe.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryId = route.params.id

const recipes: Ref<any[]> = ref([
  {
    title: 'chargement',
    description: 'chargement',
    recipeDetails: {
      difficulty: 0,
      preparationTime: 0,
      nbPersons: 0
    },
    preparation: ['chargement'],
    categoryNames: ['chargement'],
    ingredients: [
      {
        ingredientName: 'chargement',
        quantity: 0,
        unit: 'chargement'
      }
    ]
  }
])

onMounted(async () => {
  const response = await fetch(`http://api.iut.romainmillan.fr/api/categories/${categoryId}/recipes`)
  const reponseJSON = await response.json()
  recipes.value = reponseJSON['hydra:member']
})
</script>
<template>
  <div class="all-recipe">
    <BoiteRecipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" :id="recipe.id" />
  </div>
</template>
<style scoped>
.all-recipe {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
