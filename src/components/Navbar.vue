<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router"
import { useCartStore } from "../store/cart"
import { BASE_URL, API_KEY } from "../utils/api"

const cartStore = useCartStore()
const router = useRouter()
const isLoggedIn = () => !!localStorage.getItem("token")

const handleLogout = async () => {
  const token = localStorage.getItem("token")
  if (!token) return

  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "GET",
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error("Logout gagal")

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    alert("Logout berhasil ✅")
    router.push("/login")
  } catch (err: any) {
    alert(err.message)
  }
}
</script>

<template>
  <nav class="sticky top-0 z-50 shadow-md shadow-blue-100 bg-white px-20 py-3 flex justify-between items-center">
    <h1 class="text-xl font-bold text-blue-600">Travelin</h1>
    <div class="flex gap-4 items-center">
      <RouterLink to="/" class="text-gray-700 hover:text-blue-600">Home</RouterLink>
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
      <RouterLink
        v-if="!isLoggedIn()"
        to="/login"
        class="text-gray-700 hover:text-blue-600"
      >
        Login
      </RouterLink>
      <button
        v-else
        @click="handleLogout"
        class="text-gray-700 hover:text-red-600"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
