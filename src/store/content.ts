import { defineStore } from "pinia"

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1"
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c"

export const useContentStore = defineStore("content", {
  state: () => ({
    banners: [] as any[],
    activities: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchBanners() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`${BASE_URL}/banners`, {
          headers: { "apiKey": API_KEY },
        })
        if (!res.ok) throw new Error("Gagal fetch banners")
        const data = await res.json()
        this.banners = data.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchActivities() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`${BASE_URL}/activities`, {
          headers: { "apiKey": API_KEY },
        })
        if (!res.ok) throw new Error("Gagal fetch activities")
        const data = await res.json()
        this.activities = data.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})
