<script setup lang="ts">
import type { User } from '@/types'
import { storeAuthentification } from '@/store/storeAuthentification'
const props = defineProps<{ user: User; refresh: () => void }>()

async function deleteUser() {
  await fetch(`http://api.iut.romainmillan.fr/api/users/${props.user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${storeAuthentification.JWT}`
    }
  })
  props.refresh()
}
</script>

<template>
  <div class="contentBox">
    <div v-if="props.user.premium">
      <div class="premium"></div>
    </div>
    <div class="container">
      <div>
        <h3>{{ props.user.login }}</h3>
      </div>
      <div>
        <button class="suppr" @click="deleteUser()">✖</button>
        <router-link :to="{ name: 'formulaireUpdateUser', params: { id: user.id } }">
          <button class="edit">✎</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contentBox {
  border: solid 2px black;
  padding: 5px;
  margin: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
}

.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.premium {
  padding: 5px;
  background-color: #00ff6e;
  border-radius: 20px;
  width: 15px;
  height: 15px;
  margin-right: -60px;
  margin-left: 10px;
}

h3 {
  margin-left: 60px;
}

.suppr {
  font-size: 20px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border-radius: 10px;
  border: none;
}

.edit {
  font-size: 20px;
  padding: 5px 10px;
  background-color: rgb(14, 197, 14);
  color: white;
  border-radius: 10px;
  margin-left: 10px;
  border: none;
}
</style>
