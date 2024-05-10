import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/models/forumModel.dart';
import 'package:waste_management/widgets/citizenFeatures/educationalBlog/blogArticle.dart';
import 'package:waste_management/widgets/citizenFeatures/educationalBlog/blogCart.dart';
import 'package:waste_management/widgets/citizenFeatures/educationalBlog/videoPlayer.dart';



class BlogDashboard extends StatefulWidget {
  const BlogDashboard({super.key});

  @override
  State<BlogDashboard> createState() => _BlogDashboardState();
}

class _BlogDashboardState extends State<BlogDashboard> {
  List<Forum> BlogListing = [];
  String? _filePath;

  Future<void> _pickFile() async {
    final filePath = await FilePicker.platform.pickFiles();//.then((value) => value!.files.first.path);
    //print(filePath.toString());
  }

  @override
  void initState() {
    super.initState();
    BlogListing = dummyForumList;

  }

  @override
  Widget build(BuildContext context) {

    Widget content = ListView.builder(
        itemCount: dummyForumList.length,
        itemBuilder: (context, index) {
          Forum Blog = BlogListing[index];
          return GestureDetector(
            onTap: (){
              Navigator.push(
                context,

                MaterialPageRoute(builder: (context) => BlogArticle(
                  id: Blog.id,
                  name: Blog.name,
                  profilePic: Blog.profilePic,
                  question: Blog.question,
                  article: Blog.article,
                  support_area: Blog.supportArea,
                  description: Blog.description,
                  location: Blog.location,
                  upvote: Blog.upvote,
                  downvote: Blog.downvote,
                  comment: Blog.comment,
                  imgList: Blog.imgList,
                  comment1: Blog.comment1,
                  comment2: Blog.comment2,
                  commentPic1: Blog.commentPic1,
                  commentPic2: Blog.commentPic2,
                  topic: Blog.topic,

                )
                ), // same as above
                //(route) => false
              );
                 // MaterialPageRoute(builder: (context) => MyVideoPlayer()));
            },
            child: BlogCard(
              id: Blog.id,
              name: Blog.name,
              profilePic: Blog.profilePic,
              question: Blog.question,
              support_area: Blog.supportArea,
              description: Blog.description,
              location: Blog.location,
              upvote: Blog.upvote,
              downvote: Blog.downvote,
              comment: Blog.comment,
              imgList: Blog.imgList,
              comment1: Blog.comment1,
              comment2: Blog.comment2,
              commentPic1: Blog.commentPic1,
              commentPic2: Blog.commentPic2,
              topic: Blog.topic,
            ),
          );
        }
    );






    return Scaffold(
        body: content

    );
  }
}
