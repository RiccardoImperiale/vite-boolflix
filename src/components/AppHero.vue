<script>
import { store } from '../store.js';
import Rellax from 'rellax';

export default {
    name: 'AppHero',
    data() {
        return {
            store,
        }
    },
    mounted() {
        this.rellax = new Rellax('.rellax-item');
    },
    destroyed() {
        this.rellax && this.rellax.destroy();
    }
}
</script>

<template>
    <transition name="hero">
        <div v-if="store.isHero" class="hero_section rellax-item" data-rellax-speed="-8"
            :class="store.isHeroGoingUp ? 'hero-go-up' : 'hero-go-down'">
            <img class="hero_image" :src="store.heroContent.src" alt="hero image">
            <div class="hero_gradient"></div>
            <div class="hero_filter"></div>
            <div class="text rellax-item" data-rellax-speed="1">
                <h1>{{ store.heroContent.title }}</h1>
                <!-- rating -->
                <div class="rating">
                    <div class="circle">

                        <img width="46" :src="'/img/rating/' + store.heroContent.rating + '.png'"
                            alt="rating progress circle">
                        <div class="vote">{{ store.heroContent.rating }}<span>/5</span></div>
                    </div>
                </div>
                <p>{{ store.heroContent.overview }}</p>
            </div>
        </div>
    </transition>
</template>

<style>
.hero_section {
    height: 720px;
    overflow: hidden;
    margin-bottom: -8rem;
    position: relative;
    z-index: -1;

    .hero_image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .hero_gradient {
        position: absolute;
        background: linear-gradient(transparent, var(--bflix-darker));
        height: 8rem;
        width: 100%;
        bottom: 0;
    }

    .hero_filter {
        position: absolute;
        inset: 0;
        /* background-color: var(--bflix-darker); */
        background: linear-gradient(90deg, var(--bflix-darker) 0%, transparent 100%);
        opacity: .8;
        /* mix-blend-mode: multiply; */
    }

    .text {
        padding-top: 6rem;
        padding-left: 6rem;
        width: 500px;
        position: absolute;
        top: 0;
        color: var(--bflix-light);

        & h1 {
            width: 310px;
            margin-bottom: .2rem;
        }

        .rating {
            display: flex;
            justify-content: start;
            margin-bottom: .5rem;


            .circle {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                .vote {
                    position: absolute;

                    >span {
                        color: gray;
                        font-size: .7rem;
                    }
                }
            }
        }

        & p {
            font-size: .85rem;
        }
    }
}
</style>
