import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:waste_management/widgets/citizenFeatures/volunteer/volunteerForm.dart';

class EventCalendar extends StatefulWidget {
  const EventCalendar({Key? key}) : super(key: key);

  @override
  _EventCalendarState createState() => _EventCalendarState();
}

class _EventCalendarState extends State<EventCalendar> {
  late DateTime _selectedDay;
  late DateTime _focusedDay;
  late CalendarFormat _calendarFormat;
  List<Event> _selectedEvents = [];

  final events = LinkedHashMap<DateTime, List<Event>>(
    equals: isSameDay,
    hashCode: getHashCode,
  )..addAll(eventSource);

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _selectedDay = now;
    _focusedDay = now;
    _calendarFormat = CalendarFormat.month;
    _selectedEvents = _getEventsForDay(now);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          TableCalendar(
            firstDay: DateTime.utc(2010, 10, 16),
            lastDay: DateTime.utc(2030, 3, 14),
            focusedDay: _focusedDay,
            selectedDayPredicate: (day) {
              return isSameDay(_selectedDay, day);
            },
            onDaySelected: _onDaySelected,
            calendarFormat: _calendarFormat,
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
            onPageChanged: (focusedDay) {
              setState(() {
                _focusedDay = focusedDay;
              });
            },
            eventLoader: _getEventsForDay,
            calendarBuilders: CalendarBuilders(
              dowBuilder: (context, day) {
                if (day.weekday == DateTime.sunday) {
                  final text = DateFormat.E().format(day);

                  return Center(
                    child: Text(
                      text,
                      style: TextStyle(color: Colors.red),
                    ),
                  );
                }
              },
            ),
          ),
          if (_selectedEvents.isNotEmpty)
            Column(
              children: [
                SizedBox(height: 10),
                Text('Events for ${DateFormat.yMMMMd().format(_selectedDay)}'),
                SizedBox(height: 10),
                ListView.builder(
                  shrinkWrap: true,
                  itemCount: _selectedEvents.length,
                  itemBuilder: (context, index) {
                    final event = _selectedEvents[index];
                    return ListTile(
                      title: Text(event.title),
                    );
                  },
                ),
              ],
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your action here
          Navigator.push(
            context,

              MaterialPageRoute(builder: (context) => VolunteerForm()));
        },
        child: Row(
          children: [
            Icon(Icons.add),
            Text("Join")
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    
    );
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      setState(() {
        _selectedDay = selectedDay;
        _focusedDay = focusedDay;
        _selectedEvents = _getEventsForDay(selectedDay);
      });
    }
  }

  List<Event> _getEventsForDay(DateTime day) {
    return events[day] ?? [];
  }
}

// Dummy Event class for demonstration
class Event {
  final String title;
  const Event(this.title);
}

// Dummy event source
final eventSource = {
  DateTime.now(): [Event('Monthly Cleaning Day'), Event('Weekly Meeting')],
  DateTime.now().add(Duration(days: 1)): [Event('Conference with mayor')],
};

// Utility functions
bool isSameDay(DateTime a, DateTime b) {
  return a.year == b.year && a.month == b.month && a.day == b.day;
}

int getHashCode(DateTime key) {
  return key.day * 1000000 + key.month * 10000 + key.year;
}
