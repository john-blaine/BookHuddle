import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

import UpcomingMeetings from './UpcomingMeetings';
import CreateMeeting from './CreateMeeting';
import ClubPageNavbar from '../navigation/ClubPageNavbar';
import Members from './Members';
import BookHistory from './BookHistory';

import '../../styles/club.css';

class ClubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinMsg: '',
      clubData: '',
      pastMeetings: '',
      futureMeetings: '',
    };

    this.userJoinClub = this.userJoinClub.bind(this);
    this.getClubData = this.getClubData.bind(this);
    this.filterMeetings = this.filterMeetings.bind(this);
  }

  componentDidMount() {
    this.getClubData((clubData) => {
      this.filterMeetings(clubData);
    });
  }

  getClubData(cb) {
    let clubData;
    if (this.props.searchResults.length) {
      clubData = this.props.searchResults.find(club => club.id === Number(this.props.match.params.clubId));
    } else {
      clubData = this.props.clubs.find(club => club.id === Number(this.props.match.params.clubId));
    }
    this.setState({
      clubData
    });

    cb(clubData);
  }

  userJoinClub() {
    // We are accessing and slicing the page's url to obtain the club's ID
    const addUserID = this.props.user.id;
    const addClubID = this.props.match.params.clubId;

    const query = `mutation HandleJoinClub($addUserID: Int, $addClubID: Int) {
      handleJoinClub(userID: $addUserID, clubID: $addClubID)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: { addUserID, addClubID },
      }),
      success: (data) => {
        console.log(data);
        this.setState({
          joinMsg: 'Club joined!',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterMeetings(clubData) {
    if (clubData.meetings) {
      const now = DateTime.local().ts;
      const pastList = clubData.meetings.filter((meeting) => (
        DateTime.fromISO(meeting.meeting_timestamp).valueOf() < now
      ));
      const futureList = clubData.meetings
        .filter((meeting) => (
          DateTime.fromISO(meeting.meeting_timestamp).valueOf() > now
        ))
        .sort((a,b) => (
          DateTime.fromISO(a.meeting_timestamp).valueOf() - DateTime.fromISO(b.meeting_timestamp).valueOf()
        ));
      this.setState({
        pastMeetings: pastList,
        futureMeetings: futureList,
      });
    }
  }

  render() {
    const showJoin = this.props.user.clubs.indexOf(this.state.clubData) >= 0 ? { display: 'none'} : { display: 'normal'}
    const clubData = this.props.match.params.clubId;

    return (
      <div id="club-page" className="col-md-9">
        <div className="container">
          <h2 className="club-title">{this.state.clubData.club_name}</h2>
          <ClubPageNavbar />
          <div className="tab-content" id="nav-tabContent">
            <UpcomingMeetings futureMeetings={this.state.futureMeetings} />
            <div className="tab-pane fade" id="nav-members" role="tabpanel" aria-labelledby="nav-members-tab">
              <Members club={clubData} />
            </div>
            <BookHistory pastMeetings={this.state.pastMeetings} />
            <button style={showJoin} className="btn" onClick={this.userJoinClub}>Join Club</button>
            {this.state.joinMsg.length > 1 && <div id="join-msg"><p>{this.state.joinMsg}</p></div>}
              <CreateMeeting clubData={this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default ClubPage;
