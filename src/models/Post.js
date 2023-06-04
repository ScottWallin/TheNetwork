export class Post {
  constructor(data) {
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = '0' || data.likeIds
    this.createdAt = new Date(data.createdAt)

  }
}