from rest_framework import serializers
from .models import Audio, Tablature, Type

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = ['id', 'name', 'title', 'describe', 'path', 'group']

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['name', 'describe']

class TablatureSerializer(serializers.ModelSerializer):
    audio = AudioSerializer()
    type = TypeSerializer()

    class Meta:
        model = Tablature
        fields = ['id', 'audio', 'code', "type"]
