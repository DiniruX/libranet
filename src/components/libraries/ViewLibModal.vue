<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">View Library</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Name</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ name }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Contact</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ contact }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">City</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ city }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Address</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ address }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Location</span>
        <iframe
          class="w-full h-64 mt-4 rounded-md border"
          :src="getMapUrl(location)"
          style="border: 0"
          allowfullscreen="false"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
const token = ref(localStorage.getItem('token') || '')
const name = ref('')
const contact = ref('')
const city = ref('')
const address = ref('')
const location = ref('')

async function fetchLib() {
  try {
    const response = await axios.get(`${BASE_URL}/libraries/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    const lib = response.data
    if (lib) {
      name.value = lib.name || ''
      contact.value = lib.contact || ''
      city.value = lib.city || ''
      address.value = lib.address || ''
      location.value = lib.location || ''
    } else {
      console.error('Library not found')
    }
  } catch (error) {
    console.error('Error fetching book:', error)
  }
}

function getMapUrl(location: string) {
  const [lat, lon] = location.split(',')
  if (!lat || !lon) {
    console.error('Invalid location format:', location)
    return ''
  }
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lon}&zoom=15`
}

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      fetchLib()
    }
  },
  { immediate: true }
)
</script>
