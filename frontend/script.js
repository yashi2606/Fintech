// function updateClock() {
//     const clockElement = document.getElementById('clock');
//     const currentTime = new Date();

//     let hours = currentTime.getHours();
//     let minutes = currentTime.getMinutes();
//     let seconds = currentTime.getSeconds();

//     // Format time to always show 2 digits
//     hours = hours < 10 ? '0' + hours : hours;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     const timeString = `${hours}:${minutes}:${seconds}`;
//     clockElement.textContent = timeString;
// }

// // Update clock every second
// setInterval(updateClock, 1000);

// // Initialize clock immediately on page load
// updateClock();
