<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import type { Category } from '@/types'
import BoiteCategory from '@/components/BoiteCategory.vue'

const categories: Ref<Category[]> = ref([])

onMounted(() => {
  fetch('http://api.iut.romainmillan.fr/api/categories')
    .then((reponsehttp) => reponsehttp.json())
    .then((reponseJSON) => {
      categories.value = reponseJSON['hydra:member']
    })
})
</script>

<template>
  <div class="all-categories">
    <BoiteCategory
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :id="category.id"
    />
  </div>
</template>
