const UPLOAD_CONSTANTS = {
    VIDEO: 'video',
    LOGO: 'logo',
    CUSTOM_LOGO: 'custom-logo'
};

const MESSAGE_CONSTANTS = {
    PLAYLIST_EXISTS: 'Playlist already exists',
    PLAYLIST_NOT_EXISTS: 'Playlist does not exist',
    PLAYLIST_ADD_SUCCESS: 'Playlist added successfully',
    PLAYLIST_ADD_FAILED: 'Playlist add failed',
    PLAYLIST_DATA_REMOVE_FAILED: 'Playlist data removing failed',
    PLAYLIST_FETCH_FAILED: 'Playlist fetching failed',
    PLAYLIST_DELETE_SUCCESS: 'Playlist deleted successfully',
    PLAYLIST_DELETE_FAILED: 'Playlist delete failed',
    PLAYLIST_EDIT_SUCCESS: 'Playlist edited successfully',
    PLAYLIST_EDIT_FAILED: 'Playlist edit failed',

    USER_EXISTS: 'User already exists',
    USER_NOT_EXISTS: 'User does not exist',
    USER_PLAYLIST_EXISTS: 'User - Playlist already exists',

    USER_PLAYLIST_ADD_SUCCESS: 'User - Playlist added successfully',
    USER_PLAYLIST_ADD_FAILED: 'User - Playlist add failed',
    USER_PLAYLIST_DELETE_SUCCESS: 'User - Playlist deleted successfully',
    USER_PLAYLIST_DELETE_FAILED: 'User - Playlist delete failed',

    USER_VIDEO_EXISTS: 'User - Video already exists',
    USER_VIDEO_ADD_SUCCESS: 'User - Video added successfully',
    USER_VIDEO_ADD_FAILED: 'User - Video add failed',
    USER_VIDEO_DELETE_SUCCESS: 'User - Video deleted successfully',
    USER_VIDEO_DELETE_FAILED: 'User - Video delete failed',
    USER_VIDEO_EDIT_FAILED: 'User - Video edit failed',

    INVALID_EMAIL_PASSWORD: 'Invalid email or password',

    LOGO_CHANGE_AGREE: 'Logo change agreed',
    LOGO_CHANGE_DISAGREE: 'Logo change disagreed',
    
    FILE_NOT_FOUND: 'No file uploaded or invalid file type',
    FILE_UPLOAD_FAILED: 'File upload failed',
    FILE_DELETE_FAILED: 'File delete failed',

    VIDEO_NOT_EXISTS: 'Video does not exist',
    VIDEO_DELETE_SUCCESS: 'Video file deleted successfully',
    VIDEO_DELETE_FAILED: 'Video file edit failed',
    VIDEO_EDIT_SUCCESS: 'Video file edited successfully',
    VIDEO_EDIT_FAILED: 'Video file delete failed',
    VIDEO_DATA_REMOVE_FAILED: 'Video data removing failed',

    VIDEO_PLAYLIST_EXISTS: 'Video - Playlist already exists',
    VIDEO_PLAYLIST_ADD_SUCCESS: 'Video - Playlist added successfully',
    VIDEO_PLAYLIST_ADD_FAILED: 'Video - Playlist add failed',
    VIDEO_PLAYLIST_EDIT_FAILED: 'Video - Playlist edit failed',
};

export { UPLOAD_CONSTANTS, MESSAGE_CONSTANTS };
