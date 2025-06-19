let firstSock = 1;

async function getData() {

    console.log(`First sock is ${firstSock}`);

    console.log("Get data called");

    // Use fetch to retrieve data over the network from an API endpoint
    const socks = await fetch(`http://localhost:9000/api/socks/${firstSock}/10`)
    .then(res => res.json())
    .catch(error => console.error(`Error: ${error.message}`, res.size)) 
    .finally(() => resetSockPage());

    //console.log(`First sock is ${firstSock}`);

    console.dir(socks);
    updateHTML(socks); // Update HTML after data is fetched
};

function resetSockPage() {
    const MAX_NUM_OF_PAGES = 5;

if (firstSock < MAX_NUM_OF_PAGES) {
    firstSock ++;
} else {
    alert("No more data to fetch! Starting over from the beginning");
    firstSock = 1
}

}


function updateHTML(socks) {

    let table = 
    `<table class="table">
        <thead>
            <tr>
                <th scope = "col"> size </th>
                <th scope = "col"> color </th>
                <th scope = "col"> pattern </th>
                <th scope = "col"> material </th>
                <th scope = "col"> condition </th>
                <th scope = "col"> forFoot </th>
            </tr>
        </thead>
        <tbody>
        `
   
   
    for (let i = 0; i < socks.length; i++) {
        let sock = socks[i].sockDetails;
        //sockDiv.innerHTML = `<div>Color: ${sock.color}</div> <div>Size: ${sock.size}</div>`;
        table += 
            `
                        <tr>
                            <td>${sock.size}</td>
                            <td>${sock.color}</td>
                            <td>${sock.pattern}</td>
                            <td>${sock.material}</td>
                            <td>${sock.condition}</td>
                            <td>${sock.forFoot}</td>
                        </tr>
            `
    }

    table += '</tbody> </table>';
    document.getElementById('table').innerHTML = table;
}

/*
    // Call the function to fetch and update data
    getData();
*/

    document.getElementById("nextButton").addEventListener('click', getData);



    //Previous lab section
/*
    // Use fetch to retrieve data over the network from an API endpoint
    const socks = await fetch('http://localhost:3000/data/socks.json').then(res => res.json());
    updateHTML(socks); // Update HTML after data is fetched
    };
    */


    /*
    function updateHTML(socks) {
    // Now we are sure that socks is defined and contains the data
    document.querySelector('#size').innerHTML = 'Size: ' + socks.size;
    document.querySelector('#color').innerHTML = 'Color: ' + socks.color;
    document.querySelector('#pattern').innerHTML = 'Pattern: ' +
    socks.pattern;
    document.querySelector('#material').innerHTML = 'Material: ' +
    socks.material;
    document.querySelector('#condition').innerHTML = 'Condition: ' +
    socks.condition;
    document.querySelector('#forFoot').innerHTML = 'For Foot: ' +
    socks.forFoot;


        if (socks.color !== undefined || socks.color !== null) {
            document.querySelector('#color').style.backgroundColor = socks.color;
        }
    }
*/