<template>
  <header class="header">
    <h1 class="header__city">Погода у {{ currentPosition.city }}</h1>
    <div class="header__theme-toggle" @click.prevent="toggleTheme">
      <svg
        v-if="isDarkTheme"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  props: { currentPosition: {} },
  computed: {
    ...mapGetters(['isDarkTheme']),
  },
  methods: {
    ...mapActions(['toggleTheme']),
  },
};
</script>

<style lang="scss">
.header {
  display: grid;
  grid-template-columns: 90% 10%;
  grid-template-areas: 'city theme-toggle';
  width: 100%;
  background-color: var(--additional-back-color, #8cceea);

  &__city {
    grid-area: 'city';
    padding: 5px;
    font-family: Oswald, sans-serif;
    font-size: 16px;
  }

  &__theme-toggle {
    grid-area: 'theme-toggle';
    cursor: pointer;
    width: 24px;
    padding: 5px;
  }
}
</style>
