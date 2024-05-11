import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';

class NotificationWidget extends StatefulWidget {
  @override
  State<NotificationWidget> createState() => _NotificationWidgetState();
}

class _NotificationWidgetState extends State<NotificationWidget> {
 int notificationCount  = 0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Icon(
          Icons.notification_important,
          size: 32,
          color: ksecondaryHeaderColor,// Adjust icon size as needed
        ),
        if (notificationCount == 0)
          Positioned(
            right: 0,
            top: 0,
            child: Container(
              padding: EdgeInsets.all(4),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.red,
              ),
              child: Text(
                notificationCount.toString(),
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
      ],
    );
  }
}
