import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSong } from '@/services/SongService';

let initialState = {
    index: 0,
    playlist: [],
    linkSong: {},
    play: false,
    isPlaying: false,
    pauseFromAlbum: false,
    playlistFavorite: [],
    recentSongs: [],
    showPlaylist: false,
    isLoading: false,
    isRandom: false,
    isRepeat: false,
};

export const fetchSong = createAsyncThunk('song/getSong', async (songId) => {
    let response = {};
    if (songId) {
        response = await getSong(songId);
    }
    return response.data;
});

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        updateIndex: (state, action) => {
            return { ...state, index: action.payload };
        },

        updatePlaylist: (state, action) => {
            return { ...state, playlist: [...action.payload] };
        },

        updatePlay: (state, action) => {
            return { ...state, play: action.payload };
        },

        updateIsPlaying: (state, action) => {
            return { ...state, isPlaying: action.payload };
        },

        updatePauseFromAlbum: (state, action) => {
            return { ...state, pauseFromAlbum: action.payload };
        },

        updateLinkSong: (state, action) => {
            return { ...state, linkSong: action.payload };
        },

        addSongFavorite: (state, action) => {
            return { ...state, playlistFavorite: [...state.playlistFavorite, action.payload] };
        },

        removeSongFavorite: (state, action) => {
            let copyPlayListFavorite = [];
            state.playlistFavorite.forEach((item) => {
                if (item.encodeId !== action.payload) {
                    copyPlayListFavorite.push(item);
                }
            });

            return { ...state, playlistFavorite: copyPlayListFavorite };
        },

        setPlaylistSongFavorite: (state, action) => {
            return { ...state, playlistFavorite: action.payload };
        },

        setShowPlaylist: (state) => {
            return { ...state, showPlaylist: !state.showPlaylist };
        },

        setIsLoading: (state, action) => {
            return { ...state, isLoading: action.payload };
        },

        addRecentSong: (state, action) => {
            let copyRecentSongs = [...state.recentSongs];
            if (copyRecentSongs.length === 40) {
                copyRecentSongs.shift();
            }
            copyRecentSongs = copyRecentSongs.filter((item) => item.encodeId !== action.payload.encodeId);
            copyRecentSongs.push(action.payload);
            copyRecentSongs.reverse();
            return { ...state, recentSongs: copyRecentSongs };
        },

        setIsRandom: (state, action) => {
            return { ...state, isRandom: !state.isRandom };
        },

        setIsRepeat: (state, action) => {
            return { ...state, isRepeat: !state.isRepeat };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSong.fulfilled, (state, action) => {
            return { ...state, linkSong: action.payload };
        });
        builder.addCase(fetchSong.rejected, (state, action) => {
            return { ...state, linkSong: {} };
        });
    },
});

export const {
    updateIndex,
    updatePlaylist,
    updatePlay,
    updateIsPlaying,
    updatePauseFromAlbum,
    updateLinkSong,
    addSongFavorite,
    removeSongFavorite,
    setShowPlaylist,
    setPlaylistSongFavorite,
    setIsLoading,
    addRecentSong,
    setIsRandom,
    setIsRepeat,
} = songSlice.actions;

export default songSlice.reducer;
