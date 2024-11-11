<template>
   <Modal v-if="isModalVisible" @close="closeModal">
    <h2>Event Details</h2>
    <img :src="selectedImage" alt="Event Image" />
    <p>More details about the event...</p>
  </Modal>
  <div class="gallery-cards-wrapper">
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
    <GalleryCard/>
  </div>
</template>

<script setup lang="ts">
import GalleryCard from './GalleryCard.vue';
import { ref } from 'vue';
import Modal from './GalleryModal.vue';

const isModalVisible = ref(false);
const selectedImage = ref('');
const galleryCards = ref([
  { image: 'image1.jpg', title: 'Event 1' },
  { image: 'image2.jpg', title: 'Event 2' },
  { image: 'image3.jpg', title: 'Event 3' },
  { image: 'image4.jpg', title: 'Event 4' },
  { image: 'image5.jpg', title: 'Event 5' },
  { image: 'image6.jpg', title: 'Event 6' }
]);

// Function to open modal with selected image
const openModal = (image: string) => {
  selectedImage.value = image;
  isModalVisible.value = true;
};

// Function to close modal
const closeModal = () => {
  isModalVisible.value = false;
};
</script>

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