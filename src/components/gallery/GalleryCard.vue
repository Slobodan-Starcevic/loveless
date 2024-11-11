<script setup lang="ts">

</script>

<template>
<div class="card-wrapper">
    <img src="images/MrLoveless90s-153.jpg" alt="">
    <div class="card-content">
        <p class="card-title">Halloween Party</p>
        <p>Saturday 26th October 2024</p>
    </div>
</div>
</template>

<style lang="scss" scoped>
.card-wrapper{
    position: relative;
    width: calc(33% - var(--spacing-2xl));
    min-width: 300px;
    height: auto;
    max-height: 600px;
    border-radius: var(--radius-l);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center; 
    cursor: pointer;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s var(--custom-ease-1);
    }

    .card-content{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-s);
        padding: var(--spacing-l);
        background-color: var(--loveless-pink);
        color: var(--loveless-black);
        .card-title{
            font-family: 'Mortend';
            font-size: var(--font-size-xl);
        }
    }

    &:hover img{
        transform: scale(1.1);
    }
}

@media screen and (max-width : 767px) {
    .card-wrapper{
        width: 90% !important;
        min-width: 0 !important;
        max-height: 100vh;
    }
}
@media screen and (min-width: 768px) and (max-width: 1079px) {
    .card-wrapper{
        width: calc(50% - var(--spacing-2xl)) !important;
        min-width: 0 !important;
    }
}
@media screen and (min-width : 1080px) {
    
}
</style>