chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "execute") {
            main();
            sendResponse({farewell: "goodbye"});
        }
    }
)

function main(){
    let threadDetails = document.getElementsByClassName('rc-ThreadDetail');
    console.log(threadDetails[0]);
    let threadId = threadDetails[0].childNodes[0].getAttribute('id').trim();
    console.log("The thread ID is ", threadId);

    let postArray = [];
    // let rolesArray = []; //"Teaching Staff" or "Learner"
    let postContents = document.getElementsByClassName('rc-CML styled');
    //let profiles = document.getElementsByClassName('rc-ProfileArea');

    let role = "";
    let postContent = "";
    for (let i = 0; i < postContents.length; i++) {
        postContent = postContents[i].textContent;
        console.log(postContent);
        //let roleAttribute = profiles[i].childNodes[0].getAttribute('aria-label');
        //roleAttribute = roleAttribute.slice(roleAttribute.indexOf("Role: ") + "Role: ".length);
        //role = roleAttribute.slice(0, -1);
        //console.log(role);
        postArray.push(postContent);
        //rolesArray.push(role);
    } 
    let postData = {
        id: threadId,
        posts: postArray
    };
    let data = JSON.stringify(postData);

    const url = "http://localhost:5000/predict";

    params = {
        method: "POST", 
        body: data,
        // credentials: "include",
        // mode: 'no-cors',
        // cache: "no-cache",
        headers: {
            "content-type": "application/json"
            // "Access-Control-Allow-Origin": "*"
        }
    };

    fetch(url, params)
        .then(function(response) {
            if (response.status !== 200) {
                console.log(`Looks like there was a problem. Status code: ${response.status}`);
                return;
            }
            response.json().then(function(data) {
                console.log(data);
            });
        })
        .catch(function(error) {
            console.log("Fetch error: " + error);
        })
    /*
    $.ajax({
        type:"POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function() {
            alert("Error");
        },
        success: function(data, status) {
            console.log(data["prediction"]);
        }
    });
    */
}

