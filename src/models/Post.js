function _computeDate(date) {
  return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", time: "short" }) + ":" + date.toLocaleTimeString('en-us', { timeStyle: "medium" })
}
export class Post {
  constructor(data) {
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.createdAt = new Date(data.createdAt)
    this.id = data.id
    this.creator = data.creator
  }
}
