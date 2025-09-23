<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCartStore } from "../store/cart"
import { BASE_URL, API_KEY } from "../utils/api"

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()
const destination = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchDetail = async () => {
  loading.value = true
  try {
    const res = await fetch(`${BASE_URL}/activity/${route.params.id}`, {
      headers: { apiKey: API_KEY },
    })
    if (!res.ok) throw new Error("Gagal ambil detail")
    const data = await res.json()
    destination.value = data.data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const addToCart = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const res = await fetch(`${BASE_URL}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId: destination.value.id,
        quantity: 1,
      }),
    })
    if (!res.ok) throw new Error("Gagal tambah ke cart")
    cartStore.increment(1)
    alert("Ditambahkan ke cart ✅")
  } catch (err: any) {
    alert(err.message)
  }
}

onMounted(fetchDetail)
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <p v-if="loading" class="text-gray-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div v-if="destination" class="bg-white rounded-lg shadow p-6 space-y-6">
      <!-- Gambar utama -->
      <img
        :src="destination.imageUrls?.[0] || 'https://via.placeholder.com/600x400?text=No+Image'"
        alt="destination"
        class="w-full h-80 object-cover rounded-lg mb-4"
      />

      <!-- Judul dan harga -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">{{ destination.title }}</h1>
        <div class="text-right">
          <p class="text-2xl font-bold text-blue-600">
            Rp {{ destination.price.toLocaleString("id-ID") }}
          </p>
          <p v-if="destination.price_discount" class="text-green-600">
            Diskon: Rp {{ destination.price_discount.toLocaleString("id-ID") }}
          </p>
        </div>
      </div>

      <!-- Rating dan review -->
      <div class="flex items-center gap-2">
        <span class="text-yellow-500">⭐ {{ destination.rating }}</span>
        <span class="text-gray-500">({{ destination.total_reviews }} reviews)</span>
      </div>

      <!-- Deskripsi -->
      <p class="text-gray-700">{{ destination.description }}</p>

      <!-- Fasilitas -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Facilities</h2>
        <p class="text-gray-600">{{ destination.facilities || "Tidak ada info fasilitas" }}</p>
      </div>

      <!-- Lokasi -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Location</h2>
        <p class="text-gray-600">
          {{ destination.address }},
          {{ destination.city }},
          {{ destination.province }}
        </p>
        <div class="mt-2" v-html="destination.location_maps"></div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-end">
        <button
          @click="addToCart"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
