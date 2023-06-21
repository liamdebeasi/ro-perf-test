<template>
  <div class="split-view">
    <slot />
  </div>
</template>

<style>
  .split-view {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 300px;
  }
  
  .split-view .split-view-content:last-of-type {
    border-left: 1px solid currentColor;
  }
</style>