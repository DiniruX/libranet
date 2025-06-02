<template>
  <div>
    <div v-if="props.status === 'pending'" class="mb-6 text-gray-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">Pending</span>
    </div>
    <div v-else-if="props.status === 'confirmed'" class="mb-6 text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Confirmed</span>
    </div>
    <div v-else-if="props.status === 'cancelled'" class="mb-6 text-yellow-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Cancelled</span>
    </div>
    <div v-else-if="props.status === 'expired'" class="mb-6 text-rose-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-rose-800 bg-rose-100 rounded-full">Expired</span>
    </div>
    <div v-else-if="props.status === 'available'" class="mb-6 text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Available</span>
    </div>
    <div v-else-if="props.status === 'checked out'" class="mb-6 text-fuchsia-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-fuchsia-80text-fuchsia-100 rounded-full">Checked out</span>
    </div>
    <div v-else-if="props.status === 'reserved'" class="mb-6 text-yellow-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Reserved</span>
    </div>
    <div v-else-if="props.status === 'damaged'" class="mb-6 text-red-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Damaged</span>
    </div>
    <div v-else-if="props.status === 'lost'" class="mb-6 text-gray-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">Lost</span>
    </div>
    <div v-else-if="props.status === 'paid'" class="mb-6 text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Paid</span>
    </div>
    <div v-else-if="props.status === 'unpaid'" class="mb-6 text-red-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Unpaid</span>
    </div>
    <div v-else-if="props.status === 'in transit'" class="mb-6 text-amber-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-amber-800 bg-amber-100 rounded-full">In transit</span>
    </div>
    <div v-else-if="props.status === 'delivered'" class="mb-6 text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Delivered</span>
    </div>
    <div v-else-if="props.status === 'active'" class="mb-6 text-green-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
    </div>
    <div v-else-if="props.status === 'inactive'" class="mb-6 text-red-600">
      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Inactive</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})
</script>
