from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from alphabet_trace.models import Submission
import json

def intro_page(request):
    return render(request, 'main/intro.html')

@login_required
def menu_page(request):
    user = request.user
    question_labels = Submission.objects.filter(user=user).values_list('question_label', flat=True).distinct()
    question_labels_list = list(question_labels)
    
    # 알파벳을 숫자로 변경하여 저장
    question_labels_numeric = [ord(label.upper()) - ord('A') + 1 for label in question_labels_list]

    question_labels_json = json.dumps(question_labels_numeric)
    
    print('Question Labels:', question_labels_list)  # 로그 추가
    print('Question Labels Numeric:', question_labels_numeric)  # 로그 추가
    return render(request, 'main/menu.html', {'question_labels':question_labels_numeric, 'question_labels_json': question_labels_json})

@login_required
def connection_page(request):
    return render(request, 'main/connection.html')

@login_required
def outro_page(request):
    user = request.user
    print('user', user)
    return render(request, 'main/outro.html', {'user':user})
