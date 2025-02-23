<!-- components/Header.vue -->
<template>
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Mon App</h1>
        <div class="flex gap-4">
          <NuxtLink to="/" class="hover:text-gray-300">Accueil</NuxtLink>
          <NuxtLink to="/login" class="hover:text-gray-300">Connexion</NuxtLink>
        </div>
      </nav>
    </header>
  </template>