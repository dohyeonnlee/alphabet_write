from django.db import models
from django.contrib.auth.models import User

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    s3_uri = models.CharField(max_length=255)  # 이미지 URI
    question_label = models.CharField(max_length=1)  # 문제 라벨 (알파벳 한 글자)
    prediction_label = models.CharField(max_length=1)  # 예측 라벨 (알파벳 한 글자)
    is_correct = models.BooleanField(default=False)  # 정오답 (문제라벨 == 예측라벨)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # 저장 전에 정오답 판별하여 자동으로 넣음
        self.is_correct = self.question_label == self.prediction_label
        super().save(*args, **kwargs) 
    
    def __str__(self):
        return f"{self.user.username}'s submission"

