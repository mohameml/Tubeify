from fastapi import APIRouter
from backend.models.video import VideoRequest
from backend.services.video import VideoService

router  = APIRouter()


@router.post("/info")
def get_info(req : VideoRequest):

    video_service = VideoService(req.url , download=False)
    data = video_service.extract_info()

    return {
        "status" : "success",
        "data" : data
    }