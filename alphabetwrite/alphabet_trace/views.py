import requests
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from django.contrib.auth.models import User
from .models import Submission

# 따라쓰기
def main_A_page(request):    
    return render(request, '3/main_A.html')

def main_a_page(request):
    return render(request, '3/main_a1.html')

def main_B_page(request):
    return render(request, '3/main_B.html')

def main_b_page(request):
    return render(request, '3/main_b1.html')



# 직접쓰기
@csrf_exempt
def upperA(request):
    if request.method == 'POST':
        image = request.FILES.get('file')
        image_number = request.POST.get('imageNumber')
        alphabet = request.POST.get('alphabet')
        if image:
            path = default_storage.save(f'tmp/{image.name}', ContentFile(image.read()))

            with default_storage.open(path, 'rb') as img_file:
                # 파일과 폼 데이터를 분리하여 POST 요청
                files = {'file': img_file}
                data = {'number': image_number}
                response = requests.post('http://43.203.12.67:5001/predict', files=files, data=data)
                
                result = response.json()
                number = result['number']
                print(data, number)
                if response.status_code == 200 and image_number == '2':

                    ### 여기서 db저장
                    # result == {'predicted_label': str(stroke_label), 's3_uri': s3_uri}
                    # 필기체인식모델 결과만 db저장함

                    user = None
                    # 사용자가 로그인했는지 확인
                    if request.user.is_authenticated:
                        # 로그인한 사용자의 ID 접근
                        user = request.user

                    predicted_label = result['predicted_label1']
                    s3_uri = result['s3_uri']
                    print(user, predicted_label, s3_uri)

                    # Submission 인스턴스 생성 및 저장
                    try:
                        submission = Submission(
                            user=user,
                            s3_uri=s3_uri,
                            question_label=alphabet,
                            prediction_label=predicted_label,
                        )
                        submission.save()
                    except Exception as e:
                        print(f"DB 저장 실패: {e}")


                    return JsonResponse({'message': '필기체인식완', 'result': result})
                elif response.status_code == 200 and image_number == '1':
                    return JsonResponse({'message': 'Image uploaded and processed successfully!', 'result': result})
                else:
                    return JsonResponse({'error': 'Failed to process image with external API'}, status=response.status_code)

        return JsonResponse({'error': 'No image uploaded'}, status=400)

    return render(request, 'trace/index_A.html')


@csrf_exempt
def lowera(request):
    if request.method == 'POST':
        image = request.FILES.get('file')
        image_number = request.POST.get('imageNumber')
        if image:
            path = default_storage.save(f'tmp/{image.name}', ContentFile(image.read()))

            with default_storage.open(path, 'rb') as img_file:
                # 파일과 폼 데이터를 분리하여 POST 요청
                files = {'file': img_file}
                data = {'number': image_number}
                response = requests.post('http://43.203.12.67:5001/predict', files=files, data=data)
                
                result = response.json()
                number = result['number']
                print(data, number)
                if response.status_code == 200 and image_number == '2':

                    ### 여기서 db저장
                    # result == {'predicted_label': str(stroke_label), 's3_uri': s3_uri}
                    # 필기체인식모델 결과만 db저장함

                    user = None
                    # 사용자가 로그인했는지 확인
                    if request.user.is_authenticated:
                        # 로그인한 사용자의 ID 접근
                        user = request.user

                    predicted_label = result['predicted_label1']
                    s3_uri = result['s3_uri']
                    print(user, predicted_label, s3_uri)

                    # Submission 인스턴스 생성 및 저장
                    try:
                        submission = Submission(
                            user=user,
                            s3_uri=s3_uri,
                            question_label='a',
                            prediction_label=predicted_label,
                        )
                        submission.save()
                    except Exception as e:
                        print(f"DB 저장 실패: {e}")


                    return JsonResponse({'message': '필기체인식완', 'result': result})
                elif response.status_code == 200 and image_number == '1':
                    return JsonResponse({'message': 'Image uploaded and processed successfully!', 'result': result})
                else:
                    return JsonResponse({'error': 'Failed to process image with external API'}, status=response.status_code)

        return JsonResponse({'error': 'No image uploaded'}, status=400)
    return render(request, 'trace/index_a1.html')

