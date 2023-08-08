

// Setup express middleware
const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = 8080;
const fs = require('fs');
const bcrypt = require('bcrypt');
app.use(express.json());

//connect to Database, local version!
const client = new Client({
    user:'numirlcrhfcvdx',
    host: 'ec2-34-203-182-65.compute-1.amazonaws.com',
    database: 'dddumi8mf6qq2m',
    password: 'e3eb1ce30bbc5558d73bc36b4cd8cc67e4a9cdd7d5d71789d6611fada39e3b25',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
      }
});
client.connect();

var resourcesData2 = {};


//grab everything from DB and put in json object resourcesData2 (to replace resourcesData)
function importResourcesData() {
    return new Promise((resolve) => {
        client.query('SELECT * FROM resources;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows){
                var name = row.title;
                resourcesData2[name] = {
                    type:row.type,
                    title:row.title,
                    description:row.description,
                    content:row.content,
                    img:row.img,
                    tags:row.tags,
                    age:row.age,
                    date:row.date
                    
                };
            }
            resolve("done");
        });

    });
  }
// Repond to request for JSON
app.get('/resources/all', async(req,res) => {
    await importResourcesData().then(() => {
        res.status(200).send({
            resourcesData2
        })
    });
    
})

app.post('/privacy', async (req,res) => {
    var website = req.body.website
    async function changePrivacy(){
        return new Promise((resolve) => {
            client.query(`UPDATE users SET childnames = '{${website}}' WHERE email = 'admin';`, (err, res) => {
                if (err) throw err;
                resolve("done");
            });
    
        });
    }
    
    try {

        await changePrivacy().then((data) => res.json({
            status:data,
            website:website
        }))

    } catch {

        console.log(`Error occured`)

    }

})

app.post('/get/privacy', async (req,res) => {
    let website;
    async function getPrivacy(){
        return new Promise((resolve) => {
            client.query(`SELECT * FROM users WHERE email = 'admin';`, (err,res) => {
                if (err) throw err;
                website = res.rows[0].childnames[0];
                resolve("done");
            })
        })
    }
    try {

        await getPrivacy().then((data) =>{
            res.json({
                status:data,
                website:website
            })
        })

    } catch {

        console.log(`Error occured`)

    }
})
// Respond to request to create user
app.post('/users/add', async (req,res) => {

    // Create a user object
    let user = {
        name: null, 
        email: null,
        password: null,
        childName: [],
        childDob: [],
        favourites: []
    }

    // Function to check the user stuff
    async function checkUser(){

        // If not, hash the password and pass user object to the array
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = {
            name: req.body.name, 
            email: req.body.email,
            password: hashedPassword,
            childName: req.body.childName,
            childDob: req.body.childDob,
            favourites: []
        };
        console.log(user)
    }

    async function addUser(){
            return new Promise((resolve) => {
                client.query(`INSERT INTO users VALUES (
                    '${user.name}',
                    '${user.email}',
                    '${user.password}',
                    '{${user.childName}}',
                    '{${user.childDob}}',
                    '{${user.favourites}}');`, (err,res) => {
                    if (err){user.name = null;} 
                    //returns whole response, if looking for failure due to user already existing, err will throw, otherwise res.rowCount = 1 if successful
                    resolve("done");
                    })});

    }

    // Function for returning the json
    async function jsonResponse(){
        if (user.name != null){
            res.json({
                status: true,
                message: `User ${req.body.name} created successfully`
            })
        } else {
            res.json({
                status: false,
                message: `Error occured`
            })
        }
    }

    try {

        await checkUser().then(() => addUser()).then(() => jsonResponse())

    } catch {

        console.log(`Error occured`)

    }
})

