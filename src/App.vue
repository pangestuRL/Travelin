<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue"
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="p-6">
      <RouterView />
    </main>
    <Footer/>
  </div>
</template>

<style>
</style>
