import React from 'react';
import MainNavbar from '../navigation/MainNavbar';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  smoothScroll() {
    $('html, body').animate({
      scrollTop: $('#service').offset().top,
    }, 1000);
  }

  render() {
    const bookList = [
      { title: 'The Pillars of the Earth', author: 'Ken Follet', cover: 'http://covers.openlibrary.org/b/isbn/0451207149-M.jpg' },
      { title: "Where'd You Go Bernadette", author: 'Maria Semple', cover: 'http://covers.openlibrary.org/b/isbn/0316204277-M.jpg' },
      { title: 'The Help', author: 'Kathryn Stockett', cover: 'http://covers.openlibrary.org/b/isbn/0399155341-M.jpg' },
    ];
    return (
      <div>
        <MainNavbar
          login={this.props.login}
          signup={this.props.signup}
          isLoggedIn={this.props.isLoggedIn}
        />
        <header className="showcase">
          <div className="showcase_image" />
          <div className="bg-overlay" />
          <div className="showcase_wrap">
            <div className="container">
              <h1 className="ts">BookHuddle</h1>
              <h5 className="showcase_wrap_text ts">Create, join and manage your book clubs. Meet new friends who share your reading tastes, and find the perfect next books to read!</h5>
              <button className="bttn" onClick={this.smoothScroll.bind(this)}>Read More</button>
            </div>
          </div>
        </header>
        <main id="main">
          <section id="service" className="content-wrapper">
            <div className="container centered">
              <h3>How it Works</h3>
              <div className="row">
                <div className="col-md-4">
                  <i className="fa fa-heart" />
                  <h4>Signup for free</h4>
                  <p>Sign up and start browsing book clubs by book genre or search by keywords or location. </p>
                </div>
                <div className="col-md-4">
                  <i className="fas fa-desktop" />
                  <h4>Create a club</h4>
                  <p>Start your own club that you can make public or private. Pick what genres your club will be reading and add a description to help other readers find you.</p>
                </div>
                <div className="col-md-4">
                  <i className="fas fa-users" />
                  <h4>Get Connected</h4>
                  <p>Stay up to date with your book club and join in the discussion using your club's message board. Get notified of upcoming meetings.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="feature content-wrapper">
            <div className="centered">
              <h3>Our Top Picks</h3>
              <p><em>Popular books from our book clubs!</em></p>
              <div className="row">
                { bookList.map((book, i) =>
                  (<div key={i} className="col-md-4">
                    <img className="book-cover" src={book.cover} />
                    <h5>{book.title}</h5>
                    <p>By {book.author}</p>
                   </div>))
                }
              </div>
            </div>
          </section>
          <section id="action">
            <div className="row">
              <div className="col-md-6 centered content-wrapper">
                <h3>What Others Are Saying</h3>
                <blockquote>
                  <p>"Reading helps us imagine a better world. <br/> BookHuddle has made it easier to share and connect with others who feel the same."
                  </p>
                </blockquote>
                <cite>- Jane, New York</cite>
              </div>
              <div className="action-content col-md-6 content-wrapper">
                <h3>Get in the Huddle</h3>
                <p>Read your next classic with friends.</p>
                <a href="#" className="btn btn-dark">Sign up</a>
              </div>
            </div>
          </section>
        </main>

        <footer id="footerwrap">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4>About</h4>
                <div className="hline-w" />
                <p>BookHuddle is an app that caters to people who love to read and want to connect with other likeminded individuals through the creation of digital bookclubs.</p>
              </div>
              <div className="col-md-4">
                <h4>FAQ</h4>
                <div className="hline-w" />
                <p>Do I have to pay anything?</p>
                <p>How do I create an account?</p>
                <p>Does my bookclub have to be online?</p>
              </div>
              <div className="col-md-4">
                <h4>Github Repo</h4>
                <div className="hline-w" />
                <a href="https://github.com/LetsGitGoing-Labs/BookHuddle"><p>LetsGitGoing-Labs/BookHuddle</p></a>

              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
