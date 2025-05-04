<template>
    <div class="loader-wrapper">
      <div class="spinner"></div>
    </div>
  </template>
  

  <style scoped>
  .loader-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-weight: bold;
  }
  
  .spinner {
    width: 30px;
    height: 30px;
    border: 4px solid #ccc;
    border-top-color: #42b983;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 0.5rem;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  