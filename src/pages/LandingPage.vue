<script setup lang="ts">
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';
import BaseInput from '@/components/BaseInput.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Header />
  <section class="h-[600px] w-full overflow-hidden bg-qr-primary-orange px-[20px]">
    <div class="relative mx-auto my-0 flex max-w-[1200px]">
      <div class="absolute left-0 z-10 mt-[60px] max-w-[600px] font-notosans text-white">
        <h1 class="text-5xl font-bold">Crie o seu cardápio personalizado de forma gratuita</h1>
        <p class="mb-[60px] mt-[40px] max-w-[380px] text-xl">
          Nós entendemos o quanto um cardápio bem elaborado pode fazer a diferença no seu negócio ou
          na sua experiência culinária, e é por isso que estamos aqui para ajudar.
        </p>
        <router-link to="/register">
          <Button :label="'Cadastre-se Grátis'" />
        </router-link>
      </div>
      <img class="absolute right-[-80px] top-[-50px]" src="@/assets/img/hero.png" />
    </div>
  </section>
  <section class="h-[600px] w-full bg-qr-light-gray px-[20px]">
    <div class="mx-auto my-0 flex max-w-[1200px] flex-col items-center text-center">
      <h2 class="mb-[20px] mt-[40px] text-5xl font-bold">Crie. Personalize. Compartilhe</h2>
      <p class="mb-[60px] max-w-[900px] font-notosans text-xl">
        Nossa plataforma intuitiva e fácil de usar permite que você crie cardápios personalizados em
        questão de minutos, sem a necessidade de conhecimento em design gráfico.
      </p>
      <iframe
        width="560"
        height="315"
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
        <img class="mx-auto my-0 w-[200px]" src="@/assets/img/qrcode.png" />
      </div>
      <img class="absolute right-[60px] mt-[40px] w-[320px]" src="@/assets/img/phone.png" />
    </div>
  </section>
  <section class="w-full bg-qr-light-gray px-[20px] pb-[60px]">
    <div class="mx-auto my-0 flex max-w-[1200px] flex-col items-center">
      <p class="my-[60px] max-w-[750px] font-notosans text-xl text-black">
        Se você está pronto para elevar a apresentação do seu cardápio a um nível totalmente novo,
        comece agora mesmo no <strong class="text-qr-primary-orange">Seu Cardápio.</strong>
      </p>
      <div class="flex w-full justify-between">
        <div class="max-w-[300px] text-center font-notosans">
          <p class="text-5xl font-bold text-qr-primary-orange">Grátis</p>
          <br />
          <p class="text-xl text-black">Pode usar a vontade sem custos necessários.</p>
        </div>
        <div class="max-w-[300px] text-center font-notosans">
          <p class="text-5xl font-bold text-qr-primary-orange">Rápido</p>
          <br />
          <p class="text-xl text-black">
            Em pouco minutos seu cardápio está pronto para ser compartilhado para seus clientes.
          </p>
        </div>
        <div class="max-w-[300px] text-center font-notosans">
          <p class="text-5xl font-bold text-qr-primary-orange">Fácil</p>
          <br />
          <p class="text-xl text-black">
            Qualquer pessoa consegue criar um cardápio sem conhecimento em design ou em criação de
            sites.
          </p>
        </div>
      </div>
      <div class="my-[60px] h-[6px] w-full rounded-[100px] bg-qr-primary-orange"></div>
      <h2 class="text-5xl font-bold text-qr-primary-orange">Contato</h2>
      <p class="my-[40px] text-xl text-black">
        Você tem mais alguma dúvida? Por favor, entre em contato.
      </p>
      <form class="flex w-[70%] flex-col">
        <BaseInput label="Nome" maxlength="35" />
        <BaseInput label="E-mail" maxlength="35" />
        <BaseInput label="Mensagem" :textArea="true" maxlength="600" />
      </form>
    </div>
  </section>
  <Footer />
</template>

<style lang="scss" scoped></style>
