import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileUserDetails from '../components/profile-container/profile-user-details';
import ProfileNavigation from '../components/profile-container/profile-navigation';
import ProfileTopicList from '../components/profile-container/profile-topic-list';
import ProfileReplyList from '../components/profile-container/profile-reply-list';
import ProfileUserList from '../components/profile-container/profile-user-list';
import { getToken } from '../lib/util';
import { fetchUserProfile } from '../actions/user';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topic',
      isLoading: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { dispatch } = this.props;
    const { username } = getToken();

    this.setState({ isLoading: true });
    dispatch(fetchUserProfile(username));
  }

  renderProfileList() {
    switch (this.state.selectedTab) {
      case 'topic':
        return <ProfileTopicList />;
        break;
      case 'reply':
        return <ProfileReplyList />;
        break;
      case 'following':
        return <ProfileUserList />;
        break;
      case 'followers':
        return <ProfileUserList />;
        break;

    }
  }

  render() {
    return (
      <div>
        <ProfileUserDetails />
        <ProfileNavigation />
        { this.renderProfileList.bind(this)() }
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { entities, topic, reply, user } = state;
  return {
    topic,
    reply,
    user,
    entities
  }
}

export default connect(mapStateToProps)(ProfileContainer);


