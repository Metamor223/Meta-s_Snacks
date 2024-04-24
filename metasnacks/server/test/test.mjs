import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';


describe('all tests', function (){
describe('POST /api/postCategory', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/api/type/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
});


describe('DELETE /api/deleteCategory', function() {
    it('responds with json', function(done) {
        const id = 9
        request(app)
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err) {
                if (err) return done(err);
                done();
            });
    });
});

describe('Delete /api/deleteType', function() {
    it('responds with json', function(done) {
       const id = 9;
        request(app)
            .delete(`/api/type/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
})
