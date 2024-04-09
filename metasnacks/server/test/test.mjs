import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';

describe('POST /api/postCategory', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/api/type/')
            .set('Accept', 'application/json')
            .send({ name_type : 'dried squid'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name_type').to.equal('dried squid');
                done();
            });
    });
});

describe('POST /api/getLengthCart', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/api/getLengthCart')
            .set('Accept', 'application/json')
            .send({ customer_id : 2})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.length).to.equal(0)
                done();
            });
    });
});

describe('POST /api/getLengthCart', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/api/getLengthCart')
            .set('Accept', 'application/json')
            .send({ customer_id : 4})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.length).to.equal(3)
                done();
            });
    });
});


after(function() {
});