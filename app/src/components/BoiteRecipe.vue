<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Recipe } from '@/types'

const router = useRouter()
const props = defineProps<{ recipe: Recipe }>()
</script>

<template>
  <div
    class="contentBox"
    @click="router.push({ name: 'singleRecipe', params: { id: props.recipe.id } })"
  >
    <div class="top">
      Postée le {{ new Date(props.recipe.datePublication).toLocaleString('fr') }}
    </div>
    <div class="content clickable">
      <img
        style="width: 100px; height: 100px; object-fit: cover"
        :src="'http://api.iut.romainmillan.fr/api/getImage/' + props.recipe.imageName"
        alt="image"
      />
      <h2>{{ recipe.title }}</h2>
    </div>
  </div>
</template>

<style scoped>
@import '@/components/ContentBox.css';
</style>
