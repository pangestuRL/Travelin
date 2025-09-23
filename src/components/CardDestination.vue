<template>
  <RouterLink :to="`/destination/${id}`" class="block">
    <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-3">
      <img
        :src="image && image.length > 0 ? image : defaultImage"
        alt="destination"
        class="w-full h-40 object-cover rounded-lg"
        @error="onError"
      />
      <h2 class="mt-2 text-lg font-semibold">{{ title }}</h2>
      <p class="text-blue-600 font-bold">
        Rp {{ price.toLocaleString('id-ID') }}
      </p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
const defaultImage = "https://static.vecteezy.com/system/resources/previews/025/871/533/non_2x/travel-destination-background-and-template-design-with-travel-destinations-and-famous-landmarks-and-attractions-for-tourism-let-s-go-travel-illustration-vector.jpg"

defineProps<{
  id: string
  title: string
  image?: string
  price: number
}>()

const onError = (event: Event) => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.src = defaultImage
  }
}
</script>
