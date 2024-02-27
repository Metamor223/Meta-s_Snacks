process.env.NODE_ENV = 'test';
import * as chai from "chai";
import chaiHttp from "chai-http";
import start from "../index.js";
chai.should();
chai.use(chaiHttp);
describe('Tasks API', () => {

    describe('Warehouse API', () => {
        it('should add ingredients in warehouse', (done)=>  {
            const task ={
                id_ingredient: 1,
                name:"salt",
                count:"800"
            };
            chai.request(start)
                .post('/api/warehouse')
                .send(task)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id_ingredient').eq(1);
                    res.body.should.have.property('name').eq("salt");
                    res.body.should.have.property('count').eq(800);
                    done();
                });
        })
    });
})
