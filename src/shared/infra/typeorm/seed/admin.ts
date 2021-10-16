import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 10);

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, admin)
    VALUES('${id}', 'admin', 'admin@gmail.com', '${password}', '2024886485648', true)`,
  );
  await connection.close();
}
create().then(() => console.log('User admin created!'));
