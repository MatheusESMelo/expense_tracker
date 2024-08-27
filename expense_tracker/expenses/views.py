from rest_framework import generics
from .models import Expense
from .serializers import ExpenseSerializer

# List all expenses or create a new one
class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

# Retrieve, update, or delete an expense
class ExpenseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
