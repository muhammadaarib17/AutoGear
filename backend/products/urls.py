from django.urls import path
from .views import *

urlpatterns = [
    path("products/", ProductListAPIView.as_view()),
    path("products/<int:pk>/", ProductDetailAPIView.as_view()),
    path("categories/", CategoryListAPIView.as_view()),
]