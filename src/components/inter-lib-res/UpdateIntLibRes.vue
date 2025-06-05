<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Update Statuses</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Status</span>
        <select
          class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          v-model="status"
        >
          <option v-for="status in fixedStatuses" :key="status.id" :value="status.id" class="whitespace-nowrap">
            {{ status.name }}
          </option>
        </select>
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize">Logistic Status</span>
        <select
          class="block w-full h-full px-4 py-2 pr-8 mb-6 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          v-model="logisticStatus"
        >
          <option v-for="status in fixedLogisticStatuses" :key="status.id" :value="status.id" class="whitespace-nowrap">
            {{ status.name }}
          </option>
        </select>
      </label>

      <!--Footer-->
      <div class="flex justify-end pt-2">
        <button
          @click="updateIntLibRes"
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
import { ref, defineProps } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  reservation_id: {
    type: Number,
    required: true,
  },
  from_library_id: {
    type: Number,
    required: true,
  },
})
const token = ref(localStorage.getItem('token') || '')
const status = ref('')
const logisticStatus = ref('')
const success = ref('')
const error = ref('')
const fixedStatuses = ref([
  {
    id: 'pending',
    name: 'pending',
  },
  {
    id: 'confirmed',
    name: 'Confirmed',
  },
  {
    id: 'cancelled',
    name: 'Cancelled',
  }
])
const fixedLogisticStatuses = ref([
  {
    id: 'pending',
    name: 'Pending',
  },
  {
    id: 'in transit',
    name: 'In transit',
  },
  {
    id: 'delivered',
    name: 'Delivered',
  }
])

async function updateIntLibRes() {
  try {
    await axios.put(
      `${BASE_URL}/inter-lib-reservations/${props.id}`,
      {
        reservation_id: props.reservation_id,
        from_library_id: props.from_library_id,
        status: status.value,
        logistic_status: logisticStatus.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    success.value = 'Statuses updated successfully'
  } catch (err) {
    console.error('Error updating reservation:', err)
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'An error occurred while updating the reservation'
    } else {
      error.value = 'An unexpected error occurred'
    }
  }
}
</script>
