<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import { validateEmptyText } from '@/validators/emptyText';
import { validateEmail } from '@/validators/email';
import { sendEmailWithBrevo, type BrevoEmailBody } from '@/utils/sendEmail';
import { useChallengeV2 } from 'vue-recaptcha';
import { reactive, ref } from 'vue';
import ErrorText from '@/components/Typography/ErrorText.vue';

const valid = ref(false);
const loading = ref(false);
const reCAPTCHAChecked = ref<Boolean>(false);
const sendButtonIsClicked = ref<Boolean>(false);

const { root, onVerify } = useChallengeV2({
  options: {
    theme: 'light',
    size: 'normal'
  }
});

const viewState = reactive({
  name: {
    value: '',
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.name.error = validateEmptyText(viewState.name.value);
      }
    }
  },
  email: {
    value: '',
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.email.error = validateEmptyText(viewState.email.value);

        if (viewState.email.value) {
          viewState.email.error = validateEmail(viewState.email.value);
        }
      }
    }
  },
  subject: {
    value: '',
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.subject.error = validateEmptyText(viewState.subject.value);
      }
    }
  },
  recaptcha: {
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.recaptcha.error = reCAPTCHAChecked.value
          ? ''
          : 'Por favor, confirme a caixa de verificação acima!';
      }
    }
  }
});

onVerify(() => {
  reCAPTCHAChecked.value = true;
  viewState.recaptcha.validator();
});

const sendEmail = async (e: Event) => {
  e.preventDefault();
  sendButtonIsClicked.value = true;
  const thereIsNoError = checkValidation();

  if (thereIsNoError) {
    loading.value = true;
    const emailBody: BrevoEmailBody = {
      sender: {
        name: viewState.name.value,
        email: viewState.email.value
      },
      to: [
        {
          email: import.meta.env.VITE_EMAIL,
          name: 'Seu Cardápio'
        }
      ],
      subject: 'Dúvida seu cardápio',
      htmlContent: `<html><head></head><body><p>${viewState.subject.value}</p></body></html>`
    };
    await sendEmailWithBrevo(emailBody);
    reCAPTCHAChecked.value = false;
  }
  loading.value = false;
};

const checkValidation = () => {
  viewState.name.validator();
  viewState.email.validator();
  viewState.subject.validator();
  viewState.recaptcha.validator();

  const nameError = viewState.name.error;
  const emailError = viewState.email.error;
  const subjectError = viewState.subject.error;
  const recaptchaError = viewState.recaptcha.error;
  const thereIsNoError = !nameError && !emailError && !subjectError && !recaptchaError;

  return thereIsNoError;
};
</script>
<template>
  <v-form ref="form" v-model="valid">
    <div class="flex flex-col gap-2">
      <BaseInput
        label="Nome"
        v-model="viewState.name.value"
        :error-messages="viewState.name.error"
        maxlength="35"
      />

      <BaseInput
        label="E-mail"
        v-model="viewState.email.value"
        :error-messages="viewState.email.error"
        maxlength="30"
      />

      <BaseInput
        :text-area="true"
        label="Mensagem"
        v-model="viewState.subject.value"
        :error-messages="viewState.subject.error"
        maxlength="600"
      />
    </div>
    <div class="mx-auto mt-[40px] flex flex-col items-center">
      <div ref="root" />
      <ErrorText v-if="viewState.recaptcha.error" :text="viewState.recaptcha.error" />

      <Button
        :loading="loading"
        class="mt-[20px]"
        type="submit"
        color="primary"
        @click="sendEmail"
        children="Enviar"
      />
    </div>
  </v-form>
</template>
