const fs = require("fs");

// Directory path
const directoryPath = "icons/";

// Read files in the directory
fs.readdir(directoryPath, (err, files) => {
	if (err) {
		console.error("Error reading directory:", err);
		return;
	}

	// Filter SVG files
	const svgFiles = files.filter((file) => file.endsWith(".svg"));
	const data = JSON.stringify({ svgFiles });

	fs.writeFile("./icons.json", data, (err) => {
		if (err) {
			console.error("Error writing JSON file:", err);
			return;
		}
		console.log("Filenames saved to filenames.json");
	});
});
