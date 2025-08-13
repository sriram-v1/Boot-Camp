// Get command-line arguments (excluding 'node' and script name)
const args = process.argv.slice(2);

// Convert arguments to numbers
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// Check if both arguments are valid numbers
if (isNaN(num1) || isNaN(num2)) {
    console.log("Please provide two valid numbers.");
} else {
    // Compute and print the sum
    console.log(`The sum of ${num1} and ${num2} is: ${num1 + num2}`);
}
