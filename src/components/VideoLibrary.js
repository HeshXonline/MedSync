import React, { useState, useEffect } from 'react';

const VideoLibrary = ({ searchQuery }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const videoData = [
    {
      id: 1,
      title: 'Getting Started - Patient Portal Overview',
      description: 'A comprehensive introduction to using our patient portal, covering all the basic features and navigation.',
      thumbnail: '🎥',
      duration: '5:32',
      category: 'Getting Started',
      difficulty: 'Beginner',
      views: 1250,
      rating: 4.8,
      videoUrl: '#',
      tags: ['portal', 'basics', 'navigation', 'introduction']
    },
    {
      id: 2,
      title: 'How to Book Your First Appointment',
      description: 'Step-by-step guide on scheduling appointments, selecting doctors, and managing your calendar.',
      thumbnail: '📅',
      duration: '3:45',
      category: 'Appointments',
      difficulty: 'Beginner',
      views: 980,
      rating: 4.9,
      videoUrl: '#',
      tags: ['appointment', 'booking', 'calendar', 'scheduling']
    },
    {
      id: 3,
      title: 'Managing Your Profile and Settings',
      description: 'Learn how to update your personal information, preferences, and account settings.',
      thumbnail: '⚙️',
      duration: '4:18',
      category: 'Account Management',
      difficulty: 'Beginner',
      views: 756,
      rating: 4.6,
      videoUrl: '#',
      tags: ['profile', 'settings', 'account', 'preferences']
    },
    {
      id: 4,
      title: 'Understanding Your Medical Records',
      description: 'Navigate through your medical history, test results, and download important documents.',
      thumbnail: '📋',
      duration: '6:20',
      category: 'Medical Records',
      difficulty: 'Intermediate',
      views: 645,
      rating: 4.7,
      videoUrl: '#',
      tags: ['medical', 'records', 'history', 'documents']
    },
    {
      id: 5,
      title: 'Payment Methods and Billing',
      description: 'Set up payment methods, view billing history, and understand your medical expenses.',
      thumbnail: '💳',
      duration: '4:55',
      category: 'Billing',
      difficulty: 'Intermediate',
      views: 892,
      rating: 4.5,
      videoUrl: '#',
      tags: ['billing', 'payment', 'insurance', 'expenses']
    },
    {
      id: 6,
      title: 'Video Consultation Setup',
      description: 'Prepare for your video appointments with technical requirements and troubleshooting tips.',
      thumbnail: '📹',
      duration: '7:12',
      category: 'Video Calls',
      difficulty: 'Intermediate',
      views: 534,
      rating: 4.4,
      videoUrl: '#',
      tags: ['video', 'consultation', 'technical', 'troubleshooting']
    },
    {
      id: 7,
      title: 'Prescription Management',
      description: 'Request refills, view prescription history, and manage your medications online.',
      thumbnail: '💊',
      duration: '5:08',
      category: 'Prescriptions',
      difficulty: 'Beginner',
      views: 723,
      rating: 4.8,
      videoUrl: '#',
      tags: ['prescription', 'medication', 'refills', 'pharmacy']
    },
    {
      id: 8,
      title: 'Insurance and Coverage',
      description: 'Add insurance information, verify coverage, and understand your benefits.',
      thumbnail: '🛡️',
      duration: '6:45',
      category: 'Insurance',
      difficulty: 'Advanced',
      views: 412,
      rating: 4.3,
      videoUrl: '#',
      tags: ['insurance', 'coverage', 'benefits', 'verification']
    }
  ];

  const categories = [
    'all',
    'Getting Started',
    'Appointments',
    'Account Management',
    'Medical Records',
    'Billing',
    'Video Calls',
    'Prescriptions',
    'Insurance'
  ];

  const playlists = [
    {
      id: 1,
      name: 'New Patient Guide',
      description: 'Essential videos for first-time users',
      videoIds: [1, 2, 3],
      thumbnail: '📚'
    },
    {
      id: 2,
      name: 'Advanced Features',
      description: 'Deep dive into advanced portal features',
      videoIds: [4, 5, 6, 8],
      thumbnail: '🚀'
    },
    {
      id: 3,
      name: 'Technical Support',
      description: 'Troubleshooting and technical help',
      videoIds: [6, 4],
      thumbnail: '🔧'
    }
  ];

  useEffect(() => {
    let filtered = videoData;

    if (searchQuery) {
      filtered = videoData.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    setFilteredVideos(filtered);
  }, [searchQuery, selectedCategory]);

  const formatDuration = (duration) => {
    return duration;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-default';
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handlePlaylistSelect = (playlist) => {
    setCurrentPlaylist(playlist);
    const playlistVideos = videoData.filter(video => 
      playlist.videoIds.includes(video.id)
    );
    setFilteredVideos(playlistVideos);
    setSelectedCategory('all');
  };

  return (
    <div className="video-library">
      <div className="video-library-header">
        <h2>Video Tutorial Library</h2>
        <p>Learn at your own pace with our comprehensive video guides</p>
      </div>

      {selectedVideo ? (
        <div className="video-player-section">
          <div className="video-player-header">
            <button 
              className="back-to-library"
              onClick={() => setSelectedVideo(null)}
            >
              ← Back to Library
            </button>
          </div>
          
          <div className="video-player-container">
            <div className="video-player">
              <div className="video-placeholder">
                <div className="video-thumbnail">{selectedVideo.thumbnail}</div>
                <div className="play-overlay">
                  <button className="play-button">▶️</button>
                </div>
                <div className="video-duration">{selectedVideo.duration}</div>
              </div>
            </div>
            
            <div className="video-info">
              <h3>{selectedVideo.title}</h3>
              <div className="video-meta">
                <span className={`difficulty-badge ${getDifficultyColor(selectedVideo.difficulty)}`}>
                  {selectedVideo.difficulty}
                </span>
                <span className="video-category">{selectedVideo.category}</span>
                <span className="video-views">{selectedVideo.views} views</span>
                <span className="video-rating">⭐ {selectedVideo.rating}</span>
              </div>
              <p className="video-description">{selectedVideo.description}</p>
              
              <div className="video-tags">
                {selectedVideo.tags.map((tag, index) => (
                  <span key={index} className="video-tag">{tag}</span>
                ))}
              </div>
              
              <div className="video-actions">
                <button className="action-btn like-btn">👍 Helpful</button>
                <button className="action-btn share-btn">🔗 Share</button>
                <button className="action-btn bookmark-btn">🔖 Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-library-content">
          <div className="library-sidebar">
            <div className="sidebar-section">
              <h3>Categories</h3>
              <div className="category-list">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPlaylist(null);
                    }}
                  >
                    {category === 'all' ? 'All Videos' : category}
                    {category !== 'all' && (
                      <span className="category-count">
                        ({videoData.filter(v => v.category === category).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Playlists</h3>
              <div className="playlist-list">
                {playlists.map(playlist => (
                  <div
                    key={playlist.id}
                    className={`playlist-item ${currentPlaylist?.id === playlist.id ? 'active' : ''}`}
                    onClick={() => handlePlaylistSelect(playlist)}
                  >
                    <div className="playlist-thumbnail">{playlist.thumbnail}</div>
                    <div className="playlist-info">
                      <h4>{playlist.name}</h4>
                      <p>{playlist.description}</p>
                      <span className="playlist-count">{playlist.videoIds.length} videos</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="library-main">
            {currentPlaylist && (
              <div className="playlist-header">
                <div className="playlist-info">
                  <h3>{currentPlaylist.name}</h3>
                  <p>{currentPlaylist.description}</p>
                </div>
                <button 
                  className="clear-playlist"
                  onClick={() => {
                    setCurrentPlaylist(null);
                    setFilteredVideos(videoData);
                  }}
                >
                  View All Videos
                </button>
              </div>
            )}

            {searchQuery && (
              <div className="search-results-info">
                <p>Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
              </div>
            )}

            <div className="video-grid">
              {filteredVideos.map(video => (
                <div 
                  key={video.id} 
                  className="video-card"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="video-thumbnail-container">
                    <div className="video-thumbnail">{video.thumbnail}</div>
                    <div className="video-duration">{video.duration}</div>
                    <div className="play-overlay">
                      <span className="play-icon">▶️</span>
                    </div>
                  </div>
                  
                  <div className="video-card-content">
                    <h4 className="video-title">
                      {highlightText(video.title, searchQuery)}
                    </h4>
                    <p className="video-description">
                      {highlightText(video.description, searchQuery)}
                    </p>
                    
                    <div className="video-card-meta">
                      <span className={`difficulty-badge ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                      <span className="video-category">{video.category}</span>
                    </div>
                    
                    <div className="video-stats">
                      <span className="video-views">{video.views} views</span>
                      <span className="video-rating">⭐ {video.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="no-videos">
                <div className="no-videos-icon">🎥</div>
                <h3>No videos found</h3>
                <p>Try adjusting your search terms or browse different categories.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;