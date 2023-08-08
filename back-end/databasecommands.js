
//adding database contents to resourcedata json object in program
client.query('SELECT * FROM resources;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows){
        var name = row.title;
        if (resourcesData[name] == null){
            resourcesData[name] = {
                type:row.type,
                title:row.title,
                description:row.description,
                content:row.content,
                img:row.img,
                tags:row.tags,
                date:row.date,
                age:row.age,
                
            };
        };
    }
});

//add a new resource to database
client.query("INSERT INTO resources VALUES ('New Sample', 'New Sample', 'New Sample', 'New Sample', 'New Sample', 'New Sample', 'New Sample');", (err) => {
    if (err) throw err;
})

//find a resource by title, res.RowCount is how many resources there are (1 found, 0 not found)
client.query("SELECT * FROM resources WHERE title = 'New Sample';", (err,res) => {
    if (err) throw err;
    console.log(res);
})

//delete a resource by title, res.RowCount is how many resources there are (1 found, 0 not found)
client.query("DELETE FROM resources WHERE title = 'New Sample';", (err,res) => {
    if (err) throw err;
    console.log(res);
})

//populate DB with contents of resources file
const blogArray = Object.entries(resourcesData);
for (i = 0; i < blogArray.length; i++){
    let currentBlog = blogArray[i];
    //check if resources.json exists in db
    client.query(`SELECT * FROM resources WHERE title = '${currentBlog[1].title}';`, (err,res) =>{
        if (err) throw err;
        if (res.rowCount < 1){
            //if doesn't exist, insert into db
            client.query(`INSERT INTO resources VALUES (
                '${currentBlog[1].type}',
                '${currentBlog[1].title}', 
                '${currentBlog[1].description}', 
                '${currentBlog[1].content}', 
                '${currentBlog[1].img}', 
                '${currentBlog[1].tags}', 
                '${currentBlog[1].age},
                ${currentBlog[1].date}');`, (err,res) => {
                if (err) throw err;
            })
        }
    })
    
    //add to db if not exist
}

//USER COMMANDS

//function to search for a user, returns user object
function findUser(email, password){
    client.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`, (err,res) => {
        if (err) throw err;
        return res.rows;
    })
}

//delete user with input of user object
function deleteUser(user){
    client.query(`DELETE FROM users WHERE email = '${user.email}';`, (err,res) =>{
        if (err) throw err;
        //returns value of how many users deleted (1 means user deleted, 0 means user didn't exist)
        return res.rowCount;
    })
}

function addUser(user){
    client.query(`INSERT INTO users VALUES (
        '${user.name}',
        '${user.email}',
        '${user.password}',
        '{${user.childname}}',
        '{${user.childdob}}');`, (err,res) => {
        if (err) throw err;
            //returns whole response, if looking for failure due to user already existing, err will throw, otherwise res.rowCount = 1 if successful
        return res.rowCount;
    })
}
//change password of user object to string parsed as newpassword (you will need to change the password in the user object in users array yourself)
function changePassword(user, newpassword){
    client.query(`UPDATE users SET password = '${newpassword}' WHERE email = '${user.email}';`, (err,res) => {
        if (err) throw err;
        return res;
    })
}
//change favourites list of user object with altered favourites list as newFavourites
function changeFavourites(user, newFavourites){
    client.query(`UPDATE users SET favourites = '{${newFavourites}}' WHERE email = '${user.email}';`, (err,res) => {
        if (err) throw err;
        return res;
    })
}

  //this will need to be called to initiate the users2 object
  function importUsersData() {
    return new Promise((resolve) => {
        client.query("SELECT * FROM users;", (err,res) => {
            if (err) throw err;
            var i = 0;
            for (let row of res.rows){
                
                users2[i] = {
                    name:row.name,
                    email:row.email,
                    password:row.password,
                    childnames:row.childnames,
                    childdob:row.childdob,
                    favourites:row.favourites
                }
                i++;
            }
            console.log(users2);
            resolve("done");
        })
    });
}







fs.writeFile(path,JSON.stringify(resourcesObject),function(err){
    if(err){
        console.log(err)
    }
})

fs.writeFile(path,JSON.stringify(resourcesObject),function(err){
    if(err){
        console.log(err)
    }
})