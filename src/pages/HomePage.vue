<script setup lang="ts">
import HorizontalMenu from "../components/HorizontalMenu.vue";
import Category from "../utils/types/Category";

const menu = 
[
    {
    id: 1,
    title: 'Entradas e Porções',
    show: true
    },
    {
    id: 2,
    title: 'Prato Principal',
    show: false
    },
    {
    id: 3,
    title: 'Lanches',
    show: false
    },
    {
    id: 4,
    title: 'Bebidas',
    show: false
    }
]

const items = {
    id: 1,
    items: [
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


</script>

<template>
  <main>
    <HorizontalMenu :menu="menu" items="items"/>
    <p>adadsa</p>
  </main>
</template>
