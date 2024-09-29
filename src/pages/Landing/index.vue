<script setup lang="ts">
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';
import Contact from '@/pages/Landing/Contact/index.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';
import { useAuthComposable } from '@/composables/useAuthComposable';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const { isAuthenticated } = useAuthComposable();
const authStore = useAuthStore();
const router = useRouter();

const fixedHeader = ref<Boolean>(true);

const headerItens = computed(() => {
  return [
    {
      id: 1,
      text: 'Cardápios',
      action: () => router.push('/select-menu'),
      show: isAuthenticated.value
    },
    {
      id: 1,
      text: 'Sair',
      action: async () => {
        await authStore.signOutWithFirebase();
        isAuthenticated.value = false;
      },
      show: isAuthenticated.value
    },
    {
      id: 2,
      text: 'Acessar',
      action: () => router.push('/login'),
      show: !isAuthenticated.value
    }
  ];
});
</script>

<template>
  <div>
    <Header :fixed="fixedHeader as boolean" :header-itens="headerItens" />
    <section
      :class="fixedHeader ? 'h-[760px] py-[60px]' : ' h-[700px]'"
      class="w-full overflow-hidden bg-qr-primary-orange px-[20px]"
    >
      <div class="relative mx-auto my-0 flex max-w-[1200px]">
        <div class="absolute left-0 z-10 mt-[60px] max-w-[600px] text-white">
          <h1 class="title">Crie seu cardápio personalizado de forma gratuita</h1>
          <p class="paragraph mb-[60px] mt-[40px] max-w-[380px]">
            Nós entendemos o quanto um cardápio bem elaborado pode fazer a diferença no seu negócio
            ou na sua experiência culinária, e é por isso que estamos aqui para ajudar.
          </p>
          <router-link v-if="!isAuthenticated" to="/register">
            <Button data-cy="btn-redirect-to-register" children="Cadastre-se Grátis" />
          </router-link>
          <router-link v-else to="/select-menu">
            <Button data-cy="btn-redirect-to-register" children="Criar cardápio" />
          </router-link>
        </div>
        <img
          class="absolute right-[-280px] top-[250px] scale-[1.2] mobile:right-[-250px] mobile:top-[500px] mobile:scale-[2.0]"
          src="@/assets/img/hero.png"
        />
      </div>
    </section>
    <section class="h-[600px] w-full bg-qr-light-gray px-[20px]">
      <div
        class="mx-auto my-0 flex h-[100%] max-w-[1200px] flex-col items-center justify-center text-center"
      >
        <div>
          <h2 class="title mb-[20px] mt-[40px]">Crie. Personalize. Compartilhe</h2>
          <p class="paragraph mb-[40px] max-w-[900px]">
            Nossa plataforma intuitiva e fácil de usar permite que você crie cardápios
            personalizados em questão de minutos, sem a necessidade de conhecimento em design
            gráfico.
          </p>
        </div>
        <iframe
          class="mb-[30px] h-[100%] max-h-[315px] w-[80%] max-w-[560px]"
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
            class="title mb-[20px] mt-[40px] max-w-[600px] text-left text-qr-primary-orange mobile:text-center"
          >
            Com o Qr code, tudo fica mais fácil.
          </h3>
          <p class="paragraph mb-[60px] max-w-[460px] mobile:text-center">
            Gere o qr code no app ou no site, e compartilhe facilmente com os seus clientes.
          </p>
        </div>
        <img
          class="absolute right-[-16px] top-[175px] mt-[40px] w-[360px] mobile:top-[240px] mobile:w-[300px]"
          src="@/assets/img/phone.png"
        />
      </div>
    </section>
    <section class="w-full bg-qr-light-gray px-[20px] pb-[60px]">
      <div class="mx-auto my-0 flex max-w-[1200px] flex-col items-center">
        <p class="paragraph my-[60px] max-w-[750px] text-center text-black">
          Se você está pronto para elevar a apresentação do seu cardápio a um nível totalmente novo,
          comece agora mesmo no <strong class="text-qr-primary-orange">Seu Cardápio.</strong>
        </p>
        <div
          class="flex w-full justify-between mobile:flex-col mobile:items-center mobile:gap-[30px] tablet:flex-col tablet:items-center tablet:gap-[30px]"
        >
          <div class="max-w-[300px] text-center">
            <p class="title text-qr-primary-orange">Rápido</p>
            <br />
            <p class="paragraph text-black">
              Em pouco minutos seu cardápio está pronto para ser compartilhado para seus clientes.
            </p>
          </div>
          <div class="max-w-[300px] text-center">
            <p class="title text-qr-primary-orange">Grátis</p>
            <br />
            <p class="paragraph text-black">Pode usar a vontade sem custos necessários.</p>
          </div>
          <div class="max-w-[300px] text-center">
            <p class="title font-notosans text-qr-primary-orange">Fácil</p>
            <br />
            <p class="paragraph text-black">
              Qualquer pessoa consegue criar um cardápio sem conhecimento em design ou em criação de
              sites.
            </p>
          </div>
        </div>
        <div class="my-[60px] h-[6px] w-full rounded-[100px] bg-qr-primary-orange"></div>
        <h2 class="title text-qr-primary-orange">Contato</h2>
        <Contact />
      </div>
    </section>
    <Footer />
  </div>
</template>

<style lang="scss" scoped></style>
