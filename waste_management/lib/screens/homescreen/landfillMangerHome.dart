import 'package:flutter/material.dart';

class LandfillMangerHome extends StatefulWidget {
  static const String routeName = '/landfill-home-screen';
  const LandfillMangerHome({super.key});

  @override
  State<LandfillMangerHome> createState() => _LandfillMangerHomeState();
}

class _LandfillMangerHomeState extends State<LandfillMangerHome> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: Text("This is Landfill Manager home screen")),);
  }
}
