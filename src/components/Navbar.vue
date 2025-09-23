<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router"
import { useCartStore } from "../store/cart"
import { BASE_URL, API_KEY } from "../utils/api"
import { ref } from "vue"

const cartStore = useCartStore()
const router = useRouter()
const isLoggedIn = () => !!localStorage.getItem("token")

const isOpen = ref(false)

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
  <nav class="sticky top-0 z-50 shadow-md shadow-blue-100 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-2xl font-bold text-blue-600">🕊 Travelin</h1>

        <div class="hidden md:flex gap-6 items-center">
          <RouterLink
            to="/"
            class="nav-link"
            active-class="text-blue-600 font-semibold"
          >
            Home
          </RouterLink>

          <div class="relative">
            <RouterLink
              to="/cart"
              class="nav-link"
              active-class="text-blue-600 font-semibold"
            >
              Cart
            </RouterLink>
            <span
              v-if="cartStore.count > 0"
              class="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-1"
            >
              {{ cartStore.count }}
            </span>
          </div>

          <RouterLink
            to="/transactions"
            class="nav-link"
            active-class="text-blue-600 font-semibold"
          >
            Transactions
          </RouterLink>

          <RouterLink
            v-if="!isLoggedIn()"
            to="/login"
            class="nav-link"
            active-class="text-blue-600 font-semibold"
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

        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="text-gray-700 focus:outline-none">
            <svg
              v-if="!isOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="md:hidden px-4 pb-4 space-y-2">
      <RouterLink
        to="/"
        class="block nav-link"
        active-class="text-blue-600 font-semibold"
        @click="isOpen = false"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/cart"
        class="block nav-link"
        active-class="text-blue-600 font-semibold"
        @click="isOpen = false"
      >
        Cart
        <span v-if="cartStore.count > 0" class="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
          {{ cartStore.count }}
        </span>
      </RouterLink>

      <RouterLink
        to="/transactions"
        class="block nav-link"
        active-class="text-blue-600 font-semibold"
        @click="isOpen = false"
      >
        Transactions
      </RouterLink>

      <RouterLink
        v-if="!isLoggedIn()"
        to="/login"
        class="block nav-link"
        active-class="text-blue-600 font-semibold"
        @click="isOpen = false"
      >
        Login
      </RouterLink>

      <button
        v-else
        @click="() => { handleLogout(); isOpen = false }"
        class="block text-gray-700 hover:text-red-600"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-blue-600;
}
</style>
