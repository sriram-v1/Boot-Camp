// Get the string from command-line arguments
const args = process.argv.slice(2);

// Check if one argument is provided
if (args.length !== 1) {
  console.log('Please provide exactly one string.');
  process.exit(1);
}

const str = args[0];

// Reverse the string
const reversed = str.split('').reverse().join('');

// Print the reversed string
console.log(`Reversed string: ${reversed}`);
