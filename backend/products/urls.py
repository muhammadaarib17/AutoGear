from django.urls import path
from .views import *

urlpatterns = [

    # Products
    path("products/", ProductListAPIView.as_view()),
    path("products/<int:pk>/", ProductDetailAPIView.as_view()),

    # Categories
    path("categories/", CategoryListAPIView.as_view()),

    # Orders
    path("orders/create/", CreateOrderAPIView.as_view()),
    path("orders/", MyOrdersAPIView.as_view()),

]