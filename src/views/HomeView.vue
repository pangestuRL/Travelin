<script setup lang="ts">
import { onMounted } from "vue"
import { useContentStore } from "../store/content"
import CardDestination from "../components/CardDestination.vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from "swiper/modules"

const contentStore = useContentStore()

onMounted(() => {
  contentStore.fetchBanners()
  contentStore.fetchActivities()
})
</script>

<template>
  <div class="p-4">
    <div v-if="contentStore.banners.length" class="mb-8">
      <Swiper
        :modules="[Pagination, Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }"
        class="rounded-lg overflow-hidden shadow"
      >
        <SwiperSlide
          v-for="banner in contentStore.banners"
          :key="banner.id"
        >
          <img
            :src="banner.imageUrl"
            :alt="banner.name"
            class="w-full h-[400px] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <h2 class="text-2xl font-bold mb-4">Destinations</h2>
    <div
      v-if="contentStore.activities.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CardDestination
        v-for="act in contentStore.activities"
        :key="act.id"
        :id="act.id" 
        :title="act.title"
        :image="act.imageUrls && act.imageUrls.length ? act.imageUrls[0] : ''"
        :price="act.price"
        />
    </div>

    <p v-if="contentStore.loading" class="text-gray-500 mt-4">Loading...</p>
    <p v-if="contentStore.error" class="text-red-500 mt-4">{{ contentStore.error }}</p>
  </div>
</template>
