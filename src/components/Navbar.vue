<template>
  <div class="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand">{{ $t('app.home') }}</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">{{ $t('app.about') }}</router-link>
          </li>


          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ $t('expenses.name') }}
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/expenses" class="dropdown-item">{{ $t('expenses.listing') }}</router-link>
              <router-link to="/expenses/create" class="dropdown-item">{{ $t('expenses.create') }}</router-link>

              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">{{ $t('expenses.statistics') }}</a>
            </div>
          </li>

          <!-- language -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"
               id="language-dropdown" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ $t('language.name') }}
            </a>

            <div class="dropdown-menu" aria-labelledby="language-dropdown">
              <a class="dropdown-item" href="#" @click="switchLanguage(languages.EN)">{{ $t('language.english') }}</a>
              <a class="dropdown-item" href="#" @click="switchLanguage(languages.IT)">{{ $t('language.italian') }}</a>
            </div>
          </li>

          <!--
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          -->
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search"
                 placeholder="..."
                 :aria-label="$t('expenses.search')">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            {{ $t('expenses.search') }}
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import LANGUAGES from '../../i18/constants';

export default {
  name: 'Navbar',
  computed: {
      languages() {
        return LANGUAGES
      }
  },
  methods: {
    switchLanguage(language) {
      this.$i18n.locale = language
    }
  }
}
</script>

