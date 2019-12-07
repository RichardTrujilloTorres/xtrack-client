<template>
  <div class="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link
        to="/"
        class="navbar-brand"
      >
          {{ appName }}
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link"
            >
              {{ $t('app.about') }}
            </router-link>
          </li>


          <li class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $t('expenses.name') }}
            </a>

            <div
              class="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <router-link
                to="/expenses"
                class="dropdown-item"
              >
                {{ $t('expenses.listing') }}
              </router-link>
              <router-link
                to="/expenses/create"
                class="dropdown-item"
              >
                {{ $t('expenses.create') }}
              </router-link>

              <div class="dropdown-divider" />
              <a
                class="dropdown-item"
                href="#"
              >{{ $t('expenses.statistics') }}</a>
            </div>
          </li>

          <!-- language -->
          <li class="nav-item dropdown">
            <a
              id="language-dropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $t('language.name') }}
            </a>

            <div
              class="dropdown-menu"
              aria-labelledby="language-dropdown"
            >
              <a
                class="dropdown-item"
                href="#"
                @click="switchLanguage(languages.EN)"
              >{{ $t('language.english') }}</a>
              <a
                class="dropdown-item"
                href="#"
                @click="switchLanguage(languages.IT)"
              >{{ $t('language.italian') }}</a>
            </div>
          </li>


          <!-- user -->
          <li
            v-if="isAuthenticated"
            class="nav-item dropdown"
          >
            <a
              id="user-dropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ getUser.email }}
            </a>

            <div
              class="dropdown-menu"
              aria-labelledby="user-dropdown"
            >
              <a
                class="dropdown-item"
                href="#"
                @click="logout"
              >{{ $t('auth.logout') }}</a>
            </div>
          </li>

          <!-- guest user -->
          <li
            v-if="!isAuthenticated"
            class="nav-item dropdown"
          >
            <a
              id="guest-user-dropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $t('user.name') }}
            </a>

            <div
              class="dropdown-menu"
              aria-labelledby="guest-user-dropdown"
            >
              <router-link
                to="/login"
                class="dropdown-item"
              >
                {{ $t('auth.login') }}
              </router-link>
              <!-- <router-link to="/register" class="dropdown-item">{{ $t('auth.register') }}</router-link> -->
            </div>
          </li>

          <!--
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          -->
        </ul>
        <form @submit.prevent="goToSearchPage" class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="..."
            :aria-label="$t('expenses.search')"
            v-model="search"
          >
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            {{ $t('expenses.search') }}
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import LANGUAGES from '../../i18/constants';
import {vueAuth} from "../main";
import {mapGetters} from 'vuex';
import InstantSearch from "./InstantSearch";

export default {
  name: 'Navbar',
  components: {InstantSearch},
  data: () => ({
      search: '',
  }),
  computed: {
    ...mapGetters(['getUser', 'isAuthenticated']),
    languages() {
      return LANGUAGES
    },
    appName() {
      return process.env.VUE_APP_NAME;
    },
  },
  methods: {
    goToSearchPage() {
       this.$router.push(`/search?q=${this.search}`)
    },
    switchLanguage(language) {
      this.$i18n.locale = language
    },
    async logout() {
      await this.$store.dispatch('logout');
        this.$swal(
            this.$i18n.t('status.success'),
            this.$i18n.t('operation.logout.success'),
            'success'
        );

    this.$router.push('/login')
    }
  }
}
</script>

