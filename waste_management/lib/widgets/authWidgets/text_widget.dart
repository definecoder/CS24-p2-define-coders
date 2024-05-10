import 'package:flutter/material.dart';


class TextWidget extends StatelessWidget {
  final String title;
  final double txtSize;
  final Color txtColor;
  TextWidget(
      {required this.title, required this.txtSize, required this.txtColor});

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: TextStyle(
        fontFamily: 'Arial',
        fontSize: txtSize,
        fontWeight: FontWeight.bold,
        color: txtColor,
      ),
    );
  }
}