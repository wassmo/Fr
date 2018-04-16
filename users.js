const userNames = () => {

    return ['yyx990803', 'toddmotto', 'johnpapa', 'angular', 'facebook', 'vuejs']
}


/*
* Firstly I've thought about the way, where function contains fetches.
* But there was a problem, because I couldn't find solution how to transfer
* the sum variable from sumPopularity to insertData function. This cause, that I can't fill
* the Sum of stars cell in table.
*
*
* I was seeking the solution in documentation and then think about promise, which will take two api's data together, and next will sum up all stars in user repos and insert data to table cells. That gives a way, where the sum variable will be outside fetch. But in this solution I have a problem with transfering data from apiTogether object.
*
*In my opinion there is also a bug (or my mistake) in angular api or in test e2e. In my counting, Angular's repos have 71250 stars, not over 129000.
*
*
* First solution I've put after comments (sum of stars for each user in this code you can see in console). Second one (with promises) is placed underneath.
*
*
*
*
*
* userNames().forEach((userLogin) => {

    const apiRepos = fetch(`https://api.github.com/users/${userLogin}/repos`)
        .then(res => res.json());
    const apiUsers = fetch(`https://api.github.com/users/${userLogin}`)
        .then(res => res.json());

    const apiesTogether = {"apiRepos":{},"apiUsers":{}};
        Promise.all([apiRepos,apiUsers])
        .then (values =>
        {apiesTogether["apiRepos"] = values[0];
        apiesTogether["apiUsers"] = values[1];
        return apiesTogether;});


    function sumPopularity(data){


        //stars counting
        let sum = 0;
        data.apiRepos.forEach((obj) => {
            const starObject = obj.stargazers_count;
            sum += starObject;})
        // return sum
        console.log(sum);

        function insertData(data) {

            //creating new tableRow for User
            const tBody= document.querySelector("tbody");
            const tableRow = document.createElement("tr");
            tBody.appendChild(tableRow);

            //creating new column with userName
            const newName = document.createElement("td");
            newName.innerText = data.apiUsers.name;
            newName.classList.add("names");
            tableRow.appendChild(newName);

            //creating new column with number of repositories
            const newRepoCount = document.createElement("td");
            newRepoCount.innerText = data.apiUsers.public_repos;
            tableRow.appendChild(newRepoCount);

            //creating new column with sum of stars
            const newStarCount = document.createElement("td");
            newStarCount.innerText = sum;
            tableRow.appendChild(newStarCount);

        }

        insertData(apiesTogether);
    }
    sumPopularity(apiesTogether);
})
*
* */


userNames().forEach((userLogin) => {


    let sum

    //function which sum stars from user repositories and insert all data to cells
    function sumPopularity(data){

    fetch(`https://api.github.com/users/${userLogin}/repos`)
        .then(res => res.json())
        .then(data => {

            //stars counting
            sum = 0;
            data.forEach((obj) => {
            const starObject = obj.stargazers_count;
            sum += starObject;
            })
        console.log(sum);
        return sum
        })
        .catch(err => console.log('error', err));


    function insertData(data) {

        //creating new tableRow
        const tBody= document.querySelector("tbody");
        const tableRow = document.createElement("tr");
        tBody.appendChild(tableRow);

        //creating new column with userName
        const newName = document.createElement("td");
        newName.innerText = data.name;
        newName.classList.add("names");
        tableRow.appendChild(newName);

        //creating new column with number of repositories
        const newRepoCount = document.createElement("td");
        newRepoCount.innerText = data.public_repos;
        tableRow.appendChild(newRepoCount);

        //creating new column with sum of stars
        const newStarCount = document.createElement("td");
        newStarCount.innerText = sum;
        // console.log(sumPopularity(data));
        tableRow.appendChild(newStarCount);

        }
    insertData(data);
    }

    //function which do a fetch of user api and transfer its data to sumPopularity function
    function fetchUser(userLogin) {
    fetch(`https://api.github.com/users/${userLogin}`)
        .then(res => res.json())
        .then(data => sumPopularity(data))
        .catch(err => console.log('error', err));
    }
    fetchUser(userLogin);
})


export default {
    userNames
}
