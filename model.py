from keras import backend as K
from keras.layers import Dense, Dropout, Flatten, Reshape, Activation
from keras.layers import Conv2D, MaxPooling2D
from keras.models import Sequential
import tensorflow as tf

input_shape = (192,9,1)
num_classes = 21
num_strings = 6

def softmax_by_string(t):
    string_sm = []
    for i in range(num_strings):
        string_sm.append(K.expand_dims(K.softmax(t[:,i,:]), axis=1))
    return K.concatenate(string_sm, axis=1)
def catcross_by_string(target, output):
    loss = 0
    for i in range(num_strings):
        loss += K.categorical_crossentropy(target[:,i,:], output[:,i,:])
        return loss
def avg_acc(y_true, y_pred):
    return K.mean(K.equal(K.argmax(y_true, axis=-1), K.argmax(y_pred, axis=-1)))


def model():
    model = Sequential()
    model.add(Conv2D(32, kernel_size=(3, 3),
                        activation='relu',
                        input_shape=input_shape))
    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))   
    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes * num_strings)) # no activation
    model.add(Reshape((num_strings, num_classes)))
    model.add(Activation(softmax_by_string))

    model.compile(loss=catcross_by_string,
                optimizer=tf.keras.optimizers.Adadelta(),
                metrics=[avg_acc])
    return model