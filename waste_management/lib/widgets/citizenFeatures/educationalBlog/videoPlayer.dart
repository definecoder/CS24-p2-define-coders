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
    flickManager = FlickManager(videoPlayerController: VideoPlayerController.networkUrl(Uri.parse("https://cdn.discordapp.com/attachments/1190253751903207538/1238581046828732529/IMPROPER_WASTE_DISPOSAL_EFFECTS_AND_SOLUTIONS.mp4?ex=663fcdfd&is=663e7c7d&hm=a9b710a3edfe79ccdd6c6a06e6e2d57bc910963ecc04e70065e750a2d0bb361a&")));
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
