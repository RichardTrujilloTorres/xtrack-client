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
              <router-link
                to="/"
                class="dropdown-item"
              >
                {{ $t('expenses.statistics') }}
              </router-link>
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
              >{{ $t('language.english') }}
                <img
                  class="flag"
                  src="../assets/images/flags/united_kingdom.png"
                  alt="en"
                >
              </a>
              <a
                class="dropdown-item"
                href="#"
                @click="switchLanguage(languages.IT)"
              >{{ $t('language.italian') }}
                <img
                  class="flag"
                  src="../assets/images/flags/italy.png"
                  alt="it-IT"
                >
              </a>
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
        <form
          class="form-inline my-2 my-lg-0"
          @submit.prevent="goToSearchPage"
        >
          <input
            v-model="search"
            class="form-control mr-sm-2"
            type="search"
            placeholder="..."
            :aria-label="$t('expenses.search')"
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
import {ACTIONS, GETTERS} from "../store";
import {mapGetters} from "vuex";

export default {
  name: 'Navbar',
  data: () => ({
    search: '',
  }),
  computed: {
    ...mapGetters({
      getUser: GETTERS.USER.GET,
      isAuthenticated: GETTERS.USER.IS_AUTHENTICATED
    }),
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
    logout() {
      this.$store.dispatch(ACTIONS.USER.LOGOUT)
        .then(res => {
          this.$swal(
            this.$i18n.t('status.success'),
            this.$i18n.t('operation.logout.success'),
            'success'
          );

          this.$router.push('/login')
        });
    }
  }
}
</script>
<style>
  .flag {
    width: 20px;
    height: 20px;
  }
</style>

