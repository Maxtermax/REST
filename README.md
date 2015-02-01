#Note
 Status = development
 Promises
* FULL-REST-API
* Secure data encryption
* Session support
* File support 
* Web socket real time connection

# MEAN
Simple mean stack testing repository.

### Features
  single page app, auth by web token access, model mongodb  

### Install dependencies
```
npm install 
```

```
bower install 
```

### Start mongodb

```
mongod
```

### Run app
```
node app.js
```
### Api usage
Requirements, for short use the nice chrome extension  [postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm) or in the command line [curl](http://curl.haxx.se/) 

### Create account 
Make a ` POST ` request to `http://localhost:5000/sigin`, set set following fields with any value for example:

name | pass     | email | 
------- | ----------| ------ |  
octocat  | 1234 | cat@github.com |


Postman way:
```
POST /signin HTTP/1.1
Host: localhost:5000
Cache-Control: no-cache
Postman-Token: 61bf4ffd-a79a-362d-c372-35e36f4f7cc5
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

octocat
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="pass"

1234
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="email"

cat@github.com
----WebKitFormBoundary7MA4YWxkTrZu0gW
```

Curl way: 
```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: efb99d48-86e3-32cf-940e-7ffe9bdf1708" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "name=octocat" -F "pass=1234" -F "email=cat@github.com" http://localhost:5000/signin
```
### Server responses 
if all was right the request status gonna be something like `201` and return a json object like ,
```
{
"success": true,
"message": "user was created with success :)"
} 
```
At db store was created the account with the specifications, note for sure the pass is encrypt with [bcrypt.js](https://www.npmjs.com/package/bcrypt)

if some field is not present the server return one json object like:
```
{
"success": false,
"message": "the request has no parameters required at body"
}
```
if the name or the pass is taken the server return:
```
{
"success": false,
"message": "taken username or password",
"err": {
 "name": "MongoError",
 "err": "E11000 duplicate key error index: MEAN.users.$name_1 dup key: { : \"octocat\" }",
 "code": 11000,
 "n": 0,
 "connectionId": 482,
 "ok": 1
 }
}
```



### Login  
Make a ` PUT ` request to `http://localhost:5000/login`, set following fields with values of some account created before :

name | pass     | 
------- | ----------|  
octocat  | 1234 |

Postman way:
```
POST /login HTTP/1.1
Host: localhost:5000
Cache-Control: no-cache
Postman-Token: 9fd7835f-98cb-4d5e-1c6d-1a1fbb2448a7
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="pass"

1234
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

octocat
----WebKitFormBoundary7MA4YWxkTrZu0gW
```
Curl way:
```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: 7f7e700e-1d17-e8b6-ca34-5a5d7997a1be" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "pass=1234" -F "name=octocat" http://localhost:5000/login
```
### Server responses 
if all was right the request status gonna be something like `200` and return a json object like ,
```
{
"success": true,
"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoib2N0b2NhdCIsIklEIjoiNTRjZGI1MTY5ZGUxOGQ5MDFhMWFjNThhIiwiaWF0IjoxNDIyNzY4ODc4LCJleHAiOjE0MjI3NjkxNzh9.khajdxW32CWlCikRgDMjgv1JxkY24aNVmYDti2Jge64",
"message": "welcome login success :)"
}
```
this object provide one token, something really important in all application because gonna be the session token, with it we can query to db from many things, this token have one expiration time similar to cookies but much more efficient, so the token expire in 5 minutes after be created.


If name or pass field is not present the server return one json object like:
```
{
"success": false,
"message": "the request has no parameters required at body"
}
```

If name or pass field is not present the server return one json object like:
```
{
"success": false,
"message": "the request has no parameters required at body"
}
```

if the user dont exist at db the server return: 
```
{
"success": false,
"message": "user not found"
}
```

if the password is bad the server return:
```
{
"success": false,
"message": "bad password"
}
```



### Query  
Make a ` GET  ` request to `http://localhost:5000/u/octocat`, set the header of the request with authorization equal to the token previously created,something like this `Bearer [token]`, note the url have like param u for user and the next is the name.

Postman way:
```
GET /u/octocat HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYW1pbiIsIklEIjoiNTRjZDgxNjIxZTE2ZmY5YzFmYzBkZTBkIiwiaWF0IjoxNDIyNzYyMzExLCJleHAiOjE0MjI3NjI2MTF9.yiDItEHV3s4SUHBhfSDxEMb_Mw-Q1gaAVvOA02tMKeA
Cache-Control: no-cache
Postman-Token: 5057560b-10d4-4ac4-bcd9-8fcf98e6be64
```

Curl way:
```
curl -X GET -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYW1pbiIsIklEIjoiNTRjZDgxNjIxZTE2ZmY5YzFmYzBkZTBkIiwiaWF0IjoxNDIyNzYyMzExLCJleHAiOjE0MjI3NjI2MTF9.yiDItEHV3s4SUHBhfSDxEMb_Mw-Q1gaAVvOA02tMKeA" -H "Cache-Control: no-cache" -H "Postman-Token: 388779db-4da7-2948-824d-1671ae67206e" http://localhost:5000/u/octocat
```
if the query does not have the authorization at headers from request or the token is expired or malformed or the user are different to  user with just logged so the server dont return any error, but return one limit version of the query something like:
```
{
"email": "octocat@github.com",
"name": "octocat",
"limit": true
}
```
this is for [jwt](https://github.com/auth0/node-jsonwebtoken) and [express-jwt](https://github.com/auth0/express-jwt)


if the user dont exist the server return:
```
{
"success": false,
"message": "Ooops!",
 "err": {
 "status": 404,
 "success": false,
 "message": "user no found"
 }
}
```
if request dont have the method 'Bearer' into the header from request the server will return:
```
{
"success": false,
"message": "no found Bearer [token] field in the headers of the request"
}
```
if you query the user with just logged the server return the scheme from this user:
```
{
 "post": [ ],
 "createAt": "2015-02-01T05:09:42.430Z",
 "media": {
  "video": [ ],
  "audio": [ ],
  "docs": {
   "pdf": [ ]
  }
 },
 "contactos": [ ],
 "email": "octocat@github.com",
 "name": "octocat"
}
```














### Query news 
To get the news is required previously login and have one token so make a ` GET  ` request to `http://localhost:5000/news`, set the header of the request with authorization equal to the token previously created,something like this `Bearer [token]`. 

Postman way:
```
GET /news HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYW1pbiIsIklEIjoiNTRjZDgxNjIxZTE2ZmY5YzFmYzBkZTBkIiwiaWF0IjoxNDIyNzYyMzExLCJleHAiOjE0MjI3NjI2MTF9.yiDItEHV3s4SUHBhfSDxEMb_Mw-Q1gaAVvOA02tMKeA
Cache-Control: no-cache
Postman-Token: b5e36696-4a7e-925d-6674-e61ca437d8f0
```

Curl way:
```
curl -X GET -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYW1pbiIsIklEIjoiNTRjZDgxNjIxZTE2ZmY5YzFmYzBkZTBkIiwiaWF0IjoxNDIyNzYyMzExLCJleHAiOjE0MjI3NjI2MTF9.yiDItEHV3s4SUHBhfSDxEMb_Mw-Q1gaAVvOA02tMKeA" -H "Cache-Control: no-cache" -H "Postman-Token: 42d2644e-7fe6-f46c-b197-dc20869b7529" http://localhost:5000/news
```





























































### TODO
 File handdler, frontend desig with bootstrap,Make a better API to make http request in the frontend





