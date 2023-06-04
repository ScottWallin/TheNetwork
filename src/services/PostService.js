import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostService {
  async getPosts() {
    AppState.post = []
    const res = await api.get('api/posts')
    logger.log('here are your posts', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.olderPageUrl = res.data.older
    AppState.newerPageUrl = res.data.newer

  }
  async changePage(url) {
    const res = await api.get(url)
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.olderPageUrl = res.data.older
    AppState.newerPageUrl = res.data.newer
  }
  async getPostsByCreatorId(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}/posts?page` + AppState.page)
    logger.log('posts', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    AppState.posts.filter(p => p.id == p.id)
    logger.log(res.data)
  }
  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(new Post(res.data))
  }
  async removePost(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log('[removePost]', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != AppState.posts.id)
  }
  async searchPosts(query) {
    const res = await api.get("api/posts", { params: { query: query } })
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
  }

}
export const postService = new PostService()