// Respond to request to login
app.post('/users/login', async (req,res) => {

    // Function for finding the user based on email
    async function findUser(email){

        return new Promise((resolve) => {
            client.query(`SELECT * FROM users WHERE email = '${email}';`, (err,res) => {
                if (err) throw err;
                user = res.rows[0];
                console.log(res.rows)
                resolve("done");
            });

    });}

    // Function for checking the password hashes and returning the json
    async function checkPassword(storedPassword){

        try {
            if (await bcrypt.compare(req.body.password,storedPassword)){
                res.json({
                    status: true,
                    message: `${user.name}`,
                    username: user.name,
                    email: user.email,
                    childName: user.childnames,
                    childDob: user.childdob,
                    favourites: user.favourites
                })
                return
            } else {
                res.json({
                    status: false,
                    message: `Incorrect password, please try again.`
            })
            }
        } catch {
            res.json({
                status: false,
                message: `Unable to log in.`
        })
    }
    }

    // Create the user object
    let user = {
        name: null,
        email: null,
        password: null,
        childName: null,
        childDob: null,
        favourites: null
    }

    // Find the user object based on the email
    try {
        await findUser(req.body.name).then(() => checkPassword(user.password))
    } catch {
        res.json({
            status: false,
            message: `No user found with this email address.`
        })
    }

})

// Respond to request to toggle a user favourite
app.post('/resources/favourites/manage', async (req,res) => {

    // Create a favourites array
    let userFavourites = []

    // Function for getting the users favourites
    async function getFavourites(email){
        console.log(email)
        return new Promise((resolve) => {
            client.query(`SELECT * FROM users WHERE email = '${email}';`, (err,res) => {
                if (err) throw err;
                userFavourites = res.rows[0].favourites
                console.log(userFavourites)
                resolve("done");
            })
        })

    }

    // Function for adjusting the users favourites
    async function manageFavourites(favourites){

        console.log("MANAGING FAVOURITES")
        // Adjust the local copy
        const index = favourites.indexOf(req.body.resourceName);
        console.log(req.body.resourceName);
        console.log(favourites);
        console.log(index);
        if (index > -1) { 
            favourites.splice(index, 1); 
        } else {
            favourites.push(req.body.resourceName)
        }

        // Update DB with new local copy
        return new Promise((resolve) => {
            client.query(`UPDATE users SET favourites = '{${favourites}}' WHERE email = '${req.body.name}';`, (err,res) => {
                if (err) throw err;
                resolve("done");
            })
        })

    }
    
    // Do the thing
    try {
        await getFavourites(req.body.name).then(() => manageFavourites(userFavourites)).then(() => res.json({
            status: true,
            favourites: userFavourites
        }))
    } catch {
        console.log(`A favourites error has occured`)
    }

})

app.post('/users/edit', async (req,res) => {

    if (req.body.childDob !== undefined){

        let found = false;

            // Function for finding the user based on email
        async function findUser(email){
            console.log("Entering find user")

            return new Promise((resolve) => {
            client.query(`SELECT * FROM users WHERE email = '${email}';`, (err,res) => {
                if (err){
                    throw err
                } else if (res.rowCount == 0){
                    
                } else if (res.rows[0].childdob[0] === req.body.childDob){
                    found = true
                }
                resolve("done");
            });
        });}

        try{
            await findUser(req.body.email).then(() => changePassword(found)).then((data)=> 
            res.json({
                status:data
            }))
        } catch(err){
            res.json({
                status:"error"
            })
        }

    } else {

        let found = true;

        try{
            await changePassword(found).then((data)=> 
            res.json({
                status:data
            }))
        } catch(err){
            res.json({
                status:"error"
            })
        }


    }

    async function changePassword(found){
        if (found){
            var data = req.body;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.password, salt);
            return new Promise((resolve) => {
                client.query(`UPDATE users SET password = '${hashedPassword}' WHERE email = '${data.email}';`, (err,res) => {
                    if (err) throw err;
                    if (res.rowCount === 0){
                        response = "Invalid Email!";
                        resolve("error")
                    }
                    else if(res.rowCount === 1){
                        response = "Password Changed!";
                        resolve("done")
                    }
                    else{resolve("error")}
                    
                })
        
            })
        } else {
            throw error
        }
    }

})

