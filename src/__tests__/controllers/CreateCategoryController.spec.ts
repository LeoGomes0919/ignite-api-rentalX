import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
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

  it('should to be able to create a new category', async () => {
    const resToken = await request(app).post('/sessions').send({
      email: 'admin@gmail.com',
      password: 'admin',
    });

    const { token } = resToken.body;

    const res = await request(app)
      .post('/categories')
      .send({
        name: 'Teste',
        description: 'Testando cadastro',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(201);
  });

  it('should not to be able to create a new category with same name', async () => {
    const resToken = await request(app).post('/sessions').send({
      email: 'admin@gmail.com',
      password: 'admin',
    });

    const { token } = resToken.body;

    const res = await request(app)
      .post('/categories')
      .send({
        name: 'Teste',
        description: 'Testando cadastro',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(400);
  });
});
