class UserAdapter {
    static baseUrl = "http://localhost:3000/users"


    static postLogin(userObj){
        const obj = {user: userObj}
        const configObj = {
            method: "Post",
            headers:{
                "Content-Type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify(obj)
        }
        
        fetch(UserAdapter.baseUrl,configObj)
        .then(resp => resp.json())
        .then(user => User.authenticate(user) )
        mainTag.innerHTML = spinner
    }

    static getUser(id){     
        fetch(`${UserAdapter.baseUrl}/${id}`)
        .then(resp => resp.json())
        .then(user => User.authenticate(user) )
        mainTag.innerHTML = spinner
    }
    



}