<script setup lang="ts">
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';
import BaseInput from '@/components/BaseInput.vue';
import Footer from '@/components/Footer.vue';
import { reactive, ref } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import { validateEmail } from '@/validators/email';
import { sendEmailWithBrevo, type BrevoEmailBody } from '@/utils/sendEmail';
import { useChallengeV2 } from 'vue-recaptcha';

const reCAPTCHAChecked = ref<Boolean>(false);
const sendButtonIsClicked = ref<Boolean>(false);
const fixedHeader = ref<Boolean>(true);

const sendEmail = async (e: Event) => {
  e.preventDefault();
  sendButtonIsClicked.value = true;
  const thereIsNoError = validFilds();

  if (thereIsNoError) {
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
};

const validFilds = () => {
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

const viewState = reactive({
  name: {
    value: '',
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.name.error = validateEmptyText(viewState.name.value)
          ? 'Você precisa preencher o campo do seu nome!'
          : '';
      }
    }
  },
  email: {
    value: '',
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.email.error = validateEmptyText(viewState.email.value)
          ? 'Você precisa preencher o campo do seu E-mail!'
          : '';

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
        viewState.subject.error = validateEmptyText(viewState.subject.value)
          ? 'Você precisa preencher o campo de mensagem!'
          : '';
      }
    }
  },
  recaptcha: {
    error: '',
    validator: () => {
      if (sendButtonIsClicked.value) {
        viewState.recaptcha.error = reCAPTCHAChecked.value
          ? ''
          : 'Você precisa marcar a caixinha de verificação acima!';
      }
    }
  }
});

const { root, onVerify } = useChallengeV2({
  options: {
    theme: 'light',
    size: 'normal'
  }
});

onVerify(() => {
  reCAPTCHAChecked.value = true;
  viewState.recaptcha.validator();
});
</script>

<template>
  <Header :fixed="fixedHeader as boolean" />
  <section
    :class="fixedHeader ? 'h-[660px] pt-[60px]' : 'h-[600px]'"
    class="w-full overflow-hidden bg-qr-primary-orange px-[20px]"
  >
    <div class="relative mx-auto my-0 flex max-w-[1200px]">
      <div class="absolute left-0 z-10 mt-[60px] max-w-[600px] text-white">
        <h1 class="text-5xl font-bold">Crie seu cardápio personalizado de forma gratuita</h1>
        <p class="mb-[60px] mt-[40px] max-w-[380px] font-notosans text-xl">
          Nós entendemos o quanto um cardápio bem elaborado pode fazer a diferença no seu negócio ou
          na sua experiência culinária, e é por isso que estamos aqui para ajudar.
        </p>
        <router-link to="/register">
          <Button label="Cadastre-se Grátis" />
        </router-link>
      </div>
      <img class="absolute right-[-80px] top-[10px]" src="@/assets/img/hero.png" />
    </div>
  </section>
  <section class="h-[600px] w-full bg-qr-light-gray px-[20px]">
    <div class="mx-auto my-0 flex max-w-[1200px] flex-col items-center text-center">
      <h2 class="mb-[20px] mt-[40px] text-5xl font-bold">Crie. Personalize. Compartilhe</h2>
      <p class="mb-[40px] max-w-[900px] font-notosans text-xl">
        Nossa plataforma intuitiva e fácil de usar permite que você crie cardápios personalizados em
        questão de minutos, sem a necessidade de conhecimento em design gráfico.
      </p>
      <iframe
        class="h-[315px] w-[560px] md:h-[200px] md:w-[400px]"
        src="https://www.youtube.com/embed/9xht4JIOfjU?si=tfhhzH_A6jUZdbYs"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </section>

  <section class="h-[600px] w-full overflow-hidden bg-qr-medium-gray px-[20px]">
    <div class="relative mx-auto my-0 flex max-w-[1200px]">
      <div class="z-10 flex h-[600px] flex-col">
        <h3
          class="mb-[20px] mt-[40px] max-w-[600px] text-left text-5xl font-bold text-qr-primary-orange"
        >
          Com o Qr code, tudo fica mais fácil.
        </h3>
        <p class="mb-[60px] max-w-[460px] font-notosans text-xl">
          Gere o qr code no app ou no site, e compartilhe facilmente com os seus clientes.
        </p>
        <img class="w-[200px]" src="@/assets/img/qrcode.png" />
      </div>
      <img class="absolute right-[60px] mt-[40px] w-[320px]" src="@/assets/img/phone.png" />
    </div>
  </section>
  <section class="w-full bg-qr-light-gray px-[20px] pb-[60px]">
    <div class="mx-auto my-0 flex max-w-[1200px] flex-col items-center">
      <p class="my-[60px] max-w-[750px] text-center font-notosans text-xl text-black">
        Se você está pronto para elevar a apresentação do seu cardápio a um nível totalmente novo,
        comece agora mesmo no <strong class="text-qr-primary-orange">Seu Cardápio.</strong>
      </p>
      <div class="flex w-full justify-between">
        <div class="max-w-[300px] text-center">
          <p class="text-5xl font-bold text-qr-primary-orange">Grátis</p>
          <br />
          <p class="font-notosans text-xl text-black">
            Pode usar a vontade sem custos necessários.
          </p>
        </div>
        <div class="max-w-[300px] text-center">
          <p class="text-5xl font-bold text-qr-primary-orange">Rápido</p>
          <br />
          <p class="font-notosans text-xl text-black">
            Em pouco minutos seu cardápio está pronto para ser compartilhado para seus clientes.
          </p>
        </div>
        <div class="max-w-[300px] text-center">
          <p class="font-notosans text-5xl font-bold text-qr-primary-orange">Fácil</p>
          <br />
          <p class="text-xl text-black">
            Qualquer pessoa consegue criar um cardápio sem conhecimento em design ou em criação de
            sites.
          </p>
        </div>
      </div>
      <div class="my-[60px] h-[6px] w-full rounded-[100px] bg-qr-primary-orange"></div>
      <h2 class="text-5xl font-bold text-qr-primary-orange">Contato</h2>
      <p class="my-[40px] text-center text-xl text-black">
        Você tem mais alguma dúvida? Por favor, entre em contato.
      </p>
      <form class="flex w-[70%] flex-col">
        <BaseInput
          label="Nome"
          maxlength="35"
          :errorMessage="viewState.name.error"
          v-model="viewState.name.value"
          @validate="viewState.name.validator"
        />
        <BaseInput
          label="E-mail"
          maxlength="35"
          :errorMessage="viewState.email.error"
          v-model="viewState.email.value"
          @validate="viewState.email.validator"
        />
        <BaseInput
          label="Mensagem"
          :textArea="true"
          maxlength="600"
          :errorMessage="viewState.subject.error"
          v-model="viewState.subject.value"
          @validate="viewState.subject.validator"
        />
        <div class="mx-auto mt-[40px] flex flex-col items-center">
          <div ref="root" />
          <span
            v-if="viewState.recaptcha.error"
            class="pl-[6px] font-notosans font-bold text-qr-primary-orange"
          >
            {{ viewState.recaptcha.error }}
          </span>

          <Button
            class="mt-[40px]"
            label="Enviar"
            type="submit"
            @click="(e) => sendEmail(e)"
            variante="secundary"
          />
        </div>
      </form>
    </div>
  </section>
  <Footer />
</template>

<style lang="scss" scoped></style>
