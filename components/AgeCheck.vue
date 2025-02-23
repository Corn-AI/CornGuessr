<!-- components/AgeCheck.vue -->
<template>
    <div v-if="showCheck" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black opacity-90"></div>
      
      <!-- Modal -->
      <div class="relative bg-secondary-light p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4">
        <div class="text-center space-y-6">
          <h2 class="text-3xl font-bold text-primary">Vérification de l'âge</h2>
          
          <div class="space-y-4">
            <p class="text-gray-300 text-lg">
              Ce site contient du contenu réservé aux adultes.
            </p>
            <p class="text-gray-300 text-lg">
              En continuant, vous confirmez avoir 18 ans ou plus.
            </p>
          </div>
  
          <div class="grid grid-cols-2 gap-4 pt-4">
            <button 
              @click="rejectAge" 
              class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 text-lg font-medium"
            >
              Non, quitter
            </button>
            <button 
              @click="confirmAge" 
              class="w-full bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-lg transition-colors duration-200 text-lg font-medium"
            >
              Oui, continuer
            </button>
          </div>
  
          <p class="text-sm text-gray-400 pt-4">
            En continuant, vous acceptez nos conditions d'utilisation.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { navigateTo } from '#app'
  
  const showCheck = ref(false)
  const emit = defineEmits(['ageVerified'])
  
  const confirmAge = () => {
    localStorage.setItem('over18', '1')
    showCheck.value = false
    emit('ageVerified', true)
  }
  
  const rejectAge = () => {
    window.location.href = 'https://www.google.com'
  }
  
  onMounted(() => {
    const isOver18 = localStorage.getItem('over18')
    if (!isOver18) {
      showCheck.value = true
    } else {
      emit('ageVerified', true)
    }
  })
  </script>