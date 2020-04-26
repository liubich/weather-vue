<template>
  <header class="header">
    <h1 class="header__city">Погода у {{ currentPosition.city }}</h1>
    <div class="header__theme-toggle" @click.prevent="toggleTheme">
      <Sun v-if="isDarkTheme" />
      <Moon v-else />
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Sun from '../../assets/images/sun.svg';
import Moon from '../../assets/images/moon.svg';

export default {
  name: 'Header',
  props: { currentPosition: {} },
  computed: {
    ...mapGetters(['isDarkTheme']),
  },
  methods: {
    ...mapActions(['toggleTheme']),
  },
  components: {
    Sun,
    Moon,
  },
};
</script>

<style lang="scss">
.header {
  display: grid;
  grid-template-columns: 90% 10%;
  width: 100%;
  background-color: var(--additional-back-color, #8cceea);

  &__city {
    padding: 5px;
    font-family: Oswald, sans-serif;
    font-size: 16px;
  }

  &__theme-toggle {
    cursor: pointer;
    width: 34px;
    padding: 5px;

    &:hover {
      color: var(--text-hover-color);
    }
  }
}
</style>
