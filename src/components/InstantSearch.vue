<template>
  <div class="instant-search">
    <ais-index
      :index-name="searchIndex"
      :search-store="searchStore"
      :query="initialQuery"
    >
      <!--<ais-search-box></ais-search-box> -->

      <h2 class="title">
        <ais-input
          id="search"
          v-model="query"
          class="form-control"
          placeholder="Search"
        />
      </h2>

      <template v-if="!searchIsEmpty">
        <ais-results
          v-if="!searchIsEmpty && searchStore.results.length > 0"
          :results-per-page="10"
          :stack="true"
        >
          <template slot-scope="{ result }">
            <div class="row">
              <div class="col-md-4">
                <div class="card">
                  <div class="content">
                    <h4 class="title">
                      <a
                        :href="editExpenseUrl(result)"
                        class="card-link"
                      >
                        <ais-highlight
                          :result="result"
                          attribute-name="description"
                        />
                      </a>
                    </h4>

                    <div class="footer">
                      <!-- expenses section -->
                      <div>
                        {{ result.denomination }} <br>
                        <span>{{ result.category }}</span><br>
                      </div>
                    </div>
                  </div>
                </div> <!-- end card -->
              </div>
            </div>
          </template>
        </ais-results>

        <ais-no-results>Sorry, no expenses found</ais-no-results>

        <clip-loader
            :loading="isLoading"
        />

      </template>
    </ais-index>

    <div
      v-observe-visibility="{
        callback: nextPage,
        throttle: 300
      }"
    ></div>

  </div>
</template>

<script>
import { createFromAlgoliaCredentials } from 'vue-instantsearch'
import ClipLoader from 'vue-spinner/src/ClipLoader';

export default {
  components: {
    ClipLoader
  },

  data() {
    return {
      searchStore: null,
      query: ''
    }
  },

  computed: {
    isLoading() {
      return this.searchStore.isSearchStalled;
    },
    searchIndex() {
      return process.env.VUE_APP_ALGOLIA_INDEX_NAME;
    },
    initialQuery() {
      const query = new URLSearchParams(window.location.search).get('q');
      if (typeof query === 'undefined') {
        return ''
      }

      return query
    },
    searchIsEmpty() {
      if (!this.searchStore) {
        return true
      }

      return !(this.searchStore._helper.state.query.length > 0);
    }
  },
  watch: {
    'searchStore.query' (value) {
      this.updateQuery(value)
      /*
                this.$router.replace({
                    query: {
                        q: value
                    }
                })
                */
    }
  },
  created() {
    this.searchStore = createFromAlgoliaCredentials(
      process.env.VUE_APP_ALGOLIA_APP_ID,
      process.env.VUE_APP_ALGOLIA_SEARCH_ONLY_KEY,
    )

    this.searchStore.queryParameters = {
      page: 1
    }
  },

  methods: {
    editExpenseUrl(expense) {
      return `/expenses/${expense.id}/edit`;
    },
    nextPage(visible) {
        if (!visible || this.isLoading) {
          return
        }

        const params = this.searchStore.queryParameters;
        if (this.searchStore.totalPages === params.page) {
            return;
        }

        this.searchStore.queryParameters = Object.assign({}, params, {
          page: params.page + 1
        });

        this.searchStore.refresh()
    },
    updateQuery(queryString) {
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?q=${queryString}`;

      window.history.pushState({
        path: newUrl
      },
      '',
      newUrl
      );
    }

  }
}
</script>
<style>
    @import "../../node_modules/instantsearch.css/themes/algolia.css";
</style>
