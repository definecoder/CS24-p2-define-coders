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

class AuthServices {
  void mailVerify({
    required BuildContext context,
    required String email,
  }) async {
    try {
      final res =
          await http.post(Uri.parse('$uri/auth/reset-password/initiate'),
              body: jsonEncode({
                'email': email,
              }),
              headers: <String, String>{
            // "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json; charset=UTF-8',
            // 'Accept': '*/*'
          });
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
                    builder: (context) => MyVerify(
                          email: email,
                          otpToken: otpToken,
                        )));
          });
    } catch (e) {
      print(e.toString());
      showSnackBar(context, e.toString());
    }
  }

  void checkMailOTP({
    required BuildContext context,
    required String otp,
    required String forgetPassToken,
  }) async {
    try {
      final res = await http.post(Uri.parse('$uri/auth/reset-password/confirm'),
          body: jsonEncode({
            'otp': otp,
          }),
          headers: <String, String>{
            // "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer $forgetPassToken',
            // 'Accept': '*/*'
          });
      print(otp);

      if (res.statusCode == 200) {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => LoginScreen()));
      } else {
        showSnackBar(context, 'Invalid OTP');
      }
    } catch (e) {
      print(e.toString());
      showSnackBar(context, e.toString());
    }
  }

  void signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try {
      final res = await http.post(Uri.parse('$uri/auth/login'),
          body: jsonEncode({'email': email, 'password': password}),
          headers: <String, String>{
            // "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json; charset=UTF-8',
            // 'Accept': '*/*'
          });

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

            Provider.of<UserProvider>(context, listen: false)
                .setUser(loggeduser);
            await prefs.setString(
                'Authentication', jsonDecode(res.body)['token']);

            final user = Provider.of<UserProvider>(context, listen: false).user;

            print(user.toJson());

            //shared preference a jst token ta thakbe
            Navigator.pushAndRemoveUntil(
                context,
                generateRoute(RouteSettings(name: HomeScreen.routeName)),
                //MaterialPageRoute(builder: (context) => HomeScreen()), same as above
                (route) => false);
          });
    } catch (e) {
      print(e.toString());
      showSnackBar(context, e.toString());
    }
  }
}
