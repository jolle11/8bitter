export const convertTo8Bit = (
	image: File,
	quality: number = 1, // default quality is set to 1
): Promise<Uint8ClampedArray> => {
	return new Promise((resolve, reject) => {
		// Load the image into a JavaScript Image object
		const img = new Image();
		img.src = URL.createObjectURL(image);

		// Wait till image is loaded
		img.onload = () => {
			// Create canvas to draw image
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");

			// Set the canvas size to be equal to the image size
			canvas.width = img.width;
			canvas.height = img.height;

			// Draw image on canvas
			context!.drawImage(img, 0, 0);

			// Get image pixels through the context of the canvas
			const imageData = context!.getImageData(
				0,
				0,
				canvas.width,
				canvas.height,
			);
			const pixels = imageData.data;

			// Iterate over each pixel and convert its RGB value to an 8-bit value.
			for (let i = 0; i < pixels.length; i += 4) {
				const r = Math.round(pixels[i] / 32) * 32;
				const g = Math.round(pixels[i + 1] / 32) * 32;
				const b = Math.round(pixels[i + 2] / 32) * 32;
				pixels[i] = r; // R
				pixels[i + 1] = g; // G
				pixels[i + 2] = b; // B
			}

			// Draw the new 8-bit value on a new canvas
			const newCanvas = document.createElement("canvas");
			const newContext = newCanvas.getContext("2d");
			newCanvas.width = canvas.width;
			newCanvas.height = canvas.height;
			newContext!.putImageData(imageData, 0, 0);

			// Convert the new canvas into an image
			newCanvas.toBlob(
				(blob) => {
					if (blob) {
						const reader = new FileReader();
						reader.readAsArrayBuffer(blob);
						reader.onloadend = () => {
							const arrayBuffer = reader.result as ArrayBuffer;
							const bytes = new Uint8ClampedArray(arrayBuffer);
							resolve(bytes);
						};
					} else {
						reject(new Error("Failed to convert image to 8-bit."));
					}
				},
				"image/jpeg",
				quality,
			);
		};

		// Handle error if image couldn't be loaded
		img.onerror = (error) => {
			reject(new Error(`Failed to load image: ${error}`));
		};
	});
};
