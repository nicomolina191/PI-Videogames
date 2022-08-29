/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'Super Mario Bros. is a platform game. In the game, Mario must race through the Mushroom Kingdom and save Princess Toadstool (later Princess Peach) from Bowser.',
  released: '1985-09-13',
  rating: 4.5,
  genres: ['Adventure', 'Platformer'],
  platforms: ['Nintendo Switch']
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));

  describe('GET /videogames', () => {
    it('should response with 200', (done) => {
      agent.get('/videogames')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
  });

  describe('GET /videogames?name=something', () => {
    it('should can handle query params', (done) => {
      agent.get('/videogames?name=minecraft')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
    it('should response with 404 if the videogame is not found', (done) => {
      agent.get('/videogames?name=Lucas').expect(404)
      done()
    })
  });

  describe('GET /videogame/:id', () => {
    it('should can handle match params', (done) => {
      agent.get('/videogame/4291')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
    it('should response with 404 if the videogame is not found', (done) => {
      agent.get('/videogame/952354').expect(404)
      done()
    });
  });

  

  describe('Genres routes', () => {
    before(() => conn.authenticate()
      .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));

    describe('GET /genres', () => {
      it('should response with 200', (done) => {
        agent.get('/genres').expect(200)
        done()
      });
    });

  });


});
