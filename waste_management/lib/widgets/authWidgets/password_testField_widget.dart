import 'package:flutter/material.dart';

class InputPasswordTxtField extends StatelessWidget {
  final String hintText;
  final TextEditingController controller;
  final String? Function(String?)? validator;

  InputPasswordTxtField({
    required this.hintText,
    required this.controller,
    required this.validator,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: true,
      validator: validator,
      style: TextStyle(
        fontFamily: 'Arial',
        // fontWeight: FontWeight.bold,
        color: const Color(0xff888b91),
        fontSize: 20,
      ),
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: TextStyle(color: const Color(0xff888b91)),
      ),
    );
  }
}
