import 'dart:async';

import 'package:flutter/material.dart';
import 'package:waste_management/screens/homescreen/adminHomeScreen.dart';
import 'package:waste_management/screens/welcome/loginscreen.dart';
import 'package:waste_management/services/auth_service.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/checkedOut.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/checkin.dart';


class CheckoutConfirm extends StatefulWidget {
  const CheckoutConfirm({Key? key}) : super(key: key);

  @override
  State<CheckoutConfirm> createState() => _CheckoutConfirmState();
}

class _CheckoutConfirmState extends State<CheckoutConfirm> {
  final AuthServices authServices = AuthServices();


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    authServices.checkIn(context: context, flag: false);
    Timer(Duration(seconds: 6), () {
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const HomeScreen())
      );
    });

  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
        backgroundColor: Colors.blue.shade300,
        body: Center(
          child: Container(


              child: Image.asset("assets/images/checkout.gif",
                width: screenWidth, // Set the width to be the screen width
                fit: BoxFit.cover,
              )// Foreground widget here
          ),
        )
    );
  }
}