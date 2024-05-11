import 'dart:async';

import 'package:flutter/material.dart';
import 'package:waste_management/screens/welcome/loginscreen.dart';


class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    Timer(Duration(seconds: 6), () {
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const LoginScreen())
      );
    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
            height: double.infinity,

            // decoration: const BoxDecoration(
            //   image: DecorationImage(
            //       image: AssetImage("assets/images/ecosplash.gif"),
            //       fit: BoxFit.cover),
            // ),
            child: Image.asset("assets/images/ecosplash.gif",
              fit: BoxFit.cover,
            )// Foreground widget here
        )
    );
  }
}