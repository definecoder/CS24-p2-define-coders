import 'package:flutter/material.dart';


class InputTxtField extends StatelessWidget {
  final String hintText;
  final TextEditingController controller;
  final String? Function(String?)? validator;
  final bool obscureText;

  InputTxtField(
      {required this.hintText,
        required this.controller,
        required this.validator,
        required this.obscureText});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      validator: validator,
      obscureText: obscureText,
      style: const TextStyle(
        fontFamily: 'Arial',
        color:  Color(0xff888b91),
        fontSize: 18,
      ),
      decoration: InputDecoration(
        enabledBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            width: 3,
            color: Color(0xff999a9e),
          ),
        ),
        focusedBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            width: 3,
            color: Color(0xff999a9e),
          ),
        ),
        border: const UnderlineInputBorder(),
        hintText: hintText,
        hintStyle: const TextStyle(
          fontFamily: 'Arial',
          fontWeight: FontWeight.bold,
          color:  Color(0xff888b91),
          fontSize: 14,
        ),
      ),
    );
  }
}