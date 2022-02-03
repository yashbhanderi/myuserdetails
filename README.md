# Authentication and User Information retrieval using React Js and Django

Website Link: https://myuserdetails.herokuapp.com/

- This is full a stack web application created with React Js and Django.
- It shows all the registered users information only when user is logged in.
- It shows user's username, email, and phone number.
- In sign up, It shows necessory errors like email or username exists, password must be match, phone number must be 10 digit, etc.
- In log in, It shows errors like user does not exists, invalid password, etc.
- When user successfully log in or sign up, request go to the backend for users list and render into the page.
- Used React Hooks, Context API and useReducers for state management, Axios for API management and React-Router-DOM for Routing services.
- Used JWT Tokens for Authentication in Django.
- Created REST API using Django REST Framework for seamless data transmission between client and server.

# Demo

- Home page ( User is not logged In )
 
![image](https://user-images.githubusercontent.com/85643213/152418130-92e957f5-85a5-4e34-9685-02f65b3df9bf.png)

- Home Page ( User is Logged In )

![image](https://user-images.githubusercontent.com/85643213/152419125-c4f7c04f-8e2c-4b7b-8485-6cb23920e46c.png)
