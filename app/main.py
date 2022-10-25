import uvicorn
import librosa
import pathlib
from io import BytesIO
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import numpy as np
from . import (
    model
)

app = FastAPI()
hop_length = 512
cqt_n_bins = 192
cqt_bins_per_octave = 24
sr = 22050

BASE_DIR = pathlib.Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.h5"

class Audio(BaseModel):
    _id: str
    file_name: str
    file: None
    
AI_MODEL = None

@app.on_event("startup")
def on_startup():
    global AI_MODEL
    #load ai model
    if MODEL_PATH.exists():
        AI_MODEL = model.AIModel(
            model_path = MODEL_PATH
        )

#route
@app.get('/')
async def index():
    print(MODEL_PATH)
    return {
        'text': 'Hello word'
    }

@app.post('tab-generate}')
def upload(audio: Audio):
    global AI_MODEL
    _id, file_name, file = audio
    
    try:
        contents = file.file.read()
        buffer = BytesIO(contents)
        data, samplerate = librosa.load(buffer)
        data= data.astype(float)
        data = librosa.util.normalize(data)
        data = np.abs(librosa.cqt(data,
                        hop_length= hop_length, 
                        sr=22050, 
                        n_bins= cqt_n_bins, 
                        bins_per_octave= cqt_bins_per_octave))
        input = np.swapaxes(data,0,1)
        print(input[0])
        predict_result = AI_MODEL.tab_generator(input)
        return {
            'file_name': file.filename,
            'tablature': predict_result,
        }

    except Exception: 
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()




if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
