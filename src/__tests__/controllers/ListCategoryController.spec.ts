import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 10);

    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, admin)
      VALUES('${id}', 'admin', 'admin@gmail.com', '${password}', '2024886485648', true)`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should to be able to list all categories', async () => {
    const resToken = await request(app).post('/sessions').send({
      email: 'admin@gmail.com',
      password: 'admin',
    });

    const { token } = resToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Teste List',
        description: 'Testando Listagem',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const res = await request(app).get('/categories');
    const { categories } = res.body;
    expect(categories[0]).toHaveProperty('id');
  });
});
