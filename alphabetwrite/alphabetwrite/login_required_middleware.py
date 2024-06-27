from django.shortcuts import redirect
from django.urls import reverse

class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 로그인 페이지와 관련된 URL을 예외 처리
        login_url = reverse('accounts:login')
        signup_url = reverse('accounts:signup')
        if not request.user.is_authenticated and not request.path in [login_url, signup_url, '/', '/admin']:
            return redirect(login_url)
        response = self.get_response(request)
        return response
