<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../store/cart"
import { BASE_URL, API_KEY } from "../utils/api"


const router = useRouter()
const carts = ref<any[]>([])
const paymentMethods = ref<any[]>([])
const selectedPayment = ref<string>("")
const loading = ref(false)
const error = ref<string | null>(null)
const cartStore = useCartStore()

const fetchCart = async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${BASE_URL}/carts`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Gagal ambil cart")
    const data = await res.json()
    carts.value = data.data
    cartStore.setCount(carts.value.length)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const fetchPaymentMethods = async () => {
  try {
    const res = await fetch(`${BASE_URL}/payment-methods`, {
      headers: { apiKey: API_KEY },
    })
    if (!res.ok) throw new Error("Gagal ambil metode pembayaran")
    const data = await res.json()
    paymentMethods.value = data.data
  } catch (err: any) {
    console.error(err.message)
  }
}

const updateQuantity = async (cartId: string, quantity: number) => {
  const token = localStorage.getItem("token")
  if (!token) return
  try {
    const res = await fetch(`${BASE_URL}/update-cart/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    })
    if (!res.ok) throw new Error("Update gagal")
    await fetchCart()
  } catch (err: any) {
    alert(err.message)
  }
}

const deleteCart = async (cartId: string) => {
  const token = localStorage.getItem("token")
  if (!token) return
  try {
    const res = await fetch(`${BASE_URL}/delete-cart/${cartId}`, {
      method: "DELETE",
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Hapus gagal")
    await fetchCart()
  } catch (err: any) {
    alert(err.message)
  }
}

const checkout = async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
    return
  }

  if (!selectedPayment.value) {
    alert("Pilih metode pembayaran terlebih dahulu")
    return
  }

  const cartIds = carts.value.map((item) => item.id)

  try {
    const res = await fetch(`${BASE_URL}/create-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartIds,
        paymentMethodId: selectedPayment.value,
      }),
    })
    if (!res.ok) throw new Error("Checkout gagal")
    const data = await res.json()
    alert("Checkout berhasil ✅")
    console.log("Transaction:", data)
    router.push("/transactions")
  } catch (err: any) {
    alert(err.message)
  }
}

const totalPrice = computed(() =>
  carts.value.reduce((sum, item) => sum + item.activity.price * item.quantity, 0)
)

onMounted(() => {
  fetchCart()
  fetchPaymentMethods()
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">My Cart</h1>

    <p v-if="loading" class="text-gray-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div v-if="carts.length" class="space-y-4">
      <!-- Daftar Cart -->
      <div
        v-for="cart in carts"
        :key="cart.id"
        class="flex items-center justify-between bg-white shadow p-4 rounded-lg"
      >
        <div class="flex items-center gap-4">
          <img
            :src="cart.activity.imageUrls?.[0] || 'https://via.placeholder.com/100x80?text=No+Image'"
            alt="item"
            class="w-24 h-20 object-cover rounded"
          />
          <div>
            <h2 class="font-semibold">{{ cart.activity.title }}</h2>
            <p class="text-gray-600">
              Rp {{ cart.activity.price.toLocaleString("id-ID") }}
            </p>
            <div class="flex items-center gap-2 mt-2">
              <button
                @click="updateQuantity(cart.id, cart.quantity - 1)"
                class="px-2 py-1 bg-gray-200 rounded"
                :disabled="cart.quantity <= 1"
              >-</button>
              <span>{{ cart.quantity }}</span>
              <button
                @click="updateQuantity(cart.id, cart.quantity + 1)"
                class="px-2 py-1 bg-gray-200 rounded"
              >+</button>
            </div>
          </div>
        </div>
        <button
          @click="deleteCart(cart.id)"
          class="text-red-500 hover:underline"
        >
          Hapus
        </button>
      </div>

      <!-- Pilih metode pembayaran -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold mb-2">Pilih Metode Pembayaran</h2>
        <div class="grid grid-cols-2 gap-4">
          <label
            v-for="pm in paymentMethods"
            :key="pm.id"
            class="flex items-center gap-3 border p-3 rounded-lg cursor-pointer"
            :class="{
              'border-blue-500 bg-blue-50': selectedPayment === pm.id,
              'hover:border-blue-500': selectedPayment !== pm.id
            }"
          >
            <input
              type="radio"
              :value="pm.id"
              v-model="selectedPayment"
              class="hidden"
            />
            <img :src="pm.imageUrl" :alt="pm.name" class="h-8" />
            <span>{{ pm.name }}</span>
          </label>
        </div>
      </div>

      <!-- Total + Checkout -->
      <div class="flex justify-between items-center mt-6 border-t pt-4">
        <p class="text-xl font-bold">
          Total: Rp {{ totalPrice.toLocaleString("id-ID") }}
        </p>
        <button
          @click="checkout"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>

    <p v-else-if="!loading" class="text-gray-500">Cart masih kosong</p>
  </div>
</template>
