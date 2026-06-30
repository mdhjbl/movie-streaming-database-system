const http = require('http');

const BASE_URL = 'http://localhost:3000/api';

// Helper function to make requests
function request(path, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api' + path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = 'Bearer ' + token;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testApi() {
  console.log('Testing API...');
  console.log('-------------------');

  try {
    // Test register
    console.log('\n1. Testing register...');
    const registerResult = await request('/auth/register', 'POST', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'test123',
      birth_year: 2000
    });
    console.log('Register result:', registerResult);

    // Test login
    console.log('\n2. Testing login...');
    const loginResult = await request('/auth/login', 'POST', {
      email: 'test@example.com',
      password: 'test123'
    });
    console.log('Login result:', loginResult);
    const token = loginResult.token;

    // Test get films
    console.log('\n3. Testing get films...');
    const filmsResult = await request('/films');
    console.log('Films result:', filmsResult);

    // Test admin login
    console.log('\n4. Testing admin login...');
    const adminLoginResult = await request('/auth/login', 'POST', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('Admin login result:', adminLoginResult);
    const adminToken = adminLoginResult.token;

    // Test add film (admin)
    console.log('\n5. Testing add film (admin)...');
    const addFilmResult = await request('/films', 'POST', {
      name: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      country: 'USA',
      runtime: 148,
      imdb_rating: 8.8,
      age_rating: 'PG-13',
      language: 'English',
      dubbing_status: 'Original',
      plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      release_year: 2010,
      poster: 'default-movie.jpg'
    }, adminToken);
    console.log('Add film result:', addFilmResult);

    // Test get films again
    console.log('\n6. Testing get films again...');
    const filmsResult2 = await request('/films');
    console.log('Films result 2:', filmsResult2);

  } catch (err) {
    console.error('Error:', err);
  }
}

testApi();
