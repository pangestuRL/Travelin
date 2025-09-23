<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { BASE_URL, API_KEY } from "../utils/api"



const router = useRouter()
const transactions = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchTransactions = async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${BASE_URL}/my-transactions`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Gagal ambil transaksi")
    const data = await res.json()
    transactions.value = data.data
      .map((trx: any) => ({
        ...trx,
        _proofUrl: "",
      }))
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getTotal = (trx: any) => {
  return trx.transaction_items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  )
}

const uploadImage = async (file: File): Promise<string | null> => {
  const token = localStorage.getItem("token")
  if (!token) return null

  const formData = new FormData()
  formData.append("image", file)

  try {
    const res = await fetch(`${BASE_URL}/upload-image`, {
      method: "POST",
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    if (!res.ok) throw new Error("Upload image gagal")
    const data = await res.json()
    return data.url // backend return { url: "https://..." }
  } catch (err: any) {
    alert(err.message)
    return null
  }
}

const uploadProof = async (transactionId: string, file: File) => {
  const token = localStorage.getItem("token")
  if (!token) return

  const imageUrl = await uploadImage(file)
  if (!imageUrl) return

  try {
    const res = await fetch(
      `${BASE_URL}/update-transaction-proof-payment/${transactionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          proofPaymentUrl: imageUrl,
        }),
      }
    )
    if (!res.ok) throw new Error("Upload bukti gagal")
    alert("Bukti pembayaran berhasil diupload ✅")
    await fetchTransactions()
  } catch (err: any) {
    alert(err.message)
  }
}

onMounted(fetchTransactions)
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">My Transactions</h1>

    <p v-if="loading" class="text-gray-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div v-if="transactions.length" class="space-y-6">
      <div
        v-for="trx in transactions"
        :key="trx.id"
        class="bg-white shadow rounded-lg p-4 space-y-4"
      >
        <!-- Header transaksi -->
        <div class="flex justify-between items-center">
          <p class="font-semibold">Invoice: {{ trx.invoiceId }}</p>
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
            :class="{
              'bg-yellow-100 text-yellow-700': trx.status === 'pending',
              'bg-green-100 text-green-700': trx.status === 'paid',
              'bg-red-100 text-red-700': trx.status === 'cancelled',
              'bg-blue-100 text-blue-700': trx.status === 'completed'
            }"
          >
            {{ trx.status }}
          </span>
        </div>

        <!-- Items -->
        <div class="flex flex-col gap-3">
          <div
            v-for="item in trx.transaction_items || []"
            :key="item.id"
            class="flex items-center gap-4"
          >
            <img
              :src="
                item.imageUrls?.[0] ||
                'https://via.placeholder.com/100x80?text=No+Image'
              "
              alt="item"
              class="w-24 h-20 object-cover rounded"
            />
            <div>
              <h2 class="font-semibold">{{ item.title }}</h2>
              <p class="text-gray-600">
                Rp {{ item.price.toLocaleString("id-ID") }}
              </p>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="mt-4 flex items-center gap-3">
          <img
            :src="trx.payment_method?.imageUrl"
            :alt="trx.payment_method?.name"
            class="h-8"
          />
          <div>
            <p class="font-semibold">{{ trx.payment_method?.name }}</p>
            <p class="text-sm text-gray-600">
              VA: {{ trx.payment_method?.virtual_account_number }}
            </p>
            <p class="text-sm text-gray-500">
              a.n {{ trx.payment_method?.virtual_account_name }}
            </p>
          </div>
        </div>

        <!-- Total & Dates -->
        <div class="flex justify-between items-center mt-2">
          <p class="text-lg font-bold">
            Total: Rp {{ getTotal(trx).toLocaleString("id-ID") }}
          </p>
          <p class="text-sm text-gray-500">
            Expired: {{ new Date(trx.expiredDate).toLocaleString("id-ID") }}
          </p>
        </div>

        <!-- Proof Payment -->
        <div class="mt-4">
          <div v-if="trx.proofPaymentUrl">
            <p class="text-sm text-gray-600 mb-2">Bukti Pembayaran:</p>
            <a
              :href="trx.proofPaymentUrl"
              target="_blank"
              class="text-blue-500 underline"
              >{{ trx.proofPaymentUrl }}</a
            >
          </div>
          <div v-else-if="trx.status === 'pending'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload Bukti Pembayaran
            </label>
            <input
              type="file"
              accept="image/*"
              @change="e => trx._file = (e.target as HTMLInputElement).files?.[0] || null"
              class="mb-2"
            />
            <button
              @click="trx._file && uploadProof(trx.id, trx._file)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              :disabled="!trx._file"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else-if="!loading" class="text-gray-500">Belum ada transaksi</p>
  </div>
</template>
