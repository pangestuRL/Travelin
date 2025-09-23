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

const defaultImage =
  "https://static.vecteezy.com/system/resources/previews/025/871/533/non_2x/travel-destination-background-and-template-design-with-travel-destinations-and-famous-landmarks-and-attractions-for-tourism-let-s-go-travel-illustration-vector.jpg"

const onError = (event: Event) => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.src = defaultImage
  }
}

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

const cleanLocation = (raw: string) => {
  if (!raw) return ""
  try {
    return raw.replace(/\\+/g, "")
  } catch {
    return raw
  }
}

onMounted(fetchDetail)
</script>

<template>
  <div class="p-0 sm:p-6 max-w-6xl mx-auto">
    <p v-if="loading" class="text-gray-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div
      v-if="destination"
      class="space-y-6 sm:bg-white sm:rounded-lg sm:shadow sm:p-6"
    >
      <!-- Responsive Image -->
      <img
        :src="destination.imageUrls?.[0] || defaultImage"
        alt="destination"
        class="w-full h-64 sm:h-80 object-cover sm:rounded-lg"
        @error="onError"
      />

      <!-- Title + Price -->
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
      >
        <h1 class="text-2xl sm:text-3xl font-bold">
          {{ destination.title }}
        </h1>
        <div class="text-left sm:text-right">
          <p class="text-xl sm:text-2xl font-bold text-blue-600">
            Rp {{ destination.price.toLocaleString("id-ID") }}
          </p>
        </div>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-2 text-sm sm:text-base">
        <span class="text-yellow-500">⭐ {{ destination.rating }}</span>
        <span class="text-gray-500">
          ({{ destination.total_reviews }} reviews)
        </span>
      </div>

      <!-- Description -->
      <p class="text-gray-700 leading-relaxed">
        {{ destination.description }}
      </p>

      <!-- Facilities -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Facilities</h2>
        <p class="text-gray-600">
          {{ destination.facilities || "Tidak ada info fasilitas" }}
        </p>
      </div>

      <!-- Location -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Location</h2>
        <p class="text-gray-600 text-sm sm:text-base">
          {{ destination.address }}, {{ destination.city }},
          {{ destination.province }}
        </p>
        <div
          class="mt-2 overflow-hidden sm:rounded-lg sm:border"
          v-html="cleanLocation(destination.location_maps)"
        ></div>
      </div>

      <!-- Add to Cart -->
      <div class="flex justify-center sm:justify-end pb-6">
        <button
          @click="addToCart"
          class="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

