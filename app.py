import uvicorn
import librosa
from io import BytesIO
from scipy.io import wavfile
from fastapi import FastAPI, File, UploadFile
from keras import backend as K
import numpy as np
import model

app = FastAPI()
hop_length = 512
cqt_n_bins = 192
cqt_bins_per_octave = 24
sr = 22050


#route
@app.get('/')
async def index():
    return {
        'text': 'Hello word'
    }

@app.post('/upload_audio')
def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        buffer = BytesIO(contents)
        data, samplerate = librosa.load(buffer) 
        data = np.abs(librosa.cqt(data,
                        hop_length= hop_length, 
                        sr=22050, 
                        n_bins= cqt_n_bins, 
                        bins_per_octave= cqt_bins_per_octave))
        input = np.swapaxes(data,0,1)
        print(input.shape)
        return {
            'file_name': file.filename,
        }

    except Exception: 
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()




if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
