from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Product, Category, Order, OrderItem
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderSerializer,
)


# -------------------------
# PRODUCTS
# -------------------------

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# -------------------------
# CATEGORIES
# -------------------------

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# -------------------------
# CREATE ORDER
# -------------------------

class CreateOrderAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data

        order = Order.objects.create(
            user=request.user,
            full_name=data["full_name"],
            phone=data["phone"],
            address=data["address"],
            city=data["city"],
            total_price=data["total_price"],
        )

        for item in data["items"]:

            product = Product.objects.get(id=item["id"])

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item["quantity"],
                price=product.sale_price,
            )

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )


# -------------------------
# MY ORDERS
# -------------------------

class MyOrdersAPIView(generics.ListAPIView):

    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Order.objects.filter(
            user=self.request.user
        ).order_by("-created_at")