"use strict"
const sqlite3 = require("sqlite3").verbose();

class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    this.db.run(`
      create table if not exists users (
        id integer primary key,
        username text,
        email text unique,
        password text)`);
  }

  selectById(id, callback) {
    return this.db.get(
      "select * from users where id = ?",
      [id],
      function(err, row) {
        callback(err, row);
      }
    );
  }

  selectByUsername(username, callback) {
    return this.db.get(
      "select * from users where username = ?",
      [username],
      function(err, row) {
        callback(err, row);
      }
    );
  }

  selectAll(callback) {
    return this.db.all("select * from users", function(err, rows) {
      callback(err, rows);
    });
  }

  insert(user, callback) {
    return this.db.run(
      "insert into users (name, email, password) values (?, ?, ?)",
      user,
      function(err) {
        callback(err);
      }
    );
  }
}

module.exports = Db;
