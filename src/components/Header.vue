<template functional>
  <header class="header">
    <h1 class="header__city">Погода у {{ props.currentPosition.city }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['currentPosition'],
};
</script>

<style lang="scss">
.header {
  width: 100%;
  background-color: var(--additional-back-color, #8cceea);

  &__city {
    padding-top: 4px;
    background-color: var(--main-back-color, white);
    font-family: Oswald, sans-serif;
    font-size: 16px;
  }
}
</style>
