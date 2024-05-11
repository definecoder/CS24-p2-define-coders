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
    flickManager = FlickManager(videoPlayerController: VideoPlayerController.networkUrl(Uri.parse("https://cdn.discordapp.com/attachments/1190253751903207538/1238647584617271316/Plastic_rubbish_been_dump_in_the_amazon_river.mp4?ex=66400bf5&is=663eba75&hm=dfc233cf1500cbf47de979c95cde7aa68199f69ac2f5887b9157ae377ad44329&")));
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
