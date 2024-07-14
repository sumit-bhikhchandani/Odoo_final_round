import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h3>About BookMaster</h3>
          <p className="text-justify mt-2">

            BookMaster is your dedicated hub for discovering and borrowing books effortlessly. We're passionate about connecting readers with their next favorite read, offering a seamless experience to explore, borrow, and enjoy a diverse range of books. Join us in celebrating the joy of reading with BookMaster.


          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
