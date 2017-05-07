<template>
  <div class="ribbon">
    <span>
      <slot>
        <v-icon slot="content" class="yellow--text">star</v-icon>
      </slot>
    </span>
  </div>
</template>
<style>
  .ribbon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    overflow: hidden;
    width: 145px;
    height: 130px;
    text-align: right;
  }

  .ribbon span {
    font-size: 10px;
    font-weight: bold;
    color: #FFF;
    text-transform: uppercase;
    text-align: center;
    line-height: 1em;
    transform: rotate(-45deg);
    width: 120px;
    display: block;
    background: #79A70A;
    background: linear-gradient(#F70505 0%, #8F0808 100%);
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
    position: absolute;
    top: 2px;
    left: -45px;
  }

</style>
