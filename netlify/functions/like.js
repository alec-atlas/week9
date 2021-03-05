// API url to this lambda funtion: /.netlify/functions/like
let firebase = require('./firebase')
exports.handler = async function(event) {
  let db = firebase.firestore()
  // console.log(event.body)
  let post = JSON.parse(event.body)
  // console.log(post)
  let postId = post.postId
  let userId = post.userId
  console.log(`the post is ${postId}`)
  console.log(`the user is ${userId}`)
  let querySnapshot = await db.collection('likes')
                        .where('postId', '==', postId)
                        .where('userId', '==', userId)
                        .get()
  let numberOfLikes = querySnapshot.size
  console.log(`number of likes: ${numberOfLikes}`)
  if (numberOfLikes == 0) {
    await db.collection('likes').add({
      postId: postId,
      userId: userId
    })
    return {
      statusCode: 200,
      body: JSON.stringify({success: true})
    }
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({success: false, error: 'user already liked post'})
    }
  }
}