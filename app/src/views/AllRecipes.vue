<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import type { Recipe } from '@/types'
import BoiteRecipe from '@/components/BoiteRecipe.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nbRecipes: Ref<number> = ref(0)
const ingredientNames: Ref<string[]> = ref(['chargement'])
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
const filteredRecipes: Ref<Recipe[]> = ref(recipes.value)
const selectedIngredient: Ref<string> = ref('')

onMounted(async () => {
  const response = await fetch('http://api.iut.romainmillan.fr/api/recipes')
  const reponseJSON = await response.json()
  recipes.value = reponseJSON['hydra:member']
  nbRecipes.value = recipes.value.length
  recipes.value.forEach((recipe) => {
    if (recipe.ingredients && Array.isArray(recipe.ingredients))
      recipe.ingredients.forEach((ingredient: any) => {
        if (!ingredientNames.value.includes(ingredient.ingredientName))
          ingredientNames.value.push(ingredient.ingredientName)
      })
  })
  ingredientNames.value.sort()
  filteredRecipes.value = recipes.value
})

function filterRecipes() {
  if (selectedIngredient.value === '') {
    filteredRecipes.value = recipes.value
  } else {
    filteredRecipes.value = recipes.value.filter((recipe) =>
      recipe.ingredients.some(
        (ingredient: any) => ingredient.ingredientName === selectedIngredient.value
      )
    )
  }
}

function randomRecipe(): void {
  const random = Math.floor(Math.random() * nbRecipes.value)
  const recipe = recipes.value[random]
  router.push({ name: 'singleRecipe', params: { id: recipe.id } })
}
</script>

<template>
  <div class="top-container">
    <div class="filter-container">
      <p class="filter-text">Filtrer par:</p>
      <select v-model="selectedIngredient" @change="filterRecipes">
        <option value="">Tous les ingrédients</option>
        <option v-for="ingredient in ingredientNames" :key="ingredient" :value="ingredient">
          {{ ingredient }}
        </option>
      </select>
    </div>
    <div class="random-container">
      <button class="random-button" @click="randomRecipe()">Recette aléatoire</button>
    </div>
  </div>
  <div class="all-recipe">
    <BoiteRecipe
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
      :recipe="recipe"
      :id="recipe.id"
    />
  </div>
</template>
<style scoped>
.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-around;
}
.filter-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 70px;
}
.filter-text {
  margin-right: 10px;
}
.random-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.random-button {
  padding: 10px;
  border-radius: 10px;
  background-color: var(--dark-orange);
  color: var(--font-color);
  font-weight: 500;
  font-size: 16px;
}
.all-recipe {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