@csrf_exempt
def upperB(request):
    if request.method == 'POST':
        image = request.FILES.get('file')
        image_number = request.POST.get('imageNumber')
        if image:
            path = default_storage.save(f'tmp/{image.name}', ContentFile(image.read()))

            with default_storage.open(path, 'rb') as img_file:
                # 파일과 폼 데이터를 분리하여 POST 요청
                files = {'file': img_file}
                data = {'number': image_number}
                response = requests.post('http://43.203.12.67:5001/predict', files=files, data=data)
                
                result = response.json()
                number = result['number']
                print(data, number)
                if response.status_code == 200 and image_number == '2':

                    ### 여기서 db저장
                    # result == {'predicted_label': str(stroke_label), 's3_uri': s3_uri}
                    # 필기체인식모델 결과만 db저장함

                    user = None
                    # 사용자가 로그인했는지 확인
                    if request.user.is_authenticated:
                        # 로그인한 사용자의 ID 접근
                        user = request.user

                    predicted_label = result['predicted_label1']
                    s3_uri = result['s3_uri']
                    print(user, predicted_label, s3_uri)

                    # Submission 인스턴스 생성 및 저장
                    try:
                        submission = Submission(
                            user=user,
                            s3_uri=s3_uri,
                            question_label='B',
                            prediction_label=predicted_label,
                        )
                        submission.save()
                    except Exception as e:
                        print(f"DB 저장 실패: {e}")


                    return JsonResponse({'message': '필기체인식완', 'result': result})
                elif response.status_code == 200 and image_number == '1':
                    return JsonResponse({'message': 'Image uploaded and processed successfully!', 'result': result})
                else:
                    return JsonResponse({'error': 'Failed to process image with external API'}, status=response.status_code)

        return JsonResponse({'error': 'No image uploaded'}, status=400)

    return render(request, 'trace/index_B.html')

@csrf_exempt
def lowerb(request):
    if request.method == 'POST':
        image = request.FILES.get('file')
        image_number = request.POST.get('imageNumber')
        if image:
            path = default_storage.save(f'tmp/{image.name}', ContentFile(image.read()))

            with default_storage.open(path, 'rb') as img_file:
                # 파일과 폼 데이터를 분리하여 POST 요청
                files = {'file': img_file}
                data = {'number': image_number}
                response = requests.post('http://43.203.12.67:5001/predict', files=files, data=data)
                
                result = response.json()
                number = result['number']
                print(data, number)
                if response.status_code == 200 and image_number == '2':

                    ### 여기서 db저장
                    # result == {'predicted_label': str(stroke_label), 's3_uri': s3_uri}
                    # 필기체인식모델 결과만 db저장함

                    user = None
                    # 사용자가 로그인했는지 확인
                    if request.user.is_authenticated:
                        # 로그인한 사용자의 ID 접근
                        user = request.user

                    predicted_label = result['predicted_label1']
                    s3_uri = result['s3_uri']
                    print(user, predicted_label, s3_uri)

                    # Submission 인스턴스 생성 및 저장
                    try:
                        submission = Submission(
                            user=user,
                            s3_uri=s3_uri,
                            question_label='b',
                            prediction_label=predicted_label,
                        )
                        submission.save()
                    except Exception as e:
                        print(f"DB 저장 실패: {e}")


                    return JsonResponse({'message': '필기체인식완', 'result': result})
                elif response.status_code == 200 and image_number == '1':
                    return JsonResponse({'message': 'Image uploaded and processed successfully!', 'result': result})
                else:
                    return JsonResponse({'error': 'Failed to process image with external API'}, status=response.status_code)

        return JsonResponse({'error': 'No image uploaded'}, status=400)
    return render(request, 'trace/index_b1.html')