import React, { useState } from "react";
import { Download, Clock, Video, Type, FileText } from "lucide-react";

function App() {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [videoInfo, setVideoInfo] = useState(null);

	const BACKEND_URL = "http://127.0.0.1:8000/info";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setVideoInfo(null);

		try {
			const response = await fetch(BACKEND_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				throw new Error("Échec de la récupération des informations");
			}

			const result = await response.json();
			if (result.status === "success") {
				setVideoInfo(result.data);
				setUrl("");
			} else {
				throw new Error("Réponse invalide du serveur");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Une erreur est survenue"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
					<div className="flex items-center justify-center mb-6">
						<Download className="w-12 h-12 text-blue-600" />
					</div>

					<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Informations de la Vidéo
					</h1>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="url"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								URL de la vidéo
							</label>
							<input
								type="url"
								id="url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="Entrez l'URL de la vidéo"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`w-full py-2 px-4 rounded-lg text-white font-medium transition
                ${
					loading
						? "bg-blue-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
						>
							{loading
								? "Chargement..."
								: "Obtenir les informations"}
						</button>
					</form>

					{error && (
						<div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
							{error}
						</div>
					)}
				</div>

				{videoInfo && (
					<div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
						<div className="flex items-center gap-3 pb-4 border-b">
							<Type className="w-6 h-6 text-blue-600 flex-shrink-0" />
							<div>
								<h2 className="text-lg font-semibold text-gray-900">
									{videoInfo.title}
								</h2>
								{videoInfo.fulltitle !== videoInfo.title && (
									<p className="text-sm text-gray-600">
										{videoInfo.fulltitle}
									</p>
								)}
							</div>
						</div>

						<div className="flex flex-wrap gap-6 pb-4 border-b">
							<div className="flex items-center gap-2">
								<Clock className="w-5 h-5 text-blue-600" />
								<span className="text-sm text-gray-700">
									{videoInfo.duration_string}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Video className="w-5 h-5 text-blue-600" />
								<span className="text-sm text-gray-700">
									{videoInfo.width}x{videoInfo.height}
								</span>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<FileText className="w-5 h-5 text-blue-600" />
								<h3 className="font-medium text-gray-900">
									Description
								</h3>
							</div>
							<p className="text-gray-700 whitespace-pre-wrap text-sm">
								{videoInfo.description}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
