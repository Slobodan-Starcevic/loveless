<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
    eventImages: { image: string }[] | undefined;
}>();
const closeEmit = defineEmits<{
  (event: 'close'): void;
}>();

const focusedImage = ref(
    props.eventImages && props.eventImages.length > 0
        ? props.eventImages[0].image
        : ''
);

const imageHandler = (delta: -1 | 1) => {
    if (!props.eventImages || props.eventImages.length === 0) {
        return;
    }

    const imagesAmount = props.eventImages.length;
    const currentFocusedImage = props.eventImages.findIndex(
        image => image.image === focusedImage.value
    );

    const newIndex = (currentFocusedImage + delta + imagesAmount) % imagesAmount;

    focusedImage.value = props.eventImages[newIndex].image;
};

onMounted(() => {
    const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeEmit('close');
        }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
        window.removeEventListener('keydown', handleEsc);
    };
});
</script>

<template>
    <div class="modal-wrapper">
        <div class="background" @click="closeEmit('close')"></div>
        <div class="modal-content">
            <div class="">
                <img src="/images/cross.svg" class="cross" @click="closeEmit('close')" alt="Button to close images"  loading="lazy" decoding="async">
            </div>
            <div class="">
                <img src="/images/chevron.svg" @click="imageHandler(-1)" class="chevron chevron-left" alt="Button to previous image"  loading="lazy" decoding="async">
            </div>
            <div class="">
                <img src="/images/chevron.svg" @click="imageHandler(1)" class="chevron chevron-right" alt="Button to next image"  loading="lazy" decoding="async">
            </div>
            <img :src="focusedImage" class="focused-image" alt="Event images"  loading="lazy" decoding="async">
        </div>
    </div>
</template>

<style lang="scss">
 .modal-wrapper {
    position: fixed;
    z-index: 9999;
    height: 100vh;
    width: 100%;
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
            position: fixed;
            top: 30px;
            right: 30px;
            filter: invert(1);
            width: 30px;
            height: 30px;
            cursor: pointer;
        }

        .chevron {
            position: fixed;
            width: 60px;
            height: 60px;
            filter: invert(1);
            cursor: pointer;

            &.chevron-left {
                left: 3%;
                top: 50%;
                transform: translateY(-50%) rotate(-90deg);
            }

            &.chevron-right {
                right: 3%;
                top: 50%;
                transform: translateY(-50%) rotate(90deg);
            }
        }
    }
}
@media screen and (max-width : 767px) {
    .chevron{
        width: 50px !important;
    }
}
@media screen and (min-width: 768px) and (max-width: 1079px) {
    
}
@media screen and (min-width : 1080px) {
    
}
</style>
  