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
    this.db.run(`
      create table if not exists profiles (
        id integer primary key,
        userid integer,
        tag text)`);
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

  selectByEmail(email, callback) {
    return this.db.get(
      "select * from users where email = ?",
      [email],
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
      "insert into users (username, email, password) values (?, ?, ?)",
      user,
      function(err) {
        callback(err);
      }
    );
  }

  selectTags(userid, callback) {
    return this.db.all(
      "select id, tag from profiles where userid = ?",
      [userid],
      function(err, rows) {
        callback(err, rows);
      }
    );
  }

  insertTags(userid, inserts, callback) {
    let insertSql = `
      insert into profiles (userid, tag) values
      (?, ?)${", (?, ?)".repeat(inserts.length - 1)}`;
    console.log("insertSql:", insertSql);
    console.log("userid:", userid);
    console.log("inserts:", inserts);
    return this.db.run(
      insertSql,
      inserts.map(elem => [userid, elem]).flat(),
      function(err) {
        callback(err);
      }
    );
  }

  deleteTags(userid, deletes, callback) {
    let deleteSql = `
      delete from profiles where
      userid = ? and
      tag in (?${", ?".repeat(deletes.length - 1)})`;
    return this.db.run(
      deleteSql,
      [userid].concat(deletes),
      function(err) {
        callback(err);
      }
    );
  }
}

module.exports = Db;
