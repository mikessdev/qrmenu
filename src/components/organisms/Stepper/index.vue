<script lang="ts" setup>
import type { PropType, Component } from 'vue';
import { ref } from 'vue';

interface Section {
  title: string;
  subTitle: string;
  Component: Component;
  ok: boolean;
  props?: Record<string, any>;
}

const props = defineProps({
  sections: {
    type: Array as PropType<Section[]>,
    default: () => []
  }
});

const step = ref(1);

const next = () => {
  if (step.value < props.sections.length) {
    step.value++;
  }
};

const previous = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const nextButtonIsDisabled = () => {
  return false;
};

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
    <v-stepper-header class="remove-shadow flex w-full flex-col justify-center">
      <div class="flex w-full flex-row gap-1">
        <div v-for="(section, index) in sections" class="flex w-full justify-center" :key="index">
          <div
            class="h-[6px] w-full rounded-xl bg-green-400"
            :style="{ backgroundColor: `${colorMapper[resolveStepStatus(index + 1)]}` }"
          ></div>
        </div>
      </div>

      <div class="flex w-full justify-evenly">
        <v-stepper-item
          v-for="({ title }, index) in sections"
          :key="index"
          :value="index + 1"
          :complete="step > index + 1"
        >
          <div class="flex flex-row gap-1">
            <v-icon :color="colorMapper[resolveStepStatus(index + 1)]">{{
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
        v-for="({ title, subTitle, Component }, index) in sections"
        :key="index"
        :value="index + 1"
      >
        <p class="text-h4 text-center">{{ title }}</p>
        <p class="text-subtitle-1 text-center">{{ subTitle }}</p>
        <component :is="Component"></component>

        <v-card-actions class="justify-space-between mt-6">
          <v-btn v-if="step > 1" variant="outlined" color="grey" @click="step--"> Voltar </v-btn>
          <v-spacer />
          <v-btn v-if="step < sections.length" color="deep-purple-accent-4" @click="step++">
            Próximo
          </v-btn>
          <v-btn v-else color="green-darken-2" @click="$emit('finish')"> Finalizar </v-btn>
        </v-card-actions>
      </v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<style>
.remove-shadow {
  box-shadow: none !important;
}
.v-stepper--alt-labels .v-stepper-item {
  padding: 6px 0px !important;
  align-items: start !important;
  flex-direction: row !important;
  gap: 6px;
}

.v-stepper-item__avatar {
  display: none !important;
}
</style>
