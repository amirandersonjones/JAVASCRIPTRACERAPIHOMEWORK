//This is here first but did this last
let form = document.querySelector('#driverForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = event.path[0][0].value
    let round = event.path[0][1].value
    top7drivers = f1data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 7)
    console.log(top7drivers)
    console.log(season);
    console.log(round);
    // start the api request process
    loadData(season, round);
    form.reset();
});

//set up the api call first is the easiest

let getData = async (season, round) => {
     try 
         let response = await axios.get (`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings); //to see the data
        return response.data
     } catch (error) {
         console.log(error);
     }
 }
//loadData(); ///use this to see the results of the response



//tie the api call process to an event listener
let loadData = async(season, round) => { //when loadDriver is called it then calls getDriver/api call ()
    //calls our api call function
    let data = await getData(season, round);
    console.log(data)
    //creates new html based on the results of the api call
    top7drivers.forEach( driver =>{
        addDriverRow(driver.position,
            `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            driver.Driver.nationality, 
            driver.Constructors[0].name,    
            driver.points, 
            driver.Driver.url,
            driver.Constructors[0].url)
    })
    }

    function addDriverRow(pos, name, nation, sponsor, points, page, sponsorPage){
        let html = `<tr><td>${pos}</td>
        <td><a href=${page} target="_blank" rel="noopener noreferrer">${name}</a></td>
        <td>${nation}</td><td><a href=${sponsorPage} target="_blank" rel="noopener noreferrer">${sponsor}</td>
        <td>${points}</td></tr>` 
        driverTableBody.innerHTML += html;
        document.getElementById('drivertbody').insertAdjacentHTML('afterbegin', new_row);
    }
    
    // let new_row = `<tr>
    // <th scope='row'>${data.name}</th> 
    // <td>${data.types[0].type.name}</td>
    // </tr>`;
    //adds the new html to our page
//     document.getElementById('drivertbody').insertAdjacentHTML('afterbegin', new_row);
// }
//@lines 32 and 37 loop through the driver standings for each driver object
// let cleardriverData = () => {
//     document.getElementById('drivertbody').innerHTML='';
// }
