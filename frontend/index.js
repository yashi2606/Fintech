// Dummy user data (in a real application, this would be stored server-side in a database)
const users = {
    "User2309": {
        platformConnections: {
            uber: { connected: false, accountId: null },
            swiggy: { connected: false, accountId: null },
            rapido: { connected: false, accountId: null },
            fiverr: { connected: false, accountId: null },
        },
        platformData: {
            uber: {},
            swiggy: {},
            rapido: {},
            fiverr: {},
        },
    },
};

function generateDummyPlatformData(platform) {
    /** Generates dummy data for a given platform. */
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomFloat = (min, max, decimals) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const now = new Date().toISOString();

    if (platform === "uber" || platform === "swiggy" || platform === "rapido") {
        const workingDays = randomInt(15, 25);
        const missedDays = 30 - workingDays;
        const averageIncome = randomFloat(800, 1500, 2);
        const rating = randomFloat(4.0, 5.0, 1);
        const region = randomChoice(["Greater Noida", "Delhi", "Gurgaon", "Faridabad"]);
        return {
            workingDays: workingDays,
            missedDays: missedDays,
            averageIncome: averageIncome,
            rating: rating,
            region: region,
            lastUpdated: now,
        };
    } else if (platform === "fiverr") {
        const workingDays = randomInt(20, 30);
        const missedDays = 30 - workingDays;
        const averageIncome = randomFloat(500, 2000, 2);
        const rating = randomFloat(4.5, 5.0, 1);
        const skills = randomChoice([["Web Development", "React"], ["Graphic Design", "Logo"], ["Content Writing"], ["Data Entry"]]);
        return {
            workingDays: workingDays,
            missedDays: missedDays,
            averageIncome: averageIncome,
            rating: rating,
            skills: skills,
            lastUpdated: now,
        };
    }
    return {};
}

async function connectWallet(platform) {
    /** Simulates connecting a wallet to a platform and fetching dummy data. */
    const userId = "User2309"; // In a real app, this would come from user authentication
    const accountId = prompt('Enter your dummy ${platform} account ID:');

    if (!accountId) {
        alert("Account ID is required.");
        return;
    }

    if (users[userId] && users[userId].platformConnections[platform]) {
        users[userId].platformConnections[platform].connected = true;
        users[userId].platformConnections[platform].accountId = accountId;

        // Fetch dummy data immediately after "connection"
        const dummyData = generateDummyPlatformData(platform);
        users[userId].platformData[platform] = dummyData;

        alert('Successfully connected to ${platform} with account ID: ${accountId}');
        updateDashboard(platform); // Update the dashboard with the new data
    } else {
        alert("Invalid platform.");
    }
}

function updateDashboard(platform) {
    /** Updates the dashboard UI with the fetched platform data. */
    const userId = "User2309";
    const platformData = users[userId].platformData[platform];

    if (platformData) {
        document.querySelector('.card:nth-child(1) p').textContent = platformData.missedDays !== undefined ? platformData.missedDays : '$0.00';
        document.querySelector('.card:nth-child(2) p').textContent = platformData.workingDays !== undefined ? ${platformData.workingDays} days : '0 days';
        document.querySelector('.card:nth-child(3) p').textContent = platformData.rating !== undefined ? '⭐ ${platformData.rating} / 5 : ⭐ - / 5';
        document.querySelector('.card:nth-child(4) p').textContent = platformData.averageIncome !== undefined ? $${platformData.averageIncome.toFixed(2)} : '$0.00';

        // You can add more logic here to display region, skills, etc., if needed.
        console.log('Dashboard updated with ${platform} data:, platformData');
    } else {
        console.warn('No data available for ${platform}.');
    }
}

// Modify the "Connect to Wallet" button to trigger the connectWallet function
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.querySelector('.hero-text button');
    if (connectButton) {
        connectButton.addEventListener('click', () => {
            const platform = prompt("Enter the platform to connect (uber, swiggy, rapido, fiverr):");
            if (platform) {
                connectWallet(platform);
            }
        });
    }
});
var btn = document.getElementById('btn')

function leftClick() {
	btn.style.left = '0'
}

function rightClick() {
	btn.style.left = '110px'
}