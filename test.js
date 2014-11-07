var supertest = require("supertest");
var express = require("express");
var assert = require("assert");

var metrics = require("./index");

describe("metrics", function() {

  var server;
  var calls = [];
  var request;

  before(function() {
    server = express();
    request = supertest(server);

    server.use(metrics(function() {
      calls.push(arguments)
    }));
  });

  describe("basic api", function() {


    before(function(done) {
      calls = [];

      server.get("*", function(req,res) {
        setTimeout(function() {
          res.send({});
        }, 500);
      });

      request
        .get("/foo")
        .end(done);
    });

    it("doesn't screw anything up", function() {
      assert.equal(calls.length, 1, "wasn't called!");
    });

    it("provides ms timing as first argument to callback", function() {
      var ms = calls[0][0];

      assert(typeof ms == "number", "should have provided ms as number as first arg to callback");
      assert(ms > 500 && ms < 1000, "ms looks dodgy - 500 ms timeout but got " + ms);
    });

    it("provides request object as second arg", function() {
      var req = calls[0][1];
      assert.equal(req.url, "/foo");
    });

    it("provides response object as second arg", function() {
      var res = calls[0][2];
      assert.equal(res.statusCode, 200);
    });

  });

});
