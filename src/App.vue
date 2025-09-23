<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar sederhana -->
    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">Travelin</h1>
      <div class="flex gap-4">
        <RouterLink to="/" class="text-gray-700 hover:text-blue-600">Home</RouterLink>
        <RouterLink to="/login" class="text-gray-700 hover:text-blue-600">Login</RouterLink>
        <RouterLink to="/cart" class="text-gray-700 hover:text-blue-600">Cart</RouterLink>
        <RouterLink to="/transactions" class="text-gray-700 hover:text-blue-600">Transactions</RouterLink>
      </div>
    </nav>

    <!-- Konten halaman -->
    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* optional global style */
</style>
