const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const spotifyWebApi = require('spotify-web-api-node')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log('hi')
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:5173',
        clientId: '6d9ae14686314ea58e6633bc1a060d3f',
        clientSecret: '2026add7537e4922bc5f44ee995d4bae',
        refreshToken,
    })

    spotifyApi
        .refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:5173',
        clientId: '6d9ae14686314ea58e6633bc1a060d3f',
        clientSecret: '2026add7537e4922bc5f44ee995d4bae'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.listen(3001)
