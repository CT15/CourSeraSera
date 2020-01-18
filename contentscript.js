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
        textArray: postArray
    };
    const url = "localhost:5000/predict";
    let data = JSON.stringify(postData);
    var request = new Request(url , {
        method: 'POST', 
        data: data,
        headers: new Headers({
        'Application-Json': 'text/plain'
        })
        
    });
    fetch(request).then(function(resp) {
        console.log('Logging response...')
        console.log(resp);
      });
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

