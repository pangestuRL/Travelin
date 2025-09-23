<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "../store/user"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  await userStore.login(email.value, password.value)
  if (userStore.token) {
    await userStore.fetchUser()
    router.push("/")
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
            <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="border rounded px-3 py-2 w-full"
            />
            <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="border rounded px-3 py-2 w-full"
            />
            <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                :disabled="userStore.loading"
                >
                {{ userStore.loading ? "Loading..." : "Login" }}
            </button>
        </form>
        <p class="mt-4 text-sm text-gray-600 text-center">
            Belum punya akun?
            <RouterLink to="/register" class="text-blue-500 hover:underline">Daftar</RouterLink>
        </p>
        <p v-if="userStore.error" class="text-red-500 mt-2">{{ userStore.error }}</p>
    </div>
  </div>
</template>
