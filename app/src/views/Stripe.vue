<script setup lang="ts">
import { ref } from 'vue'
import { storeAuthentification } from '@/store/storeAuthentification'

const link = ref({
  checkoutUrl: ''
})

async function stripe() {
  const response = await fetch('http://api.iut.romainmillan.fr/api/premium/subscribe', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${storeAuthentification.JWT}`
    }
  })

  link.value = await response.json()
}

stripe()
</script>

<template>
  <h1>Devenez premium !</h1>
  <div class="paiement">
    <a :href="link.checkoutUrl">Payer</a>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}
a {
  text-decoration: none;
  color: white;
  background-color: rgb(74, 96, 109);
  width: 20%;
  padding: 10px 15px;
  margin-top: 60px;
  font-size: 20px;
}
.paiement {
  text-align: center;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
