//  selectors
const s = document.querySelector('.s')
const m = document.querySelector('.m')
const h = document.querySelector('.h')
const start = document.querySelector('.start')
const reset = document.querySelector('.reset')
const paused = document.querySelector('.pause')
const notificationBtn = document.querySelector('.notification')
let isPaused = false
let title = document.querySelector('.ttl')


// functions
function notif() {
    if (Notification.permission === 'denied') {
        notificationBtn.innerText = 'Notification denied'
    } else {
        notificationBtn.innerText = 'Notification enabled'
    }
}
notif()

function pause() {
    if (!isPaused) {
        isPaused = true
        paused.innerText = 'Start'
    } else {
        paused.innerText = 'Pause'
        isPaused = false
    }
}

function resett() {
    h.value = ''
    m.value = ''
    s.value = ''
    reset.classList.add('hide-reset')
}

function countDown() {
    if (Number(h.value) > 0 && Number(m.value) <= 0 && Number(s.value) <= 0) {
        if (Number(h.value) > 0) {
            h.value--
            if (h.value < 10) {
                h.value = '0' + `${h.value}`
            }
            h.value
        }
        m.value = 59;
        s.value = 59;
    } else if (Number(m.value) > 0 && Number(s.value) <= 0) {
        if (m.value > 0) {
            m.value--
            if (m.value < 10) {
                m.value = '0' + `${m.value}`
            }
            m.value
        }
        s.value = 59

    } else if (Number(s.value) > 0) {
        if (s.value > 0) {
            s.value--
            if (s.value < 10) {
                s.value = '0' + `${s.value}`
            }
            s.value
        }
    }
}

function notifyMe() {
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        showNotif()
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        alert('Time\' up')
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.   
}

function showNotif() {
    var notification = new Notification('CountDown', {
        body: "Time's up",
        icon: 'img/tup.png'
    });
}

// eventlisterners
document.querySelector('.start').addEventListener('click', () => {
    start.classList.add('pressed')
    if (start.classList.contains('pressed')) {
        start.classList.add('s-hidden')
        reset.classList.remove('hide-reset')
        paused.classList.remove('p-hidden')
    }

    let interval = setInterval(() => {
        if (!isPaused) {
            title.innerHTML = `CountDown - ${h.value}:${m.value}:${s.value}`;
            countDown()
        }
        if (Number(h.value) == 0 && Number(m.value) == 0 && Number(s.value) == 0) {
            clearInterval(interval)
            notifyMe()
        }
    }, 1000)
})

reset.addEventListener('click', () => {
    h.value = ''
    m.value = ''
    s.value = ''
    reset.classList.add('hide-reset')
    paused.classList.add('p-hidden')
    start.classList.remove('s-hidden')


})

paused.addEventListener('click', pause)

notificationBtn.addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'denied') {
            notificationBtn.innerText = 'Notification denied'
        } else {
            notificationBtn.innerText = 'Notification enabled'
        }
    })
})