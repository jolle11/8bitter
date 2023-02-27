import { convertTo8Bit } from "../../utils/convertTo8Bit";
import React, { useState } from "react";

const ImageConverter = () => {
	const [image, setImage] = useState<File | null>(null);
	const [converted, setConverted] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setImage(event.target.files[0]);
			setConverted(null);
		}
	};

	const handleGenerate = async () => {
		if (image) {
			try {
				const data = await convertTo8Bit(image);
				setConverted(URL.createObjectURL(new Blob([data])));
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleDownload = () => {
		if (converted) {
			const link = document.createElement("a");
			link.download = "8bit_image.png";
			link.href = converted;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<div>
			<h1>8bitter</h1>
			<input type="file" accept="image/*" onChange={handleImageChange} />
			{image && (
				<div>
					<h3>Original image:</h3>
					<img src={URL.createObjectURL(image)} alt="Original" width={300} />
				</div>
			)}
			{converted && (
				<div>
					<h3>Converted image:</h3>
					<img src={converted} alt="8-bit converted" width={300} />
					<button onClick={handleDownload}>Download</button>
				</div>
			)}
			{image && !converted && (
				<div>
					<button onClick={handleGenerate}>Generate</button>
				</div>
			)}
		</div>
	);
};

export default ImageConverter;
