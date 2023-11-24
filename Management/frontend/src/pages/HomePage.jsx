import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/HomePage.module.css"

const HomePage = () => {
  return (
    <>
      <div style={{ width: "100vw", backgroundColor: "#000000" }}>
        <Navbar />
        <div>
          <img
            src="/img/background_img.png"
            alt="background"
            width="100%"
            height="659px"
          />
          <div className={`${styles.tagline}`}>
            <h1 style={{ color: "white", fontSize: "5rem" }}>Welcome to The Haven</h1>
          </div>
        </div>
        <div style={{ backgroundColor: "#E3E3E3" }} className={`${styles.slider}`}>
          <div className={`${styles.cards}`}>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/98/5c/37/hotel-exterior.jpg?w=1200&h=-1&s=1" alt='1' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://media.istockphoto.com/id/903417402/photo/luxury-construction-hotel-with-swimming-pool-at-sunset.jpg?s=612x612&w=0&k=20&c=NyPC_c-wE3W_CImA4t57FpyGy6f428CYROd80jxVC4A=" alt='2' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" alt='3' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='4' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://media.istockphoto.com/id/1392171961/photo/portrait-of-an-asian-tourist-woman-standing-nearly-window-looking-to-beautiful-view-with-her.webp?b=1&s=170667a&w=0&k=20&c=6H18iV970l8ksbdVuN9s451WLWAQFnu2Qf6jliB4zHQ=" alt='5' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://eavf3cou74b.exactdn.com/wp-content/uploads/2021/09/16134025/windermere-from-loughrigg-fell-1000px.jpg?strip=all&lossy=1&ssl=1" alt='6' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/397483443.jpg?k=4c09f5cfbde876a466a31d36ce365384e3aa89059bbd1ba971281f06b534e578&o=&hp=1" alt='7' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/98/5c/37/hotel-exterior.jpg?w=1200&h=-1&s=1" alt='1' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://media.istockphoto.com/id/903417402/photo/luxury-construction-hotel-with-swimming-pool-at-sunset.jpg?s=612x612&w=0&k=20&c=NyPC_c-wE3W_CImA4t57FpyGy6f428CYROd80jxVC4A=" alt='2' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" alt='3' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='4' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://media.istockphoto.com/id/1392171961/photo/portrait-of-an-asian-tourist-woman-standing-nearly-window-looking-to-beautiful-view-with-her.webp?b=1&s=170667a&w=0&k=20&c=6H18iV970l8ksbdVuN9s451WLWAQFnu2Qf6jliB4zHQ=" alt='5' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://eavf3cou74b.exactdn.com/wp-content/uploads/2021/09/16134025/windermere-from-loughrigg-fell-1000px.jpg?strip=all&lossy=1&ssl=1" alt='6' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
            <div className={`${styles.indCard}`}>
              <figure>
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/397483443.jpg?k=4c09f5cfbde876a466a31d36ce365384e3aa89059bbd1ba971281f06b534e578&o=&hp=1" alt='7' />
                <div className="text">
                  <p>This is some random text</p>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
