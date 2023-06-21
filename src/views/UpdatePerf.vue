<template>
  <SplitView>
    <SplitViewContent>
      <div class="padding">
        <div v-if="renderMode === 'no-cache'">
          <TabOne v-if="activeTab === 'tab-1'" />
          <TabTwo v-if="activeTab === 'tab-2'" />
        </div>
        
        <div v-if="renderMode === 'keep-alive'">
          <keep-alive>
            <component :is="activeTab === 'tab-1' ? TabOne : TabTwo"></component>
          </keep-alive>
        </div>
        
        <div v-if="renderMode === 'cache-in-dom'">
          <div v-bind:class="{ 'hidden': activeTab !== 'tab-1' }">
            <TabOne />
          </div>
          <div v-bind:class="{ 'hidden': activeTab !== 'tab-2' }">
            <TabTwo />
          </div>
        </div>
        
        <div v-if="renderMode === 'cache-in-memory'" id="cache-memory-root" ref="cacheMemoryRoot">
          <div ref="cacheMemoryTabOne">
            <TabOne />
          </div>
          
          <div ref="cacheMemoryTabTwo">
            <TabTwo ref="cacheMemoryTabTwo" />
          </div>
        </div>
      </div>
      <TabBar>
        <TabButton @click="setTab('tab-1')">Tab 1</TabButton>
        <TabButton @click="setTab('tab-2')">Tab 2</TabButton>
      </TabBar>
    </SplitViewContent>
    
    <SplitViewContent>
      <div class="padding">
        <h2>Update Performance</h2>
        <label>
          No Cache
          <input type="radio" value="no-cache" name="render-mode" v-model="renderMode" />
        </label>
        <br />
        <label>
          Keep Alive
          <input type="radio" value="keep-alive" name="render-mode" v-model="renderMode" />
        </label>
        <br/>
        <label>
          Cache In DOM
          <input type="radio" value="cache-in-dom" name="render-mode" v-model="renderMode" />
        </label>
        <br />
        <label>
          Cache in Memory
          <input type="radio" value="cache-in-memory" name="render-mode" v-model="renderMode" />
        </label>
        
        <br /><br />
        Total Count: {{ myCounter }} <br />
        <button @click="addState">Render 30 More to State</button> <br /><br />
        <button @click="resetState">Reset State</button>
      </div>
    </SplitViewContent>
  </SplitView>
</template>

<script setup lang="ts">
  import TabBar from '@/components/TabBar.vue';
  import TabButton from '@/components/TabButton.vue';
  
  import TabOne from '@/components/TabOne.vue';
  import TabTwo from '@/components/TabTwo.vue';
  
  import SplitView from '@/components/SplitView.vue';
  import SplitViewContent from '@/components/SplitViewContent.vue';

  import { myCounter } from '@/data/myCounter.ts';
  import { ref, watch } from 'vue';

  const renderMode = ref('no-cache');
  const activeTab = ref('tab-1');
  const cacheMemoryRoot = ref();
  const cacheMemoryTabOne = ref();
  const cacheMemoryTabTwo = ref();
  
  watch(renderMode, () => {
    requestAnimationFrame(() => {
      runCacheMemory();
    });
  });
  
  const performanceMark = () => {
    performance.mark(`${activeTab.value}-render-start`);
  }
  
  const runCacheMemory = () => {
    if (renderMode.value === 'cache-in-memory') {
      if (activeTab.value === 'tab-1') {
        cacheMemoryTabTwo.value.remove();
        cacheMemoryRoot.value.appendChild(cacheMemoryTabOne.value);
      } else {
        cacheMemoryTabOne.value.remove();
        cacheMemoryRoot.value.appendChild(cacheMemoryTabTwo.value);
      }
    }
  }
  
  performanceMark();
  
  const setTab = (tab: string) => {
    activeTab.value = tab;
    
    performanceMark();
    
    runCacheMemory();
    
    
  }
  
  const addState = () => {
    myCounter.value = myCounter.value + 30;
  }
  
  const resetState = () => {
    myCounter.value = 1;
  }
</script>