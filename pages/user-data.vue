<!-- pages/user-data.vue -->
<template>
    <div class="py-12 px-4 bg-secondary min-h-screen">
      <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[60vh]">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-6 text-gray-400 text-lg">Chargement des statistiques...</p>
      </div>
  
      <div v-else-if="userData" class="max-w-4xl mx-auto space-y-10">
        <!-- En-tête utilisateur -->
        <div class="bg-secondary-light rounded-2xl p-8 shadow-glow">
          <div class="flex items-center space-x-6">
            <div class="bg-gradient-to-br from-primary to-accent rounded-full p-6 shadow-lg">
              <span class="text-3xl font-bold text-white">{{ userInitials }}</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-2">{{ userData.user.username }}</h1>
              <p class="text-gray-400 text-lg">{{ userData.user.email }}</p>
            </div>
          </div>
        </div>
  
        <!-- Statistiques principales -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Taux de réussite" :value="userData.stats.success_rate" unit="%">
            {{ userData.stats.total_find }} réussites sur {{ userData.stats.total_tries }} essais
          </StatCard>
  
          <StatCard title="Série actuelle" :value="userData.stats.streak" unit="jours">
            <span v-if="userData.stats.in_streak" class="text-primary font-medium">
              🔥 Série en cours !
            </span>
            <span v-else class="text-gray-400">
              Pas de série active
            </span>
          </StatCard>
  
          <StatCard title="Meilleure série" :value="userData.stats.longest_streak" unit="jours">
            Record personnel
          </StatCard>
        </div>
  
        <!-- Dernière activité -->
        <div class="bg-secondary-light rounded-2xl p-8 shadow-glow">
          <h3 class="text-xl font-semibold text-white mb-6">Dernière activité</h3>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-4" 
                 :class="isToday(userData.stats.last_find_date) ? 'bg-primary' : 'bg-gray-600'"></div>
            <div>
              <p class="text-lg text-white">
                {{ isToday(userData.stats.last_find_date) ? 'Dernière réussite aujourd\'hui' : 'Dernière réussite le ' + formatDate(userData.stats.last_find_date) }}
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-red-400 bg-red-900/50 max-w-md mx-auto mt-8 p-6 rounded-xl shadow-lg">
        <p class="text-lg font-medium">Une erreur est survenue lors du chargement des données.</p>
        <button @click="retryLoading" class="mt-4 bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Réessayer
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import StatCard from '@/components/StatCard.vue'
  
  const config = useRuntimeConfig()
  const userData = ref(null)
  const isLoading = ref(true)
  
  // Obtenir les initiales du username
  const userInitials = computed(() => {
    if (!userData.value?.user.username) return ''
    return userData.value.user.username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  })
  
  // Vérifier si une date est aujourd'hui
  const isToday = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  
  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'jamais'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  // Charger les données utilisateur
  const loadUserData = async () => {
    isLoading.value = true
    try {
      const response = await fetch(`${config.public.apiUrl}/api/user-stats/1`)
      userData.value = await response.json()
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error)
      userData.value = null
    } finally {
      isLoading.value = false
    }
  }
  
  // Réessayer le chargement
  const retryLoading = () => {
    loadUserData()
  }
  
  onMounted(loadUserData)
  </script>
  
  <style scoped>
  .shadow-glow {
    box-shadow: 0 0 20px rgba(255, 107, 0, 0.1);
  }
  </style>