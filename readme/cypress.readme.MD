How to run cypress test: 

1- go to https://developers.google.com/oauthplayground
2- click on the parameters, 
3- paste the client ID and client secret
4- include scopes 'https://www.googleapis.com/auth/userinfo.profile, https://www.googleapis.com/auth/userinfo.email'
5- click on the authorize button 
6- click on the token exchange button
7- paste the refresh token in the root .env file
8- be sure that the .env file in the root project has "GOOGLE_REFRESH_TOKEN", "GOOGLE_CLIENT_ID" and "GOOGLE_CLIENT_SECRET"
9- you can run "npx cypress open"