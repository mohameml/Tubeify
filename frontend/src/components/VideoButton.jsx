import React, { useState } from "react";

const VideoDownloadButton = () => {
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState(""); // Etat pour l'URL de la vidéo

	const handleInputChange = (e) => {
		setUrl(e.target.value); // Met à jour l'URL entrée par l'utilisateur
	};

	const downloadVideo = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				"http://localhost:8000/download_video",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ url }), // Envoie l'URL dans le corps de la requête
				}
			);

			if (response.ok) {
				const blob = await response.blob();
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = "video.mp4"; // Nom du fichier téléchargé
				link.click();
			} else {
				console.error("Erreur lors du téléchargement de la vidéo");
			}
		} catch (error) {
			console.error("Une erreur s'est produite", error);
		}
		setLoading(false);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Entrez l'URL de la vidéo"
				value={url}
				onChange={handleInputChange} // Met à jour l'URL quand l'utilisateur tape
			/>
			<button onClick={downloadVideo}>
				{loading ? "Téléchargement..." : "Télécharger la vidéo"}
			</button>
		</div>
	);
};

export default VideoDownloadButton;
