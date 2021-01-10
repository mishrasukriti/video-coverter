export const ADD_VIDEO = 'ADD_VIDEO';

function addVideos(videos) {
    return {
        type: 'ADD_VIDEO',
        videos: videos
    }
}