import io
import datetime
from .models import User
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password

# JWT Auth
import jwt
from backend.settings import SECRET_KEY

# Create your views here.

# Raw data into python object
def get_parsed_data(data):
    json_data = data
    stream = io.BytesIO(json_data)
    parsed_data = JSONParser().parse(stream)
    return parsed_data

# Decode Token
@csrf_exempt
def check_token(request):
    if request.method == 'POST':
        encoded = get_parsed_data(request.body)
        encoded = encoded['token']["token"]
        decoded = jwt.decode(encoded, SECRET_KEY, algorithms=["HS256"])
        return JsonResponse({"user": decoded})

# Generate Token
dt = datetime.datetime.now() + datetime.timedelta(days=2)

def get_token(id, username):
    encoded = jwt.encode({"id": id, "username": username, "exp": dt}, SECRET_KEY, algorithm="HS256")
    return encoded


@csrf_exempt
def signup_view(request):

    if request.method == 'POST':
        user = get_parsed_data(request.body)

        # Check User already exists or not
        exist_user = None
        try:
            exist_user = User.objects.get(username=user['username'])
        except User.DoesNotExist:
            try:
                exist_user = User.objects.get(email=user['email'])
            except User.DoesNotExist:
                exist_user = None
            if exist_user is not None:
                return JsonResponse({'msg': "Email Already Exists !"}, status=403)
        if exist_user is not None:
            return JsonResponse({'msg': "User Already Exists !"}, status=403)

        serializer = UserSerializer(data=user)


        # Store in database
        if serializer.is_valid():
            serializer.save()
            id = User.objects.filter(username=user["username"])[0].id
            token = get_token(id, user['username'])
            res = {
                "token": token,
            }
            return JsonResponse(res)

        return JsonResponse({'msg': "Some Error Occured !"}, status=403)

    return JsonResponse({'msg': "Some Error Occured !"}, status=403)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        parsed_data = get_parsed_data(request.body)

        username = parsed_data["username"]
        password = parsed_data["password"]

        user = None
        try:
            user = User.objects.get(username=username)

        except User.DoesNotExist:
            user = None

        if user is None:
            return JsonResponse({'msg': "User Not Exists !"}, status=403)

        if not check_password(password, user.password):
            return JsonResponse({'msg': "Wrong Password !"}, status=403)

        token = get_token(user.id, user.username)

        res = {
            "token": token,
        }
        return JsonResponse(res)

    return JsonResponse({'msg': "Some Error Occured !"}, status=403)
    

# Get all users details
def get_details(request):
    data = User.objects.all()
    serializer = UserSerializer(data, many=True)
    return JsonResponse({'user': serializer.data})

