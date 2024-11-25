import {gsap} from 'gsap';

export const animatedLink = (target: string) => {
    const globalWrapper = document.querySelector('.section-wrapper')
    const timeline = gsap.timeline({
        defaults: {duration: 1, ease: "power1.inOut"},
        onComplete: () => {
            window.location.href = target;
        }
    });

    timeline
        .to(globalWrapper, {
            padding: 0
        })
        
}

const wrapperTimeline = gsap.timeline({defaults: {duration: 2, ease: "power1.inOut"}});

        wrapperTimeline
            .to(sectionWrapper, {
                autoAlpha: 1
            })
            .from(sectionWrapper, {
                padding: '0px'
            })
            .from(cicWrapper, {
                borderRadius: '0px'
            }, 0)
            .from('#hero-cic > *', {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, 0.5)