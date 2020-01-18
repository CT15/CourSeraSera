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
    
    let profileNames = document.getElementsByClassName('profileNames');
    for (let i = 0; i < profileNames.length; i++) {
        let metadata = profileNames[i].parentElement.parentElement;
        let data_percent = receivedData[i].toFixed(2)*100;
        let htmltemp = '<div class="progressbar" data-animate="false"><div class="circle" data-percent="' + data_percent + '><div></div><p>Testing</p></div></div>';
        var fragment = create(htmltemp);
        // <div class="progressbar" data-animate="false"><div class="circle" data-percent="100"><div></div><p>Testing</p></div></div>
        // You can use native DOM methods to insert the fragment:
        document.body.insertBefore(fragment, document.body.childNodes[0]);
    }
    animateElements();

    function create(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        //add css
        var style = document.createElement('link'); 
        style.href = 'progressbar.css';
        style.type = 'text/css';
        style.rel = 'stylesheet';
        temp.append(style);
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }
    
    function animateElements() {
        $('.progressbar').each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                    startAngle: -Math.PI / 2,
                    value: percent / 100,
                    thickness: 14,
                    fill: {
                        color: '#1B58B8'
                    }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('div').text((stepValue*100).toFixed(1) + "%");
                }).stop();
            }
        });

    // Show animated elements
        animateElements();
        $(window).scroll(animateElements);
    };
}

