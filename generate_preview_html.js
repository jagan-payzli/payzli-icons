const fs = require("fs");

// Read the JSON file containing filenames
fs.readFile("./icons.json", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading JSON file:", err);
		return;
	}

	try {
		// Parse JSON data
		const jsonData = JSON.parse(data);

		// Extract SVG filenames
		const svgFiles = jsonData.svgFiles;

		// Create HTML for SVG grids
		const svgGridHTML = svgFiles
			.map((filename) => {
				// Read SVG file content
				const svgContent = fs.readFileSync(`icons/${filename}`, "utf8");
				// Encode SVG content to data URL
				const encodedSVG = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;
				return `
              <li>
                <div title="Click To Download" class="icon-item">
                    <img onclick="downloadSVG('${filename}', '${encodedSVG}')" class="icon-svg" alt="${filename}" download="${filename}" src="${encodedSVG}"  />
                    <label for="icon-active">
                        <span>${filename.replace(/\.svg$/, "")}</span>
                    </label>
                </div>
              </li>
            `;
			})
			.join("");

		// Generate full HTML content
		const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="./index.css">
          <title>Payzli Icons Preview</title>
        </head>
        <body>
            <div class="App">
                <h1>Payzli Icons</h1>
               
                <div class="container icon-cont">
                <ul>
                    ${svgGridHTML}
                    </ul>
                </div>
            </div>
            <script>
                function downloadSVG(filename, encodedSVG) {
                    const link = document.createElement('a');
                    link.href = encodedSVG;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            </script>
        </body>
        </html>
      `;

		// Write HTML content to index.html file
		fs.writeFile("index.html", htmlContent, (err) => {
			if (err) {
				console.error("Error writing HTML file:", err);
				return;
			}
			console.log("index.html file has been created successfully.");
		});
	} catch (error) {
		console.error("Error parsing JSON data:", error);
	}
});

//  <div class="container search-cont">
//     <input  class="search-input" type="search" placeholder="Search icon with icon name" value=""/>
// </div>
