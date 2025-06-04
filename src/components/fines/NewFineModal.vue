<template>
  <div>
    <!-- Add margin if you want to see some of the overlay behind the modal-->
    <div class="px-6 py-4 text-left modal-content">
      <!--Title-->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Add Fine</p>
        <div class="z-50 cursor-pointer modal-close" @click="false">
          <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>

      <!--Body-->
      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Reason</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="reason"
        />
      </label>

      <label class="block">
        <span class="text-sm text-gray-700 capitalize font-semibold">Amount</span>
        <input
          type="text"
          class="block w-full mt-1 mb-6 border px-4 py-2 border-gray-400 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 text-sm"
          v-model="amount"
        />
      </label>

      <!--Footer-->
      <div class="flex justify-end pt-2">
        <button
          @click="addFineToReservation"
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
import { ref, defineProps } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  due_date: {
    type: String,
    required: true,
  },
})
const token = ref(localStorage.getItem('token') || '')
const success = ref('')
const error = ref('')
const reason = ref('')
const amount = ref('')

function addFineToReservation() {
  try {
    axios.post(
      `${BASE_URL}/fines`,
      {
        reservation_id: props.id,
        reason: reason.value,
        amount: amount.value,
        status: 'unpaid',
        dueDate: props.due_date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    success.value = 'Fine added successfully'
  } catch (err) {
    console.error('Error adding fine:', err)
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'An error occurred while adding the fine'
    } else {
      error.value = 'An unexpected error occurred'
    }
  }
}

</script>
