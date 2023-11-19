// document.addEventListener('click', function (e) {
//     if (e.target.classList.contains("editBtn")) {
//         var userInput = prompt("請修改待辦事項")
//         console.log(userInput)
//         var notes_id = e.target.getAttribute("data-id");
//     }
//     console.log("ori ", notes_id);
    
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     var body = JSON.stringify({
//         "id": notes_id,
//         "description": userInput
//     });
//     var requestOptions = {
//         method: 'PATCH',
//         headers: myHeaders,
//         body: body,
//         // redirect: 'follow'
//     };
//     console.log("editing");

//     fetch('/notes/edit',requestOptions)
//         .then((response) => {
//             return response.json();
//         })
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((error) => {
//             console.log(`Error: ${error}`);
//         })
// });


// function editNote(notes_id) {
//     console.log(notes_id);
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     var body = JSON.stringify({
//         "id": notes_id,
//         "description": 'userInput'
//     });
//     var requestOptions = {
//         method: 'PATCH',
//         headers: myHeaders,
//         body: body,
//         // redirect: 'follow'
//     };
//     console.log("editing");

//     fetch('/notes/edit',requestOptions)
//         .then((response) => {
//             return response.json();
//         })
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((error) => {
//             console.log(`Error: ${error}`);
//         })
// }

function deleteNote(notes_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify({
        "id": notes_id,
    });
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        // body: body,
        // redirect: 'follow'
    };
    console.log("deleting");

    fetch('/notes/'+notes_id,requestOptions)
        .then((response) => {
            if (response.redirected) {
                window.location.href = '/notes'; 
                console.log("redirected");
              // creates the second request, and change the content
                return;
              }
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
    console.log("finish");
}