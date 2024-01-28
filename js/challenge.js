document.addEventListener('DOMContentLoaded', (event) => {
    intervalId = setInterval(startCount, 1000)
    commentHandler();
})

const counterElement = document.getElementById('counter');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const pauseButton = document.getElementById('pause')
const heartButton = document.getElementById('heart');
const likesList = document.getElementsByClassName('likes')[0]
let count = 0;
let intervalId;
let isPaused = false;
let likes = {};

function startCount() {
    count++;
    counterElement.textContent = count;
}

function updateLikes(){
    likesList.innerHTML = '';
    for (let number in likes) {
        const count = likes[number];
        const listItem = document.createElement('li');
        listItem.textContent = `${number} has been liked ${count} time${count === 1 ? '' : 's'}`;
        likesList.appendChild(listItem);
    }
}

heartButton.addEventListener('click', () => {
    if (likes[count]){
        likes[count]++;
    } else {
        likes[count] = 1;
    }
    updateLikes();
})


plusButton.addEventListener('click', () => {
    count++;
    counterElement.textContent = count;
})

minusButton.addEventListener('click', () => {
    count--;
    counterElement.textContent = count;
})


pauseButton.addEventListener('click', () => {
    if (!isPaused) {
        clearInterval(intervalId);
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i] !== pauseButton) {
                buttons[i].disabled = true;
            }
        }
        pauseButton.textContent = 'resume';
        isPaused = true;
    } else {
        intervalId = setInterval(startCount, 1000);
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
        pauseButton.textContent = 'pause'
        isPaused = false
    }
    });

function commentHandler() {
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentInput = document.getElementById('comment-input')
        const commentText = commentInput.value;
        const commentElement = document.createElement('p')
        commentElement.textContent = commentText;
        commentInput.value = ''
        let commentsContainer = document.getElementById('comments');
        if (!commentsContainer) {
            commentsContainer = document.createElement('div');
            commentsContainer.id = 'comments';
            commentForm.appendChild(commentsContainer);
        }
        commentsContainer.appendChild(commentElement);
    });
}