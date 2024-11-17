<script setup lang="ts">
import { computed } from 'vue';
import type { EventProps } from '../../types/event'

const props = defineProps<{
    events: Array<EventProps>
}>();

function cycleToTarget(array: string[], targetLength: number): string[] {
    const result = [];
    for (let i = 0; i < targetLength; i++){
        result.push(array[i % array.length])
    }
    return result;
}

function getRandomItems(array: string[], count: number): string[]{
    const shuffled = [...array].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count);
};

const bannerUrls = props.events.map(event => event.data.banner);
const SCROLLER_SIZE = 8;

const imageArray = computed(() => {
    if ( props.events.length == 0){
        return Array(SCROLLER_SIZE).fill('/images/poster.png');
    }
    if ( props.events.length == 1){
        return Array(SCROLLER_SIZE).fill(props.events[0].data.banner);
    }
    if ( props.events.length >= SCROLLER_SIZE){
        return getRandomItems(bannerUrls, SCROLLER_SIZE);
    }

    return cycleToTarget(bannerUrls, SCROLLER_SIZE);
});
</script>

<template>
<div class="scroller-wrapper desktop-content">
                <div class="scroller">
                    <div class="scroller-inner">
                        <img v-for="(image, index) in imageArray" 
                        :key="'scroll1-' + index"
                        :src="image" 
                        alt="" 
                        loading="lazy">
                    </div>
                </div>
                <div class="still">
                    <div class="still-inner">
                        <img :src="imageArray[0]" alt="" loading="lazy">
                        <img src="images/surprise.svg" alt="" loading="lazy">
                        <img :src="imageArray[1]" alt="" loading="lazy">
                    </div>
                </div>
                <div class="scroller" data-direction="down">
                    <div class="scroller-inner">
                        <img v-for="(image, index) in imageArray" 
                        :key="'scroll2-' + index"
                        :src="image" 
                        alt="" 
                        loading="lazy">
                    </div>
                </div>
            </div>
</template>

<style lang="scss" scoped>
.scroller-wrapper {
    display: flex;
    justify-content: center;
    overflow: visible;
    transform: rotate(10deg);

    .scroller {
        overflow: visible;
        width: 15vw;
        min-width: 15vw;
        max-height: 100%;
        display: flex;
        align-items: center;

        &-inner {
            display: flex;
            gap: var(--spacing-xs);
            flex-direction: column;
            height: max-content;
            transition: animation 0.3s var(--custom-ease-2);
            animation: scroll var(--animation-duration, 30s) var(--animation-direction, forwards) linear infinite;
            animation-play-state: running;

            &:hover {
                animation-play-state: paused;
            }

            img {
                border: 2px solid var(--loveless-blue);
                border-radius: var(--radius-xs);
                filter: brightness(60%);
                transition: transform 0.3s var(--custom-ease-1), filter 0.3s var(--custom-ease-1);

                &:hover {
                    filter: brightness(80%);
                }
            }
        }

        &[data-direction="down"] {
            --animation-direction: reverse;
        }

        &[data-direction="up"] {
            --animation-direction: forwards;
        }

        &[data-speed="slow"] {
            --animation-duration: 80s;
        }
    }

    .still {
        overflow: visible;
        width: 30vw;
        min-width: 30vw;
        max-height: 100%;
        display: flex;
        align-items: center;
        margin: 0 var(--spacing-s);

        &-inner {
            display: flex;
            gap: var(--spacing-s);
            flex-direction: column;
            height: max-content;

            img {
                border: 3px solid var(--loveless-blue);
                border-radius: var(--radius-xs);
                transition: transform 0.3s var(--custom-ease-1), filter 0.3s var(--custom-ease-1);

                &:nth-child(1) {
                    filter: brightness(60%);
                    &:hover {
                        filter: brightness(80%);
                    }
                }

                &:nth-child(2) {
                    filter: brightness(90%);
                    &:hover {
                        filter: brightness(100%);
                    }
                }

                &:nth-child(3) {
                    filter: brightness(60%);
                    &:hover {
                        filter: brightness(80%);
                    }
                }
            }
        }
    }
}
@keyframes scroll {
    to {
        transform: translateY(calc(-25% - 0.25rem));
    }
}
</style>