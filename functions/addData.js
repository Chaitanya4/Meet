const { createClient } = require("@astrajs/collections")

const collection = "meetdocs"

exports.handler = async function (event, context, callback) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  })

  const posts = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection(collection)

  const data = [
    {
      id: 0,
      caption: "Welcome to AI journey",
      timestamp: "2020-03-10T09:08:31.020Z",
     
    },
  ]

  try {
    for (let i = 0; i < data.length; i++) {
      await posts.create(data[i].id, data[i])
    }

    return {
      statusCode: 200,
    }
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}
