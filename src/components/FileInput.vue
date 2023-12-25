<script setup lang="ts">
import { ref, type PropType } from 'vue';

const preview = ref<any>('');

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object,
    default: {} as Object
  },
  errorMessage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'validate']);

const changeImagePreview = (file: File): void => {
  const reader = new FileReader();

  reader.onload = (e) => {
    preview.value = e.target?.result;
  };

  reader.readAsDataURL(file);
};

const handleInput = (e: any): void => {
  const file: File = e.target.files[0];
  changeImagePreview(file);
  emit('update:modelValue', file ?? ({} as File));
  emit('validate');
};
</script>
<template>
  <form class="flex flex-col items-center">
    <div class="mb-[20px]">
      <img
        v-if="preview"
        class="h-30 w-30 rounded-lg object-cover"
        :src="preview"
        alt="Current product photo"
      />
      <img
        v-else
        class="h-30 w-30 rounded-lg object-cover"
        src="@/assets/img/withoutProfile.png"
        alt="Banner image"
      />
    </div>
    <label class="mb-[20px] block">
      <span class="sr-only">Choose profile photo</span>
      <input
        type="file"
        class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:font-notosans file:text-base file:font-bold file:text-qr-primary-orange hover:file:bg-violet-100"
        @change="handleInput"
      />
    </label>
    <label class="pl-[6px] font-notosans font-bold text-qr-primary-orange">
      {{ props.errorMessage }}
    </label>
  </form>

  <!-- <div v-if="props.showPreview">
    <img :src="preview" alt="" />
  </div>
  <div class="mt-[10px] flex w-full flex-col">
    <label class="font-base pl-[6px] font-notosans font-bold text-qr-bit-light-gray">
      {{ props.label }}
    </label>
    <input type="file" @change="(e) => handleInput(e)" />
    <label class="pl-[6px] font-notosans font-bold text-qr-primary-orange">
      {{ props.errorMessage }}
    </label>
  </div> -->
</template>
<style lang="scss" scoped></style>
