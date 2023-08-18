<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="hero">
        <div class="logo">
            <img src="@/assets/img/logoRestaurant.png" alt="Logo">
        </div>
        <h1>Cardápio de Hoje</h1>
        <div class="banner">
            <img src="@/assets/img/restaurantBanner.png" alt="Banner">
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .hero {
        font-family: 'Noto Sans';
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 20px 0 15px;
        .logo img{
            max-width: 130px;
        }
        h1 {
            font-size: 1.2rem;
            margin: 20px 0;
        }
        .banner img {
            width: 100%;
        }
    }
</style>