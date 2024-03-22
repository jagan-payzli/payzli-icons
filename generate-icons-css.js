const fs = require("fs");

// Directory where your icons are stored
const iconsDirectory = "icons";

// Read all files in the icons directory
fs.readdir(iconsDirectory, (err, files) => {
	if (err) {
		console.error("Error reading icons directory:", err);
		return;
	}

	// Generate HTML code for each icon
	const iconsHTML = files
		.map((file) => {
			const iconName = file.replace(/\.svg$/, "");
			const svgContent = fs.readFileSync(`${iconsDirectory}/${file}`, "utf8");
			return `<i class="icon icon-${iconName}">${svgContent}</i>`;
		})
		.join("\n\n");

	// Write the generated HTML to a file
	fs.writeFile("icons.html", iconsHTML, (err) => {
		if (err) {
			console.error("Error writing HTML file:", err);
			return;
		}
		console.log("HTML file generated successfully!");
	});
});
