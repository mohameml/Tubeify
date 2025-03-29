
def is_valid_url(url: str) -> bool:
    # Implémentation pour vérifier si l'URL est valide
    return url.startswith("https://www.youtube.com") or url.startswith("https://youtu.be")
