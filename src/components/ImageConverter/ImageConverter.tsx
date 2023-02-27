import { convertTo8Bit } from "../../utils/convertTo8Bit";
import "./ImageConverter.scss";
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
			link.download = "8bit_image.jpg";
			link.href = converted;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<div className="converter">
			<h1 className="converter__title">8bitter</h1>
			<label for="file-upload" class="converter__upload">
				Choose file
			</label>
			<input
				id="file-upload"
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				style={{ display: "none" }}
			/>
			<div className="converter__images">
				{image && (
					<section className="converter__original">
						<h3 className="converter__subtitle">Original image:</h3>
						<img
							src={URL.createObjectURL(image)}
							alt="Original"
							width={300}
							className="converter__image converter__image--original"
						/>
					</section>
				)}
				{converted && (
					<section className="converter__converted">
						<h3 className="converter__subtitle">Converted image:</h3>
						<img
							src={converted}
							alt="8-bit converted"
							width={300}
							className="converter__image converter__image--converted"
						/>
					</section>
				)}
			</div>
			<div className="converter__buttons">
				{image && !converted && (
					<button
						className="converter__button converter__button--generate"
						onClick={handleGenerate}
					>
						Generate
					</button>
				)}
				{converted && (
					<button
						className="converter__button converter__button--download"
						onClick={handleDownload}
					>
						Download
					</button>
				)}
			</div>
		</div>
	);
};

export default ImageConverter;
