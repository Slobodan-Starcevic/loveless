<script setup lang="ts">
import GalleryCard from './GalleryCard.vue';


</script>

<template>
  <div class="gallery-cards-wrapper">
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
  </div>
</template>

<style lang="scss" scoped>
  .gallery-cards-wrapper{
    width: 100%;
    max-width: 1600px;
    height: max-content;
    margin: 0 auto;
    padding: var(--spacing-2xl);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2xl);
  }

  @media screen and (max-width : 767px) {
    .gallery-cards-wrapper{
      padding: 0;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1079px) {
      
  }
  @media screen and (min-width : 1080px) {
      
  }
  </style>