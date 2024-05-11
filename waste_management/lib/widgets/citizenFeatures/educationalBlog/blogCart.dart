import 'package:flutter/cupertino.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

class BlogCard extends StatefulWidget {
  const BlogCard({
    super.key,
    required this.id,
    required this.name,
    required this.profilePic,
    required this.question,
    required this.topic,
    required this.support_area,
    required this.description,
    required this.location,
    required this.upvote,
    required this.downvote,
    required this.comment,
    required this.imgList,
    required this.commentPic1,
    required this.commentPic2,
    required this.comment1,
    required this.comment2

  });


  final String id;
  final String name; // any bangladeshi or indian name
  final String profilePic;
  final String question; // any european question
  final String support_area; // any question or country within 7 letter
  final String description; // shortly describe withing 5lines. describre about how you are come to abroad and your expertise field.
  final String location; // any european country
  final String upvote; // 10 to 100
  final String downvote; // 0 to 200
  final String comment;
  final List<String> imgList;
  final String commentPic1;
  final String commentPic2;
  final String comment1;
  final String comment2;
  final String topic;

  @override
  State<BlogCard> createState() => _BlogCardState();
}

class _BlogCardState extends State<BlogCard> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(

        height: 250,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10), // radius value for rounded corners
        ),
        child: Padding(
          padding: const EdgeInsets.only(left: 5, bottom: 5, top: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 8),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 15,
                      backgroundImage: AssetImage(
                        widget.profilePic,
                      ),
                    ),
                    SizedBox(width: 6),
                    Text(
                      widget.name,
                      style: TextStyle(
                        fontSize: 15,
                      ),
                    ),
                    Text(
                      ' ${widget.support_area}  ',
                      style: TextStyle(
                        fontStyle: FontStyle.italic,
                        color: Colors.grey[600],
                        fontSize: 15
                      ),

                    ),
                  ],
                ),
              ),
              
              SizedBox(height: 8),
              Row(children: [
                Expanded(
                  child: Column(children: [
                    Text("${widget.question}", style: TextStyle(
                      fontSize: 20
                    ),
                    ),
                    Text("${widget.description}", style: TextStyle(fontSize: 12),)
                  
                  ],),
                ),
                Container(
                  height: 80,
                  width: 80,
                  child: Image(image: AssetImage(widget.imgList[0]))
                )
              ],),

              SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.grey[600], // Background color
                        borderRadius: BorderRadius.circular(15), // Rounded edges
                      ),
                      padding: EdgeInsets.only(left: 15, right: 15), // Padding around the text
                      child: Text(
                        '${widget.topic}',
                        style: TextStyle(
                          color: Colors.white, // Text color
                        ),
                      ),
                    )
                  ),
                 const Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Icon(Icons.save_as_sharp),

                        SizedBox(width: 10),
                        Icon(Icons.data_saver_on_sharp),

                        SizedBox(width: 10),
                        Icon(Icons.badge_outlined),

                        SizedBox(width: 30),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10),
              Container(
                width: double.infinity,
                height: 2,
                color: Colors.blueGrey,
              ),
            ],
          ),
        ),
      ),
    );
  }
}