// API url to this lambda funtion: /.netlify/functions/get_posts
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()                             // define a variable so we can use Firestore
  let postsData = []                                        // an empty Array

  let postsQuery = await db.collection('posts')             // posts from Firestore
                           .orderBy('created')              // ordered by created
                           .get()
  let posts = postsQuery.docs                               // the post documents themselves

  // loop through the post documents
  for (let i=0; i<posts.length; i++) {
    let postId = posts[i].id                                // the ID for the given post
    let postData = posts[i].data()                          // the rest of the post data
    let likesQuery = await db.collection('likes')           // likes from Firestore
                             .where('postId', '==', postId) // for the given postId
                             .get()

    // add a new Object of our own creation to the postsData Array
    postsData.push({
      id: postId,                                           // the post ID
      imageUrl: postData.imageUrl,                          // the image URL
      username: postData.username,                          // the username
      likes: likesQuery.size                                // number of likes
    })
  }

  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(postsData)
  }
}