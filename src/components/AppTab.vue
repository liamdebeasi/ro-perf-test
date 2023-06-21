<template>
  <div :id="$props.tabId">
    <h1>{{ $props.tabTitle }}</h1>
    <div class="image-grid">
      <ion-button v-for="item in Array(myCounter)">Button</ion-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { myCounter } from '@/data/myCounter.ts';
  import { defineComponent, nextTick } from 'vue';
  import { IonButton } from '@ionic/vue';
  
  export default defineComponent({
    props: ['tab-id', 'tab-title'],
    components: { IonButton },
    mounted: async function (cmp) {      
      const d = document.querySelector('#' + this.tabId + ' ion-button');
      const io = new IntersectionObserver((ev) => {
        if (ev[0].isIntersecting) {
          performance.mark(`${this.tabId}-render-end`)
          console.log(this.tabId,'rendered in', performance.measure(`${this.tabId}-render-end`, `${this.tabId}-render-start`).duration)
        }
      })
      io.observe(d, { root: document.querySelector('#app') });
    },
    setup() {
      const items = Array(10).fill(0);
      
      return { items, myCounter }
    }
  });
</script>

<style>
  .image-grid {
    display: grid;
    
    grid-template-columns: repeat(5, 1fr);
    
    grid-gap: 10px;
  }
</style>