var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("index.js",function(){

  // #1 should return home page

  it("should return home page",function(done){
        // calling home page api
        server
        .get("/")
        .expect("Content-type",/html/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        //   res.body.error.should.equal(false);
        done();
        });
  });

  it("should return 404",function(done){
        server
        .get("/random")
        .expect(404)
        .end(function(err,res){
        res.status.should.equal(404);
        done();
        });
    });

});