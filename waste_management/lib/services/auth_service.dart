import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:waste_management/constants/error_handling.dart';
import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/models/auth_model.dart';
import 'package:waste_management/providers/user_provider.dart';
import 'package:waste_management/router.dart';
import 'package:waste_management/screens/homescreen/adminHomeScreen.dart';
import 'package:waste_management/screens/welcome/loginscreen.dart';
import 'package:waste_management/screens/welcome/otpVerify.dart';

class AuthServices{

  // void signUpUser({
  //   required BuildContext context,
  //   required String email,
  //   required String password,
  //   required String name,
  //   required String messid,
  // }) async {
  //   try{
  //     User user = User(
  //         id: '',
  //         name: name,
  //         email: email,
  //         password: password,
  //         messid: messid,
  //         messname: '',
  //         token: ''
  //     );
  //
  //     http.Response res=  await http.post(Uri.parse('$uri/api/signup'),
  //         body: user.toJson(),
  //         headers: <String, String>{
  //           'Content-Type' : 'application/json; charset=UTF-8',
  //
  //         }
  //     );
  //     print("Sign up info");
  //     print(res.body);
  //
  //
  //
  //     httpErrorHandle(
  //         response: res,
  //         context: context,
  //         onSuccess: (){
  //           //print("Account opened");
  //           showSnackBar(context, 'Account created! Log in with same email and password');
  //         }
  //     );
  //
  //
  //   }catch(e){
  //     print(e.toString());
  //     // ScaffoldMessenger.of(context).showSnackBar(
  //     //     SnackBar(
  //     //         content: Text("Try again with right information" )));
  //
  //
  //   }
  // }

  void mailVerify({
    required BuildContext context,
    required String email,
  }) async {
    try{

      final  res=  await http.post(Uri.parse('$uri/auth/reset-password/initiate'),
          body: jsonEncode({
            'email': email,
          }),
          headers: <String, String>{
            // "Access-Control-Allow-Origin": "*",
            'Content-Type' : 'application/json; charset=UTF-8',
            // 'Accept': '*/*'
          }
      );
      print(email);

      Map<String, dynamic> response = jsonDecode(res.body as String);
      String otpToken = response['otptoken'];
      print(otpToken);

//      print(res.body);
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {

            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>  MyVerify(email: email, otpToken: otpToken,)
                )
            );

          }
      );
    }catch(e){
      print(e.toString());
      showSnackBar(context, e.toString());
    }
  }

  void signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try{

      final  res=  await http.post(Uri.parse('$uri/auth/login'),
          body: jsonEncode({
            'email': email,
            'password': password
          }),
          headers: <String, String>{
            // "Access-Control-Allow-Origin": "*",
            'Content-Type' : 'application/json; charset=UTF-8',
            // 'Accept': '*/*'
          }
      );


//      print(res.body);
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {

            // log in er por token store kore rakhbo jeno barbar log in krte na hoy

            SharedPreferences prefs = await SharedPreferences.getInstance();
            Map<String, dynamic> json = jsonDecode(res.body as String);
            User loggeduser = User.fromMap(json);

            print(loggeduser.id);
            print(loggeduser.username);
            print(loggeduser.email);
            print(loggeduser.roleName);
            print(loggeduser.token);

            Provider.of<UserProvider>(context, listen: false).setUser(loggeduser);
            await prefs.setString('Authentication', jsonDecode(res.body)['token']);



            final user = Provider.of<UserProvider>(context, listen: false).user;

            print(user.toJson());

            //shared preference a jst token ta thakbe
            Navigator.pushAndRemoveUntil(
                context,
                generateRoute(
                    RouteSettings(name: HomeScreen.routeName)
                ),
                //MaterialPageRoute(builder: (context) => HomeScreen()), same as above
                    (route) => false);
          }
      );
    }catch(e){
      print(e.toString());
      showSnackBar(context, e.toString());
    }
  }




}