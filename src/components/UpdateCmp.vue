<template>
  <div class="scroll-container">
    <h1><slot /></h1>
    <ion-datetime v-for="item in Array(myCounter)"></ion-datetime>
  </div>
</template>

<script setup>
  import { myCounter } from '@/data/myCounter.ts';
  import { IonDatetime } from '@ionic/vue';
</script>

<style>
  .scroll-container {
    width: 100%;
    
    padding: 10px;
    
    overflow-y: scroll;
  }
</style>