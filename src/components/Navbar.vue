<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useCartStore } from "../store/cart"

const cartStore = useCartStore()
</script>

<template>
  <nav class="sticky top-0 z-50 shadow-md shadow-blue-100 bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-blue-600">Travelin</h1>
    <div class="flex gap-4 items-center">
      <RouterLink to="/" class="text-gray-700 hover:text-blue-600">Home</RouterLink>
      <RouterLink to="/login" class="text-gray-700 hover:text-blue-600">Login</RouterLink>

      <!-- Cart dengan badge -->
      <div class="relative">
        <RouterLink to="/cart" class="text-gray-700 hover:text-blue-600">
          Cart
        </RouterLink>
        <span
          v-if="cartStore.count > 0"
          class="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-1"
        >
          {{ cartStore.count }}
        </span>
      </div>

      <RouterLink to="/transactions" class="text-gray-700 hover:text-blue-600">Transactions</RouterLink>
    </div>
  </nav>
</template>
