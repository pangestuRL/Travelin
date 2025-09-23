<template>
  <RouterLink :to="`/destination/${id}`" class="block">
    <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-3">
      <img
        :src="image && image.length > 0 ? image : defaultImage"
        alt="destination"
        class="w-full h-40 object-cover rounded-lg"
      />
      <h2 class="mt-2 text-lg font-semibold">{{ title }}</h2>
      <p class="text-blue-600 font-bold">Rp {{ price.toLocaleString('id-ID') }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
const defaultImage = "https://via.placeholder.com/400x300?text=No+Image"
defineProps<{
  id: string
  title: string
  image?: string
  price: number
}>()
</script>
