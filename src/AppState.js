import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Banner.js').Banner} */
  banners: [],
  /** @type {import('./models/Post.js').Post}*/
  posts: [],
  olderPageUrl: null,
  newerPageUrl: null,
  profile: [],
  /** @type {import('./models/Profile.js').Profile}*/
  activeProfile: null,
  /** @type {import('./models/Account.js').Account}*/
  activeAccount: null,
  query: null,
})
