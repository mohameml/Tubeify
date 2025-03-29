from typing import Dict , Any
import json
import yt_dlp

from typing import Dict, Any
import yt_dlp


class VideoService:
    """
    Service pour extraire des informations vidéo en utilisant yt-dlp.
    """

    def __init__(self, url: str, download: bool = False) -> None:
        """
        Initialise la classe avec une URL vidéo et les options de téléchargement.
        
        Args:
            url (str): URL de la vidéo à traiter.
            download (bool): Si True, la vidéo sera téléchargée. Par défaut, False.
        """
        self.url = url
        self.download = download
        self.info_video: Dict[str, Any] = {}
        self.ydlp_options = {
            "format": "bestvideo+bestaudio",
            "outtmpl": "videos/%(title)s.%(ext)s",
            # "noplaylist": True,  # Evite de traiter les playlists
        }

        self.fetch_video_info()

    def fetch_video_info(self) -> None:
        """
        Récupère les informations de la vidéo via yt-dlp.

        Cette méthode remplit l'attribut `info_video` avec les données extraites.
        """
        try:
            with yt_dlp.YoutubeDL(self.ydlp_options) as ydl:
                self.info_video = ydl.extract_info(self.url, download=self.download)
        except Exception as e:
            raise ValueError(f"Erreur lors de l'extraction des informations: {e}")

    def get_info_video(self) -> Dict[str, Any]:
        """
        Retourne les informations extraites de la vidéo.

        Returns:
            dict: Les informations vidéo sous forme de dictionnaire.
        """
        if not self.info_video:
            raise ValueError("Aucune information vidéo disponible. Assurez-vous d'avoir appelé fetch_video_info().")
        return self.info_video



    def extract_info(self) -> Dict[str , Any] : 

        info = self.info_video 
        data = {
            "title" : info["title"],
            "fulltitle" : info['fulltitle'],
            "duration" : info['duration'],
            "duration_string" : info["duration_string"],
            "description" : info['description'],
            "height": info['height'],
            "width" : info['width']
        }

        return data 


