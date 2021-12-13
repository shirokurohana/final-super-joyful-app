import Head from 'next/head';
import Link from 'next/link';

export default function Layout( { children, home } ) {
  return (
    <>
      <Head>
        <title>My Favs</title>
      </Head>
      <header>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link href="/">
              <a className="navbar-brand">My Favs</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                <Link href="/">
                 <a className="nav-link active" aria-current="page">Home</a>
                </Link>
                </li>
                <li className="nav-item">
                  <Link href="/1">
                    <a className="nav-link">Verses</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/40">
                    <a className="nav-link">Music</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/44">
                    <a className="nav-link">Podcasts</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/62">
                    <a className="nav-link">Videos</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/25">
                    <a className="nav-link">My take on 1 Samuel 16:7</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/">
                    <a className="nav-link">Go Back Home</a>
                  </Link>
                </li>
                
                  
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-4 text-center ">
          <Link href="/">
            <a className="btn btn-info mt-4 back-home">&#127968; Go back home</a>
          </Link>
          </div>
        )
      }
      <footer>
        <div className="container mb-4">
          <div className="row">
            <div className="col-4 text-center mt-4">
              Visit us 
              in Santa Rosa 🏘
            </div>
            <div className="col-4 text-center mt-4">
            Copyright &#169; 2021 
            &#32; Made with ❤️
            </div>
            <div className="col-4 text-center mt-4">
              Our socials 📱
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}