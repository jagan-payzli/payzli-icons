// Directory containing SVG icons
const ICONS_DIR = "icons";

// Function to insert icons into the HTML
function insertIcons() {
	// Fetch SVG icons
	fetch(`${ICONS_DIR}`)
		.then((response) => response.text())
		.then((text) => {
			// Parse SVG text and insert into the DOM
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, "image/svg+xml");

			// Append each SVG symbol to the document body as <i> tags
			doc.querySelectorAll("symbol").forEach((symbol) => {
				const iconName = symbol.getAttribute("id");
				const iTag = document.createElement("i");
				iTag.className = `icon ${iconName}`;
				document.body.appendChild(iTag);
			});
		})
		.catch((error) => {
			console.error("Error fetching or inserting icons:", error);
		});
}

// Call the function to insert icons when the page loads
window.addEventListener("load", insertIcons);