app.post('/users/delete', async (req,res) => {
    var response = "";
    async function deleteUser(){
        var data = req.body;
        if (data.email == 'admin'){
            return new Promise((resolve) => {
                resolve("Cannot delete admin!")
            })
        }
        return new Promise((resolve) => {
         client.query(`DELETE FROM users WHERE email = '${data.email}';`, (err,res) =>{
             if (err) throw err;
             if (res.rowCount === 0){
                 response = "No user exists!"
             resolve("error")
             }
             else if(res.rowCount === 1){
                 response = "User Deleted!"
                 resolve("done")
             }
             else(resolve("error"))
         })
    })
    }
    try{
        await deleteUser().then((data)=> 
        res.json({
            status:data,
            response:response
        }))
    } catch(err) {
        res.json({
            status:data,
            response:response
        })
    }
})

// Respond to request to add resource
app.post('/resources/new', async (req,res) => {
    var object = req.body.jsonObject;
    const name = object.title;
    async function checkQuotes(){

        return new Promise((resolve) => {
        object.title =object.title.replace(/'/g, `''`);
        object.description =object.description.replace(/'/g, `''`);
        object.content =object.content.replace(/'/g, `''`);
        object.tags =object.tags.replace(/'/g, `''`);
        resolve("done")
        })
   
      }
    async function checkResources(){
        if (resourcesData2[name] == null){
            return new Promise((resolve) => {
            resourcesData2[name] = {
                type:object.type,
                title:object.title,
                description:object.description,
                content:object.content,
                img:object.img,
                tags:object.tags,
                age:object.age,
                date:object.date
            };
            client.query(`INSERT INTO resources VALUES (
                '${resourcesData2[name].type}',
                '${resourcesData2[name].title}', 
                '${resourcesData2[name].description}', 
                '${resourcesData2[name].content}', 
                '${resourcesData2[name].img}', 
                '${resourcesData2[name].tags}', 
                '${resourcesData2[name].age}',
                '${resourcesData2[name].date}');`, (err,res) => {
                if (err) console.log(err);
            })
            resolve("done")
        })
        }
        else{
            return new Promise((resolve) => {
                resolve("duplicate")
            })
        }
    
    
    }
    try{
        await checkQuotes().then(() => checkResources()).then((data) =>
        res.json({status:data})    
        )
    } catch(err) {
        res.json({
            status:"hello"
        })
        console.log(err)
    }
})

// Respond to request to delete resource
app.post('/resources/del', (req,res) => {
    let object = req.body;
    if(resourcesData2[object.title] != null){
    let temp = object.title.replace(/'/g, `''`);
    delete resourcesData2[object.title];
    client.query(`DELETE FROM resources WHERE title = '${temp}';`,(err,res) => {
        if (err) throw err;
    })
    }
    else{
        console.log("Error, does not exist")
    }
    
    
})

// Change user information
app.post('/users/change', (req,res) => {

    // variables
    let found = false
    let status = false

    // find the user using their email
    async function findUser(){

        console.log("ATTEMPTING TO FIND USER")

        return new Promise((resolve) => {
        client.query(`SELECT * FROM users WHERE email = '${req.body.email}';`, (err,res) => {
            if (err) throw err;
            if (res.rows[0].email === req.body.email){
                console.log("FOUND USER")
                found = true
            }
            resolve("done");
        });
    })}

    // update the user using the new user object
    async function changeDetails(){
        console.log("look here")
        console.log(req.body.childName)
        if (found){
            console.log("Found is true")
            return new Promise((resolve) => {
                client.query(`UPDATE users SET childnames = '{${req.body.childName}}', childdob = '{${req.body.childDob}}' WHERE email = '${req.body.email}';`, (err,res) => {
                    if (err) throw err;

                    if (res.rowCount === 1){
                        status = true
                    } else {
                        status = false
                    }
                    resolve("done")
                })
            })
        } else {
            status = false
        }
    }

    try {
        findUser().then(() => changeDetails()).then(() => res.json({
            status: status
        }))
    } catch {
        res.json({
            status: false
        })
    }


})

app.listen(
    process.env.PORT || PORT,
    () => console.log(`listening on http://localhost:${PORT}`)
);