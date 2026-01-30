"use strict";

module.exports = {
  // BASES DE DATOS
  //DB_URI: "mongodb://mongoadmin:secret@localhost:27017",
  DB_URI: "mongodb://mongoadmin:secret@localhost:27017/movie_tracker_db",
  DB_NAME: "movie_tracker_db",

  // NOMBRES DE COLECCIONES
  MAIN_COLLECTION_NAME: "movies",
  USERS_COLLECTION_NAME: "users",

  // RUTAS

  BASE_ROUTE: "",
  ID_ROUTE: "/:id",

  USERS_ROUTE: "/usuarios",
  USERS_ID_ROUTE: "/usuarios/:id",

  // CAMPOS COMUNES EN EL mainService POST
  FIELDS: {
    ID: "_id",
    TITLE: "title",
    YEAR: "year",
    GENRE: "genre",
    RATING: "rating",
    PLATFORM: "platform",
    IMAGEURL: "imageUrl",
    WATCHED: "watched"
  },
};
