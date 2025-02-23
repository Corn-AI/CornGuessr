<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen flex flex-col bg-secondary text-white">
        <Header v-if="isAgeVerified" />
        <main v-if="isAgeVerified" class="flex-grow container mx-auto px-4"> <!-- WARNING NUXTPAGE QUI VIENS D'ICI !! MAIS PAS PB, en fait il viens du fait qu'on ne load pas la page si l'utilisateur n'est pas over18, ce qu'il interprête comme une erreur -->
            <NuxtPage />
        </main>
        <Footer v-if="isAgeVerified" class="mt-auto" />
        <AgeCheck @age-verified="handleAgeVerification" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import AgeCheck from '~/components/AgeCheck.vue'

const config = useRuntimeConfig()
const isAgeVerified = useLocalStorage('over18', null)
const storedData = useLocalStorage('todayData', null)

const handleAgeVerification = async (verified) => {
  isAgeVerified.value = verified
}

onMounted(async () => {
  if (isAgeVerified.value) {
    try {
      const response = await fetch(`${config.public.apiUrl}/api/today-data`)
      const data = await response.json()
      storedData.value = data
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error)
    }
  }
})
</script>