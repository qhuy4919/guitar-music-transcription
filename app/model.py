from keras import backend as K
from keras.layers import Dense, Dropout, Flatten, Reshape, Activation
from keras.layers import Conv2D, MaxPooling2D
from keras.models import Sequential
import tensorflow as tf
import numpy as np

class AIModel:
    def __init__(self, model_path):
        self.model_path = model_path
        self.input_shape = (192,9,1)
        self.num_classes = 21
        self.num_strings = 6
        self.con_win_size = 9
        self.halfwin = self.con_win_size // 2

    def softmax_by_string(self, t):
        string_sm = []
        for i in range(self.num_strings):
            string_sm.append(K.expand_dims(K.softmax(t[:,i,:]), axis=1))
        return K.concatenate(string_sm, axis=1)
    def catcross_by_string(self, target, output):
        loss = 0
        for i in range(self.num_strings):
            loss += K.categorical_crossentropy(target[:,i,:], output[:,i,:])
            return loss
    def avg_acc(y_true, y_pred):
        return K.mean(K.equal(K.argmax(y_true, axis=-1), K.argmax(y_pred, axis=-1)))
    
    def tab2bin(self, tab):
        tab_arr = np.zeros((6,20))
        for string_num in range(len(tab)):
            fret_vector = tab[string_num]
            fret_class = np.argmax(fret_vector, -1)
            # 0 means that the string is closed 
            if fret_class > 0:
                fret_num = fret_class - 1
                tab_arr[string_num][fret_num] = 1
        return tab_arr

    def get_model(self):
        model = Sequential()
        model.add(Conv2D(32, kernel_size=(3, 3),
                            activation='relu',
                            input_shape=self.input_shape))
        model.add(Conv2D(64, (3, 3), activation='relu'))
        model.add(Conv2D(64, (3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Dropout(0.25))   
        model.add(Flatten())
        model.add(Dense(128, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(self.num_classes * self.num_strings)) # no activation
        model.add(Reshape((self.num_strings, self.num_classes)))
        model.add(Activation(self.softmax_by_string))

        model.compile(loss=self.catcross_by_string,
                    optimizer=tf.keras.optimizers.Adadelta(),
                    metrics=[self.avg_acc])
        model.load_weights(self.model_path)
        return model
        
    def progress(self, input):
        model = self.get_model()
        rows, _ = input.shape
        X_dim = (rows, 192, 9, 1)
        X = np.empty(X_dim)
        full_x = np.pad(input, [(self.halfwin,self.halfwin), (0,0)], mode='constant')
        for i in range(0, len(full_x)-self.con_win_size+1):
            X[i,] = np.expand_dims(np.swapaxes(full_x[i:i+self.con_win_size], 0, 1), -1)
        y_pred = model.predict(X)
        tab_pred = np.array(list(map(self.tab2bin,y_pred)))
        return tab_pred.tolist()
    
    def parse_note(self, frame):
        assert len(frame) == 6, "Each frame should have 6 strings"
        assert len(frame[0]) == 20, "Each string should have 20 frets"
        pressed = [0]*6
        for i in range(6):
            try:
                idx = frame[i].index(1.0)
                pressed[i] = idx+1
            except:
                pass
        mapper = {}
        for strgidx, fret in enumerate(pressed):
            if fret > 0:
                mapper[6-strgidx] = fret
        if len(mapper) == 0:
            return "r.4"
        
        if len(mapper) == 1:
            k = list(mapper.keys())[0]
            v = mapper[k]
            return f"{v}.{k}.4"

        cont = "("
        for k, v in mapper.items():
            cont += f"{v}.{k}-"
        cont = cont[:-1]+").4"
        return cont
        
    def tab_generator(self, input):
        one_hot_output = self.progress(input)
        sheet = ""
        for idx, frm in enumerate(one_hot_output):
            sheet += self.parse_note(frm)
            sheet += " "
        sheet = sheet[:-1]
        sheet = sheet.replace("r.4 r.4 r.4 r.4", "r.1")
        sheet = sheet.replace("r.4 r.4", "r.2")
        sheet = sheet.replace("r.2", "")
        sheet = sheet.replace("r.1", "")
        sheet = sheet.replace("r.4", "")

        normalize_tablature = []
        _sheet = sheet.split(' | ')
        for idx, frm in enumerate(_sheet):
            chord = frm.split(' ')
            normalize_chord = [chord[i] for i in range(len(chord)) if (i==0) or chord[i] != chord[i-1]]
            normalize_tablature.append(' '.join(map(str,normalize_chord)))

        normalize_tablature_final = ''
        temp = normalize_tablature[0].replace('  ', ' ').split(' ')
        for idx, chord in enumerate(temp):
            normalize_tablature_final += chord + " "
            if (idx+1) % 4 == 0: normalize_tablature_final += " | "
        
        return normalize_tablature_final
        

        

        
        