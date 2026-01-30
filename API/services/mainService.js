const { MongoClient, ObjectId } = require("mongodb");

const {
  DB_URI,
  DB_NAME,
  MAIN_COLLECTION_NAME,
  USERS_COLLECTION_NAME,
  FIELDS,
} = require("../IMPORTANTE/variablesGlobales");

class MainService {
  static async get() {
    const uri = DB_URI;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const mainDB = database.collection(MAIN_COLLECTION_NAME);

      const resultado = await mainDB.find().toArray();

      return resultado;
    } finally {
      await client.close();
    }
  }

  static async getId(id) {
    const uri = DB_URI;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const mainDB = database.collection(MAIN_COLLECTION_NAME);

      const resultado = await mainDB.findOne({ [FIELDS.ID]: new ObjectId(id) });

      return resultado;
    } finally {
      await client.close();
    }
  }

  static async getUsers() {
    const uri = DB_URI;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const mainDB = database.collection(USERS_COLLECTION_NAME);

      const resultado = await mainDB.find().toArray();

      return resultado;
    } finally {
      await client.close();
    }
  }

  /*static async getTipo(tipo) {
    const uri = DB_URI;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const mainDB = database.collection(MAIN_COLLECTION_NAME);

      const resultado = await mainDB.find({ [FIELDS.TIPO]: tipo }).toArray();
      return resultado;
    } finally {
      await client.close();
    }
  }*/

  static async post(title, year, genre, rating, platform, imageUrl, watched) {
    const uri = DB_URI;
    const mongo_client = new MongoClient(uri);
    try {
      await mongo_client.connect(DB_NAME);
      const database = mongo_client.db();
      const table = database.collection(MAIN_COLLECTION_NAME);

      const data = await table.insertOne({
        [FIELDS.TITLE]: title,
        [FIELDS.YEAR]: year,
        [FIELDS.GENRE]: genre,
        [FIELDS.RATING]: rating,
        [FIELDS.PLATFORM]: platform,
        [FIELDS.IMAGEURL]: imageUrl,
        [FIELDS.WATCHED]: watched,
      });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      await mongo_client.close();
    }
  }

  static async put(
    id,
    title,
    year,
    genre,
    rating,
    platform,
    imageUrl,
    watched,
  ) {
    const uri = DB_URI;
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const table = database.collection(MAIN_COLLECTION_NAME);

      const result = await table.updateOne(
        { [FIELDS.ID]: new ObjectId(id) },
        {
          $set: {
            [FIELDS.TITLE]: title,
            [FIELDS.YEAR]: year,
            [FIELDS.GENRE]: genre,
            [FIELDS.RATING]: rating,
            [FIELDS.PLATFORM]: platform,
            [FIELDS.IMAGEURL]: imageUrl,
            [FIELDS.WATCHED]: watched,
          },
        },
      );

      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  }

  static async delete(id) {
    const uri = DB_URI;
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const table = database.collection(MAIN_COLLECTION_NAME);

      const result = await table.deleteOne({
        [FIELDS.ID]: new ObjectId(id),
      });

      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  }
}



module.exports = MainService;
