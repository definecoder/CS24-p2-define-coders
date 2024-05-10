import 'package:flutter/cupertino.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/widgets.dart';
import 'package:waste_management/widgets/citizenFeatures/educationalBlog/videoPlayer.dart';

class BlogArticle extends StatefulWidget {
  const BlogArticle({
    super.key,
    required this.id,
    required this.name,
    required this.profilePic,
    required this.question,
    required this.topic,
    required this.article,

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
  final String article;

  @override
  State<BlogArticle> createState() => _BlogArticleState();
}

class _BlogArticleState extends State<BlogArticle> {

  void gotovideo(){
    Navigator.push(
      context,
        MaterialPageRoute(builder: (context) => MyVideoPlayer()));
      // same as above
      //(route) => false);
    print("hwlllooo");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.only(top: 40.0),
          child: Container(
        
            decoration: BoxDecoration(
              color: Colors.white60,
              borderRadius: BorderRadius.circular(10), // radius value for rounded corners
            ),
            child: Padding(
              padding: const EdgeInsets.only(left: 5, bottom: 5, top: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("${widget.question}", style: TextStyle(
                      fontSize: 20
                  ),
                  ),
        
        
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
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(left: 5.0),
                              child: Text(
                                widget.name,
                                style: TextStyle(
                                  fontSize: 15,
                                ),
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
        
                      ],
                    ),
                  ),
        
                  SizedBox(height: 8),
                  Text("${widget.article}", style: TextStyle(fontSize: 15),),
        
                 // Text("${widget.article}", style: TextStyle(fontSize: 15),),

        

        
                  SizedBox(
                    height: 10,
                  ),
                  Stack(
                    children: [
                      // Background photo with defined height and width
                      SizedBox(
                       // height: MediaQuery.of(context).size.height, // Set height to screen height
                        width: MediaQuery.of(context).size.width, // Set width to screen width
                        child: Image(
                          image: AssetImage('${widget.imgList[0]}'),
                          fit: BoxFit.cover,
                        ),
                      ),
                      // Overlay photo
                      Positioned(
                        top: 50, // Adjust top position as needed
                        left:  MediaQuery.of(context).size.width/3, // Adjust left position as needed
                        child: GestureDetector(
                          onTap: (){
                            MaterialPageRoute(builder: (context) => MyVideoPlayer());
                          },
                          child: GestureDetector(
                            onTap: (){
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => MyVideoPlayer()));
                            },
                            child: Image(
                              image: AssetImage("assets/images/playbutton.png"),
                              width: 100, // Adjust width as needed
                              height: 100, // Adjust height as needed
                            ),
                          ),
                        ),
                      ),
                    ],
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

                       Expanded(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [


                            ElevatedButton(onPressed: gotovideo, child: Row(
                              children: [
                                Icon(Icons.play_arrow),
                                Text("Play"),
                              ],
                            )),
                            SizedBox(width: 10),
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
        ),
      ),
    );
  }
}