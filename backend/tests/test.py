import json
import yt_dlp

from typing import Dict , Any 


URL = 'https://youtube.com/shorts/rVTUJdXuDOU?si=Vj7AeDJlLN1xLkBJ'


def get_video_quality(url):
    ydl_opts = {
        'format': 'bestaudio+bestaudio',  # Choisir les meilleurs formats vidéo et audio
        'quiet': True,  # Ne pas afficher de logs inutiles
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        formats = info.get('formats', [])
        
        for f in formats:
            # Obtenir la largeur et la hauteur pour la résolution
            width = f.get('width')
            height = f.get('height')
            resolution = f"{width}x{height}" if width and height else "Non spécifiée"
            
            print(f"Format ID: {f.get('format_id')}")
            print(f"Résolution: {resolution}")
            print(f"Codec vidéo: {f.get('vcodec')}")
            print(f"Codec audio: {f.get('acodec')}")
            print(f"Bitrate vidéo: {f.get('tbr')}")
            print(f"Bitrate audio: {f.get('abr')}")
            print('-' * 50)


def extract_info(info ) -> Dict[str , Any] : 

    data = {
        "title" : info.title,
        "fulltitle" : info.fulltitle,
        "duration" : info.duration,
        "duration_string" : info.duration_string,
        "description" : info.description,
        "height": info.height,
        "width" : info.width
    }

    return data 

ydl_opts = {
    "format": "bestvideo+bestaudio", 
    "outtmpl": "videos/%(title)s.%(ext)s"
}


with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(URL, download=True)

    # ℹ️ ydl.sanitize_info makes the info json-serializable
    # print(json.dumps(ydl.sanitize_info(info)))

    # with open("info.json" , "w" , encoding="utf-8") as file :
    #     json.dump(info , file , indent=4)


