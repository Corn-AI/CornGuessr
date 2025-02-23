// composables/useApi.ts
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useApi = () => {
  const error = ref(null)
  const isLoading = ref(false)
  
  const storedDate = useLocalStorage('currentDate', '')
  const storedData = useLocalStorage('todayData', null)

  const getTodayData = async () => {
    try {
      // Si on a des données en cache et qu'on est le bon jour, on les utilise
      if (storedData.value && storedDate.value) {
        const dateResponse = await fetch('http://localhost:5005/api/date')
        const { date: serverDate } = await dateResponse.json()

        if (storedDate.value === serverDate) {
          return storedData.value
        }
      }

      // Sinon on récupère les nouvelles données
      isLoading.value = true
      const dataResponse = await fetch('http://localhost:5005/api/today-data')
      const newData = await dataResponse.json()
      
      // Mise à jour du cache
      storedData.value = newData
      const dateResponse = await fetch('http://localhost:5005/api/date')
      const { date: serverDate } = await dateResponse.json()
      storedDate.value = serverDate

      return newData
    } catch (err) {
      error.value = err
      console.error('Erreur lors de la récupération des données:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    getTodayData,
    error,
    isLoading,
    storedData,
    storedDate
  }
}