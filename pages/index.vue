<!-- pages/index.vue -->
<template>
    <div class="py-12 bg-secondary min-h-screen">
      <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[60vh]">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-400">Chargement...</p>
      </div>
  
      <div v-else-if="imageUrl" class="max-w-4xl mx-auto px-4">
        <!-- Image Container -->
        <div class="aspect-video relative overflow-hidden rounded-xl bg-secondary-light mb-8 shadow-xl shadow-black/50">
          <img 
            :src="fullImageUrl" 
            alt="Image du jour"
            class="w-full h-full object-cover"
          />
        </div>
  
        <!-- Formulaire de réponse -->
        <div class="max-w-xl mx-auto">
          <form @submit.prevent="submitGuess" class="space-y-6 bg-secondary-light p-8 rounded-lg shadow-glow">
            <div>
              <label 
                for="guess" 
                class="block text-xl font-medium text-white mb-3"
              >
                Qui est cette actrice ?
              </label>
              <input
                id="guess"
                v-model="guess"
                type="text"
                :disabled="isSuccess"
                class="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg 
                       text-white placeholder-gray-500 focus:ring-2 focus:ring-primary 
                       focus:border-primary transition-all duration-200"
                placeholder="Entrez votre réponse..."
              />
            </div>
  
            <button
              type="submit"
              :disabled="isSuccess || !guess || isSubmitting"
              class="w-full bg-primary hover:bg-primary-light disabled:bg-gray-600 
                     text-white font-medium py-3 px-6 rounded-lg transition-colors 
                     duration-200 disabled:cursor-not-allowed text-lg"
            >
              <span v-if="isSubmitting">
                <span class="inline-block w-5 h-5 border-2 border-white border-t-transparent 
                           rounded-full animate-spin mr-2"></span>
                Vérification...
              </span>
              <span v-else>Valider</span>
            </button>
          </form>
  
          <!-- Message de résultat -->
          <div v-if="showResult" class="mt-6">
            <div 
              v-if="isSuccess" 
              class="bg-green-900/50 border border-green-500 text-green-400 px-6 py-4 rounded-lg"
            >
              <p class="text-lg font-medium">🎉 Félicitations !</p>
              <p>La réponse est bien {{ correctAnswer }}</p>
            </div>
            <div 
              v-else 
              class="bg-red-900/50 border border-red-500 text-red-400 px-6 py-4 rounded-lg"
            >
              <p>Ce n'est pas la bonne réponse. Essayez encore !</p>
            </div>
          </div>
        </div>
      </div>
  
      <div 
        v-else 
        class="text-center text-red-400 bg-red-900/50 max-w-md mx-auto mt-8 p-4 rounded-lg"
      >
        Une erreur est survenue lors du chargement de l'image.
      </div>
    </div>
  </template>

  <script setup>
  const config = useRuntimeConfig()
  const imageUrl = ref(null)
  const guess = ref('')
  const isLoading = ref(true)
  const isSubmitting = ref(false)
  const showResult = ref(false)
  const isSuccess = ref(false)
  const correctAnswer = ref('')
  
  const fullImageUrl = computed(() => {
    if (!imageUrl.value) return ''
    return `${config.public.apiUrl}${imageUrl.value}`
  })
  
  onMounted(async () => {
    try {
      const response = await fetch(`${config.public.apiUrl}/api/today-data`)
      const data = await response.json()
      imageUrl.value = data.img_url
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      isLoading.value = false
    }
  })
  
  const submitGuess = async () => {
    if (!guess.value || isSubmitting.value) return
  
    isSubmitting.value = true
    showResult.value = false
  
    try {
      const response = await fetch(`${config.public.apiUrl}/api/guess-actress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: guess.value }),
      })
  
      const result = await response.json()
      
      isSuccess.value = result.correct
      if (result.correct) {
        correctAnswer.value = result.actress
      }
      showResult.value = true
  
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    } finally {
      isSubmitting.value = false
    }
  }
  </script>