import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:waste_management/constants/theming.dart';

import 'package:waste_management/screens/mapscreen/livelocation.dart';
import 'package:waste_management/screens/welcome/loginscreen.dart';
import 'package:waste_management/widgets/adminFeatures/Bills.dart';
import 'package:waste_management/widgets/adminFeatures/Dashboard.dart';
import 'package:waste_management/widgets/adminFeatures/Schedules.dart';
import 'package:waste_management/widgets/adminFeatures/Users.dart';
import 'package:waste_management/widgets/citizenFeatures/Forum/forumDashboard.dart';
import 'package:waste_management/widgets/citizenFeatures/educationalBlog/blogDashboard.dart';
import 'package:waste_management/widgets/citizenFeatures/issueScreen/issueFeed.dart';
import 'package:waste_management/widgets/citizenFeatures/issueScreen/issueScreen.dart';
import 'package:waste_management/widgets/citizenFeatures/volunteer/volunteer.dart';
import 'package:waste_management/widgets/common/Profile.dart';
import 'package:waste_management/widgets/employeeFeatures/checkInout/checkin.dart';

class HomeScreen extends StatefulWidget {
  static const String routeName = '/admin-home-screen';
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _page = 2;
  List<Widget> pages = [

    // const UserManage(),
    // const Schedules(),
    // const AdminDashboard(),
    // const Bills(),
    // Profile(),
  EventCalendar(),
     IssueFeed(),
    ForumDashboard(),
    const GoogleMapLive(),
    const BlogDashboard()



  ];


  // Initial Selected Value
  String dropdownvalue = 'off';
  String mealCvalue= '1';
  final _msgController = TextEditingController();




  @override
  void dispose() {
    _msgController.dispose();
    //_msgController.clear();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {



    return Scaffold(
      appBar:  PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: AppBar(
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              color: Colors.black,
            ),
          ),
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                  height: 50,
                  alignment: Alignment.topLeft,
                  child: Image.asset("assets/images/img.png")
              ),

            ],
          ),
          actions: [
            PopupMenuButton<String>(
              onSelected: (value) {
                if (value == 'logout') {
                  // Implement your logout logic here
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                        (route) => false, // Set to false to remove all previous pages
                  );

                }
              },
              itemBuilder: (BuildContext context) => [
                PopupMenuItem<String>(
                  value: 'logout',
                  child: Text('Logout'),
                ),
              ],
            ),
          ],
        ),
      ),
      bottomNavigationBar: CurvedNavigationBar(
        backgroundColor: kBackgroundColor,
        color: kPrimaryLightColor,
        index: 2,
        items: <Widget>[
          Icon(Icons.people_outlined, size: 30, color: ksecondaryHeaderColor,),
          Icon(Icons.report_problem_outlined, size: 30, color: ksecondaryHeaderColor,),
          Icon(Icons.home, size: 30, color: ksecondaryHeaderColor,),
          Icon(Icons.place_rounded, size: 30, color: ksecondaryHeaderColor,),
          Icon(Icons.message_outlined, size: 30, color: ksecondaryHeaderColor,),
        ],
        onTap: (index) {
          setState(() {
            _page = index;
          });
        },
      ),
      resizeToAvoidBottomInset: false,
      body: pages[_page],
    );
  }
}
