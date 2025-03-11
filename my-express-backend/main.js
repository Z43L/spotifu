import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import songRoutes from './routes/songs.js';
import axios from 'axios';
import querystring from 'querystring';

const app = express();
const port = process.env.PORT || 3000;

// Spotify API Credentials
const CLIENT_ID = 'b3bd33f41d9d42e498fa2fcf8b0e5d92'; // Replace with your actual Client ID
const CLIENT_SECRET = '13d125bdb3e44508a60f6eb195f654e9'; // Replace with your actual Client Secret
const REDIRECT_URI = 'https://spotifu.onrender.com/callback';

app.use(cors());
app.use(bodyParser.json());

app.use('/api/songs', songRoutes);

// Route to initiate the Spotify login flow
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email'; // Add other permissions as needed
    const state = 'some-random-state'; // You should generate a random string here for security
    const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
    })}`;
    res.redirect(authUrl);
});

// Callback route to handle Spotify's response
// Callback route to handle Spotify's response
app.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    if (!code || !state) {
        return res.status(400).json({ error: 'Missing code or state' });
    }

    try {
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        const { access_token, refresh_token } = tokenResponse.data;
        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);
        // Redirect back to the Expo app with the access token in the URL
        const redirectUrl = `exp://192.168.1.4:8081?accessToken=${encodeURIComponent(access_token)}`; //Change the URL with your project url
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).json({ error: 'Failed to exchange code for tokens' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
