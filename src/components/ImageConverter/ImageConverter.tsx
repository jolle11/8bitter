import React, { useState } from "react";
import { convertTo8Bit } from "../../utils/convertTo8Bit";
import "./ImageConverter.scss";

const ImageConverter = () => {
    const [image, setImage] = useState<File | null>(null);
    const [converted, setConverted] = useState<string | null>(null);
    const [conversionQuality, setConversionQuality] = useState<number | null>(
        1
    );
    const [timesGenerated, setTimesGenerated] = useState<number | null>(1);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setImage(event.target.files[0]);
            setConverted(null);
        }
    };

    const handleImageGenerate = async () => {
        setTimesGenerated(timesGenerated! + 1);
        if (image) {
            try {
                const data = await convertTo8Bit(image, conversionQuality!);
                setConverted(URL.createObjectURL(new Blob([data])));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleImageDownload = () => {
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
            <label htmlFor="file-upload" className="converter__upload">
                {image ? "Choose another file" : "Choose file"}
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
                            className="converter__image"
                        />
                    </section>
                )}
                {converted && (
                    <section className="converter__converted">
                        <h3 className="converter__subtitle">
                            Converted image:
                        </h3>
                        <img
                            src={converted}
                            alt="8-bit converted"
                            className="converter__image"
                        />
                    </section>
                )}
            </div>
            {/*
			======================================================
			======================= BUTTONS ======================
			======================================================
			*/}
            <div className="converter__buttons">
                {image && (
                    <>
                        <button
                            className="converter__button"
                            onClick={() => {
                                setImage(null);
                                setConverted(null);
                                setTimesGenerated(1);
                            }}
                        >
                            Remove image/s
                        </button>
                        <button
                            className="converter__button"
                            onClick={handleImageGenerate}
                        >
                            {timesGenerated === 1 ? "Generate" : "Re-generate"}
                        </button>
                        <p className="converter__quality">Output quality:</p>
                        <input
                            type="number"
                            min={0}
                            max={1}
                            step="0.01"
                            defaultValue={conversionQuality as number}
                            onChange={(e) =>
                                setConversionQuality(Number(e.target.value))
                            }
                            className="converter__input"
                        />
                    </>
                )}
                {converted && (
                    <button
                        className="converter__button"
                        onClick={handleImageDownload}
                    >
                        Download
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageConverter;
