<template>
  <swiper
    :modules="[Parallax, Pagination, Navigation, Autoplay, EffectFade]"
    class="mySwiper"
    :speed="850"
    :parallax="true"
    :loop="true"
    :grab-cursor="true"
    :autoplay="{ delay: 3200, disableOnInteraction: false }"
    effect="fade"
    :fade-effect="{ crossFade: true }"
    pagination="{ clickable: true }"
    navigation
    @init="animateActiveSlide"
    @slideChangeTransitionStart="animateActiveSlide"
  >
    <!-- Slide 1 -->
    <swiper-slide>
      <div
        class="slide-bg"
        style="background-image:url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop');"
        data-swiper-parallax="-15%"
      ></div>
      <div class="slide-overlay"></div>
      <div class="slide-content" data-swiper-parallax="-120">
        <div class="slide-eyebrow">Showcase</div>
        <h2 class="slide-title">
          Smooth <span class="accent">Swiper</span> Animations
        </h2>
        <p class="slide-subtitle">Vue • Swiper • GSAP</p>
      </div>
    </swiper-slide>

    <!-- Slide 2 -->
    <swiper-slide>
      <div
        class="slide-bg"
        style="background-image:url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop');"
        data-swiper-parallax="-15%"
      ></div>
      <div class="slide-overlay"></div>
      <div class="slide-content" data-swiper-parallax="-120">
        <div class="slide-eyebrow">Creative Effect</div>
        <h2 class="slide-title">
          Parallax &amp; Fade Between <span class="accent">Slides</span>
        </h2>
        <p class="slide-subtitle">Use pagers or drag to explore</p>
      </div>
    </swiper-slide>

    <!-- Slide 3 -->
    <swiper-slide>
      <div
        class="slide-bg"
        style="background-image:url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop');"
        data-swiper-parallax="-15%"
      ></div>
      <div class="slide-overlay"></div>
      <div class="slide-content" data-swiper-parallax="-120">
        <div class="slide-eyebrow">Autoplay</div>
        <h2 class="slide-title">
          Clean UI, Minimal <span class="accent">UX</span>
        </h2>
        <p class="slide-subtitle">Just copy this component and run</p>
      </div>
    </swiper-slide>

    <!-- Pagination + Nav -->
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev" aria-label="Previous slide"></div>
    <div class="swiper-button-next" aria-label="Next slide"></div>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Parallax,
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import gsap from "gsap";

function animateActiveSlide() {
  const active = document.querySelector(".swiper-slide-active .slide-content");
  if (!active) return;
  gsap.fromTo(
    active,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }
  );
}
</script>

<style scoped>
/* --- same CSS as before --- */
:root {
  --bg: #0b0d12;
  --fg: #eaeef8;
  --muted: #a9b1c4;
  --accent: #67e8f9;
}
html,
body {
  margin: 0;
  height: 100%;
  background: var(--bg);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial,
    sans-serif;
}
.mySwiper {
  width: 100%;
  height: 100vh;
}
.swiper-slide {
  position: relative;
  display: grid;
  place-items: center;
}
.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 7, 11, 0.2), rgba(6, 7, 11, 0.7));
}
.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1.5rem;
}
.slide-title {
  font-size: 2.5rem;
  font-weight: 800;
}
.slide-subtitle {
  color: var(--muted);
}
.swiper-button-next,
.swiper-button-prev {
  color: var(--fg);
}
.swiper-pagination-bullet {
  background: rgba(234, 238, 248, 0.6);
}
.swiper-pagination-bullet-active {
  background: var(--accent);
}
</style>
