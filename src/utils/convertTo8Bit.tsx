export const convertTo8Bit = (image: File): Promise<Uint8ClampedArray> => {
	return new Promise((resolve, reject) => {
		// Cargar la imagen en un objeto Image de JavaScript
		const img = new Image();
		img.src = URL.createObjectURL(image);

		// Esperar a que se cargue la imagen
		img.onload = () => {
			// Crear un canvas para dibujar la imagen
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");

			// Establecer el tamaño del canvas para que sea igual al tamaño de la imagen
			canvas.width = img.width;
			canvas.height = img.height;

			// Dibujar la imagen en el canvas
			context.drawImage(img, 0, 0);

			// Obtener los píxeles de la imagen a través del contexto del canvas
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			const pixels = imageData.data;

			// Iterar sobre cada píxel y convertir su valor RGB a un valor de 8 bits
			for (let i = 0; i < pixels.length; i += 4) {
				const r = pixels[i];
				const g = pixels[i + 1];
				const b = pixels[i + 2];
				const gray = (r + g + b) / 3;
				const value = Math.floor(gray / 32) * 32;
				pixels[i] = value; // R
				pixels[i + 1] = value; // G
				pixels[i + 2] = value; // B
			}

			// Dibujar el nuevo valor de 8 bits en un nuevo canvas
			const newCanvas = document.createElement("canvas");
			const newContext = newCanvas.getContext("2d");
			newCanvas.width = canvas.width;
			newCanvas.height = canvas.height;
			newContext.putImageData(imageData, 0, 0);

			// Convertir el nuevo canvas a una imagen
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
				"image/png",
				1,
			);
		};

		// Manejar el error si no se pudo cargar la imagen
		img.onerror = (error) => {
			reject(new Error(`Failed to load image: ${error}`));
		};
	});
};
