<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">View Book</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Cover Image</span>
        <img v-if="cover_image" :src="cover_image ? `data:image/png;base64,${cover_image}` : ''" class="mb-6 w-full h-48 object-cover rounded-md" />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Title</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ title }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Author</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ author }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Description</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ description }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Genre</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ genre }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Floor</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ floor }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Shelf</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ shelf }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">ISBN</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ isbn }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Status</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ status }}</p>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Library</span>
        <p class="block mt-1 mb-6 text-sm text-gray-600">{{ getLibraryName(library) }}</p>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

interface Library {
  id: string | number
  name: string
}
const libraries = ref<Library[]>([])
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
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
const library = ref('')

async function fetchBook() {
  try {
    const response = await axios.get(`${BASE_URL}/books/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    const book = response.data
    if (book) {
      cover_image.value = book.cover_image || ''
      title.value = book.title || ''
      author.value = book.author || ''
      description.value = book.description || ''
      genre.value = book.genre || ''
      floor.value = book.floor || ''
      shelf.value = book.shelf || ''
      isbn.value = book.isbn || ''
      status.value = book.status || ''
      library.value = book.library_id || ''
    }
  } catch (error) {
    console.error('Error fetching book:', error)
  }
}

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

onMounted(async () => {
  await fetchLibraries()
})

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      fetchBook()
    }
  },
  { immediate: true }
)

function getLibraryName(libraryId: string | number): string {
  const library = libraries.value.find(lib => lib.id === libraryId)
  return library ? library.name : 'Unknown Library'
}
</script>
