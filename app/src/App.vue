<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeAuthentification } from '@/store/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message'

const router = useRouter()

function disconnect(): void {
  storeAuthentification.deconnexion()
  flashMessage.show({
    type: 'warning',
    title: 'Vous êtes déconnecté'
  })
}

function isAdmin() {
  for (let i = 0; i < storeAuthentification.roles.length; i++) {
    if (storeAuthentification.roles[i] === 'ROLE_ADMIN') {
      return true
    }
  }
  return false
}

function isPremium() {
  if (storeAuthentification.premium === true) {
    return true
  }
  return false
}
</script>
<template>
  <div id="wrapper">
    <header>
      <FlashMessage />
      <nav>
        <div @click="router.push({ name: 'home' })" class="logo-container">
          <img src="./assets/logo.svg" alt="logo" width="50px" />
          <p>Popotion</p>
        </div>
        <div @click="router.push({ name: 'allRecipes' })" class="nav-item">Recettes</div>
        <div @click="router.push({ name: 'allCategories' })" class="nav-item">Catégories</div>
        <!-- <div v-if="storeAuthentification.estConnecte">Favoris</div> -->
        <div
          v-if="!storeAuthentification.estConnecte"
          @click="router.push({ name: 'login' })"
          class="nav-item"
        >
          Connexion
        </div>
        <div
          v-if="!storeAuthentification.estConnecte"
          @click="router.push({ name: 'inscription' })"
          class="nav-item"
        >
          Inscription
        </div>
        <div v-if="storeAuthentification.estConnecte" @click="disconnect()" class="nav-item">
          Déconnexion
        </div>
        <div
          class="post nav-item"
          v-if="storeAuthentification.estConnecte"
          @click="router.push({ name: 'formulaireRecipe' })"
        >
          + Poster
        </div>
        <div
          v-if="storeAuthentification.estConnecte"
          @click="router.push({ name: 'profile', params: { id: storeAuthentification.id } })"
          class="nav-item"
        >
          Profil
        </div>
        <div
          v-if="storeAuthentification.estConnecte && !isPremium()"
          @click="router.push({ name: 'stripe' })"
          class="nav-item"
        >
          Premium
        </div>
        <div
          v-if="isAdmin() && storeAuthentification.estConnecte"
          @click="router.push({ name: 'adminPanel' })"
          class="nav-item"
        >
          <h3>Administration</h3>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.post {
  margin-left: 20px;
  font-weight: 500;
  padding: 5px;
  background-color: var(--dark-orange);
  border-radius: 35px;
}
.nav-item {
  padding: 10px;
  flex-grow: 1;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
}
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  width: 100%;
  position: sticky;
  top: 0px;
  padding: 20px;
  background-color: white;
  border-bottom: solid 1px black;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-container {
  display: flex;
  align-items: center;
  padding-left: 150px;
  font-weight: 500;
  font-size: 24px;
}
.logo-container > img {
  margin-right: 15px;
}
nav > div {
  padding: 10px;
  flex-grow: 1;
  text-align: center;
}
nav > div:hover {
  cursor: pointer;
}
main {
  max-width: 1280px;
  width: 780px;
  padding: 10px;
  flex-grow: 1;
}

@media (max-width: 800px) {
  main {
    width: 80%;
  }
}
</style>
