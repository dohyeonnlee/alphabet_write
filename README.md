![1메인](https://github.com/dohyeonnlee/alphabet_write/assets/99801524/d9e630da-2cdb-4191-8e4b-df4fcd4ad25e)

## 📌 개요

### AI 키즈 Writing
미취학 아동들을 위한 알파벳 따라쓰기 및 필기인식 프로그램



## 📌 요약

**프로젝트의 주요 구현 내용**

학습자가 제공된 칸을 따라서 드래그 하는 방식으로 알파벳을 학습하며, 터치펜을 사용하여 직접 알파벳을 작성할 수 있는 환경을 제공한다. 또한, 학습자가 작성한 알파벳 이미지를 획 인식 모델 및 필기체 인식 모델에 입력하여 정확성을 판별하고, 오류 발생 시 추가 학습을 유도하여 학습 효과를 극대화한다. 

**사용 모델**

- stable diffusion을 이용한 이미지 생성 모델
이미지를 학습하여 원하는 그림체대로 이미지를 생성, 본 프로그램의 모든 이미지는 해당 생성 모델을 통해 제작되었다.

- CNN을 이용한 획인식 모델과 필기체 인식 모델
학습자가 알파벳을 쓸때 획 순서를 판별하고, 정확히 해당 알파벳을 따라 썼는지 확인한다.

**이용자 프로세스**

![p](https://github.com/dohyeonnlee/alphabet_write/assets/99801524/65f42ad3-6bc5-40a1-8d78-e55a4d6bac7a)





## 📌 사용 가이드

**vscode 환경에서 수행해 주세요.**
   

>가상환경 생성

```bash
python -m venv 가상환경이름
```
>가상환경 실행
```bash
가상환경이름/Scripts/activate.bat
```
>패키지 설치
```bash
pip install -r requirements.txt
```
>실행
```bash
python manage.py runserver
```

생성된 로컬주소로 이동해 주세요🚀





## 📌 결과

공부할 알파벳 선택

![image](https://github.com/dohyeonnlee/alphabet_write/assets/99801524/153979a6-0ed8-460e-b2eb-535e604d5fb2)


공부 과정

![image](https://github.com/dohyeonnlee/alphabet_write/assets/99801524/4186bd58-cef0-4a1d-b4eb-550f532015a4)


오답일 경우

![image](https://github.com/dohyeonnlee/alphabet_write/assets/99801524/7b743b81-a996-4084-b772-2ea855ad3ee1)




## 📌 개발 환경 / 툴

- VSCode
- Python
- HTML
- CSS
- Javascript
- Django
- AWS RDS MySQL


**프로젝트 구조**

![image (1)](https://github.com/dohyeonnlee/alphabet_write/assets/99801524/971fcc86-b1a7-4bfc-a8c6-fd9df150b7a0)



