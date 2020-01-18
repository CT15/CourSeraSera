// Get HTML head element 
var head = document.getElementsByTagName('head')[0];  
// Create new link Element 
var link = document.createElement('link'); 
// set the attributes for link element  
link.rel = 'stylesheet';  
link.type = 'text/css'; 
link.href = 'progressbar.css';  

// Append link element to HTML head 
head.appendChild(link);
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
    let postContents = document.getElementsByClassName('rc-CML styled');

    let role = "";
    let postContent = "";
    for (let i = 0; i < postContents.length; i++) {
        postContent = postContents[i].textContent;
        console.log(postContent);
        postArray.push(postContent);
    } 

    /*
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
    */

    let receivedData = [0.5123, 0.1234, 0.2345, 0.8321, 0.9821, 0.2473];
    /*
    fetch(url, params)
        .then(function(response) {
            if (response.status !== 200) {
                console.log(`Looks like there was a problem. Status code: ${response.status}`);
                return;
            }
            response.json().then(function(data) {
                receivedData = data['prediction'];
                console.log(data);
            });
        })
        .catch(function(error) {
            console.log("Fetch error: " + error);
        });
    */
    let profileNames = document.getElementsByClassName('rc-ProfileName');
    for (let i = 0; i < profileNames.length; i++) {
        console.log("hello");
        let metadata = profileNames[i].parentElement;
        let data_percent = receivedData[i].toFixed(2)*100;
        let htmltemp = '<div class="progress rounded-pill"><div role="progressbar" aria-valuenow="' + data_percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + data_percent + '%" class="progress-bar rounded-pill">' + data_percent +'%</div></div>';
        metadata.insertAdjacentHTML('afterend', htmltemp);
        ;
    }
    
    
    
}

