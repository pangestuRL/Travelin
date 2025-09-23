<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "../store/user"
import { useRouter } from "vue-router"

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const userStore = useUserStore()
const router = useRouter()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    userStore.error = "Password tidak sama"
    return
  }

  const res = await userStore.register(
    name.value,
    email.value,
    password.value,
    "user"
  )

  if (res) {
    router.push("/login")
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="border rounded px-3 py-2 w-full"
        />
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
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="border rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          :disabled="userStore.loading"
        >
          {{ userStore.loading ? "Loading..." : "Register" }}
        </button>
      </form>
      <p v-if="userStore.error" class="text-red-500 mt-2">{{ userStore.error }}</p>

      <p class="mt-4 text-sm text-gray-600 text-center">
        Sudah punya akun?
        <RouterLink to="/login" class="text-blue-500 hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>
