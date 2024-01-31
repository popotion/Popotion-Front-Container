<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const id = router.currentRoute.value.params.id
</script>

<template>J'affiche l'id {{ id }}</template>
