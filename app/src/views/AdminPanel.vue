<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import type { User } from '@/types'
import BoiteUserAdmin from '@/components/BoiteUserAdmin.vue'

const users: Ref<User[]> = ref([])

function getAllUsers() {
  return fetch('http://api.iut.romainmillan.fr/api/users')
    .then((reponsehttp) => reponsehttp.json())
    .then((reponseJSON) => {
      return reponseJSON['hydra:member'] as User[]
    })
}

async function refresh() {
  users.value = await getAllUsers()
}
onMounted(() => {
  refresh()
})
</script>

<template>
  <h1>Panneau d'administration</h1>
  <div class="all-users-admin">
    <BoiteUserAdmin
      v-for="user in users"
      :key="user.id"
      :user="user"
      :refresh="refresh"
      :id="user.id"
    />
  </div>
</template>
<style scoped>
.all-users-admin {
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin: 30px;
}
</style>
