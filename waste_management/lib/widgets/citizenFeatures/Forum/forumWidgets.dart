import 'package:flutter/cupertino.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

class ProfileCard extends StatefulWidget {
  const ProfileCard({
    super.key,
    required this.id,
    required this.name,
    required this.profilePic,
    required this.question,
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

  @override
  State<ProfileCard> createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(

        height: 390,
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
                      radius: 25,
                      backgroundImage: AssetImage(
                widget.profilePic,

                ),
        ),
                    SizedBox(width: 6),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.name,
                          style: TextStyle(
                            fontSize: 18,
                          ),
                        ),
                        Text(
                          'Lives in ${widget.support_area}  ',
                          style: TextStyle(
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(widget.description),
              ),
              SizedBox(height: 8),
              CarouselSlider(
                options: CarouselOptions(height: 170.0),
                items: widget.imgList
                    .map(
                      (item) => Container(
                    child: Center(
                      child: Image.asset(
                        item,
                        fit: BoxFit.contain,
                        height: 200,
                      ),
                    ),
                  ),
                )
                    .toList(),
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Icon(Icons.location_on),
                        Text(widget.location),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Icon(Icons.arrow_upward_outlined),
                        Text("${widget.upvote}"),
                        SizedBox(width: 10),
                        Icon(Icons.arrow_downward),
                        Text(widget.downvote),
                        SizedBox(width: 10),
                        Icon(Icons.message_outlined),
                        Text(widget.comment),
                        SizedBox(width: 30),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10),
              Container(
                width: double.infinity,
                height: 4,
                color: Colors.blueGrey,
              ),
            ],
          ),
        ),
      ),
    );
  }
}