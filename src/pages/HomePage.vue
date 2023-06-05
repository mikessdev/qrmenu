<script setup lang="ts">
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import HorizontalMenu from "@/components/HorizontalMenu.vue";
import Category from "@/utils/types/Category";
const data = [
    {
        title: 'Entradas e Porções',
        menuItem: [
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },

        ]
    },
    {
        title: 'Entradas e Porções',
        menuItem: [
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },

        ]
    },
    {
        title: 'Entradas e Porções',
        menuItem: [
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },
            {
                title: 'Iscas de Frango',
                description: '300g de filézinho empanado',
                valor: 'R$ 15.00'
            },

        ]
    }
] as Category[];
</script>

<template>
    <Header />
  <main>
    <Hero/>
    <HorizontalMenu :categorys="data"/>
    <p>adadsa</p>
  </main>
</template>
