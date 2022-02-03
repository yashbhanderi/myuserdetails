from . import views
from django.urls import path

urlpatterns = [
    path('signup/', views.signup_view, name="signup"),
    path('login/', views.login_view, name="login"),
    path('check-token/', views.check_token, name="check_token"),
    path('get-details/', views.get_details , name="get_details")
]