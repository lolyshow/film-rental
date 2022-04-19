const dotenv = require("dotenv").config({ path: `${__dirname}/../.env` });
const mongodb  = require("mongodb").MongoClient;
mongodb.connect(process.env.CONNECTIONSTRING, async function(err, client){
    if (err) throw err;
        console.log("Database created!");
    const db = client.db();
    //to find one particular object
    // const results = await db.collection("pets").find({"name":"phillips"}).toArray();
    const pets = db.collection("pets");
    //to create Record
    // await pets.insertOne({name:"phillipine",age:"10",species:"cat"})

    //to update record
    await pets.updateOne({_id:ObjectId("61f0f389bcc1f4a69147337e")},{$set:{name:"theMusician"}})

    console.log("Done");
    client.close();
});


