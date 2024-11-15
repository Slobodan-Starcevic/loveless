<script setup lang="ts">
  import GalleryCard from './GalleryCard.vue';
  import { ref } from 'vue';
  import Modal from './GalleryModal.vue';
  import type { Event } from '../../types/event';
 
  const isModalVisible = ref(false);
  const selectedImage = ref('');
  const props = defineProps({
    eventsCollection: {
      type: Array<Event>,
      required: true
    }
  });

  const openModal = (image: string) => {
    selectedImage.value = image;
    isModalVisible.value = true;
  };

  const closeModal = () => {
    isModalVisible.value = false;
  };
</script>

<template>
  <Modal v-if="isModalVisible" @close="closeModal">
    <h2>Event Details</h2>
    <img :src="selectedImage" alt="Event Image" />
    <p>More details about the event...</p>
  </Modal>

  <div class="gallery-cards-wrapper">
    <GalleryCard
      v-for="(event, index) in props.eventsCollection"
      :key="index"
      :event="event"
      @select="openModal"
    />
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