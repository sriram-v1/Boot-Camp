// Get number from command-line arguments
const args = process.argv.slice(2);

// Check if one argument is provided
if (args.length !== 1) {
  console.log('Please provide exactly one number.');
  process.exit(1);
}

const num = parseInt(args[0], 10);

// Validate if it's a number
if (isNaN(num)) {
  console.log('The argument must be a valid number.');
  process.exit(1);
}

// Print multiplication table up to 10
console.log(`Multiplication Table for ${num}`);
for (let i = 1; i <= 10; i++) {
  console.log(`${num} x ${i} = ${num * i}`);
}
