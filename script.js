
// Password validation with OTP
const CORRECT_PASSWORD = 'sheisdead'
const otpInputs = document.querySelectorAll('.otp-input')
const passwordScreen = document.getElementById('passwordScreen')
const storiesContent = document.getElementById('storiesContent')
const passwordError = document.getElementById('passwordError')
const passwordButton = document.getElementById('passwordButton')

otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // Convert to lowercase for consistency
        e.target.value = e.target.value.toLowerCase()

        // Move to next input if value is entered
        if (e.target.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus()
        }
    })

    input.addEventListener('keydown', (e) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            otpInputs[index - 1].focus()
        }
        // Allow Enter to submit
        if (e.key === 'Enter') {
            checkOTP()
        }
    })

    input.addEventListener('keypress', (e) => {
        // Allow all characters except spaces
        if (e.key === ' ') {
            e.preventDefault()
        }
    })
})

passwordButton.addEventListener('click', checkOTP)

function checkOTP() {
    const otp = Array.from(otpInputs).map(input => input.value).join('')

    if (otp.length < 9) {
        // Show incomplete message
        passwordError.style.display = 'block'
        setTimeout(() => {
            passwordError.style.display = 'none'
        }, 1500)
        return
    }

    if (otp === CORRECT_PASSWORD) {
        passwordScreen.classList.add('hidden')
        setTimeout(() => {
            storiesContent.classList.remove('stories-hidden')
            storiesContent.classList.add('fade-in')
            initializeStories()
        }, 100)
    } else {
        showPasswordError()
    }
}

function showPasswordError() {
    // Add error class to all inputs for red border and shake
    otpInputs.forEach(input => {
        input.classList.add('error')
    })
    // Remove error class after animation completes
    setTimeout(() => {
        otpInputs.forEach(input => {
            input.classList.remove('error')
            input.value = ''
        })
        otpInputs[0].focus()
    }, 500)
}

// Stories functionality
const storyPaths = [
    './images/stories/her-stories/1-cover.png',
    './images/stories/her-stories/nerina-koi.png',
    './images/stories/her-stories/nerina-close-up.png',
    './images/stories/her-stories/nerina-fruit-shop.png',
    './images/stories/her-stories/nerina-swimming.png',
    './images/stories/her-stories/nerina-yellow-flower.png',
    './images/stories/her-stories/nerina-fruit.png',
    './images/stories/her-stories/nerina-hat.png',
    './images/stories/her-stories/nerina-noodles.png',
    './images/stories/her-stories/nerina-tea.png',
    './images/stories/her-stories/nerina-temple.png',
    './images/stories/her-stories/nerina-flower.png'
]

let currentStory = 0
const totalStories = 12
let storyTimer

const storyImage = document.getElementById('storyImage')
const prevStoryBtn = document.getElementById('prevStory')
const nextStoryBtn = document.getElementById('nextStory')

function initializeStories() {
    displayStory(0)
    loadProgressBars()
}

function displayStory(index) {
    currentStory = Math.max(0, Math.min(index, totalStories - 1))

    // Update story image with actual story from the folder
    storyImage.src = storyPaths[currentStory]

    // Update active progress bar
    updateProgressBars()

    // Reset story timer
    clearTimeout(storyTimer)
    startStoryTimer()
}

function updateProgressBars() {
    for (let i = 0; i < totalStories; i++) {
        const bar = document.getElementById(`progressBar${i}`)
        if (i < currentStory) {
            bar.classList.add('completed')
            bar.classList.remove('active')
        } else if (i === currentStory) {
            bar.classList.add('active')
            bar.classList.remove('completed')
        } else {
            bar.classList.remove('active', 'completed')
        }
    }
}

function loadProgressBars() {
    updateProgressBars()
}

function startStoryTimer() {
    storyTimer = setTimeout(() => {
        if (currentStory < totalStories - 1) {
            displayStory(currentStory + 1)
        }
    }, 5000) // Auto-advance after 5 seconds
}

prevStoryBtn.addEventListener('click', () => {
    if (currentStory > 0) {
        displayStory(currentStory - 1)
    }
})

nextStoryBtn.addEventListener('click', () => {
    if (currentStory < totalStories - 1) {
        displayStory(currentStory + 1)
    }
})

// Other stories click handlers
const otherStories = document.querySelectorAll('.other-story')
otherStories.forEach(story => {
    story.addEventListener('click', function () {
        // Could switch to viewing another user's stories here
        // For now, just a placeholder
        console.log('Clicked on user story:', this.dataset.user)
    })
})