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
async function fetchModelData(dummyData) {
    const modelInput = {
        input: [
            dummyData.rating || 4.0,               // Position 0: rating
            dummyData.workingDays || 20,            // Position 1: jobs_per_week
            dummyData.missedDays || 0,               // Position 2: missed_jobs
            18,                                     // Position 3: months_on_platform (example)
            users.User2309.hasPreviousLoans ? 1 : 0, // Position 4: has_previous_loans
            0.85                                    // Position 5: previous_loan_performance
        ]
    };

    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modelInput)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Prediction failed');
        }

        const result = await response.json();
        console.log('Model Prediction:', result.prediction);
        return result.prediction;
        
    } catch (error) {
        console.error('Fetch Error:', error);
        alert(`Prediction Error: ${error.message}`);
        throw error;
    }
}
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

        alert(`Successfully connected to ${platform} with account ID: ${accountId}`);
        const prediction = await fetchModelData(dummyData);
        console.log(prediction)
        updateDashboard(platform, prediction); // Update the dashboard with the new data
        console.log(dummyData);
        
    } else {
        alert("Invalid platform.");
    }
}

function updateDashboard(platform, prediction) {
    const userId = "User2309";
    const platformData = users[userId].platformData[platform];

    if (platformData) {
        // Use proper template literals and selectors
        document.querySelector('.card-group > .card:nth-child(1) p').textContent = 
            platformData.missedDays !== undefined ? platformData.missedDays : '0';
        
        document.querySelector('.card-group > .card:nth-child(2) p').textContent = 
            platformData.workingDays !== undefined ? `${platformData.workingDays} days` : '0 days';
        
        document.querySelector('.card-group > .card:nth-child(3) p').textContent = 
            platformData.rating !== undefined ? `⭐ ${platformData.rating.toFixed(1)} / 5` : '⭐ - / 5';
        
        document.querySelector('.card-group > .card:nth-child(4) p').textContent = 
            platformData.averageIncome !== undefined ? `$${platformData.averageIncome.toFixed(2)}` : '$0.00';
            console.log(prediction);
            if (prediction) {
                const status = prediction;
                const scoreElement = document.getElementById('creditScoreValue');
                const statusElement = document.getElementById('creditScoreStatus');
                
                // Determine risk classification
                
                if (status === 'High') {
                    statusElement.className = 'risk-status high-risk';
                    updateLoanTerms('high');
                } else if (status === 'Medium') {
                    statusElement.className = 'risk-status medium-risk';
                    updateLoanTerms('medium');

                } else {
                    
                    statusElement.className = 'risk-status low-risk';
                    updateLoanTerms('low');
                }
                statusElement.textContent = status;
            }
    
        
        console.log(`Dashboard updated with ${platform} data:`, platformData);
    }
}
function updateLoanTerms(riskCategory) {
    const tableBody = document.querySelector('#currentTable tbody');
    const rows = tableBody.querySelectorAll('tr');
    
    // Define ranges based on risk category
    const ranges = {
        high: { loan: [200, 2000], interest: [5, 7] },
        medium: { loan: [500, 7000], interest: [3, 5] },
        low: { loan: [1000, 8000], interest: [1, 2] }
    };

    rows.forEach(row => {
        // Generate random values within ranges
        const loanAmount = randomInRange(...ranges[riskCategory].loan);
        const interestRate = randomInRange(...ranges[riskCategory].interest);
        
        // Update loan amount and interest rate cells
        row.cells[2].textContent = `${loanAmount.toFixed(2)}`;
        row.cells[4].innerHTML = `<button>${interestRate.toFixed(1)}% APR</button>`;
    });
}

// Helper function to generate random numbers in range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
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