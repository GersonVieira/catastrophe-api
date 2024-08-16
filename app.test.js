const supertest = require('supertest');
const app = require('./app');

describe('Tests for community center controller', () => {

    it('Should return all community centers  with HTTP status 200', async () => {
        await supertest(app).get('/api/community-centers').expect(200);
    });

    it('Should create, get and delete a community center with HTTP status 200', async () => {
        const request = await supertest(app).post('/api/community-centers').send({
            name: 'Centro 4',
            location: 'Centro',
            address: 'Rua da farofa',
            maxOcupation: 100,
            currentlyOcupation: 12,
            resources: {
                doctor: 1,
                medKit: 2,
                voluntary: 3,
                vehicle: 4,
                foodParcel: 5
            }
        }).expect(201);
        await supertest(app).get(`/api/community-centers/${request.body._id}`).expect(200);
        await supertest(app).delete(`/api/community-centers/${request.body._id}`).expect(200);
        console.log(request);
        
    });

    describe('Test for create a community center without a required field', () => {
        it('Should not create a community center with HTTP status 500', async () => {
            await supertest(app).post('/api/community-centers').send({
                name: 'Centro 4',
                location: 'Centro',
                address: 'Rua da farofa',
                currentlyOcupation: 12,
                resources: {
                    doctor: 1,
                    medKit: 2,
                    voluntary: 3,
                    vehicle: 4,
                    foodParcel: 5
                }
            }).expect(500);
        });
    });


})
