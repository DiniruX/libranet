<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Update Library</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Name</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="name"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Contact</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="contact"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">City</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="city"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Address</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="address"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Location</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="location"
        />
      </label>

      <!--Footer-->
      <div class="flex justify-end pt-2">
        <button
          @click="updateLib"
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        >
          Update
        </button>
      </div>
      <div v-if="success" class="mt-1 text-green-600 w-full text-right text-sm font-semibold">
        {{ success }}
      </div>
      <div v-if="error" class="mt-1 text-red-600 w-full text-right text-sm font-semibold">
        {{ error }}
      </div>
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
const success = ref('')
const error = ref('')

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
    }
  } catch (error) {
    console.error('Error fetching library:', error)
  }
}

async function updateLib() {
  success.value = ''
  error.value = ''
  try {
    await axios.put(
      `${BASE_URL}/libraries/${props.id}`,
      {
        name: name.value,
        contact: contact.value,
        city: city.value,
        address: address.value,
        location: location.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    success.value = 'Library updated successfully'
  } catch (err) {
    console.error('Error updating library:', err)
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'An error occurred while updating the library'
    } else {
      error.value = 'An unexpected error occurred'
    }
  }
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
