// Get the command-line argument (excluding first two default args)
const args = process.argv.slice(2);

// Check if one argument is provided
if (args.length !== 1) {
  console.log('Please provide exactly one number.');
  process.exit(1);
}

// Convert to number
const num = parseInt(args[0], 10);

// Validate if it's a number
if (isNaN(num)) {
  console.log('The argument must be a valid number.');
  process.exit(1);
}

// Determine even or odd
if (num % 2 === 0) {
  console.log(`${num} is even.`);
} else {
  console.log(`${num} is odd.`);
}
