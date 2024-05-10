import 'package:flutter/material.dart';


import '../../constants/theming.dart';

class ButtonWidget extends StatelessWidget {
  final String btnText;
  final VoidCallback onPress;

  ButtonWidget({
    required this.textSize,
    required this.btnText,
    required this.onPress});

  double textSize;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(

      onPressed: onPress,
      style: ElevatedButton.styleFrom(
        backgroundColor: Theme.of(context).primaryColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(28.0),
        ),
      ),
      child: Text(
        btnText.toUpperCase(),
        style: TextStyle(
          fontFamily: 'Arial',
          fontSize: textSize,
          fontWeight: FontWeight.bold,
          color: ksecondaryHeaderColor,
        ),
      ),
    );
  }
}