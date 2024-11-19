<script setup lang="ts">
  import GalleryCard from './GalleryCard.vue';
  import { onMounted, ref } from 'vue';
  import type { EventProps } from '../../types/event';
  import ImageModal from '../ImageModal.vue';
 
  const isModalVisible = ref(false);
  const selectedEvent = ref<EventProps | undefined>(undefined);
  const props = defineProps<{
    eventsCollection: Array<EventProps>;
  }>();

  const openModal = (id: string) => {
    selectedEvent.value = props.eventsCollection.find(event => event.id === id) || undefined;
    isModalVisible.value = true;
  };

  const closeModal = () => {
    isModalVisible.value = false;
  };
</script>

<template>
  <teleport to="body">
    <ImageModal 
    v-if="isModalVisible"
    :eventImages="selectedEvent?.data.images" 
    @close="closeModal"
    />
  </teleport>

  <div class="gallery-cards-wrapper">
    <GalleryCard
      v-for="(event, index) in props.eventsCollection"
      :key="index"
      :event="event"
      @event-choice="openModal"
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
    justify-content: flex-start;
    gap: var(--spacing-2xl);
  }

  @media screen and (max-width : 767px) {
    .gallery-cards-wrapper{
      padding: 0;
      justify-content: center !important;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1079px) {
    .gallery-cards-wrapper{
      justify-content: center !important;
    }
  }
  @media screen and (min-width : 1080px) {
      
  }
  </style>