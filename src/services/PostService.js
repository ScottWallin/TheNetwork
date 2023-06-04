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
}
export const postService = new PostService()