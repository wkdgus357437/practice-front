import React from "react";
import "./Video.css"


class Video extends React.Component {
  componentDidMount = () => {
    this.playVideo();
  };

  componentWillUnmount = () => {
      this.pauseVideo();
  };


  playVideo = () => {
    // You can use the play method as normal on your video ref
    this.refs.vidRef.play();
  };

  pauseVideo = () => {
    // Pause as well
    this.refs.vidRef.pause();
  };
 
  
  

  render = () => {
    return (

      
      <div className="movie-wrap">
        <video
            muted={1} 
            ref="vidRef"
            src="https://adimg.cgv.co.kr/images/202212/PussinBoots/1080x608.mp4"
            type="video/mp4"
        />

        <div class="movieSelection_video_controller_wrap">
        <a href="http://ad.cgv.co.kr/click/CGV/CGV_201401/main@MovieSelection2021?ads_id%3d47137%26creative_id%3d66867%26click_id%3d87230%26maid%3D%26event%3d" id="ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL" class="btn_movieSelection_detailView">상세보기</a>
          
          
          <a href="#none" id="play" class="btn_movieSelection_play" onClick={this.playVideo}>
            Play!
          </a>
          <a href="#none" id="pause" class="btn_movieSelection_playStop" onClick={this.pauseVideo}>
            Pause!
          </a>
          <a href="#none" id="mute" class="btn_movieSelection_soundOnOff" >Sound On</a>
          <input name="ctl00$PlaceHolderContent$AD_CNT_URL" type="hidden" id="ctl00_PlaceHolderContent_AD_CNT_URL" value="http://ad.cgv.co.kr/NetInsight/imp/CGV/CGV_201401/main@MovieSelection2021?ads_id%3d47137%26creative_id%3d66867"></input>
        </div>
      </div>
    );
  };
}

export default Video;