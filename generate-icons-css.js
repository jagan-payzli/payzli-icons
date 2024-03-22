const fs = require("fs");

// Directory where your icons are stored
const iconsDirectory = "icons";

// Read all files in the icons directory
fs.readdir(iconsDirectory, (err, files) => {
	if (err) {
		console.error("Error reading icons directory:", err);
		return;
	}

	// Generate CSS for each icon
	const css = files
		.map((file) => {
			const iconName = file.replace(/\.svg$/, "");
			return `.icon-${iconName} {
  background-image: url('${iconsDirectory}/${file}');
  /* Add additional styling as needed */
}`;
		})
		.join("\n\n");

	// Write the generated CSS to a file
	fs.writeFile("icons.css", css, (err) => {
		if (err) {
			console.error("Error writing CSS file:", err);
			return;
		}
		console.log("CSS file generated successfully!");
	});
});
