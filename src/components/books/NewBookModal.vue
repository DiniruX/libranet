<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Add Book</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Cover Image</span>
        <input
          type="file"
          class="block w-full mt-1 mb-2 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          @change="handleCoverImageChange"
          accept="image/*"
        />
        <img v-if="cover_image" :src="cover_image" alt="Cover Image" class="mb-6 w-32 h-32 object-cover rounded-md" />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Title</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="title"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Author</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="author"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Description</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="description"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Genre</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="genre"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Floor</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="floor"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Shelf</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="shelf"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">ISBN</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="isbn"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Status</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="status"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Library</span>
        <select
          class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          v-model="library_id"
        >
          <option v-for="lib in libraries" :key="lib.id" :value="lib.id" class="whitespace-nowrap">
            {{ lib.name }}
          </option>
        </select>
      </label>

      <!--Footer-->
      <div class="flex justify-end pt-2">
        <button
          @click="saveBook"
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        >
          Add
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

interface Library {
  id: string | number
  name: string
}
const libraries = ref<Library[]>([])
const token = ref(localStorage.getItem('token') || '')
const cover_image = ref('')
const title = ref('')
const author = ref('')
const description = ref('')
const genre = ref('')
const floor = ref('')
const shelf = ref('')
const isbn = ref('')
const status = ref('')
const library_id = ref('')
const success = ref('')
const error = ref('')

async function fetchLibraries() {
  try {
    const response = await axios.get(`${BASE_URL}/libraries`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    libraries.value = response.data || []
  } catch (error) {
    console.error('Error fetching libraries:', error)
    return []
  }
}

function handleCoverImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      cover_image.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

async function saveBook() {
  success.value = ''
  error.value = ''
  try {
    const formData = new FormData()
    if (cover_image.value) {
      const blob = await fetch(cover_image.value).then((r) => r.blob())
      formData.append('cover_image', blob, 'cover_image.jpg')
    }
    formData.append('title', title.value)
    formData.append('author', author.value)
    formData.append('description', description.value)
    formData.append('genre', genre.value)
    formData.append('floor', floor.value)
    formData.append('shelf', shelf.value)
    formData.append('isbn', isbn.value)
    formData.append('status', status.value)
    formData.append('library_id', library_id.value)

    await axios.post(`${BASE_URL}/books`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token.value}`,
      },
    })
    success.value = 'Book added successfully'
  } catch (err) {
    console.error('Error adding book:', err)
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'An error occurred while adding the book'
    } else {
      error.value = 'An unexpected error occurred'
    }
  }
}

onMounted(async () => {
  await fetchLibraries()
})
</script>
