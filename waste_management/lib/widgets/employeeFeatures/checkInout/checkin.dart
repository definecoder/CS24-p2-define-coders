import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

import 'package:swipeable_button_view/swipeable_button_view.dart';
import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/services/auth_service.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/checkOutConfirm.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/confirmPage.dart';

class CheckIn extends StatefulWidget {
  const CheckIn({super.key});

  @override
  State<CheckIn> createState() => _CheckInState();
}

class _CheckInState extends State<CheckIn> {
  bool isFinished = false;


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(50),
        child: Center(
            child: SwipeableButtonView(
              buttonText: 'Check In',
              buttontextstyle: const TextStyle(fontSize: 25, color: Colors.white),
              buttonWidget:
              const Icon(Icons.arrow_forward_ios_rounded, color: Colors.grey),
              activeColor: kPrimaryLightColor,
              onWaitingProcess: () {
                // - - -
                // Amount of time the circular progress
                // indicator spins before navigating to next page
                //- - -
                Future.delayed(const Duration(seconds: 2),
                        () => setState(() => isFinished = true));
              },
              isFinished: isFinished,
              onFinish: () async {
                // - - - Navigate to confirmation page - - -
                // post request the api value.
                await Navigator.push(
                    context,
                    PageTransition(
                        type: PageTransitionType.fade,
                        child: const ConfirmationPage()));
                // - - - Reset isFinished variable  - - -
                setState(() => isFinished = false);
              },
            )),
      ),
    );
  }
}