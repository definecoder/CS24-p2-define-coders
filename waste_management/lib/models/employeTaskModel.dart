import 'dart:convert';

import 'package:flutter/services.dart';

class Note {
  int id;
  String title;
  String content;
  DateTime modifiedTime;

  Note({
    required this.id,
    required this.title,
    required this.content,
    required this.modifiedTime,
  });

}



List<Note> sampleNotes = [
  Note(
    id: 0,
    title: 'House 123 - Garbage Pickup',
    content: 'Collect garbage from House 123',
    modifiedTime: DateTime(2022, 1, 1, 34, 5),
  ),
  Note(
    id: 1,
    title: 'House 456 - Waste Collection',
    content: 'Pick up waste from House 456',
    modifiedTime: DateTime(2022, 1, 1, 34, 5),
  ),
  Note(
    id: 2,
    title: 'Apartment Building - Trash Removal',
    content: 'Empty trash bins at the apartment building',
    modifiedTime: DateTime(2023, 3, 1, 19, 5),
  ),
  Note(
    id: 3,
    title: 'Commercial Area - Garbage Cleanup',
    content: 'Clean up garbage in the commercial area',
    modifiedTime: DateTime(2023, 1, 4, 16, 53),
  ),
  Note(
    id: 4,
    title: 'Household Hazardous Waste Collection',
    content: 'Collect hazardous waste from various households',
    modifiedTime: DateTime(2023, 5, 1, 11, 6),
  ),
  Note(
    id: 5,
    title: 'Street Cleaning - Downtown Area',
    content: 'Clean streets in the downtown area',
    modifiedTime: DateTime(2023, 5, 10, 8, 0),
  ),
  Note(
    id: 6,
    title: 'Beach Cleanup',
    content: 'Clean up trash and debris from the beach',
    modifiedTime: DateTime(2023, 5, 15, 10, 30),
  ),
  Note(
    id: 7,
    title: 'Recycling Collection - Neighborhood A',
    content: 'Collect recyclables from Neighborhood A',
    modifiedTime: DateTime(2023, 5, 20, 14, 15),
  ),
  Note(
    id: 8,
    title: 'E-Waste Pickup',
    content: 'Collect electronic waste for proper disposal',
    modifiedTime: DateTime(2023, 5, 25, 13, 0),
  ),
  Note(
    id: 9,
    title: 'Dumpster Replacement',
    content: 'Replace damaged dumpsters in the city',
    modifiedTime: DateTime(2023, 6, 1, 9, 45),
  ),
];