import 'package:flutter/material.dart';

class StsManagerHome extends StatefulWidget {
  static const String routeName = '/sts-home-screen';
  const StsManagerHome({super.key});

  @override
  State<StsManagerHome> createState() => _StsManagerHomeState();
}

class _StsManagerHomeState extends State<StsManagerHome> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Text("This is Sts Manger home screen"),);
  }
}
