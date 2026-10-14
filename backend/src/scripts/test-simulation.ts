/**
 * Local simulation script for testing WhatsApp campaign features
 * without real browser interaction
 */

// Mock data
const dummyNumbers = ['+15551234567', '+15552345678', '+15553456789', '+15554567890', '+15555678901'];
const accounts = ['Account1', 'Account2', 'Account3'];
const spintaxTemplate = 'Hello {John|Jane|Alex}, this is a {test|demo} message!';

// Round-Robin account selector
let currentAccountIndex = 0;
function getNextAccount() {
  const account = accounts[currentAccountIndex];
  currentAccountIndex = (currentAccountIndex + 1) % accounts.length;
  return account;
}

// Spintax parser
function parseSpintax(text: string): string {
  return text.replace(/{([^{}]*)}/g, (match, options) => {
    const choices = options.split('|');
    return choices[Math.floor(Math.random() * choices.length)];
  });
}

// Random sleep duration (30-90s)
function getRandomSleepDuration(): number {
  return Math.floor(Math.random() * 61) + 30; // 30-90 range
}

// Main simulation function
async function runSimulation() {
  console.log('===== STARTING LOCAL SIMULATION =====');
  console.log(`Using Spintax template: "${spintaxTemplate}"`);
  
  for (const [index, number] of dummyNumbers.entries()) {
    console.log(`\n--- Processing number ${index + 1}: ${number} ---`);
    
    // Spintax demonstration
    const parsedMessage = parseSpintax(spintaxTemplate);
    console.log(`[Spintax] Parsed message: "${parsedMessage}"`);
    
    // Sleep duration
    const sleepDuration = getRandomSleepDuration();
    console.log(`[Sleep] Calculated duration: ${sleepDuration} seconds (random between 30-90s)`);
    
    // Round-Robin account selection
    const account = getNextAccount();
    console.log(`[Account] Selected via Round-Robin: ${account}`);
    
    // Simulate message sending
    console.log(`[Action] Sending message to ${number} via ${account}`);
    
    // Simulate sleep
    console.log(`[Sleep] Simulating ${sleepDuration}s delay...`);
    await new Promise(resolve => setTimeout(resolve, sleepDuration * 1000));
  }
  
  console.log('\n===== SIMULATION COMPLETED =====');
  console.log('All 5 dummy numbers processed with:');
  console.log(`- Spintax variations for each message`);
  console.log(`- Random sleep durations between 30-90s`);
  console.log(`- Round-Robin account selection (${accounts.length} accounts)`);
}

// Run simulation
runSimulation().catch(console.error);