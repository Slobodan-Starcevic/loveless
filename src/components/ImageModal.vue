<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
    eventImages: { image: string }[];
}>();
const closeEmit = defineEmits<{
  (event: 'close'): void;
}>();

const focusedImage = ref(props.eventImages.length > 0 ?  props.eventImages[0].image: '')

const imageHandler = (delta: -1 | 1) => {
    const imagesAmount = props.eventImages.length;
    const currentFocusedImage = props.eventImages.findIndex(
        image => image.image === focusedImage.value
    );

    const newIndex = (currentFocusedImage + delta) % imagesAmount;

    focusedImage.value = props.eventImages[newIndex].image;
};

onMounted(() => {
    const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeEmit('close');
        }
    };

    window.addEventListener('keydown', handleEsc);

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleEsc);
    });
});

</script>

<template>
    <div class="modal-wrapper">
        <div class="background" @click="closeEmit('close')"></div>
        <div class="modal-content">
            <div class="">
                <img src="/images/cross.svg" class="cross" @click="closeEmit('close')" alt="Button to close images">
            </div>
            <div class="">
                <img src="/images/chevron.svg" @click="imageHandler(-1)" class="chevron chevron-left" alt="Button to previous image">
            </div>
            <div class="">
                <img src="/images/chevron.svg" @click="imageHandler(1)" class="chevron chevron-right" alt="Button to next image">
            </div>
            <img :src="focusedImage" class="focused-image" alt="Event images">
        </div>
    </div>
</template>

<style lang="scss">
 .modal-wrapper {
    position: fixed;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: hsla(0, 0%, 0%, 0.5);
    }

    .modal-content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .focused-image {
            width: 100%;
            max-width: 95vw;
            height: 100%;
            max-height: 90vh;
            border-radius: var(--radius-l);
        }

        .cross {
            position: absolute;
            top: 15px;
            right: 15px;
            filter: invert(1);
            width: 30px;
            height: 30px;
            cursor: pointer;
        }

        .chevron {
            position: absolute;
            width: 60px;
            height: 60px;
            filter: invert(1);
            cursor: pointer;

            &.chevron-left {
                left: 10px;
                top: 50%;
                transform: translateY(-50%) rotate(-90deg);
            }

            &.chevron-right {
                right: 10px;
                top: 50%;
                transform: translateY(-50%) rotate(90deg);
            }
        }
    }
}
</style>
  