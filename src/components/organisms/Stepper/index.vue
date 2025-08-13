<script lang="ts" setup>
import type { PropType, Component } from 'vue';
import { ref } from 'vue';

interface Section {
  title: string;
  subTitle: string;
  Component: Component;
  checkValidation: Function;
  model?: Record<string, any>;
}

const props = defineProps({
  sections: {
    type: Array as PropType<Section[]>,
    default: () => []
  },
  busy: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['finish']);

const step = ref(1);

const resolveStepStatus = (currentStep: number) => {
  if (currentStep > step.value) return 'next';
  if (currentStep < step.value) return 'completed';

  return 'current';
};

const iconMapper = {
  completed: 'mdi-check-circle',
  current: 'mdi-circle-slice-8',
  next: 'mdi-circle-outline'
};

const colorMapper = {
  completed: '#40C351',
  current: '#F85D3A',
  next: '#8792A2'
};
</script>
<template>
  <v-stepper class="remove-shadow" v-model="step" alt-labels hide-actions>
    <v-stepper-header class="remove-shadow">
      <div class="flex w-full justify-center">
        <v-stepper-item
          class="resete-v-stepper-item"
          v-for="({ title }, index) in sections"
          :key="index"
          :value="index + 1"
          :complete="step > index + 1"
        >
          <div
            class="h-[6px] w-full rounded-xl"
            :style="{
              backgroundColor: `${colorMapper[resolveStepStatus(index + 1)]}`
            }"
          ></div>
          <div class="align-center flex flex-row gap-1">
            <v-icon size="16" :color="colorMapper[resolveStepStatus(index + 1)]">{{
              iconMapper[resolveStepStatus(index + 1)]
            }}</v-icon>
            <p class="text-subtitle-1 text-center">{{ title }}</p>
          </div>
        </v-stepper-item>
      </div>
    </v-stepper-header>
    <v-divider :thickness="4" class="mt-[20px] border-opacity-100"></v-divider>

    <v-stepper-window>
      <v-stepper-window-item
        v-for="({ title, subTitle, Component, model }, index) in sections"
        :key="index"
        :value="index + 1"
        class="flex min-h-[600px] w-full flex-col justify-between"
      >
        <div class="flex flex-col items-center">
          <p class="text-h4 mt-[40px] text-center">{{ title }}</p>
          <p class="text-subtitle-2 mb-[30px] mt-[20px] text-center">{{ subTitle }}</p>
          <component :is="Component" v-bind="model" class="w-full"></component>
        </div>

        <v-card-actions class="justify-space-between mt-6">
          <v-btn v-if="step > 1" variant="outlined" @click="step--"> Voltar </v-btn>
          <v-spacer />
          <v-btn
            v-if="step < sections.length"
            :disabled="props.sections[step - 1].checkValidation()"
            variant="elevated"
            color="primary"
            @click="step++"
          >
            Próximo
          </v-btn>
          <v-btn
            v-else
            variant="elevated"
            :disabled="props.busy || props.sections[step - 1].checkValidation()"
            color="primary"
            @click="$emit('finish')"
            :loading="props.busy"
          >
            Finalizar
          </v-btn>
        </v-card-actions>
      </v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<style scoped lang="scss">
.remove-shadow {
  box-shadow: none !important;
}

.resete-v-stepper-item {
  padding: 0px !important;
  gap: 6px;
  opacity: 1 !important;
  flex-basis: 0 !important;
  flex: 1 !important;
}

.resete-v-stepper-item ::v-deep(.v-stepper-item__content) {
  width: 98% !important;
}

.resete-v-stepper-item ::v-deep(.v-stepper-item__avatar) {
  display: none !important;
}
</style>
