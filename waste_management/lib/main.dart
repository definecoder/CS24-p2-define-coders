import 'package:flutter/material.dart';

import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/providers/user_provider.dart';
import 'package:waste_management/screens/mapscreen/livelocation.dart';
import 'package:waste_management/screens/welcome/splashscreen.dart';
import 'package:provider/provider.dart';
import 'package:waste_management/widgets/citizenFeatures/Forum/forumDashboard.dart';
import 'package:waste_management/widgets/citizenFeatures/educationalBlog/videoPlayer.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/checkedOut.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/checkin.dart';
import 'package:waste_management/widgets/employeeFeatures/taskList/taskListShow.dart';


void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (context)=> UserProvider())
  ],

      child: const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // This widget is the root of your application.
  //final AuthServices authService = AuthServices();

  @override
  void initState() {
    super.initState();
   // authService.getUserData(context);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Auth Screen 1',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.light,
          primaryColor: kPrimaryColor,
          scaffoldBackgroundColor: kBackgroundColor,
          secondaryHeaderColor: ksecondaryHeaderColor,
          inputDecorationTheme: InputDecorationTheme(
            enabledBorder: UnderlineInputBorder(
              borderSide: BorderSide(
                color: Colors.white.withOpacity(.2),
              ),
            ),
          ),
        ),
        home: const SplashScreen() //ForumDashboard()//TaskListView()//CheckOut()//IssuePage()//
    );
  }
}