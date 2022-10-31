from rest_framework import serializers
from .models import Audio, Tablature

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = ['id', 'name', 'path']

class TablatureSerializer(serializers.ModelSerializer):
    # audio = AudioSerializer()
    class Meta:
        model = Tablature
        fields = ['id', 'audio_id', 'code']
        
    def create(self, validated_data):
        return Tablature.objects.create(**validated_data)