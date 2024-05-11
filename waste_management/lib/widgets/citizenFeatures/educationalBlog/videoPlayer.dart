import 'package:flutter/material.dart';
import 'package:flick_video_player/flick_video_player.dart';
import 'package:video_player/video_player.dart';

class MyVideoPlayer extends StatefulWidget {
  const MyVideoPlayer({super.key});

  @override
  State<MyVideoPlayer> createState() => _MyVideoPlayerState();
}

class _MyVideoPlayerState extends State<MyVideoPlayer> {
  late FlickManager flickManager;
  
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    flickManager = FlickManager(videoPlayerController: VideoPlayerController.networkUrl(Uri.parse("https://cdn.discordapp.com/attachments/1190253751903207538/1238652969969389651/Untitled_design.mp4?ex=664010f9&is=663ebf79&hm=6fa59fd4dfb83d1d1da912e73488eae5a004eb75bf45cc5c6ac377c7f95fb4ff&")));
  }
  
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Container(
        height: 500,
        child: FlickVideoPlayer(flickManager: flickManager,),
      ),)
    );
  }
}
