main();

function main(){
    let threadDetails = document.getElementsByClassName('rc-ThreadDetail');
    let threadId = threadDetails[0].childNodes[0].getAttribute('id');
    console.log("The thread ID is ", threadId);

    let postArray = [];
    let postContents = document.getElementsByClassName('rc-CML styled');
    
}