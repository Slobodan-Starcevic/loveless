<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">✖</button>
        <slot></slot>
      </div>
    </div>
</template>
  
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

// Function to emit close event
const close = () => {
emit('close');
};
</script>

<style lang="scss" scoped>
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.6);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
}

.modal-content {
background: white;
padding: var(--spacing-xl);
border-radius: var(--radius-lg);
box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
max-width: 600px;
width: 100%;
position: relative;
}

.close-button {
position: absolute;
top: 10px;
right: 10px;
background: none;
border: none;
font-size: 1.5rem;
cursor: pointer;
color: #333;
}
</style>
  