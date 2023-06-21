<template>
  <div class="tab-bar">
    <slot />
  </div>
</template>

<script setup>
</script>

<style scoped>
  .tab-bar {
    width: 100%;
    height: 56px;
    
    background: #333;
    border-top: 1px solid black;
    
    display: flex;
    
    justify-content: center;
    align-items: center;
    
    position: absolute;
    
    bottom: 0;
    
    z-index: 1;
  }
</style>