<!-- components/Header.vue -->
<template>
    <header class="bg-secondary-dark h-header border-b border-primary/20">
      <nav class="container mx-auto h-full px-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo"
            class="h-48 w-auto"
          />
        </NuxtLink>
        <div class="flex gap-6">
          <NuxtLink 
            to="/login" 
            class="text-white hover:text-primary transition-colors duration-200 font-medium text-lg"
          >
            Connexion
          </NuxtLink>
        </div>
      </nav>
    </header>
  </template>