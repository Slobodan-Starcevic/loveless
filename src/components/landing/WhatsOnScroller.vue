<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    const scrollers = document.querySelectorAll<HTMLElement>(".scroller");
    scrollers.forEach((scroller) => {
        const scrollerInner = scroller.querySelector<HTMLElement>(".scroller-inner");
        if(scrollerInner){
            const scrollerContent = Array.from(scrollerInner.children) as HTMLElement[];

            scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner.appendChild(duplicatedItem);
            });
        }
    });
})
</script>

<template>
<div class="scroller-wrapper desktop-content">
                <div class="scroller">
                    <div class="scroller-inner">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                    </div>
                </div>
                <div class="still">
                    <div class="still-inner">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                    </div>
                </div>
                <div class="scroller" data-direction="down">
                    <div class="scroller-inner">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
                        <img src="/images/poster.png" alt="" loading="lazy">
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